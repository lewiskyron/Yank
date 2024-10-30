import React, { useState, useEffect, useRef } from "react";

interface Option {
	value: string;
	text: string;
	selected: boolean;
	element?: HTMLElement;
}

interface DropdownProps {
	id: string;
}

const MultiSelect: React.FC<DropdownProps> = ({ id }) => {
	const [options, setOptions] = useState<Option[]>([]);
	const [selected, setSelected] = useState<number[]>([]);
	const [show, setShow] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dropdownRef = useRef<any>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const trigger = useRef<any>(null);

	useEffect(() => {
		const loadOptions = () => {
			const select = document.getElementById(id) as HTMLSelectElement | null;
			if (select) {
				const newOptions: Option[] = [];
				for (let i = 0; i < select.options.length; i++) {
					newOptions.push({
						value: select.options[i].value,
						text: select.options[i].innerText,
						selected: select.options[i].hasAttribute("selected"),
					});
				}
				setOptions(newOptions);
			}
		};

		loadOptions();
	}, [id]);

	const open = () => {
		setShow(true);
	};

	const isOpen = () => {
		return show === true;
	};

	const select = (index: number, event: React.MouseEvent) => {
		const newOptions = [...options];

		if (!newOptions[index].selected) {
			newOptions[index].selected = true;
			newOptions[index].element = event.currentTarget as HTMLElement;
			setSelected([...selected, index]);
		} else {
			const selectedIndex = selected.indexOf(index);
			if (selectedIndex !== -1) {
				newOptions[index].selected = false;
				setSelected(selected.filter((i) => i !== index));
			}
		}

		setOptions(newOptions);
	};

	const remove = (index: number) => {
		const newOptions = [...options];
		const selectedIndex = selected.indexOf(index);

		if (selectedIndex !== -1) {
			newOptions[index].selected = false;
			setSelected(selected.filter((i) => i !== index));
			setOptions(newOptions);
		}
	};

	const selectedValues = () => {
		return selected.map((option) => options[option].value);
	};

	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!dropdownRef.current) return;
			if (
				!show ||
				dropdownRef.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setShow(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	return (
		<div className="relative z-50">
			<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
				Multiselect Dropdown
			</label>
			<div>
				<select className="hidden" id={id}>
					<option value="1">Design</option>
					<option value="2">Development</option>
					<option value="3">Option 4</option>
					<option value="4">Option 5</option>
				</select>

				<div className="flex flex-col items-center">
					<input name="values" type="hidden" defaultValue={selectedValues()} />
					<div className="relative z-20 inline-block w-full">
						<div className="relative flex flex-col items-center">
							<div ref={trigger} onClick={open} className="w-full">
								<div className="border-stroke focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 mb-2 flex rounded-[7px] border-[1.5px] py-[9px] pl-3 pr-3 outline-none transition">
									<div className="flex flex-auto flex-wrap gap-3">
										{selected.map((index) => (
											<div
												key={index}
												className="border-stroke bg-gray-2 text-body-sm dark:border-dark-3 dark:bg-dark flex items-center justify-center rounded-[5px] border-[.5px] px-2.5 py-[3px] font-medium"
											>
												<div className="max-w-full flex-initial">
													{options[index].text}
												</div>
												<div className="flex flex-auto flex-row-reverse">
													<div
														onClick={() => remove(index)}
														className="hover:text-red cursor-pointer pl-1"
													>
														<svg
															className="fill-current"
															role="button"
															width="12"
															height="12"
															viewBox="0 0 12 12"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
																fill=""
															/>
														</svg>
													</div>
												</div>
											</div>
										))}
										{selected.length === 0 && (
											<div className="flex-1">
												<input
													placeholder="Select an option"
													className="text-dark-5 dark:text-dark-6 h-full w-full appearance-none bg-transparent p-1 px-2 outline-none"
													defaultValue={selectedValues()}
												/>
											</div>
										)}
									</div>
									<div className="flex items-center py-1 pl-1 pr-1">
										<button
											type="button"
											onClick={open}
											className="text-dark-4 dark:text-dark-6 cursor-pointer outline-none focus:outline-none"
										>
											<svg
												className="fill-current"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M3.69149 7.09327C3.91613 6.83119 4.31069 6.80084 4.57277 7.02548L9.99936 11.6768L15.4259 7.02548C15.688 6.80084 16.0826 6.83119 16.3072 7.09327C16.5319 7.35535 16.5015 7.74991 16.2394 7.97455L10.4061 12.9745C10.172 13.1752 9.82667 13.1752 9.59261 12.9745L3.75928 7.97455C3.4972 7.74991 3.46685 7.35535 3.69149 7.09327Z"
													fill=""
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div className="w-full px-4">
								<div
									className={`max-h-select shadow-1 dark:bg-dark-2 dark:shadow-card absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white ${
										isOpen() ? "" : "hidden"
									}`}
									ref={dropdownRef}
									onFocus={() => setShow(true)}
									onBlur={() => setShow(false)}
								>
									<div className="flex w-full flex-col">
										{options.map((option, index) => (
											<div key={index}>
												<div
													className="border-stroke hover:bg-primary/5 dark:border-dark-3 w-full cursor-pointer rounded-t border-b"
													onClick={(event) => select(index, event)}
												>
													<div
														className={`relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 ${
															option.selected ? "border-primary" : ""
														}`}
													>
														<div className="flex w-full items-center">
															<div className="mx-2 leading-6">
																{option.text}
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MultiSelect;
