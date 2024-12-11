"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 1250);
	}, []);

	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>
				{loading ? (
					<div className="flex min-h-screen items-center justify-center">
						<ClimbingBoxLoader color="#4F46E5" size={20} />
					</div>
				) : (
					children
				)}
				<Toaster />
			</body>
		</html>
	);
}
