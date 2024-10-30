import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AlertWarning from "@/components/Alerts/AlertWarning";

export const metadata: Metadata = {
	title: "Next.js Alerts Page | NextAdmin - Next.js Dashboard Kit",
	description: "This is Next.js Alerts page for NextAdmin Dashboard Kit",
	// other metadata
};

const Alerts = () => {
	return (
		<DefaultLayout>
			<Breadcrumb pageName="Alerts" />

			<div className="shadow-1 dark:bg-gray-dark dark:shadow-card rounded-[10px] bg-white p-4 md:p-6 xl:p-9">
				<div className="gap-7.5 flex flex-col">
					<AlertWarning />
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Alerts;
