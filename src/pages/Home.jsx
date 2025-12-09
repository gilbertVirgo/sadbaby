import React from "react";
import { FadeInView } from "../components/FadeInView";
import Seo from "../components/Seo";
import FeatureScroll from "../components/FeatureScroll";

export default () => {
	let [accordionOpenIndex, setAccordionOpenIndex] = React.useState(0);

	const toggleAccordion = (index) => {
		if (accordionOpenIndex === index) {
			setAccordionOpenIndex(null);
		} else {
			setAccordionOpenIndex(index);
		}
	};

	return (
		<>
			<Seo
				title="Hand-Printed Greeting Cards Online | Baby Sad Cards"
				description="Buy hand-printed lino greeting cards online from Baby Sad. Send personalized cards directly or shop blank cards. UK delivery from our East London studio."
				canonical="https://babysad.cards/"
				image="https://denw90a2l8ovn.cloudfront.net/babysad-cards-seo.jpg"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: "Baby Sad - Hand-Printed Greeting Cards",
					url: "https://babysad.cards/",
					description:
						"Hand-printed lino greeting cards made in East London",
				}}
			/>
			<header className="wrapper video-hero__wrapper fg--light">
				<video
					className="video-hero__background"
					muted
					playsInline
					autoPlay
					loop
					src="https://denw90a2l8ovn.cloudfront.net/video--compressed.mp4"
				/>

				<div className="video-hero__container container group-vt gap--xl hz--center">
					<FadeInView
						delay={0}
						className="group-vt gap--md hz--center"
					>
						<h1 className="talign--center">
							{/* Thoughtful cards,
							<br />
							<em
								style={{
									position: "relative",
									left: "-0.5rem",
								}}
							>
								simply crafted
							</em> */}
							Paper beats
							<br />
							pixels. <em>Always.</em>
						</h1>
						<p className="talign--center text-balance max-width--xs">
							Hand-printed linocut cards on 100% recycled paper.
							Posted with care from our East London studio.
						</p>
					</FadeInView>

					<FadeInView
						delay={0.16}
						className="group-hz gap--sm wrap--xs-down hz--center"
					>
						<a
							href="/send-a-card"
							className="button button--md fg--light"
						>
							Send a card{" "}
							<div className="icon icon--plane icon--light icon--md" />
						</a>
						<a
							href="/blank-cards"
							className="button button--md fg--light"
						>
							Shop blank cards{" "}
							<div className="icon icon--bag icon--light icon--md" />
						</a>
					</FadeInView>
				</div>
			</header>
			<section className="wrapper">
				<FadeInView
					delay={0.32}
					className="showcase__container container container--sm"
				>
					<div className="showcase-text__wrapper group-vt gap--lg">
						<div className="group-vt gap--sm">
							<span className="pill pill--accent">Featured</span>
							<h2>Our Christmas Selection</h2>
							<img
								className="hide--md-up"
								src="https://denw90a2l8ovn.cloudfront.net/christmas-feature.jpg"
								alt="Our Christmas Selection"
							/>
							<p className="text-balance">
								Six seasonal designs to help you send a
								Christmas hello.
							</p>
						</div>
						<a
							href="/collection"
							className="button button--sm fg--dark"
						>
							View all cards{" "}
							<div className="icon icon--card icon--dark icon--md" />
						</a>
					</div>
					<div
						delay={0.16}
						className="showcase-image__wrapper hide--md-down"
					>
						<img
							src="https://denw90a2l8ovn.cloudfront.net/christmas-feature.jpg"
							alt="Our Christmas Selection"
						/>
					</div>
				</FadeInView>
			</section>
			<section className="wrapper">
				<div className="container container--xl group-vt gap--xl hz--center">
					<FadeInView
						delay={0.32}
						className="group-vt gap--md hz--center"
					>
						<div className="group-vt gap--sm talign--center max-width--xs text-balance">
							<h2>
								From you, <em>to them</em>
							</h2>

							<p>
								Choose a design, add your message, and we’ll
								print, pack, and post your card directly to the
								recipient.
							</p>
						</div>

						<a
							href="/send-a-card"
							className="button button--sm fg--dark"
						>
							Send a card{" "}
							<div className="icon icon--plane icon--dark icon--md" />
						</a>
					</FadeInView>

					<div className="sac-process__wrapper">
						{[
							{
								icon: "choose",
								title: "Choose a design",
								body: "Pick from our small collection of lino-printed cards.",
							},
							{
								icon: "pencil",
								title: "Write your message",
								body: "Up to 400 characters, straight from you.",
							},
							{
								icon: "plane",
								title: "We send it",
								body: "Your card is printed, packed, and posted directly to your recipient.",
							},
						].map((step, index) => (
							<FadeInView
								delay={index * 0.16 + 0.32}
								key={index}
								className="sac-process__step"
							>
								<div
									className={`sac-process__icon icon icon--${step.icon} icon--xl icon--dark`}
								/>
								<div className="group-vt gap--xs">
									<h3>{step.title}</h3>
									<p>{step.body}</p>
								</div>
							</FadeInView>
						))}
					</div>
				</div>
			</section>
			<section className="wrapper">
				<FadeInView className="showcase__container container container--sm">
					<div className="showcase-image__wrapper hide--md-down">
						<img
							src="https://denw90a2l8ovn.cloudfront.net/handwriting--christmas.jpg"
							alt="Prefer handwriting?"
						/>
					</div>{" "}
					<div className="showcase-text__wrapper group-vt gap--lg">
						<div className="group-vt gap--sm">
							<h2>Prefer handwriting?</h2>
							<img
								className="hide--md-up"
								src="https://denw90a2l8ovn.cloudfront.net/handwriting--christmas.jpg"
								alt="Prefer handwriting?"
							/>
							<p className="text-balance">
								Choose four blank lino-printed cards and we’ll
								deliver them anywhere in the UK for free.
							</p>
						</div>
						<a
							href="/blank-cards"
							className="button button--sm fg--dark"
						>
							Shop blank cards{" "}
							<div className="icon icon--bag icon--dark icon--md" />
						</a>
					</div>
				</FadeInView>
			</section>
			<section className="wrapper">
				<div className="container container--xl group-vt gap--xl hz--center">
					<FadeInView>
						<h2 className="talign--center">
							Questions we&apos;re often asked...
						</h2>
					</FadeInView>
					<div className="max-width--xs group-vt">
						{[
							{
								title: "Are your cards really hand printed?",
								body: "Yes — every Baby Sad card is carved and pressed by hand in our small East London studio. We use traditional lino printing methods and print in small batches.",
							},
							{
								title: "What kind of paper do you use?",
								body: "All cards are printed on 100% recycled stock. They're sturdy, uncoated, and fully recyclable.",
							},
							{
								title: "Can you send a card directly to someone for me?",
								body: "Yes. Choose a design, type your message, and we'll print it inside the card and post it straight to your recipient.",
							},
							{
								title: "Do you offer blank cards?",
								body: "We do. You can choose a pack of four blank lino-printed cards, and we'll deliver them anywhere in the UK for free.",
							},
							{
								title: "How long does delivery take?",
								body: "Standard delivery is free and usually arrives in 3–5 days via Royal Mail. You can upgrade to 1st Class at checkout.",
							},
							{
								title: "Do you ship outside the UK?",
								body: "Not yet — but we're working on it. For now, all orders ship within the UK.",
							},
							{
								title: "Are the inks eco-friendly?",
								body: "Yes — we use water-based inks that are safe, low-impact, and suitable for recycled paper.",
							},
						].map((faq, index) => {
							let isOpen = accordionOpenIndex === index;

							return (
								<FadeInView
									delay={0.16 * index + 0.16}
									key={index}
									className={`faq__accordion ${
										isOpen ? "faq__accordion--open" : ""
									} group-vt gap--xs`}
									onClick={() => toggleAccordion(index)}
								>
									<div className="group-hz hz--between">
										<h4>{faq.title}</h4>
										<button
											className={`icon ${
												isOpen
													? "icon--minus"
													: "icon--plus"
											} icon--primary icon--md`}
										/>
									</div>
									<div className="faq-drawer__wrapper">
										<div className="faq-drawer__inner">
											<p>{faq.body}</p>
										</div>
									</div>
								</FadeInView>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};
