import { useState } from "react";
import StepNavWrapper from "../StepNavWrapper";
import ConfirmStep from "../../../components/ConfirmStep";

export default ({
	data,
	setData,
	onBack,
	onEditStep,
	cards = [],
	loadingCards = false,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const sections = [
		{
			title: "Your cards",
			editStepIndex: 0,
			content: (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: ".5rem",
					}}
				>
					{Object.entries(data.quantities).map(([cardId, qty]) => {
						let card = cards.find((c) => c._id === cardId);
						if (qty === 0 || !card) return null;

						return Array.from({ length: qty }, (_, index) => (
							<div key={`selected-card-${cardId}-${index}`}>
								<img
									src={card.imageURL}
									alt={card.title}
									draggable={false}
								/>
							</div>
						));
					})}
				</div>
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
			checkoutEndpoint="/.netlify/functions/createBlankCardsCheckout"
			basePrice={7.95}
			headerSubtitle="Review your card, message, and delivery details before we print and post it."
		/>
	);
};
