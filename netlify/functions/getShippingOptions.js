import mongoose from "mongoose";
import { ShippingModel } from "./models/Shipping.js";

export const handler = async (event, context) => {
	try {
		// Check if MONGO_URI is available
		if (!process.env.MONGO_URI) {
			console.error("MONGO_URI environment variable is not set");
			return {
				statusCode: 500,
				body: JSON.stringify({
					error: "Database connection not configured",
				}),
			};
		}

		// Connect to MongoDB if not already connected
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(process.env.MONGO_URI);
		}

		// Fetch all shipping options
		const shippingOptions = await ShippingModel.find({}).sort({ cost: 1 });

		if (!shippingOptions || shippingOptions.length === 0) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					error: "No shipping options found",
				}),
			};
		}

		// Transform to match the expected frontend format
		const shippingInfo = {};
		shippingOptions.forEach((option) => {
			shippingInfo[option.key] = {
				_id: option._id.toString(),
				title: option.title,
				description: option.description,
				cost: option.cost,
			};
		});

		return {
			statusCode: 200,
			body: JSON.stringify(shippingInfo),
		};
	} catch (error) {
		console.error("Error fetching shipping options:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Failed to fetch shipping options",
			}),
		};
	}
};
