import mongoose from "mongoose";
import { ShippingModel } from "./models/Shipping.js";
import { verifyRecaptcha } from "./lib/recaptcha.js";
import {
	createStripeInstance,
	handleMethodCheck,
	handleError,
	createCheckoutSession,
	buildLineItems,
} from "./lib/stripe-helpers.js";

export const handler = async (event, context) => {
	const methodError = handleMethodCheck(event);
	if (methodError) return methodError;

	try {
		const data = JSON.parse(event.body);
		const { recaptchaToken, ...checkoutData } = data;

		// Verify reCAPTCHA token if provided
		if (recaptchaToken) {
			const recaptchaResult = await verifyRecaptcha(recaptchaToken, 0.5);
			if (!recaptchaResult.success) {
				return {
					statusCode: 400,
					body: JSON.stringify({
						error: "Security verification failed. Please try again.",
					}),
				};
			}
			console.log(`reCAPTCHA score: ${recaptchaResult.score}`);
		}

		// Connect to database if needed
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(process.env.MONGO_URI);
		}

		const stripe = createStripeInstance();

		// Fetch the shipping option to get its key
		const shippingOption = await ShippingModel.findById(
			checkoutData.shipping
		);
		if (!shippingOption) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Invalid shipping option" }),
			};
		}

		const lineItems = buildLineItems(
			"price_1SYvnmJYOXC3lpM94TWTqd7S", // Send a card product
			shippingOption.key,
			"price_1SYvp0JYOXC3lpM9l6eIzCiv" // First class shipping
		);

		return await createCheckoutSession(stripe, {
			lineItems,
			email: checkoutData.email,
			metadata: {
				orderType: "send-a-card",
				orderData: JSON.stringify({
					name: checkoutData.name,
					address1: checkoutData.address1,
					address2: checkoutData.address2 || "",
					city: checkoutData.city,
					postcode: checkoutData.postcode,
					shipping: checkoutData.shipping,
					email: data.email,
					selectedCardId: data.selectedCardId,
					message: data.message,
				}),
			},
			successUrl: `${process.env.URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
			cancelUrl: `${process.env.URL}/send-a-card`,
		});
	} catch (error) {
		return handleError(error);
	}
};
