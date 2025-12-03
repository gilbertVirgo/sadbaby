import { useState } from "react";
import StepNavWrapper from "../../BlankCards/StepNavWrapper";
import ConfirmStep from "../../../components/ConfirmStep";

export default ({ data, setData, onBack, onEditStep, cards }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const selectedCard = cards.find((c) => c._id === data.selectedCardId);

	console.log({ data });

	const sections = [
		{
			title: "Your card",
			editStepIndex: 0,
			content: selectedCard ? (
				<div
					style={{
						maxWidth: "200px",
					}}
				>
					<img
						src={selectedCard.imageURL}
						alt={selectedCard.title}
						draggable={false}
						style={{
							width: "100%",
							height: "auto",
						}}
					/>
				</div>
			) : (
				<p>No card selected</p>
			),
		},
		{
			title: "Your message",
			editStepIndex: 1,
			content: (
				<p
					style={{
						whiteSpace: "pre-wrap",
						wordBreak: "break-word",
					}}
				>
					{data.message}
				</p>
			),
		},
	];

	return (
		<ConfirmStep
			data={data}
			sections={sections}
			onBack={onBack}
			onEditStep={onEditStep}
			loading={loading}
			setLoading={setLoading}
			error={error}
			setError={setError}
			checkoutEndpoint="/.netlify/functions/createSendACardCheckout"
			basePrice={4.95}
			headerSubtitle="Review your card, message, and delivery details before we handwrite and post it."
			additionalCheckoutData={{
				message: data.message,
				cardId: data.selectedCardId,
				cardTitle: selectedCard?.title,
			}}
		/>
	);
};
