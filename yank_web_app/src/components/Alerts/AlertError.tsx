import React from "react";
import { motion } from "framer-motion"; // Import framer motion

// Define types for props
type AlertErrorProps = {
	errors: string[];
	title?: string;
};

// Modify the component to accept props for errors and an optional title
const AlertError: React.FC<AlertErrorProps> = ({
	errors,
	title = "There were errors with your request",
}) => {
	return (
		<motion.div
			className="mb-6 flex w-full rounded-lg bg-red-50 px-4 py-3 shadow-md"
			initial={{ opacity: 0, y: 20 }} // Start hidden and slightly below
			animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
			transition={{ duration: 0.5, ease: "easeOut" }} // Duration and easing of the animation
		>
			<div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="text-white"
				>
					<path
						d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
						fill="currentColor"
					/>
				</svg>
			</div>
			<div className="w-full">
				<h5 className="mb-2 text-sm font-semibold text-red-600">{title}</h5>
				<ul>
					{errors.map((error, index) => (
						<li key={index} className="text-xs text-red-500">
							{error}
						</li>
					))}
				</ul>
			</div>
		</motion.div>
	);
};

export default AlertError;
