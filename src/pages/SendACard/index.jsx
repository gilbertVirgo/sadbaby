import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	useStepNavigation,
	StepTransition,
} from "../../hooks/useStepNavigation.jsx";
import Seo from "../../components/Seo";
import PickCard from "./steps/PickCard";
import WriteMessage from "./steps/WriteMessage";
import Delivery from "./steps/Delivery";
import Confirm from "./steps/Confirm";
import { clearStoredData } from "../../utils/localStorage";

const STORAGE_KEY = "sendACardFormData";
const STEP_KEY = "sendACardStepIndex";

export const clearSendACardData = () => clearStoredData(STORAGE_KEY, STEP_KEY);

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

	// Pre-fill selectedCardId from location state (from FullCollection page)
	useEffect(() => {
		if (location.state?.selectedCardId && !formData.selectedCardId) {
			setFormData({
				...formData,
				selectedCardId: location.state.selectedCardId,
			});
		}
	}, [location.state?.selectedCardId]);

	const steps = [
		<PickCard
			key="step1"
			data={formData}
			setData={setFormData}
			onNext={() => setStepIndex(1)}
			cards={cards}
			loadingCards={loadingCards}
		/>,
		<WriteMessage
			key="step2"
			data={formData}
			setData={setFormData}
			onNext={() => setStepIndex(2)}
			onBack={() => setStepIndex(0)}
		/>,
		<Delivery
			key="step3"
			data={formData}
			setData={setFormData}
			onNext={() => setStepIndex(3)}
			onBack={() => setStepIndex(1)}
		/>,
		<Confirm
			key="step4"
			data={formData}
			setData={setFormData}
			onEditStep={(index, section) => {
				setStepIndex(index);
				setStepSection(section);
			}}
			onBack={() => setStepIndex(2)}
			cards={cards}
			loadingCards={loadingCards}
		/>,
	];

	return (
		<>
			<Seo
				title="Send a Personalized Hand-Printed Greeting Card | Baby Sad"
				description="Send hand-printed greeting cards with a personalized message directly to your recipient in the UK. Choose from our collection and we'll deliver it for you."
				canonical="https://sadbaby.cards/send-a-card"
				image="https://denw90a2l8ovn.cloudfront.net/sadbaby-cards-seo.jpg"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Send a Personalized Greeting Card",
					url: "https://sadbaby.cards/send-a-card",
					description:
						"Create and send a hand-printed greeting card with a personalized message",
				}}
			/>
			<StepTransition stepIndex={stepIndex} direction={direction}>
				{steps[stepIndex]}
			</StepTransition>
		</>
	);
};
