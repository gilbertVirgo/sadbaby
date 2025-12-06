import Seo from "../components/Seo";

export default () => {
	return (
		<>
			<Seo
				title="About Sad Baby"
				description="Learn about Sad Baby, a small lino-printing studio in East London run by Gil and Lucy, crafting beautiful greeting cards from recycled paper."
				canonical="https://www.sadbaby.cards/about"
				image="https://denw90a2l8ovn.cloudfront.net/family.jpg"
				schemaMarkup={{
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					name: "Sad Baby",
					description:
						"Hand-printed greeting cards and stationery from East London",
					url: "https://www.sadbaby.cards/about",
					image: "https://denw90a2l8ovn.cloudfront.net/family.jpg",
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
							alt="About Sad Baby - Studio photo"
						/>
					</div>
					<div className="about-us__content group-vt gap--sm">
						<h1>About Sad Baby</h1>
						<p className="hide--md-up">
							Sad Baby is a small card-printing studio run by Gil
							and Lucy in East London. We make lino-printed
							greeting cards in small batches, using recycled
							paper and simple, carefully carved&nbsp;designs.
						</p>
						<img
							className="hide--md-up about-us__image"
							src={
								"https://denw90a2l8ovn.cloudfront.net/family.jpg"
							}
							alt="About Sad Baby - Studio photo"
						/>
						<div className="group-vt gap--xs">
							<p className="hide--md-down">
								Sad Baby is a small card-printing studio run by
								Gil and Lucy in East London. We make
								lino-printed greeting cards in small batches,
								using recycled paper and simple, carefully
								carved&nbsp;designs.
							</p>
							<p>
								We started Sad Baby because sending something
								through the post still feels special. In a world
								of quick, throwaway messages, a physical card
								slows things down in the best&nbsp;way.
							</p>
							<p>
								The name comes from our older daughter, who
								loves to comfort her dolls — always running over
								to tell us, “baby sad!” and, most amusingly,
								insists that we draw a &ldquo;sad baby&rdquo;
								whenever pen and paper present themselves. We
								consider it our family&apos;s first truly
								original&nbsp;innovation!
							</p>
							<p>
								Each Sad Baby card is carved and printed by
								hand, made to keep, and sent from our home
								studio in East&nbsp;London.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
