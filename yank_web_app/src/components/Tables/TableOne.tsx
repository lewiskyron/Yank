import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
	{
		logo: "/images/brand/brand-01.svg",
		name: "Google",
		visitors: 3.5,
		revenues: "5,768",
		sales: 590,
		conversion: 4.8,
	},
	{
		logo: "/images/brand/brand-02.svg",
		name: "X.com",
		visitors: 2.2,
		revenues: "4,635",
		sales: 467,
		conversion: 4.3,
	},
	{
		logo: "/images/brand/brand-03.svg",
		name: "Github",
		visitors: 2.1,
		revenues: "4,290",
		sales: 420,
		conversion: 3.7,
	},
	{
		logo: "/images/brand/brand-04.svg",
		name: "Vimeo",
		visitors: 1.5,
		revenues: "3,580",
		sales: 389,
		conversion: 2.5,
	},
	{
		logo: "/images/brand/brand-05.svg",
		name: "Facebook",
		visitors: 1.2,
		revenues: "2,740",
		sales: 230,
		conversion: 1.9,
	},
];

const TableOne = () => {
	return (
		<div className="px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card rounded-[10px] bg-white pb-4">
			<h4 className="mb-5.5 text-body-2xlg text-dark font-bold dark:text-white">
				Top Channels
			</h4>

			<div className="flex flex-col">
				<div className="grid grid-cols-3 sm:grid-cols-5">
					<div className="px-2 pb-3.5">
						<h5 className="xsm:text-base text-sm font-medium uppercase">
							Source
						</h5>
					</div>
					<div className="px-2 pb-3.5 text-center">
						<h5 className="xsm:text-base text-sm font-medium uppercase">
							Visitors
						</h5>
					</div>
					<div className="px-2 pb-3.5 text-center">
						<h5 className="xsm:text-base text-sm font-medium uppercase">
							Revenues
						</h5>
					</div>
					<div className="hidden px-2 pb-3.5 text-center sm:block">
						<h5 className="xsm:text-base text-sm font-medium uppercase">
							Sales
						</h5>
					</div>
					<div className="hidden px-2 pb-3.5 text-center sm:block">
						<h5 className="xsm:text-base text-sm font-medium uppercase">
							Conversion
						</h5>
					</div>
				</div>

				{brandData.map((brand, key) => (
					<div
						className={`grid grid-cols-3 sm:grid-cols-5 ${
							key === brandData.length - 1
								? ""
								: "border-stroke dark:border-dark-3 border-b"
						}`}
						key={key}
					>
						<div className="flex items-center gap-3.5 px-2 py-4">
							<div className="flex-shrink-0">
								<Image src={brand.logo} alt="Brand" width={48} height={48} />
							</div>
							<p className="text-dark hidden font-medium sm:block dark:text-white">
								{brand.name}
							</p>
						</div>

						<div className="flex items-center justify-center px-2 py-4">
							<p className="text-dark font-medium dark:text-white">
								{brand.visitors}K
							</p>
						</div>

						<div className="flex items-center justify-center px-2 py-4">
							<p className="text-green-light-1 font-medium">
								${brand.revenues}
							</p>
						</div>

						<div className="hidden items-center justify-center px-2 py-4 sm:flex">
							<p className="text-dark font-medium dark:text-white">
								{brand.sales}
							</p>
						</div>

						<div className="hidden items-center justify-center px-2 py-4 sm:flex">
							<p className="text-dark font-medium dark:text-white">
								{brand.conversion}%
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TableOne;
