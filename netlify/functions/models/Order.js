import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		// Order type: 'send-a-card' or 'blank-cards'
		orderType: {
			type: String,
			required: true,
			enum: ["send-a-card", "blank-cards"],
		},

		// Stripe session ID for reference
		stripeSessionId: {
			type: String,
			required: true,
			unique: true,
		},

		// Customer email
		email: {
			type: String,
			required: true,
		},

		// Delivery information
		delivery: {
			name: {
				type: String,
				required: true,
			},
			address1: {
				type: String,
				required: true,
			},
			address2: String,
			city: {
				type: String,
				required: true,
			},
			postcode: {
				type: String,
				required: true,
			},
			shipping: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Shipping",
				required: true,
			},
		},

		// For send-a-card orders
		sendACard: {
			cardId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Card",
			},
			message: String,
		},

		// For blank-cards orders
		blankCards: {
			selectedCards: mongoose.Schema.Types.Mixed, // Object with card IDs as keys and quantities as values
			totalQuantity: Number,
		},

		// Payment status
		paymentStatus: {
			type: String,
			enum: ["pending", "paid", "failed", "refunded"],
			default: "pending",
		},

		// Fulfillment status
		fulfillmentStatus: {
			type: String,
			enum: ["pending", "processing", "completed", "cancelled"],
			default: "pending",
		},

		// Notes for internal use
		notes: String,
	},
	{
		timestamps: true, // Adds createdAt and updatedAt
	}
);

// Indexes for common queries
orderSchema.index({ email: 1, createdAt: -1 });
orderSchema.index({ fulfillmentStatus: 1, createdAt: -1 });

const OrderModel =
	mongoose.models.Order || mongoose.model("Order", orderSchema);

export { OrderModel };
