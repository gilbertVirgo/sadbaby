import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
			enum: ["standard", "firstClass"],
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		cost: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
);

const ShippingModel =
	mongoose.models.Shipping || mongoose.model("Shipping", shippingSchema);

export { ShippingModel };
