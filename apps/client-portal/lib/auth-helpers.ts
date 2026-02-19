import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { queryAll } from "@klema/db";

export async function getSession() {
  return auth();
}

export async function withClientAuth(
  handler: (
    session: NonNullable<Awaited<ReturnType<typeof auth>>>,
    clientId: string,
  ) => Promise<Response>,
  clientIdParam?: string,
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Owner and team members can access any client
  if (session.user.role === "owner" || session.user.role === "team_member") {
    const resolvedClientId = clientIdParam ?? session.user.clientId;
    if (!resolvedClientId) {
      return NextResponse.json({ error: "Client ID required" }, { status: 400 });
    }
    return handler(session, resolvedClientId);
  }

  // Client users can only access their own data
  if (session.user.role === "client") {
    const clientId = session.user.clientId;
    if (!clientId) {
      return NextResponse.json({ error: "No client associated" }, { status: 403 });
    }
    // If a specific client ID was requested, verify access
    if (clientIdParam && clientIdParam !== clientId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }
    return handler(session, clientId);
  }

  return NextResponse.json({ error: "Invalid role" }, { status: 403 });
}

export async function getClientIdsForUser(userId: string): Promise<string[]> {
  const rows = await queryAll<{ client_id: string }>(
    "SELECT client_id FROM client_users WHERE user_id = $1",
    [userId],
  );
  return rows.map((r) => r.client_id);
}
