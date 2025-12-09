import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";

const clearStoredData = () => {
	try {
		if (typeof window !== "undefined") {
			// Clear blank cards data
			localStorage.removeItem("blankCardsFormData");
			localStorage.removeItem("blankCardsStepIndex");
			// Clear send a card data
			localStorage.removeItem("sendACardFormData");
			localStorage.removeItem("sendACardStepIndex");
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
};

const saveOrderToDatabase = async (sessionId) => {
	try {
		// Fetch session data from Stripe
		const sessionResponse = await fetch(
			`/.netlify/functions/getStripeSession?session_id=${sessionId}`
		);

		if (!sessionResponse.ok) {
			throw new Error("Failed to retrieve session data");
		}

		const sessionData = await sessionResponse.json();

		const orderType = sessionData.metadata.orderType;
		const formData = JSON.parse(sessionData.metadata.orderData);

		let orderData;

		if (orderType === "send-a-card") {
			orderData = {
				orderType,
				stripeSessionId: sessionId,
				email: formData.email,
				delivery: {
					name: formData.name,
					address1: formData.address1,
					address2: formData.address2,
					city: formData.city,
					postcode: formData.postcode,
					shipping: formData.shipping,
				},
				sendACard: {
					cardId: formData.selectedCardId,
					message: formData.message,
				},
			};
		} else if (orderType === "blank-cards") {
			orderData = {
				orderType,
				stripeSessionId: sessionId,
				email: formData.email,
				delivery: {
					name: formData.name,
					address1: formData.address1,
					address2: formData.address2,
					city: formData.city,
					postcode: formData.postcode,
					shipping: formData.shipping,
				},
				blankCards: {
					selectedCards: formData.quantities,
					totalQuantity: Object.values(
						formData.quantities || {}
					).reduce((sum, qty) => sum + qty, 0),
				},
			};
		} else {
			console.warn("Unknown order type:", orderType);
			return;
		}

		// Send order to backend
		const response = await fetch("/.netlify/functions/createOrder", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderData),
		});

		if (!response.ok) {
			throw new Error("Failed to save order");
		}

		const result = await response.json();
	} catch (error) {
		console.error("Error saving order to database:", error);
		// Don't block the user - they've already paid
	}
};

export default () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get("session_id");

	useEffect(() => {
		// Redirect to home if no session_id present
		if (!sessionId) {
			navigate("/");
			return;
		}

		// Save order to database before clearing localStorage
		saveOrderToDatabase(sessionId).finally(() => {
			// Clear localStorage after saving (or failing to save)
			clearStoredData();
		});
	}, [sessionId, navigate]);

	// Don't render anything if no session_id (will redirect)
	if (!sessionId) {
		return null;
	}

	return (
		<>
			<Seo
				title="Order Confirmed | Sad Baby Greeting Cards"
				description="Thank you! Your greeting card order has been confirmed. Your hand-printed cards will be on their way shortly."
				canonical="https://sadbaby.cards/checkout-success"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Order Confirmed - Sad Baby",
					url: "https://sadbaby.cards/checkout-success",
				}}
			/>
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xxl hz--center talign--center">
					<div className="group-vt gap--lg hz--center">
						<h1>
							You've turned that frown
							<br />
							<em>upside down!</em>
						</h1>
						<svg
							viewBox="0 0 163 128"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="checkout-success__animation"
							role="img"
							aria-label="Happy face animation - order confirmed"
						>
							<g>
								<g>
									<path d="M140.705 64C140.705 32.2676 114.388 6.31449 81.6381 6.31449C48.8887 6.31449 22.5713 32.2676 22.5713 64C22.5713 95.7324 48.8887 121.686 81.6381 121.686V128C45.529 128 16.2568 99.3462 16.2568 64C16.2568 28.6538 45.529 0 81.6381 0C117.747 0 147.019 28.6538 147.019 64C147.019 99.3462 117.747 128 81.6381 128V121.686C114.388 121.686 140.705 95.7324 140.705 64Z"></path>
									<path d="M20.6648 69.788C-4.79099 78.9308 -8.73768 45.8455 20.6648 49.6606L17.5728 61.3029C9.41661 58.343 7.18023 68.7356 17.5728 65.973L20.6648 69.788Z"></path>
									<path d="M4.64184 52.4291C8.02618 49.9942 13.3108 48.6409 20.6727 49.5962L20.7471 49.6058L17.6173 61.3901L17.5497 61.3655C13.4929 59.8933 10.9523 61.7497 10.6814 63.5744C10.5461 64.4856 10.9694 65.4061 12.0694 65.934C13.1737 66.464 14.9645 66.5989 17.5553 65.9103L17.5965 65.8993L17.6233 65.9324L20.7736 69.8194L20.6864 69.8508C14.3105 72.1408 9.27135 71.7899 5.7608 70.0233C2.25004 68.2566 0.275123 65.0769 0.0267286 61.7278C-0.221665 58.3785 1.25693 54.8645 4.64184 52.4291ZM20.5812 49.7172C13.2808 48.7836 8.05693 50.1342 4.71866 52.5359C1.36967 54.9454 -0.0870251 58.416 0.157895 61.7182C0.402848 65.0207 2.35003 68.1596 5.81989 69.9058C9.27401 71.644 14.244 72.0046 20.5544 69.7578L17.5477 66.048C14.9642 66.7283 13.1507 66.5989 12.0123 66.0526C10.8637 65.5013 10.4071 64.5267 10.5514 63.555C10.838 61.6249 13.466 59.7751 17.5269 61.2179L20.5812 49.7172Z"></path>
									<g
										id="mouth"
										style={{ transformOrigin: "77px 95px" }}
									>
										<path d="M63.589 104.126C63.5341 104.203 63.4088 104.17 63.3966 104.076C60.2863 80.2304 100.043 81.6662 90.5268 106.76C90.492 106.852 90.3556 106.854 90.3248 106.761C84.9995 90.6162 75.2152 87.792 63.589 104.126Z"></path>
									</g>
									<path d="M144.125 80.378C170.041 87.0214 167.081 55.3174 146.23 60.3821V69.8538C155.11 66.3019 159.385 78.5531 145.177 76.3657L144.125 80.378Z"></path>
									<path d="M58.6055 70.3802C58.6055 73.8676 55.7785 76.6947 52.2911 76.6947C48.8037 76.6947 45.9766 73.8676 45.9766 70.3802C45.9766 66.8928 48.8037 64.0657 52.2911 64.0657C55.7785 64.0657 58.6055 66.8928 58.6055 70.3802Z"></path>
									<g
										id="right-eye"
										style={{
											transformOrigin:
												"106.885px 76.169px",
										}}
									>
										<path d="M113.199 76.1687C113.199 79.6561 110.372 82.4832 106.885 82.4832C103.397 82.4832 100.57 79.6561 100.57 76.1687C100.57 72.6813 103.397 69.8542 106.885 69.8542C110.372 69.8542 113.199 72.6813 113.199 76.1687Z"></path>
									</g>
									<path d="M50.6443 8.28354C48.3839 10.7666 46.5827 12.0847 51.3255 18.6244C58.2264 26.8627 63.7734 29.2181 73.8837 33.1415C73.9959 33.185 74.0788 33.0325 73.984 32.9584C61.5665 23.2535 56.5947 17.7671 50.8126 8.29982C50.7761 8.24019 50.6913 8.23187 50.6443 8.28354Z"></path>
									<path d="M70.9392 12.8292C68.6788 15.3122 66.8776 16.6304 71.6204 23.1701C78.5214 31.4084 84.0683 33.7637 94.1787 37.6871C94.2908 37.7307 94.3737 37.5781 94.2789 37.504C81.8614 27.7991 76.8897 22.3128 71.1075 12.8455C71.0711 12.7858 70.9862 12.7775 70.9392 12.8292Z"></path>
									<path d="M91.1863 17.3643C88.9258 19.8474 87.1247 21.1655 91.8675 27.7052C98.7684 35.9435 104.315 38.2989 114.426 42.2223C114.538 42.2658 114.621 42.1133 114.526 42.0392C102.108 32.3343 97.1367 26.8479 91.3546 17.3806C91.3181 17.321 91.2333 17.3127 91.1863 17.3643Z"></path>
									<path d="M111.432 21.9002C109.172 24.3833 107.371 25.7014 112.114 32.2411C119.015 40.4794 124.561 42.8348 134.672 46.7582C134.784 46.8017 134.867 46.6492 134.772 46.5751C122.355 36.8702 117.383 31.3838 111.601 21.9165C111.564 21.8569 111.479 21.8486 111.432 21.9002Z"></path>
								</g>
							</g>
						</svg>

						<div className="group-vt gap--xs max-width--xs text-balance">
							<p>
								We’ve received your details and your cards will
								be on their way shortly.
							</p>
							<p>
								You’ll get a <strong>confirmation email</strong>{" "}
								in a moment with everything you need.
							</p>
						</div>
					</div>
					<div className="group-hz gap--sm">
						<a
							href="/send-a-card"
							className="button button--sm fg--dark"
						>
							Send a card{" "}
							<div className="icon icon--plane icon--dark icon--md" />
						</a>
						<a
							href="/blank-cards"
							className="button button--sm fg--dark"
						>
							Shop blank cards{" "}
							<div className="icon icon--bag icon--dark icon--md" />
						</a>
					</div>
				</div>
			</div>
		</>
	);
};
