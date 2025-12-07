import mongoose from "mongoose";
import dotenv from "dotenv";
import { ShippingModel } from "../netlify/functions/models/Shipping.js";

dotenv.config();

const shippingData = [
	{
		key: "standard",
		title: "3-5 days (free)",
		description: "Always free, delivered by the Royal Mail.",
		cost: 0,
	},
	{
		key: "firstClass",
		title: "1st Class (£2.95)",
		description:
			"Royal Mail 1st Class. Aims to arrive the next working day (not guaranteed).",
		cost: 2.95,
	},
];

async function migrateShipping() {
	try {
		// Connect to MongoDB
		await mongoose.connect(process.env.MONGO_URI);

		console.log("✓ Connected to MongoDB");

		// Clear existing shipping data (optional - comment out if you want to skip this)
		const deletedCount = await ShippingModel.deleteMany({});
		console.log(
			`✓ Cleared ${deletedCount.deletedCount} existing shipping documents`
		);

		// Insert new shipping data
		const result = await ShippingModel.insertMany(shippingData);
		console.log(`✓ Inserted ${result.length} shipping documents`);

		result.forEach((doc) => {
			console.log(`  - ${doc.key}: ${doc.title} (£${doc.cost})`);
		});

		console.log("\n✓ Migration completed successfully!");

		await mongoose.connection.close();
	} catch (error) {
		console.error("✗ Migration failed:", error);
		process.exit(1);
	}
}

migrateShipping();
