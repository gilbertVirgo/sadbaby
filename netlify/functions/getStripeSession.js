import {
	createStripeInstance,
	handleMethodCheck,
	handleError,
} from "./lib/stripe-helpers.js";

export const handler = async (event) => {
	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			body: JSON.stringify({ error: "Method not allowed" }),
		};
	}

	try {
		const stripe = createStripeInstance();
		const sessionId = event.queryStringParameters?.session_id;

		if (!sessionId) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Missing session_id" }),
			};
		}

		const session = await stripe.checkout.sessions.retrieve(sessionId);

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				customer_email: session.customer_email,
				metadata: session.metadata,
				payment_status: session.payment_status,
			}),
		};
	} catch (error) {
		return handleError(error);
	}
};
