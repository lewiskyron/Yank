import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Signin from "@/components/AuthComponents/Signin";

export const metadata: Metadata = {
	title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
	description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};

const SignIn: React.FC = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
			<div className="shadow-1 dark:bg-gray-dark dark:shadow-card rounded-[10px] bg-white">
				<div className="flex flex-wrap items-center">
					<div className="w-full xl:w-1/2">
						<div className="sm:p-12.5 xl:p-15 w-full p-4">
							<Signin />
						</div>
					</div>

					<div className="hidden w-full p-7 xl:block xl:w-1/2">
						<div className="custom-gradient-1 px-12.5 pt-12.5 dark:!bg-dark-2 overflow-hidden rounded-2xl dark:bg-none">
							<div className="mb-10 inline-block">
								<h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg">
									Yank
								</h1>
							</div>
							<p className="text-dark mb-3 text-xl font-medium dark:text-white">
								Sign in to your account
							</p>

							<h1 className="text-dark sm:text-heading-3 mb-4 text-2xl font-bold dark:text-white">
								Welcome Back!
							</h1>

							<p className="text-dark-4 dark:text-dark-6 w-full max-w-[375px] font-medium">
								Please sign in to your account by completing the necessary
								fields below
							</p>

							<div className="mt-31">
								<Image
									src={"/images/grids/grid-02.svg"}
									alt="Logo"
									width={405}
									height={325}
									className="mx-auto dark:opacity-30"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
