import { Folder, BarChart2, Sparkles } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import { Shield, Bug } from "lucide-react";
import { logout } from "@/app/auth/actions";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarHeader,
	SidebarFooter,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Menu items.
const items = [
	{
		title: "Getting Started",
		url: "/getting-started",
		icon: Sparkles,
	},
	{
		title: "My Stats",
		url: "/My-stats",
		icon: BarChart2,
	},
	{
		title: "Folders",
		url: "/folders",
		icon: Folder,
	},
];

export function AppSidebar(props: { user: User | null }) {
	const userEmail = props.user?.email;
	const avatarUrl = props.user?.user_metadata?.avatar_url;
	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		}
	};

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="mt-4">
									<Avatar>
										<AvatarImage src={avatarUrl} />
										<AvatarFallback>
											{userEmail
												? userEmail.substring(0, 2).toUpperCase()
												: "UN"}
										</AvatarFallback>
									</Avatar>
									<span>{userEmail}</span>
									<ChevronDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
								<DropdownMenuItem asChild>
									<Link href="/profile">View Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleLogout}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon className="text-[#4F46E5]" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="https://docs.google.com/forms/d/e/1FAIpQLSdn5IXI8nC43NxC7T2DE72ti0DXqa6YLzyZPHulT95Zlr3kqg/viewform">
								<Bug className="h-4 w-4" color="#4F46E5" />
								<span>Report Bug/Feature</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href="/PrivacyPolicy">
								<Shield className="h-4 w-4" color="#4F46E5" />
								<span>Privacy Policy</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
