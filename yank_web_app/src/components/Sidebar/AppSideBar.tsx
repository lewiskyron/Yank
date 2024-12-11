import { Calendar, Folder, Home, Search, Settings } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { type User } from "@supabase/supabase-js";
import Link from "next/link";
import supabaseClient from "@/api/supabase/supabaseClient";
import { useRouter } from "next/navigation";

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
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Folders",
		url: "/folders",
		icon: Folder,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export function AppSidebar(props: { user: User | null }) {
	const userEmail = props.user?.email;
	const avatarUrl = props.user?.user_metadata?.avatar_url;
	const router = useRouter();
	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut({ scope: "global" });

		if (error) {
			throw error;
		}
		router.replace("auth/login");
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
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
