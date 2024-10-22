// components/LogoutButton.js
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = () => {
		router.push("/sign-in"); // Adjust the path as needed
	};

	return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
