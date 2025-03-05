"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import supabaseClient from "@/api/supabase/supabaseClient";
import type { User } from "@supabase/supabase-js";
import AlertError from "../Alerts/AlertError";
import AlertSuccess from "../Alerts/AlertSuccess";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ProfileBoxProps {
	user: User | null;
	backgroundImage: string;
}

export default function ProfileBox({ user, backgroundImage }: ProfileBoxProps) {
	const [firstName, setFirstName] = useState<string | null>("John");
	const [lastName, setLastName] = useState<string | null>("Doe");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [successTrigger, setSuccessTrigger] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const avatar_url = user?.user_metadata?.avatar_url;

	const getProfile = useCallback(async () => {
		try {
			setIsLoading(true);
			const { data, error, status } = await supabaseClient
				.from("profiles")
				.select("*")
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFirstName(data.first_name);
				setLastName(data.last_name);
			}
		} catch (error) {
			console.error("Error loading user data:", error);
			setErrorMessage("Failed to load profile data");
		} finally {
			setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			getProfile();
		}
	}, [user, getProfile]);

	const updateProfile = async () => {
		setIsLoading(true);
		const updates = {
			id: user?.id,
			first_name: firstName,
			last_name: lastName,
			updated_at: new Date().toISOString(),
		};

		try {
			const { error } = await supabaseClient
				.from("profiles")
				.upsert(updates)
				.eq("id", user?.id);

			if (error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(null);
				setSuccessMessage("Profile updated successfully!");
				setSuccessTrigger((prev) => prev + 1);
			}
		} catch (err) {
			setErrorMessage("An unexpected error occurred");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const getInitials = () => {
		return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
	};

	return (
		<div className="container max-w-4xl py-6">
			{errorMessage && <AlertError errors={[errorMessage]} />}
			{successMessage && (
				<AlertSuccess messages={[successMessage]} trigger={successTrigger} />
			)}

			<Card className="overflow-hidden">
				{/* Cover Image Section */}
				<div className="relative h-48 w-full sm:h-64 md:h-80">
					<Image
						src={backgroundImage}
						alt="Profile cover"
						className="h-full w-full object-cover object-center"
						fill
						priority
					/>
				</div>

				<CardContent className="px-4 pb-6 pt-0 sm:px-6">
					<div className="flex flex-col gap-6 md:flex-row">
						{/* Profile Picture & Avatar Section */}
						<div className="z-10 -mt-16 flex flex-col items-center">
							<div className="relative">
								<Avatar className="border-background h-32 w-32 border-4">
									<AvatarImage
										src={avatar_url}
										alt={`${firstName} ${lastName}`}
									/>
									<AvatarFallback className="bg-primary/10 text-primary text-2xl">
										{getInitials()}
									</AvatarFallback>
								</Avatar>
							</div>
						</div>

						{/* Profile Information Section */}
						<div className="flex-1 space-y-6 pt-4 md:pt-0">
							<div>
								<h2 className="text-2xl font-bold tracking-tight">
									{firstName} {lastName}
								</h2>
								<p className="text-muted-foreground">{user?.email}</p>
							</div>

							<Separator />

							<div className="grid gap-6">
								<div className="grid gap-3">
									<h3 className="text-lg font-semibold">Profile Information</h3>
									<div className="grid gap-4 md:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="firstName">First Name</Label>
											<Input
												id="firstName"
												value={firstName || ""}
												onChange={(e) => setFirstName(e.target.value)}
												placeholder="First Name"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="lastName">Last Name</Label>
											<Input
												id="lastName"
												value={lastName || ""}
												onChange={(e) => setLastName(e.target.value)}
												placeholder="Last Name"
											/>
										</div>
									</div>
								</div>

								<Button
									onClick={updateProfile}
									disabled={isLoading}
									className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA] md:w-auto md:self-end"
								>
									{isLoading ? "Updating..." : "Update Profile"}
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
