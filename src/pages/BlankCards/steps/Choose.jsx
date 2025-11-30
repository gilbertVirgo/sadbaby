import { useState, useEffect } from "react";
import StepNavWrapper from "../StepNavWrapper";

export default ({ data, setData, onNext }) => {
	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const quantities = data.quantities || {};

	const totalCards = Object.values(quantities).reduce(
		(sum, qty) => sum + qty,
		0
	);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch("/.netlify/functions/getCards");
				if (!response.ok) {
					throw new Error("Failed to fetch cards");
				}
				const fetchedCards = await response.json();
				setCards(fetchedCards);
				// Save cards to data so they're available in other steps
				setData({
					...data,
					cards: fetchedCards,
				});
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, []);

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

	if (loading) {
		return (
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<p>Loading cards...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<p>Error loading cards: {error}</p>
				</div>
			</div>
		);
	}

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
					<div className="blank-cards-choose__grid">
						{cards.map((card, index) => {
							return (
								<div
									key={index}
									className="blank-cards-choose__card group-vt gap--xs talign--center"
								>
									<button
										className="blank-cards-choose__button"
										onClick={() => {
											addCard(card._id);

											if (
												quantities[card._id] === 0 ||
												typeof quantities[card._id] ===
													"undefined"
											)
												return;

											let hintEl =
												document.getElementById(
													`remove-card-hint-${card._id}`
												);

											hintEl.classList.remove(
												"hint--show"
											);
											void hintEl.offsetWidth;
											hintEl.classList.add("hint--show");

											setTimeout(() => {
												hintEl.classList.remove(
													"hint--show"
												);
											}, 3000);
										}}
									>
										<span
											className={`blank-cards-chooose__quantity-indicator ${
												quantities[card._id] > 0
													? "contains-non-zero-value"
													: ""
											}`}
										>
											{quantities[card._id] || null}
										</span>
										<img
											src={card.imageURL}
											alt={card.title}
											draggable={false}
										/>

										<div
											id={`remove-card-hint-${card._id}`}
											className={`blank-cards-choose__remove-card-hint`}
										>
											<p>
												Want to remove this card? Use
												the bar below.
											</p>
										</div>
									</button>
									<h4>{card.title}</h4>
									<input
										type="number"
										name={`card-${card._id}`}
										value={quantities[card._id] || 0}
										readOnly
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<StepNavWrapper isSticky>
				<div className="group-vt gap--xxs hz--start talign--center">
					<div className="group-hz gap--xxs">
						{Object.entries(quantities).map(([cardId, qty]) => {
							let card = cards.find((c) => c._id === cardId);
							if (qty === 0 || !card) return null;

							console.log({ cardId, qty });

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
						className="button button--xs"
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
