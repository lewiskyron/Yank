"use client";
/* eslint-disable no-useless-catch */
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import supabaseClient from "@/api/supabase/supabaseClient";
import { type User } from "@supabase/supabase-js";
import AlertError from "../Alerts/AlertError";
import AlertSuccess from "../Alerts/AlertSuccess";

interface ProfileBoxProps {
	user: User | null;
}

export default function ProfileBox({ user }: ProfileBoxProps) {
	const [firstName, setFirstName] = useState<string | null>("John");
	const [lastName, setLastName] = useState<string | null>("Doe");
	// const [avatar_url, setAvatarUrl] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const getProfile = useCallback(async () => {
		try {
			const { data, error, status } = await supabaseClient
				.from("profiles")
				.select("*")
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				console.log(error);
				throw error;
			}

			if (data) {
				setFirstName(data.first_name);
				setLastName(data.last_name);
				// setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			alert("Error loading user data");
			console.log(error);
		}
	}, [user, supabaseClient]);

	useEffect(() => {
		getProfile();
	}, [user, getProfile]);

	const updateProfile = async () => {
		console.log(user?.id);

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

			console.log(error);
			if (error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(null);
				setSuccessMessage("Updated Profile Successfuly!");
				getProfile();
			}
		} catch (err) {
			throw err;
		}
	};

	return (
		<>
			{errorMessage && <AlertError errors={[errorMessage]} />}
			{successMessage && <AlertSuccess messages={[successMessage]} />}
			<div className="shadow-1 dark:bg-gray-dark dark:shadow-card overflow-hidden rounded-[10px] bg-white">
				{/* Cover Image Section */}
				<div className="h-35 md:h-65 relative z-20">
					<Image
						src="/images/cover/cover-01.png"
						alt="profile cover"
						className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
						width={970}
						height={260}
						style={{
							width: "auto",
							height: "auto",
						}}
					/>
					{/* Cover Edit Button */}
					<div className="xsm:bottom-4 xsm:right-4 absolute bottom-1 right-1 z-10">
						{/* ...existing code for cover photo editing */}
					</div>
				</div>

				{/* Profile Information Section */}
				<div className="xl:pb-11.5 px-4 pb-6 text-center lg:pb-8">
					{/* Profile Picture */}
					<div className="-mt-22 h-30 max-w-30 relative z-30 mx-auto w-full rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
						{/* ...existing code for profile picture */}
					</div>

					{/* Name and Editable Fields */}
					<div className="mt-4">
						{/* Name Display */}
						<h3 className="text-heading-6 text-dark mb-1 font-bold dark:text-white">
							{firstName} {lastName}
						</h3>
						<p className="font-medium">{user?.email}</p>

						{/* Input Fields to Edit Name */}
						<div className="mt-4 flex flex-col items-center">
							<input
								type="text"
								value={firstName || ""}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="First Name"
								className="mb-2 w-1/2 rounded border border-gray-300 px-3 py-2"
							/>
							<input
								type="text"
								value={lastName || ""}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Last Name"
								className="mb-4 w-1/2 rounded border border-gray-300 px-3 py-2"
							/>

							{/* Update Profile Button */}
							<button
								className="w-1/2 rounded bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-2 font-semibold text-white hover:from-purple-600 hover:to-purple-800"
								onClick={updateProfile}
							>
								Update Profile
							</button>
						</div>

						{/* Stats Section */}
						{/* <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card"> */}
						{/* ...existing code for stats */}
						{/* </div> */}
					</div>
				</div>
			</div>
		</>
	);
}
