import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
	return (
		<nav className="border-b">
			<div className="container mx-auto flex h-16 items-center px-4">
				<Link
					href="/"
					className="mr-6 text-2xl font-semibold transition-colors hover:text-gray-700"
				>
					Yank
				</Link>
				<div className="ml-auto flex items-center space-x-4">
					<Link
						href="/about"
						className="text-sm font-medium transition-colors hover:text-gray-700"
					>
						About us
					</Link>
					<Button
						asChild
						variant="ghost"
						size="sm"
						className="text-sm font-medium"
					>
						<Link href="/auth/login" prefetch={true}>
							{" "}
							Log in
						</Link>
					</Button>
					<Button asChild size="sm">
						<Link href="/auth/signUp" prefetch={true}>
							Try Yank For free
						</Link>
					</Button>
				</div>
			</div>
		</nav>
	);
}
