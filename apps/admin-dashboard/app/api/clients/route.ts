import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { clientService } from "@klema/db";
import { hash } from "bcryptjs";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clients = await clientService.getAll();
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role === "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, slug, tierId, contactName, email, password, industry, phone, website, serviceArea } = body;

  if (!name || !tierId || !contactName || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const passwordHash = await hash(password, 12);

  const result = await clientService.spinUp({
    name,
    slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    tierId: Number(tierId),
    contactName,
    email,
    passwordHash,
    industry,
    phone,
    website,
    serviceArea,
  });

  return NextResponse.json(result, { status: 201 });
}
