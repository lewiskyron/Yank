// ClientButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function ClientButton() {
	const router = useRouter();

	const handleRedirect = () => {
		router.push("/auth/login");
	};

	return (
		<button
			className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
			onClick={handleRedirect}
		>
			Go to Login Page
		</button>
	);
}
