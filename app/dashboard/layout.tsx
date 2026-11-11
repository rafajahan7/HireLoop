
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "../components/DashboardSidebar";
import { authClient } from "@/lib/auth-client";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <div className="p-6">Loading dashboard...</div>;
  }

 const role = session.user.role as "seeker" | "recruiter" | "admin";

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />

      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
