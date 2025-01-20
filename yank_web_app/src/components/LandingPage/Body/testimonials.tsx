"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
	{
		name: "Alex Kamau",
		role: "Physics student at University of Nairobi ",
		image: "/placeholder.svg?height=80&width=80",
		content:
			"Yank has been a game-changer for my study routine. It cuts down my review time dramatically while boosting my retention. The card creation process feels seamless, and I’m able to stay focused without distractions. A must-have tool for anyone serious about mastering complex subjects!",
	},
	{
		name: "Jordan Lee",
		role: "Engineering student at Stanford",
		image: "/placeholder.svg?height=80&width=80",
		content:
			"Yank is nothing short of revolutionary. It's helped me organize my notes and study material like never before. I no longer dread reviewing. The ability to create flashcards on the fly has made my study sessions incredibly efficient and enjoyable. Totally transformed my academic life!",
	},
	{
		name: "Flavia Iespa",
		role: "Computer Science student at Minerva University",
		image: "/placeholder.svg?height=80&width=80",
		content:
			"Switching to Yank was the best decision I made for my studies. I used to struggle with keeping track of important concepts, but now I feel like I’m in control. Creating flashcards is effortless, and the intuitive layout keeps me motivated. I aced my exams last term with far less stress, all thanks to Yank!",
	},
];

export function Testimonials() {
	return (
		<>
			<div className="mb-12 mt-6 space-y-4 text-center">
				<h2 className="text-7xl font-black tracking-tight">
					What Our Users Say
					<br />
					About <span className="text-purple-500">Us</span>
				</h2>
			</div>
			<section className="bg-gradient-to-b from-white via-[#EEE9FF]/40 to-[#E8E0FF]/50 py-20">
				<div className="container mx-auto px-4">
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<div className="h-full rounded-xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
									<div className="mb-4 flex items-center gap-4">
										<Avatar>
											<AvatarImage
												src={testimonial.image || "/placeholder.svg"}
											/>
											<AvatarFallback>
												{testimonial.name.substring(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div>
											<h3 className="font-semibold">{testimonial.name}</h3>
											<p className="text-sm text-gray-600">
												{testimonial.role}
											</p>
										</div>
									</div>
									<p className="leading-relaxed text-gray-600">
										{testimonial.content}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
