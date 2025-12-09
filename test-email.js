import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
	sendAdminEmail,
	sendCustomerEmail,
} from "./netlify/functions/lib/email-helpers.js";
import {
	getOrderConfirmationHTML,
	getOrderReceivedAdminHTML,
} from "./netlify/functions/lib/email-templates.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock order object for testing
const mockOrder = {
	_id: "507f1f77bcf86cd799439011",
	orderType: "send-a-card",
	email: "gilbertjvirgo@gmail.com",
	delivery: {
		name: "John Doe",
		address1: "123 Main Street",
		address2: "Apartment 4B",
		city: "London",
		postcode: "SW1A 1AA",
		shipping: "1st Class (£2.95)",
	},
	sendACard: {
		cardId: "card_123",
		message: "This is a test message for the email helper.",
	},
	createdAt: new Date(),
};

// Test with blank cards order
const mockBlankCardsOrder = {
	_id: "507f1f77bcf86cd799439012",
	orderType: "blank-cards",
	email: "gilbertjvirgo@gmail.com",
	delivery: {
		name: "Jane Smith",
		address1: "456 Oak Avenue",
		address2: "",
		city: "Manchester",
		postcode: "M1 1AE",
		shipping: "3-5 days (free)",
	},
	blankCards: {
		selectedCards: {
			card_456: 2,
			card_789: 3,
		},
		totalQuantity: 5,
	},
	createdAt: new Date(),
};

async function testEmails() {
	console.log("🚀 Starting email helper tests...\n");

	// Check for required environment variables
	console.log("📋 Environment Variables Check:");
	console.log(
		`   BREVO_API_KEY: ${
			process.env.BREVO_API_KEY ? "✅ Set" : "❌ Missing"
		}`
	);
	console.log(
		`   BREVO_FROM_EMAIL: ${
			process.env.BREVO_FROM_EMAIL ||
			"Using default (noreply@babysad.cards)"
		}`
	);
	console.log("");

	if (!process.env.BREVO_API_KEY) {
		console.error(
			"❌ Error: BREVO_API_KEY not set in environment variables"
		);
		process.exit(1);
	}

	try {
		console.log("📧 Test 1: Sending admin email for send-a-card order...");
		console.log("   Order ID:", mockOrder._id);
		console.log("   Recipient: sadbaby.cards@icloud.com");
		await sendAdminEmail(mockOrder);
		console.log("✅ Admin email sent successfully!\n");
	} catch (error) {
		console.error("❌ Failed to send admin email:", error.message);
		console.error("   Full error:", error, "\n");
	}

	try {
		console.log("📧 Test 2: Sending customer confirmation email...");
		console.log("   Order ID:", mockOrder._id);
		console.log("   Recipient:", mockOrder.email);
		await sendCustomerEmail(mockOrder);
		console.log("✅ Customer email sent successfully!\n");
	} catch (error) {
		console.error("❌ Failed to send customer email:", error.message);
		console.error("   Full error:", error, "\n");
	}

	try {
		console.log("📧 Test 3: Sending admin email for blank-cards order...");
		console.log("   Order ID:", mockBlankCardsOrder._id);
		console.log("   Recipient: sadbaby.cards@icloud.com");
		await sendAdminEmail(mockBlankCardsOrder);
		console.log("✅ Admin email for blank cards sent successfully!\n");
	} catch (error) {
		console.error(
			"❌ Failed to send blank cards admin email:",
			error.message
		);
		console.error("   Full error:", error, "\n");
	}

	try {
		console.log(
			"📧 Test 4: Sending customer confirmation for blank-cards..."
		);
		console.log("   Order ID:", mockBlankCardsOrder._id);
		console.log("   Recipient:", mockBlankCardsOrder.email);
		await sendCustomerEmail(mockBlankCardsOrder);
		console.log("✅ Customer email for blank cards sent successfully!\n");
	} catch (error) {
		console.error(
			"❌ Failed to send blank cards customer email:",
			error.message
		);
		console.error("   Full error:", error, "\n");
	}

	// Generate HTML previews
	console.log("📄 Generating HTML email previews...\n");

	try {
		const orderConfirmationHTML = getOrderConfirmationHTML(mockOrder);
		const previewPath = path.join(
			__dirname,
			"email-preview-order-confirmation.html"
		);
		fs.writeFileSync(previewPath, orderConfirmationHTML);
		console.log(`✅ Order confirmation preview saved to: ${previewPath}`);
	} catch (error) {
		console.error(
			"❌ Failed to generate order confirmation preview:",
			error.message
		);
	}

	try {
		const orderReceivedHTML = getOrderReceivedAdminHTML(mockOrder);
		const previewPath = path.join(
			__dirname,
			"email-preview-order-received-admin.html"
		);
		fs.writeFileSync(previewPath, orderReceivedHTML);
		console.log(`✅ Admin order received preview saved to: ${previewPath}`);
	} catch (error) {
		console.error("❌ Failed to generate admin preview:", error.message);
	}

	try {
		const blankCardsConfirmationHTML =
			getOrderConfirmationHTML(mockBlankCardsOrder);
		const previewPath = path.join(
			__dirname,
			"email-preview-blank-cards-confirmation.html"
		);
		fs.writeFileSync(previewPath, blankCardsConfirmationHTML);
		console.log(
			`✅ Blank cards confirmation preview saved to: ${previewPath}`
		);
	} catch (error) {
		console.error(
			"❌ Failed to generate blank cards confirmation preview:",
			error.message
		);
	}

	try {
		const blankCardsAdminHTML =
			getOrderReceivedAdminHTML(mockBlankCardsOrder);
		const previewPath = path.join(
			__dirname,
			"email-preview-blank-cards-admin.html"
		);
		fs.writeFileSync(previewPath, blankCardsAdminHTML);
		console.log(`✅ Blank cards admin preview saved to: ${previewPath}`);
	} catch (error) {
		console.error(
			"❌ Failed to generate blank cards admin preview:",
			error.message
		);
	}

	console.log("\n🎉 Email helper tests completed!");
}

testEmails();
