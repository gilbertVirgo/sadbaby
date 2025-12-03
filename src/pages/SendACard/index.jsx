import { useState, useEffect } from "react";
import {
	useStepNavigation,
	StepTransition,
} from "../../hooks/useStepNavigation.jsx";
import PickCard from "./steps/PickCard";
import WriteMessage from "./steps/WriteMessage";
import Delivery from "./steps/Delivery";
import Confirm from "./steps/Confirm";
import { clearStoredData } from "../../utils/localStorage";

const STORAGE_KEY = "sendACardFormData";
const STEP_KEY = "sendACardStepIndex";

export const clearSendACardData = () => clearStoredData(STORAGE_KEY, STEP_KEY);

export default () => {
	const {
		stepIndex,
		setStepIndex,
		direction,
		setStepSection,
		formData,
		setFormData,
	} = useStepNavigation(STORAGE_KEY, STEP_KEY);

	const [cards, setCards] = useState([]);
	const [cardsLoading, setCardsLoading] = useState(true);
	const [cardsError, setCardsError] = useState(null);

	// Fetch cards on mount
	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch("/.netlify/functions/getCards");
				if (!response.ok) {
					throw new Error("Failed to fetch cards");
				}
				const fetchedCards = await response.json();
				setCards(fetchedCards);
			} catch (err) {
				setCardsError(err.message);
			} finally {
				setCardsLoading(false);
			}
		};

		fetchCards();
	}, []);

	if (cardsLoading) {
		return (
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<p>Loading cards...</p>
				</div>
			</div>
		);
	}

	if (cardsError) {
		return (
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<p>Error loading cards: {cardsError}</p>
				</div>
			</div>
		);
	}

	const steps = [
		<PickCard
			key="step1"
			data={formData}
			setData={setFormData}
			onNext={() => setStepIndex(1)}
			cards={cards}
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
		/>,
	];

	return (
		<StepTransition stepIndex={stepIndex} direction={direction}>
			{steps[stepIndex]}
		</StepTransition>
	);
};
