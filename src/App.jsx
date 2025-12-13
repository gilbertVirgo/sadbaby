import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import BlankCards from "./pages/BlankCards";
import SendACard from "./pages/SendACard";
import FullCollection from "./pages/FullCollection";
import NotFound from "./pages/404";
import Nav from "./static/Nav";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { clearStoredData } from "./utils/localStorage";
import Footer from "./static/Footer";

function RecaptchaLoader() {
	useEffect(() => {
		const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

		if (!siteKey) {
			console.warn(
				"reCAPTCHA site key not found in environment variables"
			);
			return;
		}

		// Check if script is already loaded
		if (window.grecaptcha) {
			console.log("reCAPTCHA already loaded");
			return;
		}

		// Check if script tag already exists
		if (document.querySelector('script[src*="recaptcha/api.js"]')) {
			return;
		}

		// Load reCAPTCHA script
		const script = document.createElement("script");
		script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
		script.async = true;
		script.defer = true;

		script.onload = () => {
			console.log("reCAPTCHA script loaded successfully");
		};

		script.onerror = () => {
			console.error("Failed to load reCAPTCHA script");
		};

		document.head.appendChild(script);
	}, []);

	return null;
}

function RouteChangeListener() {
	const location = useLocation();

	useEffect(() => {
		const path = location.pathname;

		// If we're not on send-a-card or checkout-success, clear send-a-card data
		if (
			!path.includes("send-a-card") &&
			!path.includes("checkout-success")
		) {
			clearStoredData("sendACardFormData", "sendACardStepIndex");
		}

		// If we're not on blank-cards or checkout-success, clear blank-cards data
		if (
			!path.includes("blank-cards") &&
			!path.includes("checkout-success")
		) {
			clearStoredData("blankCardsFormData", "blankCardsStepIndex");
		}
	}, [location.pathname]);

	return null;
}

function App() {
	return (
		<BrowserRouter>
			<RecaptchaLoader />
			<RouteChangeListener />
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/collection" element={<FullCollection />} />
				<Route path="/blank-cards" element={<BlankCards />} />
				<Route path="/send-a-card" element={<SendACard />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="/checkout-success" element={<CheckoutSuccess />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
