"use client";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
// import SigninWithPassword from "../SigninWithPassword";

export default function Signup() {
	return (
		<>
			<GoogleSigninButton text="Sign in" />

			{/* <div className="my-6 flex items-center justify-center">
				<span className="bg-stroke dark:bg-dark-3 block h-px w-full"></span>
				<div className="dark:bg-gray-dark block w-full min-w-fit bg-white px-3 text-center font-medium">
					Or sign in with email
				</div>
				<span className="bg-stroke dark:bg-dark-3 block h-px w-full"></span>
			</div>

			<div>
				<SigninWithPassword mode="signUp" />
			</div> */}
		</>
	);
}
