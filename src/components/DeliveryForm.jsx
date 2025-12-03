import { useState } from "react";
import shippingInfo from "../data/shippingInfo";

export default ({ data, setData, labels = {} }) => {
	const defaultLabels = {
		name: "Recipient name",
		...labels,
	};

	const updateField = (field, value) => {
		setData({
			...data,
			[field]: value,
		});
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
								Postcode <span className="required--asterisk" />
							</label>
							<input
								type="text"
								name="postcode"
								required
								value={data.postcode || ""}
								onChange={(e) =>
									updateField("postcode", e.target.value)
								}
							/>
						</div>
					</div>
				</section>
				<section className="group-vt gap--xxs" id="shipping-section">
					<h4>
						Shipping <span className="required--asterisk" />
					</h4>
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
									onChange={(e) =>
										updateField("shipping", e.target.value)
									}
								/>
								<div className="group-vt gap--xxxs">
									<label
										htmlFor={shippingType}
										style={{ fontWeight: "normal" }}
									>
										{info.title}
									</label>
									<p className="hint">{info.description}</p>
								</div>
							</div>
						)
					)}
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
							value={data.email || ""}
							onChange={(e) =>
								updateField("email", e.target.value)
							}
						/>
						<p className="hint">
							We&apos;ll send order confirmation to this email
							address.
						</p>
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
							onChange={(e) =>
								updateField("terms", e.target.checked)
							}
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
