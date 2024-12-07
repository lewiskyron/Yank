import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<HashRouter future={{ v7_startTransition: true }}>
			<App />
			<Toaster />
		</HashRouter>
	</React.StrictMode>,
);
