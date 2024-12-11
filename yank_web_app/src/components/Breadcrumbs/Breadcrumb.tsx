interface BreadcrumbProps {
	pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<h2 className="text-dark text-[26px] font-bold leading-[30px] dark:text-white">
				{pageName}
			</h2>
		</div>
	);
};

export default Breadcrumb;
