import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(
      "[proposal-webhook] Signature verification failed:",
      err instanceof Error ? err.message : err
    );
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const meta = intent.metadata;

    console.log("[proposal-webhook] Payment succeeded:", {
      slug: meta.proposal_slug,
      client: meta.client_name,
      business: meta.client_business,
      project: meta.project,
      amount: intent.amount / 100,
      currency: intent.currency,
    });

    // Optional: forward to GHL
    const ghlUrl = process.env.GHL_PROPOSAL_WEBHOOK_URL;
    if (ghlUrl && !ghlUrl.includes("REPLACE")) {
      try {
        const res = await fetch(ghlUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "proposal_payment_succeeded",
            proposal_slug: meta.proposal_slug,
            client_name: meta.client_name,
            client_business: meta.client_business,
            project: meta.project,
            amount: intent.amount / 100,
            currency: intent.currency,
            setup_fee: meta.setup_fee,
            monthly_rate: meta.monthly_rate,
            stripe_payment_id: intent.id,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          console.error("[proposal-webhook] GHL webhook error:", res.status);
        }
      } catch (err) {
        console.error(
          "[proposal-webhook] GHL webhook fetch error:",
          err instanceof Error ? err.message : err
        );
      }
    }
  }

  return Response.json({ received: true });
}
