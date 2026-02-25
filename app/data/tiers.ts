/** Tier data for dedicated service landing pages */

export interface TierPainPoint {
  icon: string;
  title: string;
  body: string;
}

export interface TierStat {
  value: string;
  label: string;
}

export interface TierDeliverable {
  title: string;
  body: string;
}

export interface TierStep {
  num: number;
  title: string;
  body: string;
}

export interface TierProofPoint {
  text: string;
}

export interface TierData {
  slug: string;
  name: string;
  tierNumber: number;
  price: string;
  setupFee: string;
  headline: string;
  sub: string;
  stats: TierStat[];
  painPoints: TierPainPoint[];
  deliverables: TierDeliverable[];
  howItWorks: TierStep[];
  roiHeadline: string;
  roiCards: { label: string; value: string; detail: string }[];
  proofPoints: TierProofPoint[];
  ctaHeadline: string;
  ctaSub: string;
  metaTitle: string;
  metaDescription: string;
  vslHeadline: string;
  vslSub: string;
  includesPrevious: string;
}

export const tiers: TierData[] = [
  {
    slug: "ai-lead-engine",
    name: "Ignition",
    tierNumber: 1,
    price: "$997",
    setupFee: "$2,500",
    headline: "You're Getting Leads.\nYou're Just Not Converting Them.",
    sub: "We build a done-for-you lead conversion funnel and automation system for your business. 60-second call trigger, automated SMS and email follow-up — so every lead gets a response instantly, even when you're on the job.",
    includesPrevious: "",
    stats: [
      { value: "78%", label: "Of jobs go to the first company that responds to a lead" },
      { value: "48%", label: "Of service businesses never follow up with a lead after first contact" },
      { value: "60 sec", label: "Our system's response time — every lead, every time, 24/7" },
    ],
    painPoints: [
      { icon: "🕳️", title: "Leads fall through the cracks", body: "You're on job sites, in meetings, or managing your crew. By the time you call back, the customer already booked someone else. No system means no second chances." },
      { icon: "⏰", title: "Slow follow-up is killing your close rate", body: "78% of jobs go to the first company that responds. If your competitor calls back in 60 seconds and you call back in 6 hours, they get the job — every time." },
      { icon: "📱", title: "No follow-up after the first attempt", body: "Lead doesn't answer? Most businesses move on. An automated SMS and email sequence keeps working the lead for days — without you lifting a finger." },
      { icon: "🔄", title: "You're losing to faster competitors", body: "The company with the best follow-up system wins — not the best service provider. Speed and consistency beat quality when the customer never talks to you." },
    ],
    deliverables: [
      { title: "Custom Lead Conversion Funnel", body: "A high-converting landing page built for your business, your services, and your market. Designed to capture every visitor and turn them into a lead." },
      { title: "60-Second Call Trigger", body: "Every new lead triggers an instant call to your phone. You answer, you close. If you miss it, the system takes over automatically." },
      { title: "Automated SMS & Email Sequences", body: "Multi-day follow-up sequences that text and email every lead until they book or opt out. Runs 24/7 without you touching anything." },
      { title: "CRM & Pipeline Dashboard", body: "See every lead, every conversation, and every stage in one place. Know exactly where every opportunity stands at all times." },
      { title: "Calendar Booking Integration", body: "Leads can book directly into your calendar. No phone tag, no back-and-forth. They pick a time, you show up." },
      { title: "Nurture Pipeline", body: "Leads who aren't ready today get dripped on automatically — so when they are ready, you're the first company they think of." },
      { title: "Monthly Optimization", body: "We review your funnel performance, conversion rates, and follow-up sequences every month. Then we optimize based on real data." },
    ],
    howItWorks: [
      { num: 1, title: "Apply Below", body: "Fill out the short application. We review every submission and respond within 1 business day." },
      { num: 2, title: "Strategy Call", body: "We learn your business, your services, and your market. Then we map out exactly how the system will work for you." },
      { num: 3, title: "We Build It", body: "Funnel, automation, CRM, and all follow-up sequences — configured and live within 7-10 business days." },
      { num: 4, title: "Leads Start Converting", body: "Every lead gets instant follow-up. Your close rate climbs. We optimize monthly and report the results." },
    ],
    roiHeadline: "One extra job per month pays for the entire system.",
    roiCards: [
      { label: "Without a system", value: "8-12% close", detail: "Slow follow-up, missed calls, no nurturing. You're working hard to generate leads — then letting most of them slip away." },
      { label: "With Ignition", value: "25-35% close", detail: "Instant response, automated follow-up, persistent nurturing. Every lead gets worked until they book or opt out." },
      { label: "Break-even", value: "1 extra job", detail: "One additional closed job per month more than covers the investment. Everything after that is pure profit." },
    ],
    proofPoints: [
      { text: "Custom lead funnel built for your business — not a template" },
      { text: "60-second call trigger on every new lead, 24/7" },
      { text: "Automated SMS & email follow-up that runs without you" },
      { text: "Full CRM with pipeline tracking and calendar booking" },
      { text: "Month-to-month — no contracts, no lock-in, cancel anytime" },
    ],
    ctaHeadline: "Ready to stop losing leads?",
    ctaSub: "Your leads are already coming in. Let's make sure every single one gets followed up — instantly, automatically, and relentlessly.",
    metaTitle: "Ignition — Lead Conversion System for Service Businesses | Klema Creative",
    metaDescription: "Done-for-you lead conversion funnel and automation system for local service businesses. 60-second follow-up, automated SMS & email, CRM dashboard. $997/mo.",
    vslHeadline: "See How Ignition Converts More of the Leads You Already Get",
    vslSub: "Watch the walkthrough to see how instant follow-up, automated sequences, and a built-for-you funnel work together to close more jobs.",
  },
  {
    slug: "foundation",
    name: "Foundation",
    tierNumber: 2,
    price: "$1,997",
    setupFee: "$2,500",
    headline: "You're Invisible on Google.\nYour Competitors Aren't.",
    sub: "We handle your SEO, Google Business Profile, and reputation management — so new customers find you first and trust you instantly. Built on top of our Lead Engine, so every new lead gets followed up automatically.",
    includesPrevious: "Everything in Ignition (Lead Engine) is included.",
    stats: [
      { value: "46%", label: "Of all Google searches are looking for local businesses" },
      { value: "88%", label: "Of consumers trust online reviews as much as personal referrals" },
      { value: "3x", label: "More calls from a fully optimized Google Business Profile" },
    ],
    painPoints: [
      { icon: "🔍", title: "You're not showing up on Google", body: "When someone searches for your service in your city, your competitors appear — not you. Every day you're invisible is a day they're getting your customers." },
      { icon: "⭐", title: "Your competitor has 200 reviews. You have 12.", body: "Customers pick the business with more reviews — even if you're better. Without an automated system asking for reviews after every job, you'll always be behind." },
      { icon: "📍", title: "Your Google Business Profile is working against you", body: "Incomplete listing, wrong hours, no posts, stale photos. Google sees neglect and pushes you down. Your competitors are posting weekly — are you?" },
      { icon: "📉", title: "You're paying for visibility you could earn for free", body: "Organic leads from Google cost $0 per click. But you have to show up first. Without SEO, you're leaving the cheapest leads on the table." },
    ],
    deliverables: [
      { title: "Search Engine Optimization", body: "We optimize your site for the services and areas you care about. Keyword targeting, on-page SEO, and technical fixes that move you up in local results." },
      { title: "Google Business Profile Management", body: "Fully optimized listing with weekly posts, updated photos, service descriptions, and Q&A management. Google rewards active profiles." },
      { title: "Reputation Engine", body: "Automated review requests sent to every customer after the job. SMS and email — they tap a link and leave a review in 30 seconds." },
      { title: "AI Visibility (AEO)", body: "We add schema markup, structured data, and optimize your content so AI platforms like ChatGPT, Gemini, and Perplexity know your business exists and recommend you." },
      { title: "Local Visibility Tracking", body: "See exactly where you rank in your city, by keyword, updated monthly. Know what's working and where to push harder." },
      { title: "Monthly Performance Report", body: "Rankings, traffic, reviews, and lead conversion — all in one report. No guesswork. Clear data, delivered to your dashboard." },
      { title: "Lead Engine Included", body: "Your conversion funnel, 60-second call trigger, and automated follow-up are all running underneath. Every new visitor and lead is captured and worked automatically." },
    ],
    howItWorks: [
      { num: 1, title: "Apply Below", body: "Fill out the short application. We review every submission and respond within 1 business day." },
      { num: 2, title: "Strategy Call", body: "We audit your current Google presence, reviews, and local rankings. Then we map out exactly what needs to happen." },
      { num: 3, title: "We Build It", body: "SEO, Google Business Profile, reputation engine, and your Lead Engine funnel — all configured and live within 10-14 business days." },
      { num: 4, title: "You Start Ranking", body: "New leads find you on Google. Reviews start building. Your phone rings more. We optimize every month and report the results." },
    ],
    roiHeadline: "Every spot you move up on Google is more money in your pocket.",
    roiCards: [
      { label: "Without SEO", value: "Page 2+", detail: "Invisible. 75% of searchers never scroll past page 1. You're paying for ads to get traffic you could earn for free." },
      { label: "With Foundation", value: "Top 3", detail: "Ranking in the local pack for your core services. Organic leads cost $0 per click and compound over time." },
      { label: "Review growth", value: "10-15/mo", detail: "New 5-star reviews every month on autopilot. In 6 months, you'll have more reviews than most competitors in your area." },
    ],
    proofPoints: [
      { text: "Full Lead Engine included — funnel, call trigger, SMS & email automation" },
      { text: "SEO that targets the services and cities you actually care about" },
      { text: "Automated review requests after every job — builds reputation on autopilot" },
      { text: "Month-to-month — no contracts, no lock-in, cancel anytime" },
    ],
    ctaHeadline: "Ready to get found?",
    ctaSub: "Stop being invisible. Your customers are searching right now — let's make sure they find you first.",
    metaTitle: "Foundation — SEO, Reputation & Lead Conversion | Klema Creative",
    metaDescription: "Done-for-you SEO, reputation management, and lead conversion system for local service businesses. Get found on Google and convert more leads. $1,997/mo.",
    vslHeadline: "See How Foundation Gets You Found on Google",
    vslSub: "Watch the walkthrough to see how SEO, reputation management, and automated lead follow-up work together to fill your pipeline.",
  },
  {
    slug: "accelerator",
    name: "Accelerator",
    tierNumber: 3,
    price: "$3,997",
    setupFee: "$5,000",
    headline: "Your Website Is Costing You Jobs.\nLet's Fix That.",
    sub: "We build you a custom, high-performance website, run your paid ads, and give you a branded dashboard to see everything working. Built on top of Foundation — so your SEO, reputation, and Lead Engine are all running underneath.",
    includesPrevious: "Everything in Foundation (SEO, Reputation, Lead Engine) is included.",
    stats: [
      { value: "75%", label: "Of consumers judge a company's credibility by their website" },
      { value: "3 sec", label: "Average time before a visitor decides to stay or bounce" },
      { value: "4x", label: "More leads from a conversion-optimized site vs a template site" },
    ],
    painPoints: [
      { icon: "💻", title: "Your website doesn't match your work", body: "You do $50K jobs but your site looks like it was built in a weekend. Customers see your truck, Google you, and bounce. First impressions happen online now." },
      { icon: "📱", title: "70% of your visitors are on mobile — and leaving", body: "Slow load times, tiny text, buttons you can't tap. If your site takes more than 3 seconds to load on a phone, 40% of visitors are gone." },
      { icon: "💸", title: "You're paying for ads that land on a bad page", body: "Running Google or Facebook ads to a site that doesn't convert is burning money. You're paying for the click, then losing the lead at the front door." },
      { icon: "📊", title: "You have no idea what's working", body: "No dashboard, no reporting, no clarity. How many leads came from Google vs Facebook vs referrals? Without data, you're guessing." },
    ],
    deliverables: [
      { title: "Custom-Designed Website", body: "High-performance, mobile-first website designed to convert. Not a template — custom built for your business, your services, and your customers." },
      { title: "Paid Ad Management", body: "We build, manage, and optimize your Google and Meta ad campaigns. Your ad spend is billed directly to you — we handle the strategy and execution." },
      { title: "Branded Reporting Dashboard", body: "Log in anytime and see your leads, rankings, ad performance, and ROI in one place. Your name on it, your data inside." },
      { title: "Content Planning", body: "We map out what to publish, where, and when. Blog topics, landing pages, seasonal campaigns — all planned around what drives revenue." },
      { title: "Monthly Strategy Call", body: "Not a status update — a working session where we review results, plan the next month, and adjust strategy based on real data." },
      { title: "Foundation Included", body: "SEO, Google Business Profile, reputation engine, Lead Engine funnel, and all automation from the lower tiers are running underneath." },
    ],
    howItWorks: [
      { num: 1, title: "Apply Below", body: "Fill out the short application. We review every submission and respond within 1 business day." },
      { num: 2, title: "Strategy Call", body: "We audit your current site, ad history, and market. Then design the roadmap for your new online presence." },
      { num: 3, title: "We Build Everything", body: "Custom website, ad campaigns, reporting dashboard, and all automation underneath — built and tested within 3-4 weeks." },
      { num: 4, title: "Leads Pour In", body: "Your new site converts, your ads drive qualified traffic, and your Lead Engine follows up on every lead instantly. We optimize monthly." },
    ],
    roiHeadline: "Same traffic. Better site. More booked jobs.",
    roiCards: [
      { label: "Template site", value: "2% conversion", detail: "Slow, generic, not built for your customer. Most visitors leave without doing anything." },
      { label: "Custom site + ads", value: "8%+ conversion", detail: "Fast, beautiful, built to convert. Paid ads drive qualified traffic to a page designed to capture them." },
      { label: "Full visibility", value: "Every dollar tracked", detail: "See exactly which leads came from Google, which from ads, and what your cost per booked job is." },
    ],
    proofPoints: [
      { text: "Custom website built for conversion — not a template" },
      { text: "Google & Meta ad campaigns managed by our team" },
      { text: "Full SEO, reputation, and Lead Engine running underneath" },
      { text: "Branded dashboard — see everything in one place" },
      { text: "Month-to-month — no contracts, cancel anytime" },
    ],
    ctaHeadline: "Ready to look like the biggest company in your market?",
    ctaSub: "Your competitors are investing in their online presence. The longer you wait, the harder it gets to catch up.",
    metaTitle: "Accelerator — Custom Website, Ads & Full Digital Presence | Klema Creative",
    metaDescription: "Custom website, paid ad management, SEO, reputation, and lead conversion — all in one system. Look like the biggest company in your market. $3,997/mo.",
    vslHeadline: "See How Accelerator Transforms Your Online Presence",
    vslSub: "Watch the walkthrough to see how a custom website, paid ads, and full automation work together to dominate your market online.",
  },
  {
    slug: "authority",
    name: "Authority",
    tierNumber: 4,
    price: "$7,500",
    setupFee: "$7,500",
    headline: "You Don't Have Time for Marketing.\nThat's Our Job.",
    sub: "We run your entire marketing operation — content, social media, email campaigns, ad strategy, and everything else. You focus on running your business. Built on top of Accelerator, so your site, ads, SEO, and Lead Engine are all included.",
    includesPrevious: "Everything in Accelerator (Website, Ads, SEO, Reputation, Lead Engine) is included.",
    stats: [
      { value: "10+ hrs", label: "Per week the average business owner spends on marketing tasks" },
      { value: "47%", label: "Of small businesses handle marketing entirely on their own" },
      { value: "3x", label: "Revenue growth for businesses with consistent content + social presence" },
    ],
    painPoints: [
      { icon: "⏰", title: "Marketing always falls to the bottom of the list", body: "You know you should be posting on social media, writing blog articles, and sending emails. But there are jobs to run, crews to manage, and invoices to send. Marketing never happens." },
      { icon: "🎯", title: "You're doing 5 jobs and none of them well", body: "Owner, estimator, project manager, bookkeeper, marketing director. When you try to do everything, marketing gets the scraps of your time and energy." },
      { icon: "📱", title: "Your social media is dead or inconsistent", body: "A post here, a post there, then three months of silence. Inconsistency kills credibility. Your competitors are posting daily and building audiences." },
      { icon: "📧", title: "Your past customers don't hear from you", body: "You have a list of hundreds of past customers and you never email them. No seasonal offers, no reactivation, no referral requests. Revenue is sitting in your database." },
    ],
    deliverables: [
      { title: "Content Creation & Publishing", body: "4-6 SEO-optimized blog articles per month — researched, written, and published on your site. Built to rank and drive organic traffic." },
      { title: "Social Media Management", body: "2 platforms, 16-20 posts per month. Branded graphics, captions, hashtags, scheduling, and community management — all handled by our team." },
      { title: "Email Marketing Campaigns", body: "Monthly email campaigns to your customer list — seasonal offers, company updates, referral requests, and reactivation sequences that pull revenue from your existing database." },
      { title: "Ad Strategy & Scaling", body: "We don't just manage your ads — we build the strategy around what's working in your funnel and SEO data. We scale budget toward winners and cut losers." },
      { title: "Competitor Monitoring", body: "We track what your competitors are doing online — their ads, their content, their rankings — and adjust your strategy to stay ahead." },
      { title: "Full AI Visibility (AEO)", body: "We create content specifically designed to get cited by ChatGPT, Gemini, Perplexity, and other AI platforms. Your business becomes the answer when customers ask AI for recommendations." },
      { title: "Conversion Optimization", body: "Ongoing A/B testing on your funnel, website, and landing pages. Small improvements compound into major revenue gains over months." },
      { title: "Bi-Weekly Strategy Calls", body: "Not status updates — working sessions where we plan the next 2 weeks based on data. Plus quarterly business reviews for the big picture." },
      { title: "Accelerator Included", body: "Custom website, paid ads, branded dashboard, SEO, reputation engine, and Lead Engine — all running and optimized underneath." },
    ],
    howItWorks: [
      { num: 1, title: "Apply Below", body: "Fill out the short application. We review every submission and respond within 1 business day." },
      { num: 2, title: "Strategy Session", body: "Deep dive into your business — revenue goals, services, audience, competitors, and content opportunities. We build your marketing roadmap." },
      { num: 3, title: "We Take Over", body: "Website, ads, SEO, content, social, email, reputation — all built, launched, and managed by our team within 3-4 weeks." },
      { num: 4, title: "You Focus on Your Business", body: "Marketing runs in the background. Leads flow in. Content publishes. Ads optimize. You get bi-weekly calls and a full quarterly review." },
    ],
    roiHeadline: "What would you do with 10 extra hours a week?",
    roiCards: [
      { label: "Doing it yourself", value: "10+ hrs/week", detail: "Scattered effort, inconsistent results, constant stress. Marketing competes with everything else on your plate." },
      { label: "With Authority", value: "0 hrs/week", detail: "Our team handles content, social, email, ads, and strategy. You show up to bi-weekly calls and close jobs." },
      { label: "Compounding growth", value: "Month over month", detail: "Content ranks. Reviews build. Social audience grows. Email list converts. Every month stacks on the last." },
    ],
    proofPoints: [
      { text: "4-6 blog articles, social media, and email campaigns — all done for you" },
      { text: "Full website, ads, SEO, reputation, and Lead Engine included" },
      { text: "Bi-weekly strategy calls + quarterly business reviews" },
      { text: "Competitor monitoring so you're always one step ahead" },
      { text: "Month-to-month — no contracts, cancel anytime" },
    ],
    ctaHeadline: "Ready to stop doing it all yourself?",
    ctaSub: "The best businesses have marketing teams. Now you do too — without the overhead.",
    metaTitle: "Authority — Full Marketing Management | Klema Creative",
    metaDescription: "Full marketing management for local service businesses. Content, social, email, ads, SEO, and lead conversion — all managed by our team. $7,500/mo.",
    vslHeadline: "See How Authority Runs Your Entire Marketing Operation",
    vslSub: "Watch the walkthrough to see how we take marketing completely off your plate — content, social, ads, and everything in between.",
  },
  {
    slug: "dominator",
    name: "Dominator",
    tierNumber: 5,
    price: "$12,000",
    setupFee: "$10,000",
    headline: "Your Phone Only Rings When\nSomeone Is Ready to Book.",
    sub: "We don't just generate and nurture leads — our dedicated team calls every lead in 60 seconds, qualifies them, and either transfers them live to you or books them into your calendar. You just close.",
    includesPrevious: "Everything in Authority (Full Marketing, Website, Ads, SEO, Reputation, Lead Engine) is included.",
    stats: [
      { value: "78%", label: "Of jobs go to the first company that responds to a lead" },
      { value: "60 sec", label: "Our team's target response time — every lead, every time" },
      { value: "35-50%", label: "Close rate on pre-qualified, live-transferred leads" },
    ],
    painPoints: [
      { icon: "📱", title: "You're still answering your own phone", body: "You're on a roof, under a sink, or in a patient's mouth — and leads are calling. You can't answer. By the time you call back, they've booked someone else." },
      { icon: "🕳️", title: "Unqualified leads waste your time", body: "You drive 45 minutes to an estimate and the homeowner has a $500 budget for a $5,000 job. Without pre-qualification, you're quoting people who were never going to buy." },
      { icon: "🌙", title: "After-hours leads disappear", body: "Leads come in nights and weekends — when your office is closed. Without a team working those leads in real-time, they call the next company on the list." },
      { icon: "🔄", title: "No one is working your pipeline", body: "You have leads from last week, last month, and last quarter sitting untouched. Without dedicated outbound follow-up, that revenue evaporates." },
    ],
    deliverables: [
      { title: "Dedicated Lead Team", body: "Trained callers assigned to your account who contact every single lead within 60 seconds — calls, texts, and voicemail drops. Your coverage never stops." },
      { title: "Lead Qualification", body: "Our team qualifies every lead on budget, timeline, scope, and decision-making authority. Your phone only rings when someone is actually ready to move forward." },
      { title: "Live Hot Transfers", body: "When a lead is qualified and ready, we transfer them directly to your sales team or technician while they're still on the line. No phone tag. No delays." },
      { title: "Appointment Setting", body: "Leads who aren't ready for a transfer get booked directly into your calendar with full notes — service needed, budget discussed, timeline confirmed." },
      { title: "Outbound Follow-Up", body: "Leads who didn't convert on first contact get called back on a structured schedule — day 1, day 3, day 7, day 14 — until they book or opt out." },
      { title: "Daily Lead Reports", body: "Every morning you see exactly what came in, what was qualified, what was booked, and what's still in the pipeline. Full transparency, zero guesswork." },
      { title: "Weekly Call Reviews", body: "We review call recordings, coach the callers, and tighten the script based on what's closing. Continuous improvement on your specific market and services." },
      { title: "Authority Included", body: "Full marketing management, custom website, paid ads, SEO, content, social, email, reputation, and Lead Engine — all running and optimized underneath." },
    ],
    howItWorks: [
      { num: 1, title: "Apply Below", body: "Fill out the short application. We review every submission and respond within 1 business day." },
      { num: 2, title: "Strategy Session", body: "Deep dive into your sales process, qualification criteria, and ideal customer. We build the call script and qualification framework." },
      { num: 3, title: "We Build & Train", body: "Full marketing system goes live. Lead team is trained on your business, services, pricing, and service area. Ready in 3-4 weeks." },
      { num: 4, title: "You Just Close", body: "Leads flow in. Our team calls, qualifies, and transfers or books them. You show up, close the deal, and do the work. We handle everything else." },
    ],
    roiHeadline: "What's your close rate on a pre-qualified, warm transfer?",
    roiCards: [
      { label: "Cold leads", value: "10-15% close", detail: "Unqualified, slow follow-up, competing with 3 other companies. You're selling uphill from the first conversation." },
      { label: "Hot transfers", value: "35-50% close", detail: "Pre-qualified, budget-confirmed, transferred live while they're ready. The selling is already done — you just confirm and book." },
      { label: "Time saved", value: "20+ hrs/week", detail: "No more chasing leads, playing phone tag, or quoting tire-kickers. Every conversation you have is with someone ready to buy." },
    ],
    proofPoints: [
      { text: "Dedicated lead team — every lead called within 60 seconds" },
      { text: "Pre-qualified on budget, timeline, and scope before you hear from them" },
      { text: "Live hot transfers to your phone when they're ready to book" },
      { text: "Full marketing, website, ads, SEO, and Lead Engine included" },
      { text: "Month-to-month — no contracts, cancel anytime" },
    ],
    ctaHeadline: "Ready to stop chasing leads?",
    ctaSub: "Your competitors are talking to cold leads. You'll only talk to people who are ready to buy.",
    metaTitle: "Dominator — Dedicated Lead Team & Full Marketing | Klema Creative",
    metaDescription: "Dedicated lead team, live hot transfers, appointment setting, and full marketing management. Your phone only rings when someone is ready to book. $12,000/mo.",
    vslHeadline: "See How Dominator Fills Your Calendar With Qualified Leads",
    vslSub: "Watch the walkthrough to see how our dedicated lead team calls, qualifies, and transfers leads directly to you — so you just close.",
  },
];

/** Look up a tier by its URL slug */
export function getTierBySlug(slug: string): TierData | undefined {
  return tiers.find((t) => t.slug === slug);
}
