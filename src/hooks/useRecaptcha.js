import { useEffect } from "react";

export const useRecaptcha = () => {
	useEffect(() => {
		// Load reCAPTCHA script if not already loaded
		if (!window.grecaptcha) {
			const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
			if (siteKey) {
				const script = document.createElement("script");
				script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
				script.async = true;
				script.defer = true;
				document.head.appendChild(script);
			}
		}
	}, []);

	const executeRecaptcha = async (action = "submit") => {
		if (!window.grecaptcha) {
			console.error("reCAPTCHA not loaded");
			return null;
		}

		try {
			const token = await window.grecaptcha.execute(
				import.meta.env.VITE_RECAPTCHA_SITE_KEY,
				{ action }
			);
			return token;
		} catch (error) {
			console.error("reCAPTCHA error:", error);
			return null;
		}
	};

	return { executeRecaptcha };
};
