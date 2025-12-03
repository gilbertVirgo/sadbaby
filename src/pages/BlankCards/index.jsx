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
		/>,
	];

	return (
		<StepTransition stepIndex={stepIndex} direction={direction}>
			{steps[stepIndex]}
		</StepTransition>
	);
};
