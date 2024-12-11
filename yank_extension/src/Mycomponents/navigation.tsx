import React from "react";
import { IoIosGlobe } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/OAuthContext";
import { toast } from "sonner";

const Navigation: React.FC = () => {
	const { signOut } = useAuth();

	const handleLogout = async () => {
		try {
			await signOut();
		} catch {
			toast.error("Error logging out");
		}
	};

	const openWebApp = () => {
		chrome.tabs.create({ url: "http://localhost:3000/folders" });
	};

	return (
		<div className="absolute left-2 top-2 flex space-x-2">
			<button
				className="flex items-center space-x-1 rounded p-1 font-mono font-medium transition hover:outline hover:outline-1 hover:outline-gray-300"
				onClick={openWebApp}
			>
				<IoIosGlobe size={16} />
				<span className="text-xs">Web App</span>
			</button>
			<button
				className="flex items-center space-x-1 rounded p-1 font-mono font-medium transition hover:outline hover:outline-1 hover:outline-gray-300"
				onClick={handleLogout}
			>
				<IoLogOutOutline size={16} />
				<span className="text-xs">Logout</span>
			</button>
		</div>
	);
};

export default Navigation;
