import Stripe from "stripe";

export const handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}

	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
		const { shipping, email, address1, address2, city, postcode } =
			JSON.parse(event.body);

		// Base product (blank cards pack)
		const lineItems = [
			{
				price: "price_1SYvoLJYOXC3lpM9oV8Dleij", // Your product ID
				quantity: 1,
			},
		];

		// Add first class shipping if selected
		if (shipping === "first-class") {
			lineItems.push({
				price: "price_1SYvp0JYOXC3lpM9l6eIzCiv", // First class shipping product ID
				quantity: 1,
			});
		}

		const session = await stripe.checkout.sessions.create({
			allow_promotion_codes: true,
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.URL}/blank-cards`,
			customer_email: email,
			shipping_address_collection: {
				allowed_countries: ["GB"],
			},
			metadata: {
				address1,
				address2: address2 || "",
				city,
				postcode,
			},
		});

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url: session.url }),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
