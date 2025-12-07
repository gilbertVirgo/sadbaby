import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import CardGrid from "../components/CardGrid";
import { FadeInView } from "../components/FadeInView";

export default () => {
	const [cards, setCards] = useState([]);
	const [loadingCards, setLoadingCards] = useState(true);
	const [offcanvasOpen, setOffcanvasOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch("/.netlify/functions/getCards");
				if (!response.ok) {
					throw new Error("Failed to fetch cards");
				}
				const data = await response.json();
				setCards(data);
				console.log(`Successfully fetched ${data.length} cards`);
			} catch (error) {
				console.error("Error fetching cards:", error);
				setCards([]);
			} finally {
				setLoadingCards(false);
			}
		};

		fetchCards();
	}, []);

	useEffect(() => {
		// Manage body overflow and transform when offcanvas opens/closes
		if (offcanvasOpen) {
			document.body.style.overflow = "hidden";
			document.body.classList.add("offcanvas--open");
		} else {
			document.body.style.overflow = "";
			document.body.classList.remove("offcanvas--open");
		}

		return () => {
			document.body.style.overflow = "";
			document.body.classList.remove("offcanvas--open");
		};
	}, [offcanvasOpen]);

	const handleCardClick = (card) => {
		// Open offcanvas with selected card
		setSelectedCard(card);
		setOffcanvasOpen(true);
	};

	const handleOffcanvasBackdropClick = (e) => {
		// Close offcanvas if clicking the wrapper (backdrop), not the container
		if (e.target === e.currentTarget) {
			setOffcanvasOpen(false);
		}
	};

	return (
		<>
			<Seo
				title="Full Card Collection"
				description="Discover every card in our growing collection — hand-printed, lovingly designed greeting cards. Find the perfect card for any occasion."
				canonical="https://www.sadbaby.co.uk/collection"
				image="https://denw90a2l8ovn.cloudfront.net/sadbaby-cards-seo.jpg"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					name: "Full Card Collection",
					url: "https://www.sadbaby.co.uk/collection",
					description:
						"Hand-printed greeting cards for every occasion",
				}}
			/>
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<div className="group-vt gap--md hz--center">
						<header className="step__header">
							<h1>Our Full Collection</h1>
							<div className="group-vt gap--sm max-width--xs text-balance">
								<p>
									Discover our full collection of hand-printed
									cards, ready to brighten someone’s day.
								</p>

								<p>
									Click a card to send it directly or add it
									to a pack — perfect for any hello, special
									occasion, or just because.
								</p>
							</div>
						</header>
					</div>
					<CardGrid
						mode="single"
						selectedCards={offcanvasOpen ? selectedCard?._id : null}
						onCardSelect={handleCardClick}
						cards={cards}
						loadingCards={loadingCards}
					/>{" "}
					<div
						className="offcanvas__backdrop"
						onClick={handleOffcanvasBackdropClick}
					/>
					<div className="offcanvas__wrapper group-vt gap--sm">
						{selectedCard && (
							<>
								<div className="offcanvas__title-image group-vt gap--xxs">
									<h3>{selectedCard.title}</h3>
									<img
										src={selectedCard.imageURL}
										alt={`${selectedCard.title} card preview`}
									/>
								</div>
								<div className="offcanvas__button-group group-vt gap--xxs">
									<button
										onClick={() =>
											navigate("/send-a-card", {
												state: {
													selectedCardId:
														selectedCard._id,
												},
											})
										}
										className="button button--sm"
									>
										Send this card{" "}
										<div className="icon icon--plane icon--dark icon--sm" />
									</button>
									<button
										onClick={() =>
											navigate("/blank-cards", {
												state: {
													selectedCardId:
														selectedCard._id,
												},
											})
										}
										className="button button--sm"
									>
										Add to pack{" "}
										<div className="icon icon--bag icon--dark icon--sm" />
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
