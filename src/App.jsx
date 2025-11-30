import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import BlankCards from "./pages/BlankCards";
import SendACard from "./pages/SendACard";
import NotFound from "./pages/404";
import Nav from "./static/Nav";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/blank-cards" element={<BlankCards />} />
				<Route path="/send-a-card" element={<SendACard />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="/checkout-success" element={<CheckoutSuccess />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<footer className="wrapper footer__wrapper fg--dark">
				<div className="footer__container container container--lg group-vt gap--lg hz--center talign--center">
					<div className="group-vt gap--xs">
						<p>
							© Sad Baby 2025 — Hand-printed cards by Gil & Lucy
							in East London.
						</p>
						<p>
							<em>Hand-printed, simple, sustainable.</em>
						</p>
					</div>
					<a
						className="group-hz gap--xxs vt--center"
						href="https://www.instagram.com/sadbaby.cards"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="icon icon--instagram icon--md icon--dark" />
						<span>sadbaby.cards</span>
					</a>
				</div>
			</footer>
		</BrowserRouter>
	);
}

export default App;
