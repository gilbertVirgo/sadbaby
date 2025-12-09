import React from "react";
import Seo from "../components/Seo";

export default () => {
	return (
		<>
			<Seo
				title="Page Not Found | Baby Sad Cards"
				description="Sorry, the page you're looking for doesn't exist. Browse our hand-printed greeting cards collection or shop blank cards instead."
				canonical="https://sadbaby.cards/404"
			/>
			<div className="wrapper fg--dark">
				<div className="container container--xxl hz--center">
					<div className="group-vt gap--lg hz--center">
						<div className="group-vt gap--sm hz--center">
							<h1 className="talign--center">404</h1>
							<p className="talign--center text-balance">
								Oops! The page you&apos;re looking for seems to
								have gotten lost in the post.
							</p>
						</div>

						<div className="group-hz gap--sm wrap--xs-down hz--center">
							<a
								href="/"
								className="button button--md button--primary fg--light"
							>
								Back to Home
							</a>
							<a
								href="/send-a-card"
								className="button button--md button--light"
							>
								Send a Card
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
