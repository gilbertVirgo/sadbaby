import React from "react";
import StepNavWrapper from "../../BlankCards/StepNavWrapper";

let styleContainer = (container) => {
	if (!container) return;

	// Set aspect ratio 1 / 1.4142 for Safari compatibility
	const width = container.offsetWidth;
	const height = width * 1.4142;
	container.style.height = `${height}px`;
};

let styleTextarea = (textarea, container) => {
	if (!container) return;

	const containerHeight = container.offsetHeight;

	// Set font-size to 3.126% of container height
	textarea.style.fontSize = `${containerHeight * 0.03126}px`;

	// Set padding: 15% top/bottom, 10% left/right (based on container height)
	textarea.style.paddingTop = `${containerHeight * 0.15}px`;
	textarea.style.paddingBottom = `${containerHeight * 0.15}px`;
	textarea.style.paddingLeft = `${containerHeight * 0.1}px`;
	textarea.style.paddingRight = `${containerHeight * 0.1}px`;

	// Auto-resize height
	textarea.style.height = "";
	textarea.style.height = textarea.scrollHeight + "px";
};

export default ({ data, setData, onNext, onBack }) => {
	const message = data.message || "";

	const textareaRef = React.useRef(null);
	const containerRef = React.useRef(null);

	React.useEffect(() => {
		// Auto-resize textarea and container on mount
		if (containerRef.current) {
			styleContainer(containerRef.current);
		}
		if (textareaRef.current) {
			styleTextarea(textareaRef.current, containerRef.current);
		}

		// Handle window resize
		const handleResize = () => {
			if (containerRef.current) {
				styleContainer(containerRef.current);
			}
			if (textareaRef.current && containerRef.current) {
				styleTextarea(textareaRef.current, containerRef.current);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const updateMessage = (value) => {
		// Limit to 19 lines
		const lines = value.split("\n");
		if (lines.length > 19) {
			return; // Don't update if exceeds 19 lines
		}

		setData({
			...data,
			message: value,
		});
	};

	return (
		<>
			<div className="wrapper">
				<div className="container container--xxl group-vt gap--xl hz--center">
					<header className="step__header">
						<h2>Write your message</h2>
						<div className="group-vt gap--xs">
							<p>
								Type a note of up to 400 characters—we’ll print
								it inside the card so it’s ready to send.
							</p>
						</div>
					</header>
					<div className="message-input__wrapper">
						<div className="left-page" />
						<div className="right-page" ref={containerRef}>
							<textarea
								ref={textareaRef}
								onInput={(e) => {
									styleContainer(containerRef.current);
									styleTextarea(
										e.target,
										containerRef.current
									);
								}}
								className="message-input"
								value={message}
								onChange={(e) => updateMessage(e.target.value)}
							/>
						</div>

						{/* <p
							className="hint"
							style={{
								color:
									message.length > 400
										? "primary"
										: "inherit",
							}}
						>
							{message.length} / 400
						</p> */}
					</div>
				</div>
			</div>
			<StepNavWrapper isSticky>
				<div className="group-vt gap--xs hz--start">
					<button
						type="button"
						onClick={onBack}
						className="button button--xs"
					>
						<div className="icon icon--left-arrow icon--dark icon--md" />
						Back: pick card
					</button>
				</div>
				<div className="group-vt gap--xxs hz--end">
					<button
						type="button"
						onClick={onNext}
						className="button button--xs"
						disabled={!message.trim()}
					>
						Next: delivery
						<div className="icon icon--right-arrow icon--dark icon--md" />
					</button>
					{!message.trim() && (
						<p className="hint">
							Please write a message to proceed.
						</p>
					)}
				</div>
			</StepNavWrapper>
		</>
	);
};
