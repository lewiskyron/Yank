import React from "react";

interface InputGroupProps {
	customClasses?: string;
	label: string;
	type: string;
	placeholder: string;
	required?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
	customClasses,
	label,
	type,
	placeholder,
	required,
}) => {
	return (
		<>
			<div className={customClasses}>
				<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
					{label}
					{required && <span className="text-red">*</span>}
				</label>
				<input
					type={type}
					placeholder={placeholder}
					className="border-stroke px-5.5 text-dark placeholder:text-dark-6 focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary w-full rounded-[7px] border-[1.5px] bg-transparent py-3 outline-none transition disabled:cursor-default dark:text-white"
				/>
			</div>
		</>
	);
};

export default InputGroup;
