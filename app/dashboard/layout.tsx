"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { authClient } from "@/lib/auth-client";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading dashboard...</div>;
  }

  const role = session?.user?.role;

  return (
    <SidebarProvider>
      <DashboardSidebar role={session?.user?.role} />

      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;