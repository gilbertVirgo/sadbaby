import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

let __dirname;
try {
	__dirname = path.dirname(fileURLToPath(import.meta.url));
} catch (e) {
	// Fallback for when import.meta.url is not available
	__dirname = path.resolve(process.cwd(), "netlify/functions/lib");
}

const compiledDir = path.join(__dirname, "templates/compiled");

// Load and cache templates
let templates = {};

const loadTemplate = (templateName) => {
	if (templates[templateName]) {
		return templates[templateName];
	}

	const templatePath = path.join(compiledDir, `${templateName}.ejs`);

	if (!fs.existsSync(templatePath)) {
		throw new Error(
			`Template not found: ${templatePath}. Run 'npm run mjml' to compile templates.`
		);
	}

	const templateContent = fs.readFileSync(templatePath, "utf-8");
	templates[templateName] = templateContent;
	return templateContent;
};

const renderTemplate = (templateName, data) => {
	const template = loadTemplate(templateName);
	return ejs.render(template, data, { async: false });
};

// Template data for each email type
export const getOrderConfirmationHTML = (orderData) => {
	const templateData = {
		orderId: orderData._id,
		orderType:
			orderData.orderType === "send-a-card"
				? "Send a Card"
				: "Blank Cards",
		shippingMethod: orderData.delivery.shipping.title,
		recipientName: orderData.delivery.name,
		address1: orderData.delivery.address1,
		address2: orderData.delivery.address2,
		city: orderData.delivery.city,
		postcode: orderData.delivery.postcode,
		orderDescription:
			orderData.orderType === "send-a-card"
				? "A card containing your custom message will be sent to the recipient."
				: "The four blank cards that you've chosen will be printed and dispatched to you.",
	};

	return renderTemplate("order-confirmation", templateData);
};

export const getOrderReceivedAdminHTML = (orderData) => {
	let orderDetails = "";

	if (orderData.orderType === "send-a-card") {
		orderDetails = `Card ID: ${orderData.sendACard.cardId}<br><br><strong>Message:</strong><br><pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap; word-break: break-word;">${orderData.sendACard.message}</pre>`;
	} else {
		const cardsList = Object.entries(orderData.blankCards.selectedCards)
			.map(([cardId, qty]) => `Card ID: ${cardId} - Quantity: ${qty}`)
			.join("<br>");
		orderDetails = `${cardsList}<br><br><strong>Total Quantity:</strong> ${orderData.blankCards.totalQuantity}`;
	}

	const templateData = {
		orderId: orderData._id,
		orderType:
			orderData.orderType === "send-a-card"
				? "Send a Card"
				: "Blank Cards",
		customerEmail: orderData.email,
		shippingMethod: orderData.delivery.shipping,
		orderDate: new Date(orderData.createdAt).toLocaleString(),
		recipientName: orderData.delivery.name,
		address1: orderData.delivery.address1,
		address2: orderData.delivery.address2,
		city: orderData.delivery.city,
		postcode: orderData.delivery.postcode,
		orderDetails: orderDetails,
	};

	return renderTemplate("order-received-admin", templateData);
};
