import { useState, useRef, useEffect } from "react";
import StepNavWrapper from "../StepNavWrapper";
import DeliveryForm from "../../../components/DeliveryForm";

export default ({ data, setData, onBack, onNext }) => {
	const [isValid, setIsValid] = useState(false);
	const formRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		onNext();
	};

	const checkValidity = () => {
		if (formRef.current) {
			setIsValid(formRef.current.checkValidity());
		}
	};

	// Check validity on mount and when data changes
	useEffect(() => {
		checkValidity();
	}, [data]);

	return (
		<form ref={formRef} onSubmit={handleSubmit} onChange={checkValidity}>
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<header className="step__header">
						<h2>Where to?</h2>
						<p>
							We&apos;ll deliver anywhere in the UK at no extra
							cost.
							<br />
							Fill in your details below and we&apos;ll take care
							of the rest.
						</p>
					</header>
					<DeliveryForm
						data={data}
						setData={setData}
						labels={{ name: "Your name" }}
					/>
				</div>
			</div>
			<StepNavWrapper isSticky>
				<div className="group-vt gap--xs">
					<button
						type="button"
						onClick={onBack}
						className="button button--xs fg--dark"
					>
						<div className="icon icon--left-arrow icon--dark icon--md" />
						Back: choose
					</button>
				</div>
				<div className="group-vt gap--xxs">
					<button
						type="submit"
						className="button button--xs fg--dark"
						disabled={!isValid}
						style={{ alignSelf: "flex-end" }}
					>
						Next: confirm
						<div className="icon icon--right-arrow icon--dark icon--md" />
					</button>
					{!isValid ? (
						<p className="hint">
							Please fill out all required (
							<span className="required--asterisk" />) fields to
							proceed.
						</p>
					) : null}
				</div>
			</StepNavWrapper>
		</form>
	);
};
