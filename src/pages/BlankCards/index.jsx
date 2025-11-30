import { useState, useEffect } from "react";
import Choose from "./steps/Choose";
import Delivery from "./steps/Delivery";
import Confirm from "./steps/Confirm";

const STORAGE_KEY = "blankCardsFormData";
const STEP_KEY = "blankCardsStepIndex";

// Helper functions to safely access localStorage
const getStoredData = () => {
	try {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				return JSON.parse(saved);
			}
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
	return null;
};

const setStoredData = (data) => {
	try {
		if (typeof window !== "undefined") {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
};

const getStoredStep = () => {
	try {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(STEP_KEY);
			if (saved) {
				return parseInt(saved, 10);
			}
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
	return 0;
};

const setStoredStep = (step) => {
	try {
		if (typeof window !== "undefined") {
			localStorage.setItem(STEP_KEY, step.toString());
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
};

const clearStoredData = () => {
	try {
		if (typeof window !== "undefined") {
			localStorage.removeItem(STORAGE_KEY);
			localStorage.removeItem(STEP_KEY);
		}
	} catch (e) {
		console.warn("localStorage access denied:", e);
	}
};

export default () => {
	const [stepIndex, setStepIndex] = useState(() => getStoredStep());
	const [stepSection, setStepSection] = useState(null);

	// Load saved data from localStorage on mount
	const [formData, setFormData] = useState(() => {
		const saved = getStoredData();
		return saved || { shipping: "standard" };
	});

	// Save to localStorage whenever formData changes
	useEffect(() => {
		setStoredData(formData);
	}, [formData]);

	// Save stepIndex to localStorage whenever it changes
	useEffect(() => {
		setStoredStep(stepIndex);
	}, [stepIndex]);

	useEffect(() => {
		if (!stepSection) {
			window.scrollTo(0, 0);
		} else {
			const sectionElement = document.getElementById(stepSection);
			if (sectionElement) {
				sectionElement.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [stepIndex, stepSection]);

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

	return steps[stepIndex];
};
