import React from "react";
import { Link } from "react-router-dom";

let navLinks = [
	{ title: "Send a card", url: "/send-a-card" },
	{ title: "Blank cards", url: "/blank-cards" },
	{ title: "View all cards", url: "/collection" },
	{ title: "About us", url: "/about-us" },
];

export default () => {
	let [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<nav className="nav__wrapper wrapper">
			<div className="nav__container container">
				<Link className="nav__logo" to="/">
					<img
						src="/baby-sad-logo.svg"
						alt="Christian Heritage London"
					/>
				</Link>
				<button
					className={`icon icon--xl ${
						isMenuOpen ? "icon--close-menu" : "icon--open-menu"
					} icon--dark hide--lg-up`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				/>
				<ul className="nav-links__wrapper group-hz gap--md hide--lg-down">
					{navLinks.map((link, index) => (
						<li key={index}>
							<Link
								to={link.url}
								onClick={() => setIsMenuOpen(false)}
							>
								{link.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div
				className={`container nav-links-drawer__wrapper hide--lg-up ${
					isMenuOpen ? "is-open" : ""
				}`}
			>
				<div className="nav-links-drawer__inner">
					<ul className="nav-links__wrapper">
						{navLinks.map((link, index) => (
							<li key={index}>
								<Link
									to={link.url}
									onClick={() => setIsMenuOpen(false)}
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
