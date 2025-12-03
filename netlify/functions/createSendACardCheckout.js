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
		const stripe = createStripeInstance();
		const data = JSON.parse(event.body);

		const lineItems = buildLineItems(
			"price_1SYvnmJYOXC3lpM94TWTqd7S", // Send a card product
			data.shipping,
			"price_1SYvp0JYOXC3lpM9l6eIzCiv" // First class shipping
		);

		return await createCheckoutSession(stripe, {
			lineItems,
			email: data.email,
			metadata: {
				orderType: "send-a-card",
				orderData: JSON.stringify({
					name: data.name,
					address1: data.address1,
					address2: data.address2 || "",
					city: data.city,
					postcode: data.postcode,
					shipping: data.shipping,
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
