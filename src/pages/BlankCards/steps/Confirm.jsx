import { useState } from "react";
import shippingInfo from "../../../data/shippingInfo";
import StepNavWrapper from "../StepNavWrapper";

export default ({ data, setData, onBack, onEditStep }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const cards = data.cards || [];

	const handleCheckout = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/.netlify/functions/createCheckout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					shipping: data.shipping,
					email: data.email,
					address1: data.address1,
					address2: data.address2,
					city: data.city,
					postcode: data.postcode,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create checkout session");
			}

			const { url } = await response.json();
			window.location.href = url;
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<>
			{" "}
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<header className="step__header">
						<h2>Check everything&apos;s correct</h2>
						<div className="group-vt gap--xs">
							<p
								style={{
									maxWidth: "40ch",
									textWrap: "balance",
								}}
							>
								Review your card, message, and delivery details
								before we print and post it.
							</p>
						</div>
					</header>
					<div className="group-vt  max-width--xs">
						{[
							{
								title: "Your cards",
								editStepIndex: 0,
								content: (
									<div
										style={{
											display: "grid",
											gridTemplateColumns:
												"repeat(2, 1fr)",
											gap: ".5rem",
										}}
									>
										{Object.entries(data.quantities).map(
											([cardId, qty]) => {
												let card = cards.find(
													(c) => c._id === cardId
												);
												if (qty === 0 || !card)
													return null;

												return Array.from(
													{ length: qty },
													(_, index) => (
														<div
															key={`selected-card-${cardId}-${index}`}
														>
															<img
																src={
																	card.imageURL
																}
																alt={card.title}
																draggable={
																	false
																}
															/>
														</div>
													)
												);
											}
										)}
									</div>
								),
							},
							{
								title: "Delivery details",
								editStepIndex: 1,
								content: (
									<p>
										{data.address1}
										<br />
										{data.address2 && (
											<>
												{data.address2}
												<br />
											</>
										)}
										{data.city}
										<br />
										{data.postcode}
									</p>
								),
							},
							{
								title: "Shipping",
								editStepIndex: 1,
								stepSection: "shipping-section",
								content: (
									<p>{shippingInfo[data.shipping].title}</p>
								),
							},
							{
								title: "Your email",
								editStepIndex: 1,
								stepSection: "email-section",
								content: <p>{data.email}</p>,
							},
							{
								title: "Amount due",
								content: (
									<p>
										£
										{(
											7.95 +
											shippingInfo[data.shipping].cost
										).toFixed(2)}
									</p>
								),
							},
						].map((section, index) => (
							<section className="group-hz separator">
								<div className="group-hz gap--xxs vt--start flex-2">
									<h4>{section.title}</h4>{" "}
									{typeof section.editStepIndex !==
										"undefined" && (
										<button
											className="icon icon--pencil icon--md icon--primary"
											onClick={onEditStep.bind(
												null,
												section.editStepIndex,
												section.stepSection || null
											)}
										/>
									)}
								</div>
								<div className="flex-3">{section.content}</div>
							</section>
						))}
					</div>
				</div>
			</div>
			<StepNavWrapper isSticky>
				<div className="group-vt gap--xs hz--end">
					<button
						type="button"
						onClick={onBack}
						className="button button--xs"
					>
						<div className="icon icon--left-arrow icon--dark icon--md" />
						Back: delivery
					</button>
				</div>
				<div className="group-vt gap--xxs hz--end">
					<button
						type="button"
						onClick={handleCheckout}
						className="button button--xs"
						disabled={loading}
					>
						{loading ? "Loading..." : "Next: checkout"}
						<div className="icon icon--right-arrow icon--dark icon--md" />
					</button>
					{error && <p className="hint fg--primary">{error}</p>}
				</div>
			</StepNavWrapper>
		</>
	);
};
