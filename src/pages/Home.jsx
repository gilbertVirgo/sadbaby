export default () => {
	return (
		<>
			<header className="wrapper">
				<video className="video-background">
					<source
						src=""
						type="video/mp4"
						muted
						playsInline
						autoPlay
					/>
				</video>

				<div className="container container--2xl group-vt gap--xl group--center">
					<div className="group-vt gap--md group--center">
						<h1 className="align--center">
							Thoughtful cards,
							<br />
							<em>simply crafted</em>
						</h1>
						<p className="align--center">
							Hand-printed linocut cards on 100% recycled paper.
							<br />
							Posted with care from our East London studio.
						</p>
					</div>
					<div className="group-hz gap--sm group--center">
						<a href="/send-a-card" className="button button--md">
							Send a card{" "}
							<div className="icon icon--plane icon--dark icon--md" />
						</a>
						<a href="/blank-cards" className="button button--md">
							Shop blank cards{" "}
							<div className="icon icon--bag icon--dark icon--md" />
						</a>
					</div>
				</div>
			</header>
			<section className="wrapper">
				<div className="container container--lg group-vt gap--xl group--center">
					<div className="group-vt gap--md group--center">
						<h1 className="align--center">
							From you, <em>to them</em>
						</h1>
						<p class="align--center">
							Choose a design, add your message, and we’ll print,
							<br />
							pack, and post your card directly to the recipient.
						</p>
						<a href="/send-a-card" className="button button--sm">
							Send a card{" "}
							<div className="icon icon--plane icon--dark icon--md" />
						</a>
					</div>
				</div>
			</section>
		</>
	);
};
