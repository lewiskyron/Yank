import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
	return (
		<div className="flex-1 space-y-4 bg-purple-50/30 p-4 pt-6 md:p-8">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight text-purple-700">
					Privacy Policy
				</h2>
				<Link href="/">
					<Button
						variant="outline"
						className="border-purple-600 text-purple-600 hover:bg-purple-100"
					>
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
					</Button>
				</Link>
			</div>
			<Card className="border-purple-100">
				<CardHeader>
					<CardTitle>Effective Date: December 18th 2024</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[800px] pr-4">
						<div className="space-y-6">
							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									1. Introduction
								</h3>
								<p className="text-muted-foreground">
									Yank is a platform designed for founders to validate each
									others ideas. This Privacy Policy applies to all users of our
									services, including our website and mobile application
									("Services"). By using our Services, you agree to the terms of
									this Privacy Policy.
								</p>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									2. Information We Collect
								</h3>
								<p className="text-muted-foreground mb-2">
									We only collect non-sensitive user information necessary to
									provide and improve our Services. Specifically, we may collect
									the following types of information:
								</p>
								<ul className="text-muted-foreground list-disc space-y-2 pl-6">
									<li>
										Account Information: Your email address, name, and profile
										picture when you sign up.
									</li>
									<li>
										Platform Activity: Data related to idea submissions,
										feedback provided, and interactions with other users.
									</li>
									<li>
										Usage Data: Non-identifiable data such as device type, app
										version, and usage patterns.
									</li>
								</ul>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									3. How We Use Your Information
								</h3>
								<ul className="text-muted-foreground list-disc space-y-2 pl-6">
									<li>To provide, operate, and maintain our Services.</li>
									<li>To facilitate idea validation and feedback exchanges.</li>
									<li>To improve our Services and develop new features.</li>
									<li>To communicate updates and notifications.</li>
									<li>
										To comply with legal obligations and enforce our terms.
									</li>
								</ul>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									4. Sharing of Information
								</h3>
								<p className="text-muted-foreground mb-2">
									We do not sell, trade, or share your personal information,
									except:
								</p>
								<ul className="text-muted-foreground list-disc space-y-2 pl-6">
									<li>
										With Your Consent: If you explicitly agree to share
										information.
									</li>
									<li>
										Service Providers: Trusted providers performing services
										like hosting and analytics.
									</li>
									<li>
										Legal Requirements: To comply with legal obligations or
										protect rights, safety, or property.
									</li>
								</ul>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									5. Data Security
								</h3>
								<p className="text-muted-foreground">
									We use reasonable security measures to protect your data.
									However, no method of storage or transmission is 100% secure,
									and we cannot guarantee absolute security.
								</p>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									6. Your Rights and Choices
								</h3>
								<p className="text-muted-foreground mb-2">
									You have the right to:
								</p>
								<ul className="text-muted-foreground list-disc space-y-2 pl-6">
									<li>Access and Update your personal information.</li>
									<li>
										Delete Your Account and associated data by contacting us.
									</li>
									<li>Opt-Out of non-essential communications.</li>
								</ul>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									7. Data Retention
								</h3>
								<p className="text-muted-foreground">
									We retain your data while your account is active or as needed
									to provide Services. Upon account deletion, we will delete
									your data unless retention is necessary for legal purposes.
								</p>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									8. Children's Privacy
								</h3>
								<p className="text-muted-foreground">
									Our Services are not intended for children under 13. If you
									believe a child has provided personal data, please contact us,
									and we will delete it.
								</p>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									9. Changes to This Privacy Policy
								</h3>
								<p className="text-muted-foreground">
									We may update this Privacy Policy periodically. Significant
									changes will be posted on our platform with an updated
									"Effective Date".
								</p>
							</section>

							<section>
								<h3 className="mb-2 text-xl font-semibold text-purple-700">
									10. Contact Us
								</h3>
								<p className="text-muted-foreground">
									If you have any questions or concerns, please contact us at:{" "}
									<a
										href="mailto:kyronnyoro@uni.minerva.edu"
										className="text-purple-600 hover:text-purple-700 hover:underline"
									>
										kyronnyoro@uni.minerva.edu
									</a>
								</p>
							</section>
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}
