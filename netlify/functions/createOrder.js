import mongoose from "mongoose";
import { OrderModel } from "./models/Order.js";
import { ShippingModel } from "./models/Shipping.js";
import { sendAdminEmail, sendCustomerEmail } from "./lib/email-helpers.js";

let isConnected = false;

const connectToDatabase = async () => {
	if (isConnected) {
		return;
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		isConnected = true;
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		throw error;
	}
};

export const handler = async (event) => {
	// Only allow POST requests
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}

	try {
		// Connect to database
		await connectToDatabase();

		// Parse request body
		const orderData = JSON.parse(event.body);

		// Validate required fields
		if (!orderData.stripeSessionId) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Missing stripeSessionId" }),
			};
		}

		if (
			!orderData.orderType ||
			!["send-a-card", "blank-cards"].includes(orderData.orderType)
		) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Invalid orderType" }),
			};
		}

		// Check if order already exists
		const existingOrder = await OrderModel.findOne({
			stripeSessionId: orderData.stripeSessionId,
		});

		if (existingOrder) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					message: "Order already exists",
					orderId: existingOrder._id,
				}),
			};
		}

		// Validate and fetch shipping option
		if (!orderData.delivery?.shipping) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Missing shipping option" }),
			};
		}

		const shippingOption = await ShippingModel.findById(
			orderData.delivery.shipping
		);

		if (!shippingOption) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Invalid shipping option" }),
			};
		}

		// Create new order
		const order = new OrderModel({
			orderType: orderData.orderType,
			stripeSessionId: orderData.stripeSessionId,
			email: orderData.email,
			delivery: {
				name: orderData.delivery.name,
				address1: orderData.delivery.address1,
				address2: orderData.delivery.address2,
				city: orderData.delivery.city,
				postcode: orderData.delivery.postcode,
				shipping: shippingOption._id,
			},
			sendACard:
				orderData.orderType === "send-a-card"
					? {
							cardId: orderData.sendACard?.cardId,
							message: orderData.sendACard?.message,
					  }
					: undefined,
			blankCards:
				orderData.orderType === "blank-cards"
					? {
							selectedCards: orderData.blankCards?.selectedCards,
							totalQuantity: orderData.blankCards?.totalQuantity,
					  }
					: undefined,
			paymentStatus: "paid", // Stripe checkout success means payment succeeded
		});

		await order.save();

		// Populate shipping details for email templates
		await order.populate("delivery.shipping");

		// Send emails to admin and customer
		try {
			await sendAdminEmail(order);
			await sendCustomerEmail(order);
		} catch (emailError) {
			console.error("Email sending failed:", emailError);
			// Don't fail the order creation if emails fail
		}

		return {
			statusCode: 201,
			body: JSON.stringify({
				message: "Order created successfully",
				orderId: order._id,
			}),
		};
	} catch (error) {
		console.error("Error creating order:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Failed to create order",
				details: error.message,
			}),
		};
	}
};
