const CalendarBox = () => {
	return (
		<>
			<div className="shadow-1 dark:bg-gray-dark dark:shadow-card w-full max-w-full rounded-[10px] bg-white">
				<table className="w-full">
					<thead>
						<tr className="bg-primary grid grid-cols-7 rounded-t-[10px] text-white">
							<th className="h-15 text-body-xs flex items-center justify-center rounded-tl-[10px] p-1 font-medium sm:text-base xl:p-5">
								<span className="hidden lg:block"> Sunday </span>
								<span className="block lg:hidden"> Sun </span>
							</th>
							<th className="h-15 text-body-xs flex items-center justify-center p-1 font-medium sm:text-base xl:p-5">
								<span className="hidden lg:block"> Monday </span>
								<span className="block lg:hidden"> Mon </span>
							</th>
							<th className="h-15 text-body-xs flex items-center justify-center p-1 font-medium sm:text-base xl:p-5">
								<span className="hidden lg:block"> Tuesday </span>
								<span className="block lg:hidden"> Tue </span>
							</th>
							<th className="h-15 text-body-xs flex items-center justify-center p-1 font-medium sm:text-base xl:p-5">
								<span className="hidden lg:block"> Wednesday </span>
								<span className="block lg:hidden"> Wed </span>
							</th>
							<th className="h-15 text-body-xs flex items-center justify-center p-1 font-medium sm:text-base xl:p-5">
								<span className="hidden lg:block"> Thursday </span>
								<span className="block lg:hidden"> Thur </span>
							</th>
							<th className="h-15 text-body-xs flex items-center justify-center p-1 font-medium sm:text-base xl:p-5">
								<span className="hidden lg:block"> Friday </span>
								<span className="block lg:hidden"> Fri </span>
							</th>
							<th className="h-15 text-body-xs flex items-center justify-center rounded-tr-[10px] p-1 font-medium sm:text-base xl:p-5">
								<span className="hidden lg:block"> Saturday </span>
								<span className="block lg:hidden"> Sat </span>
							</th>
						</tr>
					</thead>
					<tbody>
						{/* <!-- Line 1 --> */}
						<tr className="grid grid-cols-7">
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">1</span>
								<div className="md:h-30 group h-16 w-full flex-grow cursor-pointer py-1">
									<span className="group-hover:text-primary md:hidden">
										More
									</span>
									<div className="event z-99 border-primary bg-gray-2 dark:bg-dark-2 invisible absolute left-2 mb-1 flex w-[200%] flex-col rounded-r-[5px] border-l-[3px] px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 md:visible md:w-[190%] md:opacity-100">
										<span className="event-name text-dark font-medium dark:text-white">
											Redesign Website
										</span>
										<span className="time text-sm">1 Dec - 2 Dec</span>
									</div>
								</div>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">2</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">3</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">4</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">5</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">6</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">7</span>
							</td>
						</tr>
						{/* <!-- Line 1 --> */}
						{/* <!-- Line 2 --> */}
						<tr className="grid grid-cols-7">
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">8</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">9</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									10
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									11
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									12
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									13
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									14
								</span>
							</td>
						</tr>
						{/* <!-- Line 2 --> */}
						{/* <!-- Line 3 --> */}
						<tr className="grid grid-cols-7">
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									15
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									16
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									17
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									18
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									19
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									20
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									21
								</span>
							</td>
						</tr>
						{/* <!-- Line 3 --> */}
						{/* <!-- Line 4 --> */}
						<tr className="grid grid-cols-7">
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									22
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									23
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									24
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									25
								</span>
								<div className="md:h-30 group h-16 w-full flex-grow cursor-pointer py-1">
									<span className="group-hover:text-primary md:hidden">
										More
									</span>
									<div className="event z-99 border-primary bg-gray-2 dark:bg-dark-2 invisible absolute left-2 mb-1 flex w-[300%] flex-col rounded-r-[5px] border-l-[3px] px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 md:visible md:w-[290%] md:opacity-100">
										<span className="event-name text-dark font-medium dark:text-white">
											App Design
										</span>
										<span className="time text-sm">25 Dec - 27 Dec</span>
									</div>
								</div>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									26
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									27
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									28
								</span>
							</td>
						</tr>
						{/* <!-- Line 4 --> */}
						{/* <!-- Line 5 --> */}
						<tr className="grid grid-cols-7">
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer rounded-bl-[10px] border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									29
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									30
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">
									31
								</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">1</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">2</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">3</span>
							</td>
							<td className="ease border-stroke hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-2 md:h-25 xl:h-31 relative h-20 cursor-pointer rounded-br-[10px] border p-2 transition duration-500 md:p-6">
								<span className="text-dark font-medium dark:text-white">4</span>
							</td>
						</tr>
						{/* <!-- Line 5 --> */}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default CalendarBox;
