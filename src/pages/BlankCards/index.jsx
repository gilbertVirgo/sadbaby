import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	useStepNavigation,
	StepTransition,
} from "../../hooks/useStepNavigation.jsx";
import Seo from "../../components/Seo";
import Choose from "./steps/Choose";
import Delivery from "./steps/Delivery";
import Confirm from "./steps/Confirm";
import { clearStoredData } from "../../utils/localStorage";

const STORAGE_KEY = "blankCardsFormData";
const STEP_KEY = "blankCardsStepIndex";

export default () => {
	const location = useLocation();
	const [cards, setCards] = useState([]);
	const [loadingCards, setLoadingCards] = useState(true);

	// Clear stored data immediately when navigating with state (from FullCollection)
	if (location.state?.selectedCardId) {
		clearStoredData(STORAGE_KEY, STEP_KEY);
	}

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch("/.netlify/functions/getCards");
				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(
						`Failed to fetch cards: ${response.status} ${errorText}`
					);
				}
				const data = await response.json();
				setCards(data);
			} catch (err) {
				console.error("Error fetching cards:", err);
			} finally {
				setLoadingCards(false);
			}
		};

		fetchCards();
	}, []);

	const {
		stepIndex,
		setStepIndex,
		direction,
		setStepSection,
		formData,
		setFormData,
	} = useStepNavigation(STORAGE_KEY, STEP_KEY);

	// Pre-fill quantities from location state (from FullCollection page)
	useEffect(() => {
		if (
			location.state?.selectedCardId &&
			!formData.quantities?.[location.state.selectedCardId]
		) {
			setFormData({
				...formData,
				quantities: {
					[location.state.selectedCardId]: 1,
				},
			});
		}
	}, [location.state?.selectedCardId]);

	const steps = [
		<Choose
			key="step1"
			data={formData}
			setData={setFormData}
			onNext={() => setStepIndex(1)}
			cards={cards}
			loadingCards={loadingCards}
		/>,
		<Delivery
			key="step2"
			data={formData}
			setData={setFormData}
			onNext={() => setStepIndex(2)}
			onBack={() => setStepIndex(0)}
		/>,
		<Confirm
			key="step3"
			data={formData}
			setData={setFormData}
			onEditStep={(index, section) => {
				setStepIndex(index);
				setStepSection(section);
			}}
			onNext={() => setStepIndex(3)}
			onBack={() => setStepIndex(1)}
			cards={cards}
			loadingCards={loadingCards}
		/>,
	];

	return (
		<>
			<Seo
				title="Buy Blank Hand-Printed Greeting Cards | Sad Baby"
				description="Shop hand-printed blank lino cards perfect for your own designs. Choose from our collection and get them delivered anywhere in the UK."
				canonical="https://www.sadbaby.cards/blank-cards"
				image="https://denw90a2l8ovn.cloudfront.net/sadbaby-cards-seo.jpg"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Shop Blank Hand-Printed Cards",
					url: "https://www.sadbaby.cards/blank-cards",
					description:
						"Hand-printed blank greeting cards for your custom designs",
				}}
			/>
			<StepTransition stepIndex={stepIndex} direction={direction}>
				{steps[stepIndex]}
			</StepTransition>
		</>
	);
};
