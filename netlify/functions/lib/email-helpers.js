// Send email via Brevo API
import {
	getOrderConfirmationHTML,
	getOrderReceivedAdminHTML,
} from "./email-templates.js";

const sendAdminEmail = async (order) => {
	const emailHTML = getOrderReceivedAdminHTML(order);

	const emailData = {
		sender: {
			email: process.env.BREVO_FROM_EMAIL || "noreply@sadbaby.cards",
			name: "Baby Sad Cards",
		},
		to: [{ email: "sadbaby.cards@icloud.com" }],
		subject: `New Order - ${
			order.orderType === "send-a-card" ? "Send a Card" : "Blank Cards"
		}`,
		htmlContent: emailHTML,
	};

	try {
		const response = await fetch("https://api.brevo.com/v3/smtp/email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"api-key": process.env.BREVO_API_KEY,
			},
			body: JSON.stringify(emailData),
		});

		console.log("Admin email response status:", response.status);
		const responseData = await response.text();
		console.log("Admin email response body:", responseData);

		if (!response.ok) {
			throw new Error(
				`Brevo error (${response.status}): ${responseData}`
			);
		}

		console.log("Admin email sent successfully");
	} catch (error) {
		console.error("Error sending admin email:", error);
		throw error;
	}
};

const sendCustomerEmail = async (order) => {
	const emailHTML = getOrderConfirmationHTML(order);

	const emailData = {
		sender: {
			email: process.env.BREVO_FROM_EMAIL || "noreply@sadbaby.cards",
			name: "Baby Sad Cards",
		},
		to: [{ email: order.email }],
		subject: "Order Confirmation - Baby Sad Cards",
		htmlContent: emailHTML,
	};

	try {
		const response = await fetch("https://api.brevo.com/v3/smtp/email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"api-key": process.env.BREVO_API_KEY,
			},
			body: JSON.stringify(emailData),
		});

		console.log("Customer email response status:", response.status);
		const responseData = await response.text();
		console.log("Customer email response body:", responseData);

		if (!response.ok) {
			throw new Error(
				`Brevo error (${response.status}): ${responseData}`
			);
		}

		console.log("Customer email sent successfully");
	} catch (error) {
		console.error("Error sending customer email:", error);
		throw error;
	}
};

export { sendAdminEmail, sendCustomerEmail };
