import React from "react";
import ClientButton from "@/components/errorPage/errorPageButton";

export default function ErrorPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-5 text-center font-sans text-gray-800">
			<div className="mb-4 text-5xl text-blue-500">⚠️</div>
			<h1 className="mb-4 text-3xl">Something Went Wrong</h1>
			<p className="mb-8 text-lg text-gray-600">
				We're sorry for the inconvenience. Please click the button below to go
				back to the Login Page.
			</p>
			<ClientButton />
		</div>
	);
}
