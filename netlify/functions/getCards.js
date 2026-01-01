import mongoose from "mongoose";
import { CardModel } from "./models/Card.js";

const connectToDatabase = async () => {
	if (mongoose.connection.readyState === 1) {
		// Already connected
		return mongoose.connection;
	}

	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			maxPoolSize: 1,
			socketTimeoutMS: 45000,
			serverSelectionTimeoutMS: 5000,
		});
		return connection;
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
		throw error;
	}
};

export const handler = async (event, context) => {
	context.callbackWaitsForEmptyEventLoop = false;

	try {
		await connectToDatabase();

		const cards = await CardModel.find({ hidden: { $ne: true } });

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cards),
		};
	} catch (error) {
		console.error("Error fetching cards:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to fetch cards" }),
		};
	}
};
