import React from "react";
import { motion } from "framer-motion";

// Define types for props
type AlertSuccessProps = {
	messages: string[];
	title?: string;
};

const AlertSuccess: React.FC<AlertSuccessProps> = ({
	messages,
	title = "Action completed successfully",
}) => {
	return (
		<motion.div
			className="mb-6 flex w-full rounded-lg bg-green-50 px-4 py-3 shadow-md"
			initial={{ opacity: 0, y: 20 }} // Start hidden and slightly below
			animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
			transition={{ duration: 0.5, ease: "easeOut" }} // Duration and easing of the animation
		>
			<div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
				<svg
					width="12"
					height="12"
					viewBox="0 0 16 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="text-white"
				>
					<path
						d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
						fill="currentColor"
					/>
				</svg>
			</div>
			<div className="w-full">
				<h5 className="mb-2 text-sm font-semibold text-green-600">{title}</h5>
				<ul>
					{messages.map((message, index) => (
						<li key={index} className="text-xs text-green-500">
							{message}
						</li>
					))}
				</ul>
			</div>
		</motion.div>
	);
};

export default AlertSuccess;
