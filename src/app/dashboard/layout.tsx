import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell/DashboardShell";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";
  const session = await getServerSession(authOptions);

  if (!session?.user && !isDev) {
    redirect("/");
  }

  const user = {
    id: (session?.user as { id?: string } | undefined)?.id,
    name: session?.user?.name ?? "Local Test User",
    email: session?.user?.email ?? "local@test.matchtec.co",
    image: session?.user?.image ?? null,
  };

  return <div className="home-bg"><DashboardShell user={user}>{children}</DashboardShell></div>;
}
