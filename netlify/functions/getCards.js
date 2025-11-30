import mongoose from "mongoose";
import Card from "./models/Card.js";

let cachedDb = null;

const connectToDatabase = async () => {
	if (cachedDb) {
		return cachedDb;
	}

	const connection = await mongoose.connect(process.env.MONGO_URI);
	cachedDb = connection;
	return connection;
};

export const handler = async (event, context) => {
	context.callbackWaitsForEmptyEventLoop = false;

	try {
		await connectToDatabase();

		const cards = await Card.find({});

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cards),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to fetch cards" }),
		};
	}
};
