"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/FormElements/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/FormElements/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/FormElements/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/FormElements/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/FormElements/Switchers/SwitcherFour";
import SwitcherOne from "@/components/FormElements/Switchers/SwitcherOne";
import SwitcherThree from "@/components/FormElements/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/FormElements/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";

const FormElements = () => {
	return (
		<>
			<Breadcrumb pageName="FormElements" />

			<div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
				<div className="flex flex-col gap-9">
					{/* <!-- Input Fields --> */}
					<div className="border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card rounded-[10px] border bg-white">
						<div className="border-stroke px-6.5 dark:border-dark-3 border-b py-4">
							<h3 className="text-dark font-medium dark:text-white">
								Input Fields
							</h3>
						</div>
						<div className="gap-5.5 p-6.5 flex flex-col">
							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Default Input
								</label>
								<input
									type="text"
									placeholder="Default Input"
									className="border-stroke px-5.5 text-dark focus:border-primary active:border-primary disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary w-full rounded-[7px] border-[1.5px] bg-transparent py-3 outline-none transition disabled:cursor-default dark:text-white"
								/>
							</div>

							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Active Input
								</label>
								<input
									type="text"
									placeholder="Active Input"
									className="border-primary text-dark focus:border-primary active:border-primary disabled:bg-gray-2 dark:bg-dark-2 w-full rounded-[7px] border-[1.5px] bg-transparent px-5 py-3 outline-none transition disabled:cursor-default dark:text-white"
								/>
							</div>

							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Disabled label
								</label>
								<input
									type="text"
									placeholder="Disabled label"
									disabled
									className="border-stroke text-dark focus:border-primary active:border-primary disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark w-full rounded-[7px] border-[1.5px] bg-transparent px-5 py-3 outline-none transition disabled:cursor-default dark:text-white"
								/>
							</div>
						</div>
					</div>

					{/* <!-- Toggle switch input --> */}
					<div className="border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card rounded-[10px] border bg-white">
						<div className="border-stroke px-6.5 dark:border-dark-3 border-b py-4">
							<h3 className="text-dark font-medium dark:text-white">
								Toggle switch input
							</h3>
						</div>
						<div className="gap-5.5 p-6.5 flex flex-col">
							<SwitcherOne />
							<SwitcherTwo />
							<SwitcherThree />
							<SwitcherFour />
						</div>
					</div>

					{/* <!-- Time and date --> */}
					<div className="border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card rounded-[10px] border bg-white">
						<div className="border-stroke px-6.5 dark:border-dark-3 border-b py-4">
							<h3 className="text-dark font-medium dark:text-white">
								Time and date
							</h3>
						</div>
						<div className="gap-5.5 p-6.5 flex flex-col">
							<DatePickerOne />
							<DatePickerTwo />
						</div>
					</div>

					{/* <!-- File upload --> */}
					<div className="border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card rounded-[10px] border bg-white">
						<div className="border-stroke px-6.5 dark:border-dark-3 border-b py-4">
							<h3 className="text-dark font-medium dark:text-white">
								File upload
							</h3>
						</div>
						<div className="gap-5.5 p-6.5 flex flex-col">
							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Attach file
								</label>
								<input
									type="file"
									className="border-stroke file:border-stroke file:px-6.5 file:text-body-sm file:text-dark-5 file:hover:bg-primary focus:border-primary active:border-primary disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:focus:border-primary w-full cursor-pointer rounded-[7px] border-[1.5px] bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-[#E2E8F0] file:py-[13px] file:font-medium file:hover:bg-opacity-10 disabled:cursor-default dark:file:bg-white/30 dark:file:text-white"
								/>
							</div>

							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Attach file
								</label>
								<input
									type="file"
									className="border-stroke file:border-stroke file:bg-stroke file:text-body-xs file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 w-full cursor-pointer rounded-[7px] border-[1.5px] px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:px-2.5 file:py-1 file:font-medium disabled:cursor-default dark:file:bg-white/30 dark:file:text-white"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-9">
					{/* <!-- Textarea Fields --> */}
					<div className="border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card rounded-[10px] border bg-white">
						<div className="border-stroke px-6.5 dark:border-dark-3 border-b py-4">
							<h3 className="text-dark font-medium dark:text-white">
								Textarea Fields
							</h3>
						</div>
						<div className="p-6.5 flex flex-col gap-6">
							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Default textarea
								</label>
								<textarea
									rows={6}
									placeholder="Default textarea"
									className="border-stroke px-5.5 text-dark focus:border-primary active:border-primary disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary w-full rounded-[7px] border-[1.5px] bg-transparent py-3 outline-none transition disabled:cursor-default dark:text-white"
								></textarea>
							</div>

							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Active textarea
								</label>
								<textarea
									rows={6}
									placeholder="Active textarea"
									className="border-primary text-dark focus:border-primary active:border-primary disabled:bg-gray-2 dark:bg-dark-2 w-full rounded-[7px] border-[1.5px] bg-transparent px-5 py-3 outline-none transition disabled:cursor-default dark:text-white"
								></textarea>
							</div>

							<div>
								<label className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
									Disabled textarea
								</label>
								<textarea
									rows={6}
									disabled
									placeholder="Disabled textarea"
									className="border-stroke text-dark focus:border-primary active:border-primary disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark w-full rounded-[7px] border-[1.5px] bg-transparent px-5 py-3 outline-none transition disabled:cursor-default dark:text-white"
								></textarea>
							</div>
						</div>
					</div>

					{/* <!-- Checkbox and radio --> */}
					<div className="border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card rounded-[10px] border bg-white">
						<div className="border-stroke px-6.5 dark:border-dark-3 border-b py-4">
							<h3 className="text-dark font-medium dark:text-white">
								Checkbox and radio
							</h3>
						</div>
						<div className="gap-5.5 p-6.5 flex flex-col">
							<CheckboxOne />
							<CheckboxTwo />
							<CheckboxThree />
							<CheckboxFour />
							<CheckboxFive />
						</div>
					</div>

					{/* <!-- Select input --> */}
					<div className="border-stroke shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card rounded-[10px] border bg-white">
						<div className="border-stroke px-6.5 dark:border-dark-3 border-b py-4">
							<h3 className="text-dark font-medium dark:text-white">
								Select input
							</h3>
						</div>
						<div className="gap-5.5 p-6.5 flex flex-col">
							<SelectGroupTwo />
							<MultiSelect id="multiSelect" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FormElements;
