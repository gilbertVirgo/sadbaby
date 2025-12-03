import { motion } from "framer-motion";

export const FadeInView = ({
	children,
	delay = 0,
	duration = 0.6,
	y = 30,
	className = "",
	...props
}) => {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ margin: "-25px", once: true }}
			transition={{
				duration,
				delay,
				ease: "easeOut",
			}}
			{...props}
		>
			{children}
		</motion.div>
	);
};
