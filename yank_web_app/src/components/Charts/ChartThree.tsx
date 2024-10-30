import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

const ChartThree: React.FC = () => {
	const series = [65, 34, 12, 56];

	const options: ApexOptions = {
		chart: {
			fontFamily: "Satoshi, sans-serif",
			type: "donut",
		},
		colors: ["#5750F1", "#5475E5", "#8099EC", "#ADBCF2"],
		labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
		legend: {
			show: false,
			position: "bottom",
		},

		plotOptions: {
			pie: {
				donut: {
					size: "80%",
					background: "transparent",
					labels: {
						show: true,
						total: {
							show: true,
							showAlways: true,
							label: "Visitors",
							fontSize: "16px",
							fontWeight: "400",
						},
						value: {
							show: true,
							fontSize: "28px",
							fontWeight: "bold",
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		responsive: [
			{
				breakpoint: 2600,
				options: {
					chart: {
						width: 415,
					},
				},
			},
			{
				breakpoint: 640,
				options: {
					chart: {
						width: 200,
					},
				},
			},
		],
	};

	return (
		<div className="px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card col-span-12 rounded-[10px] bg-white pb-7 xl:col-span-5">
			<div className="mb-9 justify-between gap-4 sm:flex">
				<div>
					<h4 className="text-body-2xlg text-dark font-bold dark:text-white">
						Used Devices
					</h4>
				</div>
				<div>
					<DefaultSelectOption options={["Monthly", "Yearly"]} />
				</div>
			</div>

			<div className="mb-8">
				<div className="mx-auto flex justify-center">
					<ReactApexChart options={options} series={series} type="donut" />
				</div>
			</div>

			<div className="mx-auto w-full max-w-[350px]">
				<div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
					<div className="px-7.5 w-full sm:w-1/2">
						<div className="flex w-full items-center">
							<span className="bg-blue mr-2 block h-3 w-full max-w-3 rounded-full"></span>
							<p className="text-body-sm text-dark dark:text-dark-6 flex w-full justify-between font-medium">
								<span> Desktop </span>
								<span> 65% </span>
							</p>
						</div>
					</div>
					<div className="px-7.5 w-full sm:w-1/2">
						<div className="flex w-full items-center">
							<span className="bg-blue-light mr-2 block h-3 w-full max-w-3 rounded-full"></span>
							<p className="text-body-sm text-dark dark:text-dark-6 flex w-full justify-between font-medium">
								<span> Tablet </span>
								<span> 34% </span>
							</p>
						</div>
					</div>
					<div className="px-7.5 w-full sm:w-1/2">
						<div className="flex w-full items-center">
							<span className="bg-blue-light-2 mr-2 block h-3 w-full max-w-3 rounded-full"></span>
							<p className="text-body-sm text-dark dark:text-dark-6 flex w-full justify-between font-medium">
								<span> Mobile </span>
								<span> 45% </span>
							</p>
						</div>
					</div>
					<div className="px-7.5 w-full sm:w-1/2">
						<div className="flex w-full items-center">
							<span className="bg-blue-light-3 mr-2 block h-3 w-full max-w-3 rounded-full"></span>
							<p className="text-body-sm text-dark dark:text-dark-6 flex w-full justify-between font-medium">
								<span> Unknown </span>
								<span> 12% </span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChartThree;
