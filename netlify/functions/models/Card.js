import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
});

cardSchema.virtual("imageURL").get(function () {
	return process.env.CLOUDFRONT_ROOT_URL + this.slug + ".jpg";
});

cardSchema.set("toJSON", { virtuals: true });
cardSchema.set("toObject", { virtuals: true });

// Avoid model recompilation issues across Lambda invocations
export default mongoose.models.Card || mongoose.model("Card", cardSchema);
