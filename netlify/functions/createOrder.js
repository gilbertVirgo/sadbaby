import mongoose from "mongoose";
import { OrderModel } from "./models/Order.js";

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
				shipping: orderData.delivery.shipping,
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
