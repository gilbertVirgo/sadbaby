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
	textarea.style.paddingTop = `${containerHeight * 0.125}px`;
	textarea.style.paddingBottom = `${containerHeight * 0.125}px`;
	textarea.style.paddingLeft = `${containerHeight * 0.1}px`;
	textarea.style.paddingRight = `${containerHeight * 0.1}px`;

	// Auto-resize height
	textarea.style.height = "";
	textarea.style.height = textarea.scrollHeight + "px";
};

const EXAMPLE_MESSAGES = [
	"Consider this card proof that I can still be thoughtful on demand.",
	"Sending you this card because hugs don't post well.",
	"This card is my way of proving I remembered… eventually.",
	"I wrote you a message so powerful even my fridge magnets trembled.",
	"I wrote this card using 100% recycled thoughts.",
];

export default ({ data, setData, onNext, onBack }) => {
	const message = data.message || "";

	const textareaRef = React.useRef(null);
	const containerRef = React.useRef(null);
	const [isOverflow, setIsOverflow] = React.useState(false);
	const [placeholder, setPlaceholder] = React.useState("");
	const [hasFocus, setHasFocus] = React.useState(false);

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

	React.useEffect(() => {
		let currentMessageIndex = 0;
		let currentCharIndex = 0;
		let isDeleting = false;
		let timeoutId;

		const typeWriter = () => {
			const currentMessage = EXAMPLE_MESSAGES[currentMessageIndex];

			if (!isDeleting) {
				// Typing forward
				if (currentCharIndex < currentMessage.length) {
					setPlaceholder(
						currentMessage.substring(0, currentCharIndex + 1)
					);
					currentCharIndex++;
					timeoutId = setTimeout(typeWriter, 50);
				} else {
					// Pause at end before deleting
					timeoutId = setTimeout(() => {
						isDeleting = true;
						typeWriter();
					}, 2000);
				}
			} else {
				// Deleting
				if (currentCharIndex > 0) {
					setPlaceholder(
						currentMessage.substring(0, currentCharIndex - 1)
					);
					currentCharIndex--;
					timeoutId = setTimeout(typeWriter, 30);
				} else {
					// Move to next message
					isDeleting = false;
					currentMessageIndex =
						(currentMessageIndex + 1) % EXAMPLE_MESSAGES.length;
					timeoutId = setTimeout(typeWriter, 500);
				}
			}
		};

		// Start typing effect only if textarea is empty and not focused
		if (!message && !hasFocus) {
			timeoutId = setTimeout(typeWriter, 1000);
		} else if (hasFocus) {
			// Clear placeholder when focused
			setPlaceholder("");
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [message, hasFocus]);

	const updateMessage = (value) => {
		// Trim trailing newlines after cursor position
		const textarea = textareaRef.current;
		if (textarea) {
			const cursorPos = textarea.selectionStart;
			const beforeCursor = value.substring(0, cursorPos);
			const afterCursor = value.substring(cursorPos);

			// Remove trailing newlines after cursor
			const trimmedAfter = afterCursor.replace(/^\n+/, "");

			// Only update if we actually trimmed something
			if (trimmedAfter !== afterCursor) {
				value = beforeCursor + trimmedAfter;
			}
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
								Type out your note and we’ll print it inside the
								card so it’s ready to send.
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
									// Mark invalid if content exceeds container height or 19 lines
									const lines =
										e.target.value.split("\n").length;
									const exceedsLines = lines > 20;
									const exceedsHeight =
										e.target.scrollHeight >
										(containerRef.current?.offsetHeight ||
											Infinity);
									setIsOverflow(
										exceedsLines || exceedsHeight
									);
								}}
								onFocus={() => setHasFocus(true)}
								onBlur={() => setHasFocus(false)}
								className={`message-input ${
									isOverflow ? "error" : ""
								}`}
								value={message}
								onChange={(e) => updateMessage(e.target.value)}
								aria-invalid={isOverflow ? "true" : "false"}
								placeholder={placeholder}
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
						disabled={!message.trim() || isOverflow}
					>
						Next: delivery
						<div className="icon icon--right-arrow icon--dark icon--md" />
					</button>
					{!message.trim() && (
						<p className="hint">
							Please write a message to proceed.
						</p>
					)}
					{isOverflow && (
						<p className="hint fg--primary">
							Your message is too long to fit.
						</p>
					)}
				</div>
			</StepNavWrapper>
		</>
	);
};
