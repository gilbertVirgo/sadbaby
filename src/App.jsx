import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import BlankCards from "./pages/BlankCards";
import SendACard from "./pages/SendACard";
import NotFound from "./pages/404";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/blank-cards" element={<BlankCards />} />
				<Route path="/send-a-card" element={<SendACard />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
