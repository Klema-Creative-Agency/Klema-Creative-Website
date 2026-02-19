import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminHeader } from "@/components/AdminHeader";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Double-check: only owner and team_member allowed
  if (session.user.role === "client") {
    redirect("/login?error=unauthorized");
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminSidebar />
      <div className="ml-[240px]">
        <AdminHeader userName={session.user.name ?? "Admin"} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
