"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/api/supabase/serverClient";

export async function login(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		return { error: error.message + " or User doesn't exist" };
	} else {
		revalidatePath("/", "layout");
		redirect("/");
	}
}

export async function signUp(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		return { error: error.message };
	} else {
		revalidatePath("/", "layout");
		redirect("/");
	}
}
