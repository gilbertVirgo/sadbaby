import { useState, useRef, useEffect } from "react";
import StepNavWrapper from "../StepNavWrapper";
import shippingInfo from "../../../data/shippingInfo";

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

	const updateField = (field, value) => {
		setData({
			...data,
			[field]: value,
		});
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
					<div className="max-width--xs group-vt gap--lg">
						<section className="group-vt gap--xs">
							<div className="group-vt gap--xxs">
								<label>
									Your name{" "}
									<span className="required--asterisk" />
								</label>
								<input
									type="text"
									name="name"
									required
									value={data.name || ""}
									onChange={(e) =>
										updateField("name", e.target.value)
									}
								/>
							</div>
							<div className="group-vt gap--xxs">
								<label>
									Address line 1{" "}
									<span className="required--asterisk" />
								</label>
								<input
									type="text"
									name="address1"
									required
									value={data.address1 || ""}
									onChange={(e) =>
										updateField("address1", e.target.value)
									}
								/>
							</div>
							<div className="group-vt gap--xxs">
								<label>Address line 2</label>
								<input
									type="text"
									name="address2"
									value={data.address2 || ""}
									onChange={(e) =>
										updateField("address2", e.target.value)
									}
								/>
							</div>
							<div className="group-hz gap--sm">
								<div className="group-vt gap--xxs flex-1">
									<label>
										Town / City{" "}
										<span className="required--asterisk" />
									</label>
									<input
										type="text"
										name="city"
										required
										value={data.city || ""}
										onChange={(e) =>
											updateField("city", e.target.value)
										}
									/>
								</div>
								<div className="group-vt gap--xxs flex-1">
									<label>
										Postcode{" "}
										<span className="required--asterisk" />
									</label>
									<input
										type="text"
										name="postcode"
										required
										value={data.postcode || ""}
										onChange={(e) =>
											updateField(
												"postcode",
												e.target.value
											)
										}
									/>
								</div>
							</div>
						</section>
						<section
							className="group-vt gap--xxs"
							id="shipping-section"
						>
							<h4>
								Shipping <span className="required--asterisk" />
							</h4>
							{Object.entries(shippingInfo).map(
								([shippingType, info]) => (
									<div className="group-hz gap--xs vt--center">
										<input
											type="radio"
											name="shipping"
											id={shippingType}
											value={shippingType}
											required
											checked={
												data.shipping === shippingType
											}
											onChange={(e) =>
												updateField(
													"shipping",
													e.target.value
												)
											}
										/>
										<div className="group-vt gap--xxxs">
											<label
												htmlFor="standard"
												style={{ fontWeight: "normal" }}
											>
												{info.title}
											</label>
											<p className="hint">
												{info.description}
											</p>
										</div>
									</div>
								)
							)}
						</section>
						<section className="group-vt gap--xs">
							<div
								className="group-vt gap--xxs"
								id="email-section"
							>
								<label>
									Your email{" "}
									<span className="required--asterisk" />
								</label>
								<input
									type="email"
									name="email"
									required
									value={data.email || ""}
									onChange={(e) =>
										updateField("email", e.target.value)
									}
								/>
								<p className="hint">
									For order confirmation and tracking info
								</p>
							</div>
							<div className="group-hz gap--xs vt--center">
								<input
									type="checkbox"
									name="terms"
									id="terms"
									required
									checked={data.terms || false}
									onChange={(e) =>
										updateField("terms", e.target.checked)
									}
								/>
								<label
									htmlFor="terms"
									style={{ fontWeight: "normal" }}
								>
									I accept the{" "}
									<a
										href="/terms"
										target="_blank"
										rel="noopener noreferrer"
									>
										terms and conditions
									</a>{" "}
									and{" "}
									<a
										href="/privacy"
										target="_blank"
										rel="noopener noreferrer"
									>
										privacy policy
									</a>{" "}
									<span className="required--asterisk" />
								</label>
							</div>
						</section>
					</div>
				</div>
			</div>
			<StepNavWrapper isSticky>
				<div className="group-vt gap--xs hz--end">
					<button
						type="button"
						onClick={onBack}
						className="button button--xs"
					>
						<div className="icon icon--left-arrow icon--dark icon--md" />
						Back: choose
					</button>
				</div>
				<div className="group-vt gap--xxs hz--end">
					<button
						type="submit"
						className="button button--xs"
						disabled={!isValid}
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
