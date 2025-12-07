import { useRef, useEffect } from "react";
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

	// Animation state: store details of the most recently added card
	const lastAddedRef = useRef(null); // DOM node of the selected card button in step nav
	const animInfoRef = useRef(null); // { cardId, startX, startY, targetIndex }

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

	const handleCardClick = (card, index, e) => {
		// Capture cursor position before state update
		if (totalCards < 4) {
			const currentQty = quantities[card._id] || 0;
			animInfoRef.current = {
				cardId: card._id,
				startX: e.clientX,
				startY: e.clientY,
				targetIndex: currentQty, // the new button will render at this index
			};
		}

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

	// After render, if we have a last-added element and anim info, compute deltas and trigger animation
	useEffect(() => {
		const node = lastAddedRef.current;
		const info = animInfoRef.current;
		if (!node || !info) return;

		const rect = node.getBoundingClientRect();
		const targetCenterX = rect.left + rect.width / 2;
		const targetCenterY = rect.top + rect.height / 2;
		const deltaX = info.startX - targetCenterX;
		const deltaY = info.startY - targetCenterY;

		// Set initial transform without transition
		node.style.transition = "none";
		node.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.5)`;
		node.style.willChange = "transform";

		// Next frame: enable transition and move to final position
		requestAnimationFrame(() => {
			node.style.transition =
				"transform 0.44s cubic-bezier(0.25, 0.8, 0.25, 1)";
			node.style.transform = "translate(0px, 0px) scale(1)";
		});

		// Cleanup anim info so subsequent renders don't retrigger
		animInfoRef.current = null;

		const onEnd = () => {
			node.style.transition = "";
			node.style.transform = "";
			node.style.willChange = "";
			node.removeEventListener("transitionend", onEnd);
			lastAddedRef.current = null;
		};
		node.addEventListener("transitionend", onEnd);
	});

	return (
		<>
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<header className="step__header">
						<h2>Shop blank cards</h2>
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
					<div className="group-hz gap--xxs wrap--xs-down">
						{Object.entries(quantities).map(([cardId, qty]) => {
							let card = cards.find((c) => c._id === cardId);
							if (qty === 0 || !card) return null;

							return Array.from({ length: qty }, (_, index) => (
								<button
									className="blank-cards-choose__selected-card"
									key={`selected-card-${cardId}-${index}`}
									onClick={() => removeCard(card._id)}
									// Attach ref only for the most recent addition
									ref={(el) => {
										const info = animInfoRef.current;
										if (
											el &&
											info &&
											info.cardId === cardId &&
											info.targetIndex === index
										) {
											lastAddedRef.current = el;
										}
									}}
									style={{
										// Initial transform is set dynamically via useEffect
										transition:
											"transform 330ms cubic-bezier(0.25, 0.8, 0.25, 1)",
										willChange: "transform",
									}}
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

			{/* No extra CSS needed; transition is applied inline for reliability */}
		</>
	);
};
