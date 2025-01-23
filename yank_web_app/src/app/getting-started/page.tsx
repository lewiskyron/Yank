import React from "react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const GettingStarted = () => {
	const steps = [
		{
			title: "Create your first project",
			description: "Set up your workspace and start organizing your work.",
			completed: false,
		},
		{
			title: "Invite your team",
			description:
				"Collaborate with your team members by inviting them to your workspace.",
			completed: false,
		},
		{
			title: "Set up integrations",
			description: "Connect your favorite tools and streamline your workflow.",
			completed: false,
		},
	];

	return (
		<div className="container mx-auto p-8">
			<div className="mx-auto max-w-3xl">
				<div className="mb-8">
					<h1 className="mb-2 text-4xl font-bold">
						Welcome! Let's get you started
					</h1>
					<p className="text-gray-600">
						Complete these steps to make the most of your experience.
					</p>
				</div>

				<div className="grid gap-4">
					{steps.map((step, index) => (
						<Card key={index} className="relative">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									{step.completed ? (
										<CheckCircle2 className="h-6 w-6 text-green-500" />
									) : (
										<div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-sm">
											{index + 1}
										</div>
									)}
									{step.title}
								</CardTitle>
								<CardDescription>{step.description}</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button
									variant={step.completed ? "secondary" : "default"}
									className="gap-2"
								>
									{step.completed ? "Completed" : "Get Started"}
									<ArrowRight className="h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>

				<div className="mt-8 text-center">
					<Button variant="outline" className="gap-2">
						Skip onboarding
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default GettingStarted;
