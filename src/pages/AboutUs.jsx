import Seo from "../components/Seo";

export default () => {
	return (
		<>
			{/* Single, updated SEO reflecting smile-first vibe */}
			<Seo
				title="About Baby Sad – Witty, Hand‑Printed Cards from East London"
				description="We’re Baby Sad: a small East London studio making witty, hand‑printed linocut greeting cards on recycled paper. Made to keep, sent with care."
				canonical="https://babysad.cards/about-us"
				image="https://denw90a2l8ovn.cloudfront.net/babysad-cards-seo.jpg"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					name: "Baby Sad – Witty Hand‑Printed Greeting Cards",
					description:
						"Small East London studio making witty, hand‑printed linocut cards on recycled paper.",
					url: "https://babysad.cards/about-us",
					image: "https://denw90a2l8ovn.cloudfront.net/babysad-cards-seo.jpg",
				}}
			/>
			<div className="wrapper">
				<div className="about-us__container container container--xl">
					<div className="about-us__image-wrapper hide--md-down">
						<img
							className="about-us__image"
							src={
								"https://denw90a2l8ovn.cloudfront.net/family.jpg"
							}
							alt="About Baby Sad - Studio photo"
						/>
					</div>
					<div className="about-us__content group-vt gap--sm">
						<h1>About Baby Sad</h1>
						<p className="hide--md-up">
							We make witty greeting cards designed to raise a
							smile. Tiny studio, big heart, and jokes that land.
						</p>
						<img
							className="hide--md-up about-us__image"
							src={
								"https://denw90a2l8ovn.cloudfront.net/family.jpg"
							}
							alt="About Baby Sad - Studio photo"
						/>
						<div className="group-vt gap--xs">
							<p className="hide--md-down">
								We make witty greeting cards designed to raise a
								smile. We’re a small East London studio with a
								playful streak.
							</p>
							<p>
								We started Baby Sad because sending something in
								the post still feels special. In a world of
								throwaway messages, a real card slows things
								down in the best way — and often sparks a grin.
							</p>
							<p>
								The name comes from our older daughter, who
								loves comforting her dolls and would announce,
								“baby sad!” on cue. She also insists we draw a
								&lsquo;sad baby&rsquo; whenever there’s pen and
								paper — our family’s first truly original
								innovation.
							</p>
							<p>
								Every card is made with care in East London and
								written to make someone’s day — sometimes twice.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
