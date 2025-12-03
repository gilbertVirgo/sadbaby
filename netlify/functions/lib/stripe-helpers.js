import Stripe from "stripe";

export const createStripeInstance = () => {
	return new Stripe(process.env.STRIPE_SECRET_KEY);
};

export const handleMethodCheck = (event) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}
	return null;
};

export const handleError = (error) => {
	console.error(error);
	return {
		statusCode: 500,
		body: JSON.stringify({ error: error.message }),
	};
};

export const createCheckoutSession = async (stripe, options) => {
	const { lineItems, email, metadata, successUrl, cancelUrl } = options;

	const session = await stripe.checkout.sessions.create({
		allow_promotion_codes: true,
		payment_method_types: ["card"],
		line_items: lineItems,
		mode: "payment",
		success_url: successUrl,
		cancel_url: cancelUrl,
		customer_email: email,
		shipping_address_collection: {
			allowed_countries: ["GB"],
		},
		metadata,
	});

	return {
		statusCode: 200,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ url: session.url }),
	};
};

export const buildLineItems = (
	basePrice,
	shipping,
	firstClassShippingPrice
) => {
	const lineItems = [
		{
			price: basePrice,
			quantity: 1,
		},
	];

	// Add first class shipping if selected
	if (shipping === "firstClass") {
		lineItems.push({
			price: firstClassShippingPrice,
			quantity: 1,
		});
	}

	return lineItems;
};
