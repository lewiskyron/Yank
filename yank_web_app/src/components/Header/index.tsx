import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import SearchForm from "@/components/Header/SearchForm";
import { type User } from "@supabase/supabase-js";

const Header = (props: {
	sidebarOpen: string | boolean | undefined;
	setSidebarOpen: (arg0: boolean) => void;
	user: User | null;
}) => {
	return (
		<header className="z-999 border-stroke dark:border-stroke-dark dark:bg-gray-dark sticky top-0 flex w-full border-b bg-white">
			<div className="shadow-2 flex flex-grow items-center justify-between px-4 py-5 md:px-5 2xl:px-10">
				<div className="flex items-center gap-2 sm:gap-4 lg:hidden">
					{/* <!-- Hamburger Toggle BTN --> */}
					<button
						aria-controls="sidebar"
						onClick={(e) => {
							e.stopPropagation();
							props.setSidebarOpen(!props.sidebarOpen);
						}}
						className="z-99999 border-stroke dark:border-dark-3 dark:bg-dark-2 block rounded-sm border bg-white p-1.5 shadow-sm lg:hidden"
					>
						<span className="h-5.5 w-5.5 relative block cursor-pointer">
							<span className="du-block absolute right-0 h-full w-full">
								<span
									className={`bg-dark relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm delay-[0] duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && "!w-full delay-300"
									}`}
								></span>
								<span
									className={`bg-dark relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm delay-150 duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && "delay-400 !w-full"
									}`}
								></span>
								<span
									className={`bg-dark relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm delay-200 duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && "!w-full delay-500"
									}`}
								></span>
							</span>
							<span className="absolute right-0 h-full w-full rotate-45">
								<span
									className={`bg-dark absolute left-2.5 top-0 block h-full w-0.5 rounded-sm delay-300 duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && "!h-0 !delay-[0]"
									}`}
								></span>
								<span
									className={`delay-400 bg-dark absolute left-0 top-2.5 block h-0.5 w-full rounded-sm duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && "!h-0 !delay-200"
									}`}
								></span>
							</span>
						</span>
					</button>
					{/* <!-- Hamburger Toggle BTN --> */}

					<Link className="block flex-shrink-0 lg:hidden" href="/">
						<Image
							width={32}
							height={32}
							src={"/images/logo/logo-icon.svg"}
							alt="Logo"
						/>
					</Link>
				</div>

				<div className="hidden xl:block">
					<div>
						<h1 className="text-heading-5 text-dark mb-0.5 font-bold dark:text-white">
							Dashboard
						</h1>
						<p className="font-medium">Next.js Admin Dashboard Solution</p>
					</div>
				</div>

				<div className="2xsm:gap-4 flex items-center justify-normal gap-2 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
					<ul className="2xsm:gap-4 flex items-center gap-2">
						{/* <!-- Search Form --> */}
						<SearchForm />
						{/* <!-- Search Form --> */}

						{/* <!-- Dark Mode Toggle --> */}
						<DarkModeSwitcher />
						{/* <!-- Dark Mode Toggle --> */}

						{/* <!-- Notification Menu Area --> */}
						<DropdownNotification />
						{/* <!-- Notification Menu Area --> */}
					</ul>

					{/* <!-- User Area --> */}
					<DropdownUser user={props.user} />
					{/* <!-- User Area --> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
