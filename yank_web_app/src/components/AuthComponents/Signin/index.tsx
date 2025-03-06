"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
// import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
	return (
		<>
			<GoogleSigninButton text="Sign in" />

			<div className="my-6 flex items-center justify-center">
				<span className="bg-stroke dark:bg-dark-3 block h-px w-full"></span>
				{/* <div className="dark:bg-gray-dark block w-full min-w-fit bg-white px-3 text-center font-medium">
					Or sign in with email
				</div> */}
				<span className="bg-stroke dark:bg-dark-3 block h-px w-full"></span>
			</div>

			{/* <div>
				<SigninWithPassword mode="login" />
			</div> */}

			<div className="mt-6 text-center">
				<p>
					Don't have any account?{" "}
					<Link href="/auth/signUp" className="font-medium text-blue-400">
						Sign Up
					</Link>
				</p>
			</div>
		</>
	);
}
