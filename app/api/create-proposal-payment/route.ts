import Stripe from "stripe";
import { getProposalBySlug } from "@/app/data/proposals";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  let body: { slug?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { slug } = body;
  if (!slug) {
    return Response.json({ error: "Missing slug" }, { status: 400 });
  }

  const proposal = getProposalBySlug(slug);
  if (!proposal) {
    return Response.json({ error: "Proposal not found" }, { status: 404 });
  }

  if (proposal.status !== "active") {
    return Response.json(
      { error: "This proposal is no longer active." },
      { status: 410 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: proposal.stripeConfig.priceAmountCents,
      currency: proposal.stripeConfig.currency,
      description: proposal.stripeConfig.description,
      automatic_payment_methods: { enabled: true },
      metadata: {
        proposal_slug: proposal.slug,
        client_name: proposal.clientName,
        client_business: proposal.clientBusinessName,
        project: proposal.projectName,
        setup_fee: String(proposal.pilotTerms.setupFee),
        monthly_rate: String(proposal.pilotTerms.monthlyRate),
      },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[create-proposal-payment] Stripe error:", message);
    return Response.json(
      { error: "Could not create payment. Please try again.", detail: message },
      { status: 500 }
    );
  }
}
