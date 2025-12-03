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
			"price_1SYvoLJYOXC3lpM9oV8Dleij", // Blank cards product
			data.shipping,
			"price_1SYvp0JYOXC3lpM9l6eIzCiv" // First class shipping
		);

		return await createCheckoutSession(stripe, {
			lineItems,
			email: data.email,
			metadata: {
				orderType: "blank-cards",
				orderData: JSON.stringify({
					name: data.name,
					address1: data.address1,
					address2: data.address2 || "",
					city: data.city,
					postcode: data.postcode,
					shipping: data.shipping,
					email: data.email,
					quantities: data.quantities,
				}),
			},
			successUrl: `${process.env.URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
			cancelUrl: `${process.env.URL}/blank-cards`,
		});
	} catch (error) {
		return handleError(error);
	}
};
