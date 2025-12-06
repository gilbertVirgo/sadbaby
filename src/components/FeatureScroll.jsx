export default ({ children, className }) => {
	return (
		<div className={`feature-scroll__wrapper ${className || ""}`}>
			<div className={`feature-scroll__container`}>{children}</div>
			<div className="feature-scroll__gradient" />
		</div>
	);
};
