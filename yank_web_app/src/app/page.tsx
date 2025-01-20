import { Metadata } from "next";
import { Navbar } from "@/components/LandingPage/Header/navbar";
import { Hero } from "@/components/LandingPage/Header/hero";
import { Testimonials } from "@/components/LandingPage/Body/testimonials";
import { Footer } from "@/components/LandingPage/Footer/footer";
import Features from "@/components/LandingPage/Body/features";

export const metadata: Metadata = {
	title: "Yank - Build Flashcards at the speed of light",
	description: "Revolutionize Learning: AI-Powered Spaced Repetition Platform",
};

export default function Home() {
	return (
		<main className="min-h-screen">
			<Navbar />
			<Hero />
			<Features />
			<Testimonials />
			<Footer />
		</main>
	);
}
