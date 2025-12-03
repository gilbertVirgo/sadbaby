import { useState, useEffect } from "react";
import {
	useStepNavigation,
	StepTransition,
} from "../../hooks/useStepNavigation.jsx";
import Choose from "./steps/Choose";
import Delivery from "./steps/Delivery";
import Confirm from "./steps/Confirm";

const STORAGE_KEY = "blankCardsFormData";
const STEP_KEY = "blankCardsStepIndex";

export default () => {
	const [cards, setCards] = useState([]);
	const [loadingCards, setLoadingCards] = useState(true);

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
		<StepTransition stepIndex={stepIndex} direction={direction}>
			{steps[stepIndex]}
		</StepTransition>
	);
};
