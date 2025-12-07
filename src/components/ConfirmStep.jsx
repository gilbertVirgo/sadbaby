import { useState } from "react";
import { useShippingInfo } from "../hooks/useShippingInfo";
import StepNavWrapper from "../pages/BlankCards/StepNavWrapper";

export default ({
	data,
	onBack,
	onEditStep,
	sections,
	checkoutEndpoint,
	basePrice,
	backLabel = "delivery",
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { shippingInfo } = useShippingInfo();

	const handleCheckout = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(checkoutEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
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
								Review your order details before completing your
								purchase.
							</p>
						</div>
					</header>
					<div className="group-vt max-width--xs">
						{[
							...sections,
							{
								title: "Delivery details",
								editStepIndex: sections.length,
								content: (
									<p>
										{data.name}
										<br />
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
								editStepIndex: sections.length,
								stepSection: "shipping-section",
								content: (() => {
									const shipping = Object.values(
										shippingInfo || {}
									).find((s) => s._id === data.shipping);
									return (
										<p>{shipping?.title || "Loading..."}</p>
									);
								})(),
							},
							{
								title: "Your email",
								editStepIndex: sections.length,
								stepSection: "email-section",
								content: <p>{data.email}</p>,
							},
							{
								title: "Amount due",
								content: (() => {
									const shipping = Object.values(
										shippingInfo || {}
									).find((s) => s._id === data.shipping);
									const shippingCost = shipping?.cost || 0;
									return (
										<p>
											£
											{(basePrice + shippingCost).toFixed(
												2
											)}
										</p>
									);
								})(),
							},
						].map((section, index) => (
							<section key={index} className="group-hz separator">
								<div className="group-hz gap--xxs vt--start flex-2">
									<h4>{section.title}</h4>
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
				<div className="group-vt gap--xs hz--start">
					<button
						type="button"
						onClick={onBack}
						className="button button--xs"
					>
						<div className="icon icon--left-arrow icon--dark icon--md" />
						Back: {backLabel}
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
