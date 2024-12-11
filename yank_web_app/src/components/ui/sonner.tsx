"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster"
			toastOptions={{
				classNames: {
					toast: "toast", // Uses the global toast classes defined earlier
					description: "toast-description",
					actionButton: "toast-action-button",
					cancelButton: "toast-cancel-button",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
