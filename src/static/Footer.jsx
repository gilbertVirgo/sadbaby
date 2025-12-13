const Footer = () => {
	return (
		<footer className="wrapper footer__wrapper fg--dark">
			<div className="footer__container container container--lg group-vt gap--lg hz--center talign--center">
				<div className="group-vt gap--xs">
					<p>
						© Baby Sad 2025 — Hand-printed cards by Gil & Lucy in
						East London.
					</p>
					<p>
						<em>Hand-printed, simple, sustainable.</em>
					</p>
				</div>
				<div className="group-hz gap--md vt--center">
					{[
						{
							href: "https://www.facebook.com/profile.php?id=61585197503577",
							icon: "facebook",
						},
						{
							href: "https://www.instagram.com/babysad.cards",
							icon: "instagram",
						},
					].map((social) => (
						<a
							key={social.href}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							className={`icon icon--${social.icon} icon--default-fill icon--md`}
						/>
					))}
				</div>
				<ul className="group-hz gap--md footer__links">
					{[
						{ href: "/terms", text: "Terms & Conditions" },
						{ href: "/privacy", text: "Privacy Policy" },
						{ href: "/about-us", text: "About Us" },
					].map((link) => (
						<li key={link.href} className="hint">
							<a href={link.href}>{link.text}</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
