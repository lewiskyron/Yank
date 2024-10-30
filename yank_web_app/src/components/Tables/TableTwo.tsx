import Image from "next/image";
import { Product } from "@/types/product";

const productData: Product[] = [
	{
		image: "/images/product/product-01.png",
		name: "Apple Watch Series 7",
		category: "Electronics",
		price: 296,
		sold: 22,
		profit: 45,
	},
	{
		image: "/images/product/product-02.png",
		name: "Macbook Pro M1",
		category: "Electronics",
		price: 546,
		sold: 12,
		profit: 125,
	},
	{
		image: "/images/product/product-03.png",
		name: "Dell Inspiron 15",
		category: "Electronics",
		price: 443,
		sold: 64,
		profit: 247,
	},
	{
		image: "/images/product/product-04.png",
		name: "HP Probook 450",
		category: "Electronics",
		price: 499,
		sold: 72,
		profit: 103,
	},
];

const TableTwo = () => {
	return (
		<div className="shadow-1 dark:bg-gray-dark dark:shadow-card rounded-[10px] bg-white">
			<div className="px-4 py-6 md:px-6 xl:px-9">
				<h4 className="text-body-2xlg text-dark font-bold dark:text-white">
					Top Products
				</h4>
			</div>

			<div className="border-stroke py-4.5 dark:border-dark-3 2xl:px-7.5 grid grid-cols-6 border-t px-4 sm:grid-cols-8 md:px-6">
				<div className="col-span-3 flex items-center">
					<p className="font-medium">Product Name</p>
				</div>
				<div className="col-span-2 hidden items-center sm:flex">
					<p className="font-medium">Category</p>
				</div>
				<div className="col-span-1 flex items-center">
					<p className="font-medium">Price</p>
				</div>
				<div className="col-span-1 flex items-center">
					<p className="font-medium">Sold</p>
				</div>
				<div className="col-span-1 flex items-center">
					<p className="font-medium">Profit</p>
				</div>
			</div>

			{productData.map((product, key) => (
				<div
					className="border-stroke py-4.5 dark:border-dark-3 2xl:px-7.5 grid grid-cols-6 border-t px-4 sm:grid-cols-8 md:px-6"
					key={key}
				>
					<div className="col-span-3 flex items-center">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
							<div className="h-12.5 w-15 rounded-md">
								<Image
									src={product.image}
									width={60}
									height={50}
									alt="Product"
								/>
							</div>
							<p className="text-body-sm text-dark dark:text-dark-6 font-medium">
								{product.name}
							</p>
						</div>
					</div>
					<div className="col-span-2 hidden items-center sm:flex">
						<p className="text-body-sm text-dark dark:text-dark-6 font-medium">
							{product.category}
						</p>
					</div>
					<div className="col-span-1 flex items-center">
						<p className="text-body-sm text-dark dark:text-dark-6 font-medium">
							${product.price}
						</p>
					</div>
					<div className="col-span-1 flex items-center">
						<p className="text-body-sm text-dark dark:text-dark-6 font-medium">
							{product.sold}
						</p>
					</div>
					<div className="col-span-1 flex items-center">
						<p className="text-body-sm text-green font-medium">
							${product.profit}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default TableTwo;
