import { useState } from "react";

const SwitcherOne = () => {
	const [enabled, setEnabled] = useState<boolean>(false);

	return (
		<div>
			<label
				htmlFor="toggle1"
				className="flex cursor-pointer select-none items-center"
			>
				<div className="relative">
					<input
						type="checkbox"
						id="toggle1"
						className="sr-only"
						onChange={() => {
							setEnabled(!enabled);
						}}
					/>
					<div className="bg-gray-3 block h-8 w-14 rounded-full dark:bg-[#5A616B]"></div>
					<div
						className={`shadow-switch-1 absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
							enabled && "!bg-primary !right-1 !translate-x-full dark:!bg-white"
						}`}
					></div>
				</div>
			</label>
		</div>
	);
};

export default SwitcherOne;
