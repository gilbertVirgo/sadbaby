import { useState, useCallback } from "react";
import StepNavWrapper from "../StepNavWrapper";
import CardGrid from "../../../components/CardGrid";

export default ({
	data,
	setData,
	onNext,
	cards = [],
	loadingCards = false,
}) => {
	const quantities = data.quantities || {};

	const totalCards = Object.values(quantities).reduce(
		(sum, qty) => sum + qty,
		0
	);

	const addCard = (cardId) => {
		if (totalCards >= 4) return;

		const currentQty = quantities[cardId] || 0;
		setData({
			...data,
			quantities: {
				...quantities,
				[cardId]: currentQty + 1,
			},
		});
	};

	const removeCard = (cardId) => {
		const currentQty = quantities[cardId] || 0;
		if (currentQty > 0) {
			setData({
				...data,
				quantities: {
					...quantities,
					[cardId]: currentQty - 1,
				},
			});
		}
	};

	const handleCardClick = (card, index) => {
		addCard(card._id);

		const currentQty = quantities[card._id] || 0;

		// Show hint if card wasn't added or was already selected
		if ((currentQty === 0 && totalCards >= 4) || currentQty > 0) {
			let hintEl = document.getElementById(
				`remove-card-hint-${card._id}`
			);

			hintEl.classList.remove("hint--show");
			void hintEl.offsetWidth;
			hintEl.classList.add("hint--show");

			setTimeout(() => {
				hintEl.classList.remove("hint--show");
			}, 3000);
		}
	};

	return (
		<>
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<header className="step__header">
						<h2>Choose four favourites</h2>
						<div className="group-vt gap--xs">
							<p>
								Choose yourself any four designs from our
								collection.
							</p>
							<p>£7.95 • Free UK delivery</p>
						</div>
					</header>
					<CardGrid
						mode="multiple"
						selectedCards={quantities}
						onCardSelect={handleCardClick}
						maxCards={4}
						cards={cards}
						loadingCards={loadingCards}
					/>
				</div>
			</div>
			<StepNavWrapper isSticky>
				<div className="group-vt gap--xxs hz--start talign--center">
					<div className="group-hz gap--xxs">
						{Object.entries(quantities).map(([cardId, qty]) => {
							let card = cards.find((c) => c._id === cardId);
							if (qty === 0 || !card) return null;

							return Array.from({ length: qty }, (_, index) => (
								<button
									className="blank-cards-choose__selected-card"
									key={`selected-card-${cardId}-${index}`}
									onClick={() => removeCard(card._id)}
								>
									<div className="blank-cards-choose__selected-card-icon-wrapper">
										<span className="icon icon--sm icon--light" />
									</div>

									<img
										src={card.imageURL}
										alt={card.title}
										draggable={false}
									/>
								</button>
							));
						})}
					</div>
					<p className="hint">{totalCards}/4 selected</p>
				</div>

				<div className="group-vt gap--xxs hz--end">
					<button
						onClick={() => {
							totalCards === 4 && onNext();
						}}
						className="button button--xs fg--dark"
						disabled={totalCards !== 4}
					>
						Next: delivery
						<div className="icon icon--right-arrow icon--dark icon--md" />
					</button>
					{totalCards < 4 ? (
						<p className="hint">
							Please select four cards to proceed.
						</p>
					) : null}
				</div>
			</StepNavWrapper>
		</>
	);
};
