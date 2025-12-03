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
		const {
			shipping,
			email,
			address1,
			address2,
			city,
			postcode,
			message,
			cardId,
			cardTitle,
		} = JSON.parse(event.body);

		const lineItems = buildLineItems(
			"price_1SYvnmJYOXC3lpM94TWTqd7S", // Send a card product
			shipping,
			"price_1SYvp0JYOXC3lpM9l6eIzCiv" // First class shipping
		);

		return await createCheckoutSession(stripe, {
			lineItems,
			email,
			metadata: {
				address1,
				address2: address2 || "",
				city,
				postcode,
				message,
				cardId,
				cardTitle: cardTitle || "",
			},
			successUrl: `${process.env.URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
			cancelUrl: `${process.env.URL}/send-a-card`,
		});
	} catch (error) {
		return handleError(error);
	}
};
