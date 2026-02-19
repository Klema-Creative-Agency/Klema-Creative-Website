import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { clientService } from "@klema/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Client users can only access their own dashboard
  if (session.user.role === "client" && session.user.clientId !== id) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const dashboard = await clientService.getDashboard(id);
  if (!dashboard.client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(dashboard);
}
