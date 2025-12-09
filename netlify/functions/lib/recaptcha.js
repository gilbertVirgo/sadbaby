import fetch from "node-fetch";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/**
 * Verify reCAPTCHA v3 token on the server
 * @param {string} token - reCAPTCHA token from client
 * @param {number} minScore - Minimum score threshold (0.0 - 1.0, default 0.5)
 * @returns {Promise<{success: boolean, score: number, action: string, error?: string}>}
 */
export async function verifyRecaptcha(token, minScore = 0.5) {
	try {
		const response = await fetch(RECAPTCHA_VERIFY_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
		});

		const data = await response.json();

		if (!data.success) {
			return {
				success: false,
				error: "reCAPTCHA verification failed",
			};
		}

		// Check score threshold
		if (data.score < minScore) {
			return {
				success: false,
				score: data.score,
				error: `Score too low: ${data.score} (minimum: ${minScore})`,
			};
		}

		return {
			success: true,
			score: data.score,
			action: data.action,
			challengeTimestamp: data.challenge_ts,
		};
	} catch (error) {
		console.error("reCAPTCHA verification error:", error);
		return {
			success: false,
			error: error.message,
		};
	}
}
