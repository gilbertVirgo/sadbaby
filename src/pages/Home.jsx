import React from "react";

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
			<header className="wrapper video-hero__wrapper fg--light">
				<video
					className="video-hero__background"
					muted
					playsInline
					autoPlay
					loop
				>
					<source src="/landing-video.mp4" type="video/mp4" />
				</video>

				<div className="video-hero__container container group-vt gap--xl hz--center">
					<div className="group-vt gap--md hz--center">
						<h1 className="talign--center">
							Thoughtful cards,
							<br />
							<em>simply crafted</em>
						</h1>
						<p className="talign--center">
							Hand-printed linocut cards on 100% recycled paper.
							<br />
							Posted with care from our East London studio.
						</p>
					</div>
					<div className="group-hz gap--sm">
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
					</div>
				</div>
			</header>
			<section className="wrapper">
				<div className="container container--xl group-vt gap--xl hz--center">
					<div className="group-vt gap--md hz--center">
						<div className="group-vt gap--sm talign--center">
							<h2>
								From you, <em>to them</em>
							</h2>
							<p>
								Choose a design, add your message, and we’ll
								print,
								<br />
								pack, and post your card directly to the
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
					</div>
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
							<div key={index} className="sac-process__step">
								<div
									className={`sac-process__icon icon icon--${step.icon} icon--xl icon--dark`}
								/>
								<div className="group-vt gap--xs">
									<h3>{step.title}</h3>
									<p>{step.body}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="wrapper">
				<div className="showcase__container container container--sm">
					<div className="showcase-image__wrapper hide--md-down">
						<img
							src="/prefer-handwriting.jpg"
							alt="Prefer handwriting?"
						/>
					</div>

					<div className="showcase-text__wrapper group-vt gap--lg">
						<div className="group-vt gap--sm">
							<h2>Prefer handwriting?</h2>
							<img
								className="hide--md-up"
								src="/prefer-handwriting.jpg"
								alt="Prefer handwriting?"
							/>
							<p>
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
				</div>
			</section>
			<section className="wrapper">
				<div className="container container--xl group-vt gap--xl hz--center">
					<h2 className="talign--center">
						Questions we&apos;re often asked...
					</h2>
					<div className="max-width--xs group-vt">
						{[
							{
								title: "Are your cards really hand printed?",
								body: "Yes — every Sad Baby card is carved and pressed by hand in our small East London studio. We use traditional lino printing methods and print in small batches.",
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
								<div
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
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};
