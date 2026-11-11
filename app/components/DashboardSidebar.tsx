
"use client";

import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  LogOut,
  PlusCircle,
} from "lucide-react";

type UserRole = "seeker" | "recruiter" | "admin";

const menuItemsByRole = {
  seeker: [
    { title: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { title: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { title: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { title: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { title: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { title: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],

  recruiter: [
  {
    title: "Dashboard",
    url: "/dashboard/recruiter",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Jobs",
    url: "/dashboard/recruiter/jobs",
    icon: Briefcase,
  },
  {
  title: "Add Jobs",
  url: "/dashboard/recruiter/jobs/new",
  icon: PlusCircle,
},
  {
    title: "Applications",
    url: "/dashboard/recruiter/applications",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/dashboard/recruiter/settings",
    icon: Settings,
  },
],

  admin: [
    { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { title: "Users", url: "/dashboard/admin/users", icon: Users },
    { title: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { title: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { title: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { title: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

interface DashboardSidebarProps {
  role?: UserRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = role ? menuItemsByRole[role] : [];

  const portalName =
    role === "seeker"
      ? "Seeker Portal"
      : role === "recruiter"
        ? "Recruiter Portal"
        : role === "admin"
          ? "Admin Portal"
          : "Dashboard";

  const handleLogout = async () => {
    await authClient.signOut();
    router.replace("/sign-in");
    router.refresh();
  };

  return (
    <Sidebar className="border-r border-zinc-800 bg-[#09090b] text-white">

      {/* Logo and Profile */}
      <SidebarHeader className="px-3 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-sky-400">Hire</span>
          <span className="text-orange-500">Loop</span>
        </h1>

        <div className="mt-3 flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#151519] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700">
            <Users className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">
              {portalName}
            </p>
            <p className="text-xs text-zinc-400">
              Professional Title
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.url ||
                pathname.startsWith(item.url + "/");

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.url)}
                    isActive={isActive}
                    className="h-9 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white data-[active=true]:bg-zinc-800 data-[active=true]:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Empty Middle Section */}
        <div className="mx-1 mt-4 min-h-[180px] flex-1 rounded-md border border-zinc-800 bg-[#09090b]" />
      </SidebarContent>

      {/* Bottom Section */}
      <SidebarFooter className="px-3 pb-3">
        {role === "seeker" && (
          <button
            onClick={() => router.push("/dashboard/seeker/resume")}
            className="w-full rounded-md bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Post Resume
          </button>
        )}

        <SidebarMenu className="mt-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
