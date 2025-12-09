import Seo from "../components/Seo";

export default () => {
	return (
		<>
			<Seo
				title="Terms & Conditions"
				description="Read the Terms & Conditions for purchasing greeting cards from Baby Sad. Learn about our policies and responsibilities."
				canonical="https://babysad.cards/terms"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Terms & Conditions",
					url: "https://babysad.cards/terms",
				}}
			/>
			<div className="wrapper">
				<div className="terms__container container container--xxl group-vt gap--lg max-width--sm">
					<section className="group-vt gap--xxs">
						<h1>Terms &amp; Conditions</h1>
						<p>
							<strong>Last updated:</strong> Tuesday 3 December,
							2025
						</p>{" "}
						<p>
							These Terms &amp; Conditions set out the rules for
							using our website and purchasing products from us.
							By placing an order you agree to these terms.
						</p>
					</section>
					<section className="group-vt gap--xxs">
						<h2>1. About Us</h2>
						<p>
							We are a small business creating and selling
							handmade cards. Customers can purchase:
						</p>
						<ul>
							<li>
								<strong>Individual cards</strong> — which we can
								send directly to the intended recipient with a
								printed message; or
							</li>
							<li>
								<strong>Packs of cards</strong> — delivered to
								the customer’s own address.
							</li>
						</ul>

						<h2>2. Ordering</h2>
						<h3>Personalised Cards</h3>
						<p>
							If you choose to have a card sent directly to a
							recipient, you are responsible for providing the
							correct message, spelling, and recipient address. We
							copy your message exactly as provided and cannot
							make corrections unless you notify us before the
							order is processed.
						</p>

						<h3>Card Packs</h3>
						<p>
							Packs will be sent to the delivery address you enter
							at checkout. Please ensure all details are correct
							before completing your order.
						</p>

						<p>
							We reserve the right to decline or cancel any order
							(for example, if we believe the order contains
							offensive or harmful content).
						</p>

						<h2>
							3. Customer Responsibility for Information Accuracy
						</h2>
						<p>
							You are solely responsible for ensuring that all
							information you provide during the ordering process
							is accurate and complete, including but not limited
							to:
						</p>
						<ul>
							<li>Email addresses for order confirmations</li>
							<li>
								Delivery addresses for recipients or yourself
							</li>
							<li>
								Personalised messages (spelling, grammar, and
								content)
							</li>
							<li>
								Recipient names and any other custom details
							</li>
						</ul>
						<p>
							We will process your order exactly as submitted. We
							are not responsible for any errors, delays, or
							non-delivery caused by incorrect information
							provided by you. Please carefully review all details
							before completing your purchase.
						</p>

						<h2>4. Prices &amp; Payment</h2>
						<p>
							All prices shown on the website are in GBP (£).
							Payment must be made in full at the time of
							ordering. We may update prices at any time, but this
							will not affect orders already placed.
						</p>

						<h2>5. Delivery</h2>
						<p>We offer the following postage options:</p>
						<ul>
							<li>Royal Mail First Class</li>
							<li>Royal Mail Second Class</li>
						</ul>
						<p>We do not offer tracked delivery options.</p>

						<p>
							Delivery times stated on our website are estimates
							provided by Royal Mail and are not guaranteed. Once
							an order has been posted, delivery is outside our
							control.
						</p>

						<h3>Lost or Delayed Items</h3>
						<p>
							If your order does not arrive within the expected
							timeframe, please contact us. We will assist where
							we can, but we cannot accept liability for delays
							caused by Royal Mail. If an item appears to be lost,
							we may offer a replacement or a refund at our
							discretion.
						</p>

						<h2>6. Cancellations &amp; Changes</h2>
						<p>
							Because many orders involve personalisation, we can
							only cancel or amend an order if you contact us{" "}
							<strong>before</strong> it has been written or
							posted.
						</p>

						<p>
							Once a personalised card has been completed or
							posted, it cannot be cancelled or returned.
						</p>

						<p>
							Card packs (non-personalised) may be cancelled
							before dispatch. If already dispatched, they may be
							returned unused and in their original condition
							within 14 days of delivery; return postage is the
							customer’s responsibility.
						</p>

						<h2>7. Returns &amp; Refunds</h2>
						<h3>Personalised Cards</h3>
						<p>
							Due to the custom nature of these items,
							personalised cards cannot be returned unless the
							product is faulty or we have made an error.
						</p>

						<h3>Faulty or Damaged Items</h3>
						<p>
							If your order arrives damaged or faulty, contact us
							within 48 hours with a description and photos if
							possible. We will offer a replacement or refund.
						</p>

						<h2>8. Use of Our Website</h2>
						<p>
							You agree not to misuse the website, attempt
							unauthorised access, or use the site in any way that
							disrupts its operation.
						</p>

						<p>
							All content on the site — including images, text,
							and designs — is our property and must not be copied
							or reproduced without permission.
						</p>

						<h2>9. Privacy</h2>
						<p>
							We only use your personal information to process and
							deliver your order, and to communicate with you
							about it. We do not share your details with third
							parties except for necessary delivery and payment
							services. For full details, see our Privacy Policy
							below.
						</p>

						<h2>10. Liability</h2>
						<p>We are not responsible for:</p>
						<ul>
							<li>
								Delays, losses, or damages caused by Royal Mail
								or other factors outside our control;
							</li>
							<li>
								Errors in the message or address provided by the
								customer;
							</li>
							<li>
								Any indirect or consequential loss that arises
								from using our products or website.
							</li>
						</ul>
						<p>
							Our total liability to you will not exceed the total
							price paid for your order.
						</p>

						<h2>11. Changes to These Terms</h2>
						<p>
							We may update these Terms &amp; Conditions
							occasionally. The latest version will always be
							posted on this page.
						</p>

						<h2>12. Contact Us</h2>
						<p>
							If you have any questions or concerns, please
							contact us at:{" "}
							<a href="mailto:babysad.cards@icloud.com">
								babysad.cards@icloud.com
							</a>
							.
						</p>
					</section>
				</div>
			</div>
		</>
	);
};
