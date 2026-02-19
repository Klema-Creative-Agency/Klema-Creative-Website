import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getTier, getTierPortalFeatures } from "@klema/shared";
import { queryOne } from "@klema/db";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isInternal = session.user.role === "owner" || session.user.role === "team_member";

  // Internal users see all features; clients see tier-gated features
  const tierId = session.user.tierId ?? (isInternal ? 3 : 1);
  const features = getTierPortalFeatures(tierId);
  const tier = getTier(tierId);

  // Get client name
  let clientName = "Client Portal";
  let tierLabel = tier.name;
  if (session.user.clientId) {
    const client = await queryOne<{ name: string }>(
      "SELECT name FROM clients WHERE id = $1",
      [session.user.clientId],
    );
    if (client) clientName = client.name;
  } else if (isInternal) {
    clientName = "Klema Creative";
    tierLabel = session.user.role === "owner" ? "Owner" : "Team";
  }

  // Get unread notification count
  const unread = await queryOne<{ count: number }>(
    "SELECT COUNT(*)::int as count FROM notifications WHERE user_id = $1 AND is_read = false",
    [session.user.id],
  );

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar features={features} clientName={clientName} tierName={tierLabel} />
      <div className="ml-[240px]">
        <Header userName={session.user.name ?? "User"} unreadCount={unread?.count ?? 0} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
