import { useState } from "react";
import shippingInfo from "../data/shippingInfo";
import { validateField, validateDeliveryForm } from "../utils/formValidation";

export default ({ data, setData, labels = {} }) => {
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const defaultLabels = {
		name: "Recipient name",
		...labels,
	};

	const updateField = (field, value) => {
		setData({
			...data,
			[field]: value,
		});

		// Validate field if it has been touched
		if (touched[field]) {
			const error = validateField(field, value, {
				...data,
				[field]: value,
			});
			setErrors({
				...errors,
				[field]: error,
			});
		}
	};

	const handleBlur = (field) => {
		setTouched({
			...touched,
			[field]: true,
		});

		// Validate on blur
		const error = validateField(field, data[field], data);
		setErrors({
			...errors,
			[field]: error,
		});
	};

	const getFieldClassName = (field) => {
		if (touched[field] && errors[field]) {
			return "error";
		}
		return "";
	};

	return (
		<div>
			<div className="max-width--xs group-vt gap--lg">
				<section className="group-vt gap--xs">
					<div className="group-vt gap--xxs">
						<label>
							{defaultLabels.name}{" "}
							<span className="required--asterisk" />
						</label>
						<input
							type="text"
							name="name"
							required
							className={getFieldClassName("name")}
							value={data.name || ""}
							onChange={(e) =>
								updateField("name", e.target.value)
							}
							onBlur={() => handleBlur("name")}
						/>
						{touched.name && errors.name && (
							<p className="fg--primary hint">{errors.name}</p>
						)}
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
							className={getFieldClassName("address1")}
							value={data.address1 || ""}
							onChange={(e) =>
								updateField("address1", e.target.value)
							}
							onBlur={() => handleBlur("address1")}
						/>
						{touched.address1 && errors.address1 && (
							<p className="fg--primary hint">
								{errors.address1}
							</p>
						)}
					</div>
					<div className="group-vt gap--xxs">
						<label>Address line 2</label>
						<input
							type="text"
							name="address2"
							className={getFieldClassName("address2")}
							value={data.address2 || ""}
							onChange={(e) =>
								updateField("address2", e.target.value)
							}
							onBlur={() => handleBlur("address2")}
						/>
						{touched.address2 && errors.address2 && (
							<p className="fg--primary hint">
								{errors.address2}
							</p>
						)}
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
								className={getFieldClassName("city")}
								value={data.city || ""}
								onChange={(e) =>
									updateField("city", e.target.value)
								}
								onBlur={() => handleBlur("city")}
							/>
							{touched.city && errors.city && (
								<p className="fg--primary hint">
									{errors.city}
								</p>
							)}
						</div>
						<div className="group-vt gap--xxs flex-1">
							<label>
								Postcode <span className="required--asterisk" />
							</label>
							<input
								type="text"
								name="postcode"
								required
								className={getFieldClassName("postcode")}
								value={data.postcode || ""}
								onChange={(e) =>
									updateField(
										"postcode",
										e.target.value.toUpperCase()
									)
								}
								onBlur={() => handleBlur("postcode")}
							/>
							{touched.postcode && errors.postcode && (
								<p className="error-message hint fg--primary">
									{errors.postcode}
								</p>
							)}
						</div>
					</div>
				</section>
				<section className="group-vt gap--xxs" id="shipping-section">
					<h4>
						Shipping <span className="required--asterisk" />
					</h4>
					<div className="group-vt gap--xxs">
						{Object.entries(shippingInfo).map(
							([shippingType, info]) => (
								<div
									key={shippingType}
									className="group-hz gap--xs vt--center"
								>
									<input
										type="radio"
										name="shipping"
										id={shippingType}
										value={shippingType}
										required
										checked={data.shipping === shippingType}
										onChange={(e) => {
											updateField(
												"shipping",
												e.target.value
											);
											handleBlur("shipping");
										}}
									/>
									<div className="group-vt gap--xxxs">
										<label
											htmlFor={shippingType}
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
					</div>
				</section>
				<section className="group-vt gap--xxs" id="email-section">
					<div className="group-vt gap--xxs">
						<label>
							Your email <span className="required--asterisk" />
						</label>
						<input
							type="email"
							name="email"
							required
							className={getFieldClassName("email")}
							value={data.email || ""}
							onChange={(e) =>
								updateField("email", e.target.value)
							}
							onBlur={() => handleBlur("email")}
						/>
						{touched.email && errors.email ? (
							<p className="hint fg--primary">{errors.email}</p>
						) : (
							<p className="hint">
								We&apos;ll send order confirmation to this email
								address.
							</p>
						)}
					</div>
				</section>
				<section className="group-vt gap--xxs">
					<div className="group-hz gap--xs vt--center">
						<input
							type="checkbox"
							name="terms"
							id="terms"
							required
							checked={data.terms || false}
							onChange={(e) => {
								updateField("terms", e.target.checked);
								handleBlur("terms");
							}}
						/>
						<label htmlFor="terms" style={{ fontWeight: "normal" }}>
							I agree to the{" "}
							<a href="/terms" target="_blank">
								terms and conditions
							</a>{" "}
							and the{" "}
							<a href="/privacy" target="_blank">
								privacy policy
							</a>
							. <span className="required--asterisk" />
						</label>
					</div>
				</section>
			</div>
		</div>
	);
};
