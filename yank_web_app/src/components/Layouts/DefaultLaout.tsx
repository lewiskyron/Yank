"use client";
import React from "react";
import { type User } from "@supabase/supabase-js";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSideBar";

interface DefaultLayoutProps {
	children: React.ReactNode;
	user: User | null;
}

export default function DefaultLayout({ children, user }: DefaultLayoutProps) {
	return (
		<>
			{/* <!-- ===== Page Wrapper Star ===== --> */}
			<div className="flex h-screen overflow-hidden">
				<SidebarProvider>
					{/* <!-- ===== Sidebar Star ===== --> */}
					<AppSidebar user={user} />
					{/* <!-- ===== Sidebar End ===== --> */}

					{/* <!-- ===== Content Area Star ===== --> */}
					<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
						{/* <!-- ===== Header Star ===== --> */}
						{/* <Header
							sidebarOpen={sidebarOpen}
							setSidebarOpen={setSidebarOpen}
							user={user}
						/> */}
						{/* <!-- ===== Header End ===== --> */}

						{/* <!-- ===== Main Content Star ===== --> */}
						<main>
							<SidebarTrigger />
							<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
								{children}
							</div>
						</main>
						{/* <!-- ===== Main Content End ===== --> */}
					</div>
				</SidebarProvider>
				{/* <!-- ===== Content Area End ===== --> */}
			</div>
			{/* <!-- ===== Page Wrapper End ===== --> */}
		</>
	);
}
