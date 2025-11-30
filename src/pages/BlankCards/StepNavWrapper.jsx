export default ({ children, isSticky }) => {
	return (
		<nav
			className={`wrapper step-nav__wrapper ${
				isSticky ? "step-nav__wrapper--sticky" : ""
			}`}
		>
			<div className="container container--xs group-hz hz--between vt--start">
				{children}
			</div>
		</nav>
	);
};
