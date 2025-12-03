import { useState, useEffect } from "react";

export default ({
	onCardSelect,
	selectedCards,
	mode = "single",
	maxCards = 1,
	cards = [],
	loadingCards = false,
}) => {
	const [loading, setLoading] = useState(loadingCards);
	const [imagesLoaded, setImagesLoaded] = useState(0);

	// Update loading state when cards prop changes
	useEffect(() => {
		setLoading(loadingCards);
	}, [loadingCards]);

	useEffect(() => {
		if (cards.length > 0 && imagesLoaded === cards.length) {
			setLoading(false);
		}
	}, [imagesLoaded, cards.length]);

	const handleImageLoad = () => {
		setImagesLoaded((prev) => prev + 1);
	};

	return (
		<>
			{loading && (
				<div style={{ position: "absolute", left: "-9999px" }}>
					{cards.map((card) => (
						<img
							key={card._id}
							src={card.imageURL}
							alt=""
							onLoad={handleImageLoad}
						/>
					))}
				</div>
			)}
			<div
				className="blank-cards-choose__grid"
				style={{
					opacity: loading ? 0.5 : 1,
					transition: "opacity 0.3s ease",
				}}
			>
				{loading
					? Array.from({ length: 8 }, (_, index) => (
							<div
								key={index}
								className="blank-cards-choose__card-skeleton"
							/>
					  ))
					: cards.map((card, index) => (
							<div
								key={index}
								className="blank-cards-choose__card group-vt gap--xs talign--center"
								style={{
									animation: `fade-in 0.22s ease-in-out`,
									animationDelay: `${index * 0.11}s`,
									animationFillMode: "both",
									opacity: 0,
									transformOrigin: "center center",
								}}
							>
								{mode === "single" ? (
									<button
										className={`blank-cards-choose__button ${
											selectedCards === card._id
												? "blank-cards-choose__button--selected"
												: ""
										}`}
										onClick={() => onCardSelect(card)}
									>
										{selectedCards === card._id && (
											<span className="blank-cards-chooose__quantity-indicator contains-non-zero-value">
												<div className="icon icon--tick icon--light icon--sm" />
											</span>
										)}
										<img
											src={card.imageURL}
											alt={card.title}
											draggable={false}
										/>
									</button>
								) : (
									<button
										className={`blank-cards-choose__button ${
											selectedCards[card._id] > 0
												? "blank-cards-choose__button--selected"
												: ""
										}`}
										onClick={() =>
											onCardSelect(card, index)
										}
									>
										{(selectedCards[card._id] || 0) > 0 && (
											<span
												className={`blank-cards-chooose__quantity-indicator contains-non-zero-value`}
											>
												{selectedCards[card._id] ||
													null}
											</span>
										)}
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
												{(selectedCards[card._id] ||
													0) > 0
													? "Want to remove this card? Use the bar below."
													: "Want to add this card? Remove one using the bar below."}
											</p>
										</div>
									</button>
								)}
								<h4>{card.title}</h4>
								{mode === "multiple" && (
									<input
										type="number"
										name={`card-${card._id}`}
										value={selectedCards[card._id] || 0}
										readOnly
									/>
								)}
							</div>
					  ))}
			</div>
		</>
	);
};
