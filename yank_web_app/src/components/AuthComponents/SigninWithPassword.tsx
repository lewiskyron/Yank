"use client";
import React, { useState } from "react";
import Link from "next/link";
import { login, signUp } from "@/app/auth/actions"; // Import your signup action
import AlertError from "../Alerts/AlertError";
import AlertSuccess from "../Alerts/AlertSuccess";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SigninWithPasswordProps {
	mode: "login" | "signUp";
}

export default function SigninWithPassword({ mode }: SigninWithPasswordProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "", // For sign-up mode
		remember: false,
	});
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		confirmPassword: "", // For sign-up mode
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	//toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	// Email validation regex
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Validate fields onBlur
	const validateField = (name: string, value: string) => {
		let error = "";
		if (name === "email") {
			if (!value) {
				error = "Email is required.";
			} else if (!isValidEmail(value)) {
				error = "Please enter a valid email address.";
			}
		}

		if (name === "password") {
			if (!value) {
				error = "Password is required.";
			} else if (value.length < 8) {
				error = "Password must be at least 8 characters.";
			} else if (!/\d/.test(value)) {
				error = "Password must contain at least one number.";
			} else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
				error =
					"Password must contain at least one special character (e.g., !@#$%^&*).";
			}
		}

		// Confirm password validation for sign-up mode
		if (mode === "signUp" && name === "confirmPassword") {
			if (!value) {
				error = "Please confirm your password.";
			} else if (value !== formData.password) {
				error = "Passwords do not match.";
			}
		}

		// Update the errors state for the specific field
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: error,
		}));
	};

	// Handle input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });

		// Optionally validate on change
		// validateField(name, value);
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Check if there are any errors before submitting
		const hasErrors = Object.values(errors).some((error) => error);
		if (!hasErrors) {
			const form = new FormData();
			form.append("email", formData.email);
			form.append("password", formData.password);

			if (mode === "login") {
				const result = await login(form);
				if (result?.error) {
					setErrorMessage(result.error);
				}
			} else if (mode === "signUp") {
				form.append("confirmPassword", formData.confirmPassword);
				const result = await signUp(form);
				if (result?.error) {
					setErrorMessage(result.error);
				} else {
					setErrorMessage(null);
					setSuccessMessage(
						"We are almost there. Check your email to validate account",
					);
				}
			}
		}
	};

	return (
		<div>
			{/* Render AlertError component if there's an error */}
			{errorMessage && <AlertError errors={[errorMessage]} />}
			{/* Render AlertSuccess component if there's a success message */}
			{successMessage && <AlertSuccess messages={[successMessage]} />}
			<form onSubmit={handleSubmit}>
				{/* Email Field */}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="text-dark mb-2.5 block font-medium dark:text-white"
					>
						Email
					</label>
					<div className="relative">
						<input
							type="email"
							placeholder="Enter your email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							onBlur={(e) => validateField(e.target.name, e.target.value)}
							className={`w-full rounded-lg border ${
								errors.email ? "border-red-500" : "border-stroke"
							} text-dark focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus-visible:shadow-none dark:text-white`}
						/>
						{errors.email && (
							<p className="mt-1 text-red-500">{errors.email}</p>
						)}
					</div>
				</div>

				{/* Password Field */}
				<div className="mb-5">
					<label
						htmlFor="password"
						className="text-dark mb-2.5 block font-medium dark:text-white"
					>
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Enter your password"
							autoComplete="password"
							value={formData.password}
							onChange={handleChange}
							onBlur={(e) => validateField(e.target.name, e.target.value)}
							className={`w-full rounded-lg border ${
								errors.password ? "border-red-500" : "border-stroke"
							} text-dark focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus-visible:shadow-none dark:text-white`}
						/>
						<span
							onClick={togglePasswordVisibility}
							className="text-dark absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer dark:text-white"
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</span>
						{errors.password && (
							<p className="mt-1 text-red-500">{errors.password}</p>
						)}
					</div>
				</div>

				{/* Confirm Password Field for Sign-up */}
				{mode === "signUp" && (
					<div className="mb-5">
						<label
							htmlFor="confirmPassword"
							className="text-dark mb-2.5 block font-medium dark:text-white"
						>
							Confirm Password
						</label>
						<div className="relative">
							<input
								type="password"
								name="confirmPassword"
								placeholder="Confirm your password"
								autoComplete="new-password"
								value={formData.confirmPassword}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								className={`w-full rounded-lg border ${
									errors.confirmPassword ? "border-red-500" : "border-stroke"
								} text-dark focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus-visible:shadow-none dark:text-white`}
							/>
							{errors.confirmPassword && (
								<p className="mt-1 text-red-500">{errors.confirmPassword}</p>
							)}
						</div>
					</div>
				)}

				{/* Remember Me and Forgot Password */}
				{mode === "login" && (
					<div className="mb-6 flex items-center justify-between gap-2 py-2">
						<label
							htmlFor="remember"
							className="font-satoshi text-dark flex cursor-pointer select-none items-center text-base font-medium dark:text-white"
						>
							<input
								type="checkbox"
								name="remember"
								id="remember"
								checked={formData.remember}
								onChange={(e) =>
									setFormData({ ...formData, remember: e.target.checked })
								}
								className="peer sr-only"
							/>
							<span
								className={`h-5.5 w-5.5 border-stroke peer-checked:border-primary peer-checked:bg-primary dark:border-stroke-dark mr-2.5 inline-flex items-center justify-center rounded-md border bg-white text-white text-opacity-0 peer-checked:text-opacity-100 dark:bg-white/5 ${
									formData.remember ? "bg-primary" : ""
								}`}
							>
								{/* Checkbox Icon */}
								<svg
									width="10"
									height="7"
									viewBox="0 0 10 7"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
										fill="currentColor"
									/>
								</svg>
							</span>
							Remember me
						</label>

						<Link
							href="/auth/forgot-password"
							className="font-satoshi text-dark hover:text-primary dark:hover:text-primary select-none text-base font-medium underline duration-300 dark:text-white"
						>
							Forgot Password?
						</Link>
					</div>
				)}

				{/* Submit Button */}
				<div className="mb-4.5">
					<button
						type="submit"
						className="bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition hover:bg-opacity-90"
					>
						{mode === "login" ? "Log In" : "Sign Up"}
					</button>
				</div>
			</form>
		</div>
	);
}
