import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-gray-100 bg-[#FAFAFA]">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
							Company
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/about"
									className="text-gray-600 hover:text-gray-900"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/PrivacyPolicy"
									className="text-gray-600 hover:text-gray-900"
								>
									Privacy
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
							Resources
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/maximize-yank"
									className="text-gray-600 hover:text-gray-900"
								>
									How to maximize Yank
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 border-t pt-8">
					<p className="text-sm text-gray-500">
						© {new Date().getFullYear()} Yank. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
