import { useCallback, useEffect, useRef } from "react";
import StepNavWrapper from "../../BlankCards/StepNavWrapper";
import CardGrid from "../../../components/CardGrid";

export default ({
	data,
	setData,
	onNext,
	cards = [],
	loadingCards = false,
}) => {
	const selectedCardId = data.selectedCardId || null;
	const justSelectedRef = useRef(false);

	const handleCardSelect = (card) => {
		setData({
			...data,
			selectedCardId: card._id,
		});
		justSelectedRef.current = true;
	};

	// Auto-advance only after fresh selection, not on re-render with pre-selected card
	useEffect(() => {
		if (selectedCardId && justSelectedRef.current) {
			justSelectedRef.current = false;
			const timer = setTimeout(() => {
				onNext();
			}, 330); // 0.33 seconds

			return () => clearTimeout(timer);
		}
	}, [selectedCardId, onNext]);

	return (
		<>
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<header className="step__header">
						<h2>Pick the perfect card</h2>
						<div className="group-vt gap--xs">
							<p>£4.95 • Free UK delivery</p>
							<p>
								Browse our collection and find the card that
								says it best.
							</p>
						</div>
					</header>
					<CardGrid
						mode="single"
						selectedCards={selectedCardId}
						onCardSelect={handleCardSelect}
						cards={cards}
						loadingCards={loadingCards}
					/>
				</div>
			</div>
			<StepNavWrapper isSticky>
				<div></div>
				<div className="group-vt gap--xxs hz--end">
					<button
						onClick={onNext}
						className="button button--xs fg--dark"
						disabled={!selectedCardId}
					>
						Next: write message
						<div className="icon icon--right-arrow icon--dark icon--md" />
					</button>
					{!selectedCardId && (
						<p className="hint">Please select a card to proceed.</p>
					)}
				</div>
			</StepNavWrapper>
		</>
	);
};
