import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AlertSuccessProps = {
	messages: string[];
	title?: string;
	duration?: number;
	trigger: number; // New prop to signal a new alert event
};

const AlertSuccess: React.FC<AlertSuccessProps> = ({
	messages,
	title = "Action completed successfully",
	duration = 1500,
	trigger,
}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		// Reset visible state whenever trigger changes
		setVisible(true);

		const timer = setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [trigger, duration]); // Include trigger in dependency array

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className="mb-6 flex w-full rounded-lg bg-green-50 px-4 py-3 shadow-md"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{/* Alert content */}
					<div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
						{/* SVG icon */}
					</div>
					<div className="w-full">
						<h5 className="mb-2 text-sm font-semibold text-green-600">
							{title}
						</h5>
						<ul>
							{messages.map((message, index) => (
								<li key={index} className="text-xs text-green-500">
									{message}
								</li>
							))}
						</ul>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AlertSuccess;
