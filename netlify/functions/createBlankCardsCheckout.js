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
		const { shipping, email, address1, address2, city, postcode } =
			JSON.parse(event.body);

		const lineItems = buildLineItems(
			"price_1SYvoLJYOXC3lpM9oV8Dleij", // Blank cards product
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
			},
			successUrl: `${process.env.URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
			cancelUrl: `${process.env.URL}/blank-cards`,
		});
	} catch (error) {
		return handleError(error);
	}
};
