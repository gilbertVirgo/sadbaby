import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	getStoredData,
	setStoredData,
	getStoredStep,
	setStoredStep,
} from "../utils/localStorage";

export const useStepNavigation = (storageKey, stepKey) => {
	const [stepIndex, setStepIndexInternal] = useState(() =>
		getStoredStep(stepKey)
	);
	const [direction, setDirection] = useState(0);
	const [stepSection, setStepSection] = useState(null);

	const setStepIndex = (newIndex) => {
		setStepIndexInternal((current) => {
			setDirection(newIndex > current ? 1 : -1);
			return newIndex;
		});
	};

	const [formData, setFormData] = useState(() => {
		const saved = getStoredData(storageKey);
		return saved || { shipping: "standard" };
	});

	// Save to localStorage whenever formData changes
	useEffect(() => {
		setStoredData(storageKey, formData);
	}, [formData, storageKey]);

	// Save stepIndex to localStorage whenever it changes
	useEffect(() => {
		setStoredStep(stepKey, stepIndex);
	}, [stepIndex, stepKey]);

	// Handle scrolling on step change
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

	return {
		stepIndex,
		setStepIndex,
		direction,
		stepSection,
		setStepSection,
		formData,
		setFormData,
	};
};

export const StepTransition = ({ stepIndex, direction, children }) => {
	const variants = {
		enter: (direction) => ({
			x: direction > 0 ? 60 : -60,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction) => ({
			x: direction > 0 ? -60 : 60,
			opacity: 0,
		}),
	};

	return (
		<AnimatePresence initial={false} custom={direction} mode="wait">
			<motion.div
				key={stepIndex}
				custom={direction}
				variants={variants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={{
					x: { type: "tween", ease: "easeOut", duration: 0.16 },
					opacity: { duration: 0.16 },
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};
