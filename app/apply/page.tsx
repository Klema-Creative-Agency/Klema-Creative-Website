"use client";

import { useState, useCallback, useMemo, useRef } from "react";

// ============================================================
// TYPES
// ============================================================
interface ChoiceOption {
  text: string;
  scores: Record<string, number>;
}

interface Question {
  type: "choice" | "likert";
  text: string;
  options?: ChoiceOption[];
  scores?: Record<string, number>;
  isSD?: boolean; // social desirability check
}

interface Section {
  id: string;
  label: string;
  title: string;
  desc: string;
  questions: Question[];
}

// ============================================================
// QUESTION DATA — Audited & Rebalanced
// ============================================================
const SECTIONS: Section[] = [
  {
    id: "self-sufficiency",
    label: "Part 1 of 7",
    title: "Working Independently",
    desc: "How you handle figuring things out and operating on your own.",
    questions: [
      {
        type: "choice",
        text: "You\u2019re assigned a task using a tool you\u2019ve never seen before. What do you do first?",
        options: [
          { text: "Google it, watch a tutorial, and start experimenting immediately", scores: { ss: 5, ps: 4, dev: 3, labs: 3 } },
          { text: "Ask a coworker to walk me through it once, then handle it from there", scores: { ss: 3, ps: 3, cs: 2, creative: 2 } },
          { text: "Follow my manager\u2019s recommended approach \u2014 they know the context best", scores: { ss: 2, cs: 3, inline: 3, del: 1 } },
          { text: "Try clicking around to figure it out \u2014 I learn best by doing", scores: { ss: 4, ps: 4, sm: 2, dev: 2, labs: 2 } },
        ],
      },
      {
        type: "choice",
        text: "Your manager is out sick and a client issue comes up that needs a response today. What\u2019s your move?",
        options: [
          { text: "Handle it using what I know, then loop in my manager when they\u2019re back", scores: { ss: 5, ps: 3, lead: 3, creative: 3, cs: 3 } },
          { text: "Send the client a professional holding response and flag it for when my manager returns", scores: { ss: 3, ps: 2, cs: 3, creative: 2, inline: 1 } },
          { text: "Find someone else on the team who can help make the call", scores: { ss: 2, del: 3, cs: 2, inline: 2 } },
          { text: "Respect the chain of command \u2014 respond to the client that you\u2019ll have an update tomorrow", scores: { ss: 1, inline: 3, cs: 2, del: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You notice a process at work is inefficient but nobody has complained about it. What do you do?",
        options: [
          { text: "Build a better version and present it as a suggestion", scores: { ss: 4, sm: 4, ps: 3, lead: 2, labs: 3, dev: 2 } },
          { text: "Document the issue and propose a fix to your manager", scores: { ss: 4, sm: 3, lead: 3, creative: 3 } },
          { text: "Bring it up with the team to see if others have the same pain point", scores: { ss: 2, sm: 2, sales: 2, cs: 2, creative: 2 } },
          { text: "Work within the current process \u2014 it might exist for reasons you don\u2019t see yet", scores: { ss: 1, sm: 1, inline: 3, cs: 2 } },
        ],
      },
      {
        type: "likert",
        text: "When I hit a roadblock, my first instinct is to research solutions myself before asking for help.",
        scores: { ss: 1, ps: 0.8, labs: 0.3, dev: 0.3 },
      },
      {
        type: "likert",
        text: "I\u2019m comfortable making decisions without getting approval first when time is limited.",
        scores: { ss: 1, lead: 0.6, creative: 0.3 },
      },
      {
        type: "likert",
        text: "I tend to create my own systems, checklists, or workflows to stay organized.",
        scores: { ss: 0.8, sm: 0.5, lead: 0.3, labs: 0.3 },
      },
      {
        type: "likert",
        text: "I feel comfortable owning a project end-to-end with minimal supervision.",
        scores: { ss: 1, sm: 0.5, lead: 0.5, creative: 0.3 },
      },
      {
        type: "likert",
        text: "When priorities shift suddenly, I adjust quickly without losing momentum or getting frustrated.",
        scores: { ps: 0.6, ss: 0.5, creative: 0.3, lead: 0.2 },
      },
    ],
  },
  {
    id: "problem-solving",
    label: "Part 2 of 7",
    title: "Problem Solving",
    desc: "How you approach challenges, breakdowns, and ambiguity.",
    questions: [
      {
        type: "choice",
        text: "A system you rely on daily suddenly stops working. No one on the team knows why. What\u2019s your approach?",
        options: [
          { text: "Start troubleshooting \u2014 check logs, test inputs, isolate the variable that changed", scores: { ps: 5, ss: 3, dev: 4, labs: 4 } },
          { text: "Research if others online have hit the same issue and piece together a fix", scores: { ps: 4, ss: 3, dev: 3, labs: 3 } },
          { text: "Identify a workaround so work doesn\u2019t stop while someone investigates", scores: { ps: 3, ss: 3, lead: 2, creative: 3, cs: 2 } },
          { text: "Report it with as much detail as possible and focus on tasks you can still complete", scores: { ps: 2, ss: 2, inline: 3, cs: 2, del: 1 } },
        ],
      },
      {
        type: "choice",
        text: "A client says your deliverable \u2018doesn\u2019t feel right\u2019 but can\u2019t explain what\u2019s wrong. How do you handle it?",
        options: [
          { text: "Ask targeted questions to uncover what they actually expected vs. what they got", scores: { ps: 5, cs: 4, creative: 3, sales: 2 } },
          { text: "Present 2\u20133 alternative directions and let them react to see what sticks", scores: { ps: 4, des: 4, creative: 3, mktg: 1 } },
          { text: "Go back to the original brief and compare to make sure nothing was missed", scores: { ps: 3, ss: 3, cs: 2, inline: 2 } },
          { text: "Loop in a senior team member who may have more context on the client\u2019s style", scores: { ps: 2, del: 2, cs: 2, creative: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You\u2019re given two priorities that directly conflict \u2014 both are urgent and from different stakeholders. What do you do?",
        options: [
          { text: "Assess real impact of each, make a call, and communicate it to both stakeholders", scores: { ps: 5, lead: 4, del: 2, creative: 2 } },
          { text: "Do the fastest one first to clear it, then give the other one full attention", scores: { ps: 3, ss: 3, sm: 2, inline: 1 } },
          { text: "Escalate to whoever can break the tie \u2014 getting clarity prevents wasted work", scores: { ps: 2, del: 3, cs: 2, inline: 2 } },
          { text: "Communicate the conflict to both stakeholders and negotiate a realistic timeline for each", scores: { ps: 4, lead: 3, cs: 3, creative: 2 } },
        ],
      },
      {
        type: "choice",
        text: "You realize halfway through a project that the original approach isn\u2019t going to work. What\u2019s your reaction?",
        options: [
          { text: "Pivot fast \u2014 salvage what\u2019s useful, redesign the approach, keep moving", scores: { ps: 5, ss: 4, sm: 3, labs: 3 } },
          { text: "Flag it immediately to stakeholders with a new plan before continuing", scores: { ps: 4, lead: 3, creative: 2, cs: 2 } },
          { text: "Step back and analyze what went wrong before deciding next steps", scores: { ps: 4, ss: 2, labs: 2, dev: 2 } },
          { text: "Check if the original approach can still work with modifications \u2014 preserve the time invested", scores: { ps: 2, ss: 2, inline: 2, sm: 1 } },
        ],
      },
      {
        type: "choice",
        text: "A project you led misses its deadline. Your manager asks what happened. What\u2019s your honest first response?",
        options: [
          { text: "I take full ownership \u2014 here\u2019s what went wrong, what I should have done differently, and my plan to recover", scores: { lead: 5, ss: 4, ps: 3, creative: 3 } },
          { text: "I walk through the timeline showing where delays came from \u2014 some mine, some external \u2014 and propose how to avoid them next time", scores: { ps: 4, lead: 3, ss: 3, labs: 2 } },
          { text: "I explain the external factors honestly \u2014 the specs changed, another team was late, the tool broke", scores: { ps: 2, cs: 2, inline: 2 } },
          { text: "I don\u2019t let deadlines slip in the first place \u2014 I would have flagged the risk early enough to adjust", scores: { ss: 3, lead: 3, ps: 2, sm: 2 } },
        ],
      },
      {
        type: "likert",
        text: "I enjoy solving problems that don\u2019t have an obvious right answer.",
        scores: { ps: 1, labs: 0.3, dev: 0.3 },
      },
      {
        type: "likert",
        text: "When something breaks, I find the troubleshooting process genuinely interesting.",
        scores: { ps: 1, dev: 0.5, labs: 0.5 },
      },
      {
        type: "likert",
        text: "I can hold multiple possible solutions in my head and evaluate trade-offs between them.",
        scores: { ps: 0.8, lead: 0.4, labs: 0.3 },
      },
      {
        type: "likert",
        text: "I have never submitted work with an error in it.",
        scores: { ss: 0.2 },
        isSD: true,
      },
    ],
  },
  {
    id: "motivation",
    label: "Part 3 of 7",
    title: "Drive & Follow-Through",
    desc: "What keeps you going when no one is watching \u2014 and whether you finish what you start.",
    questions: [
      {
        type: "choice",
        text: "It\u2019s 4:45 PM on a Friday. You\u2019ve finished your assigned work. What do you do?",
        options: [
          { text: "Look for what else needs doing \u2014 there\u2019s always something to improve", scores: { sm: 4, ss: 3, lead: 2, creative: 2 } },
          { text: "Use the time to learn something new \u2014 a tool, a skill, an article", scores: { sm: 4, ss: 3, dev: 3, labs: 3 } },
          { text: "Check if any teammates need help with their workload", scores: { sm: 3, del: 3, cs: 2, lead: 2 } },
          { text: "Wrap up cleanly and recharge \u2014 I do my best work when I start fresh", scores: { sm: 1, ss: 1, inline: 2, cs: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You\u2019ve been doing the same tasks for a few months and they\u2019re getting repetitive. How do you respond?",
        options: [
          { text: "Find ways to automate or speed them up so I can take on new challenges", scores: { sm: 5, ps: 3, ss: 3, labs: 4, dev: 3 } },
          { text: "Talk to my manager about growing my role or getting new responsibilities", scores: { sm: 4, lead: 2, creative: 2, sales: 1 } },
          { text: "Focus on doing them extremely well \u2014 mastery matters even in routine", scores: { sm: 3, ss: 2, inline: 3, des: 1 } },
          { text: "Stay consistent \u2014 reliability on the basics is what makes a team work", scores: { sm: 2, inline: 3, cs: 2, del: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You\u2019ve had a calm week \u2014 no emergencies, no fires, just your normal task list. How do you feel?",
        options: [
          { text: "Productive and focused \u2014 I love predictable weeks where I can go deep", scores: { sm: 4, ss: 3, inline: 3, labs: 2, des: 1 } },
          { text: "I use the calm to plan ahead and build systems for the next busy period", scores: { sm: 5, lead: 3, labs: 3, ss: 3, creative: 1 } },
          { text: "Restless \u2014 I start looking for problems to solve or new things to start", scores: { sm: 3, ss: 2, ps: 2, creative: 2 } },
          { text: "A bit bored, honestly \u2014 I do my best work under pressure", scores: { sm: 1, ss: 1, creative: 1, sales: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You\u2019re midway through a project that has become tedious. A new, exciting opportunity lands on your desk. What do you do?",
        options: [
          { text: "Finish the current project first \u2014 I don\u2019t leave things half-done", scores: { sm: 5, ss: 4, inline: 3, del: 2 } },
          { text: "Hand off the current project with a clean brief so I can focus on the new one", scores: { del: 4, sm: 3, lead: 2, creative: 1 } },
          { text: "Start the new project while keeping the old one moving \u2014 I can juggle both", scores: { sm: 3, ss: 2, ps: 2, creative: 1 } },
          { text: "Bring both to my manager and ask which should be prioritized", scores: { del: 2, lead: 1, cs: 2, inline: 2 } },
        ],
      },
      {
        type: "likert",
        text: "I feel restless when I don\u2019t have a challenging problem to work on.",
        scores: { sm: 0.8, ps: 0.4, labs: 0.3 },
      },
      {
        type: "likert",
        text: "I regularly learn new skills or tools on my own, even when nobody asks me to.",
        scores: { sm: 1, ss: 0.5, dev: 0.4, labs: 0.3 },
      },
      {
        type: "likert",
        text: "When I commit to something, I follow through even when it gets boring or hard.",
        scores: { sm: 1, ss: 0.5, inline: 0.3 },
      },
      {
        type: "likert",
        text: "I have a track record of completing every project I start, even the ones that lost their initial excitement.",
        scores: { sm: 1, ss: 0.6, inline: 0.4 },
      },
    ],
  },
  {
    id: "leadership",
    label: "Part 4 of 7",
    title: "Leadership & Collaboration",
    desc: "How you influence others, take ownership, handle disagreements, and empower a team.",
    questions: [
      {
        type: "choice",
        text: "Your team is behind on a deadline and morale is low. What role do you naturally fall into?",
        options: [
          { text: "I rally the team \u2014 reframe the situation, redistribute work, and drive us forward", scores: { lead: 5, del: 4, sm: 3, creative: 3 } },
          { text: "I put my head down and pick up the slack personally to get us there", scores: { ss: 4, sm: 4, lead: 2, inline: 1 } },
          { text: "I identify bottlenecks and suggest a revised plan to the team lead", scores: { lead: 3, ps: 3, del: 2, labs: 2 } },
          { text: "I focus on my assigned work and trust the manager to handle the bigger picture", scores: { del: 1, inline: 3, cs: 1, ss: 1 } },
        ],
      },
      {
        type: "choice",
        text: "A junior team member keeps making the same mistake. What\u2019s your approach?",
        options: [
          { text: "Sit with them to understand their thought process and teach them a better framework", scores: { lead: 5, del: 3, cs: 3, creative: 2 } },
          { text: "Create a checklist or guide they can reference going forward", scores: { lead: 4, del: 3, ss: 2, labs: 2 } },
          { text: "Correct it quickly and demonstrate the right approach so they can see it done properly", scores: { ss: 3, lead: 2, inline: 2, ps: 1 } },
          { text: "Flag it to their direct manager with specific examples so they can address it", scores: { del: 2, lead: 1, cs: 1, inline: 2 } },
        ],
      },
      {
        type: "choice",
        text: "You have 5 tasks and only time for 3. Two of them could be done by someone else. What do you do?",
        options: [
          { text: "Delegate the 2, give clear context, and trust them to deliver \u2014 then spot-check", scores: { del: 5, lead: 4, creative: 2 } },
          { text: "Delegate the 2 but check in frequently to make sure they\u2019re on track", scores: { del: 3, lead: 3, cs: 1 } },
          { text: "Do the 3 most important ones myself and push the other 2 to tomorrow", scores: { ss: 3, sm: 2, inline: 2 } },
          { text: "Try to do all 5 \u2014 I work well under time pressure and don\u2019t like handing things off", scores: { sm: 2, ss: 2, labs: 1 } },
        ],
      },
      {
        type: "choice",
        text: "In a group brainstorm, how do you typically behave?",
        options: [
          { text: "I throw out bold ideas and build energy \u2014 I\u2019m usually one of the more vocal people", scores: { lead: 4, sm: 2, sales: 3, creative: 3, mktg: 2 } },
          { text: "I listen first, then offer a structured take that connects other people\u2019s ideas", scores: { lead: 4, ps: 3, del: 2, labs: 2 } },
          { text: "I quietly take notes and contribute when I have something strong to add", scores: { ps: 2, des: 3, lead: 1, labs: 1 } },
          { text: "I think better on my own \u2014 I\u2019ll refine ideas after the meeting and share them async", scores: { ss: 3, dev: 2, labs: 2, des: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You\u2019re working with a peer whose work is consistently below standard. Your manager hasn\u2019t noticed yet. What do you do?",
        options: [
          { text: "Talk to them directly \u2014 ask what\u2019s going on, offer help, but be honest that their output needs to improve", scores: { lead: 5, cs: 3, creative: 3, del: 2 } },
          { text: "Document specific examples and bring them to your manager with a recommendation", scores: { lead: 4, ps: 3, del: 3, labs: 2 } },
          { text: "Quietly pick up the slack so the team\u2019s output doesn\u2019t suffer", scores: { ss: 3, sm: 2, cs: 2, inline: 1 } },
          { text: "Give it time \u2014 everyone has rough patches and they may self-correct", scores: { cs: 2, inline: 2, del: 1 } },
        ],
      },
      {
        type: "likert",
        text: "People naturally come to me for direction or decisions, even when I\u2019m not officially in charge.",
        scores: { lead: 1, del: 0.3 },
      },
      {
        type: "likert",
        text: "I\u2019m comfortable giving constructive criticism to peers, even when it\u2019s awkward.",
        scores: { lead: 0.8, del: 0.3, creative: 0.2 },
      },
      {
        type: "likert",
        text: "I trust others to do good work without micromanaging how they do it.",
        scores: { del: 1, lead: 0.5 },
      },
      {
        type: "likert",
        text: "I never feel frustrated with coworkers, even privately.",
        scores: { cs: 0.2 },
        isSD: true,
      },
    ],
  },
  {
    id: "workstyle",
    label: "Part 5 of 7",
    title: "Work Style & Environment",
    desc: "How you prefer to work, communicate, and collaborate.",
    questions: [
      {
        type: "choice",
        text: "Which work environment sounds most like you at your best?",
        options: [
          { text: "Fast-paced, client-facing \u2014 I feed off interaction and deadlines", scores: { creative: 4, sales: 3, cs: 3, mktg: 2 } },
          { text: "Deep focus, headphones on \u2014 I need quiet blocks to produce my best work", scores: { labs: 4, dev: 4, des: 3 } },
          { text: "Hands-on and physical \u2014 I like seeing tangible results from my work", scores: { inline: 5, des: 2, cs: 1 } },
          { text: "Strategic and varied \u2014 I like mixing planning with execution throughout the day", scores: { creative: 3, lead: 3, mktg: 3, labs: 1 } },
        ],
      },
      {
        type: "choice",
        text: "How do you prefer to communicate with teammates?",
        options: [
          { text: "Quick messages and voice notes \u2014 keep things moving", scores: { sales: 3, creative: 3, inline: 2, cs: 2 } },
          { text: "Structured updates \u2014 I document my work and prefer async communication", scores: { labs: 3, dev: 3, des: 2 } },
          { text: "Face-to-face or video calls \u2014 I read people better in real time", scores: { sales: 3, cs: 3, lead: 2, creative: 2, inline: 2 } },
          { text: "Whatever the situation calls for \u2014 I adapt my communication style", scores: { lead: 2, creative: 2, cs: 2, mktg: 2 } },
        ],
      },
      {
        type: "choice",
        text: "What kind of recognition matters most to you?",
        options: [
          { text: "Revenue impact \u2014 show me the numbers my work generated", scores: { sales: 4, creative: 4, sm: 2, inline: 2 } },
          { text: "Technical respect \u2014 I want peers to recognize the quality of my craft", scores: { labs: 4, dev: 4, des: 3 } },
          { text: "Client satisfaction \u2014 knowing I made someone\u2019s life easier", scores: { cs: 4, creative: 2, inline: 3, sales: 1 } },
          { text: "Team growth \u2014 seeing people I\u2019ve helped develop succeed", scores: { lead: 4, del: 3, creative: 1 } },
        ],
      },
      {
        type: "choice",
        text: "Your team just created a detailed SOP for a workflow. A week later, you encounter an edge case the SOP doesn\u2019t cover. What do you do?",
        options: [
          { text: "Handle the edge case using your judgment, then update the SOP so it\u2019s covered next time", scores: { ss: 5, ps: 4, lead: 3, labs: 3, creative: 2 } },
          { text: "Follow the SOP as closely as possible and flag the edge case for someone to address", scores: { ss: 2, inline: 4, del: 2, cs: 1 } },
          { text: "Improvise a solution and move on \u2014 SOPs are guidelines, not rules", scores: { ss: 4, ps: 3, creative: 2, sales: 1 } },
          { text: "Pause the workflow and ask for guidance \u2014 doing it wrong could cause bigger problems", scores: { cs: 2, inline: 3, del: 2 } },
        ],
      },
      {
        type: "choice",
        text: "A project you\u2019re leading has hit a delay that will push the launch back by a week. The client doesn\u2019t know yet. How do you communicate this?",
        options: [
          { text: "Call them proactively, explain what happened, present the revised timeline and prevention plan", scores: { lead: 4, cs: 4, creative: 3, ss: 2 } },
          { text: "Send a clear written update with the new date, the reason, and next steps \u2014 paper trail matters", scores: { ss: 3, cs: 3, creative: 2, labs: 2 } },
          { text: "Try to compress the remaining timeline so the delay is only 2\u20133 days, then communicate it as a minor adjustment", scores: { ps: 3, sm: 3, creative: 2, sales: 2 } },
          { text: "Mention it at the next scheduled check-in \u2014 delays happen and there\u2019s no need to create alarm", scores: { cs: 1, inline: 2, creative: 1 } },
        ],
      },
      {
        type: "likert",
        text: "I\u2019d rather build something that works behind the scenes than be the face of a project.",
        scores: { dev: 0.8, labs: 0.6, des: 0.2 },
      },
      {
        type: "likert",
        text: "I notice visual details that most people miss \u2014 alignment, spacing, color harmony.",
        scores: { des: 1, creative: 0.3, mktg: 0.2 },
      },
      {
        type: "likert",
        text: "Before I submit or send anything, I re-read it at least once to catch errors \u2014 even quick messages.",
        scores: { cs: 0.6, des: 0.5, creative: 0.3, inline: 0.3 },
      },
    ],
  },
  {
    id: "thinking",
    label: "Part 6 of 7",
    title: "How You Think",
    desc: "Your cognitive style \u2014 systems thinker, creative mind, people reader, or builder?",
    questions: [
      {
        type: "choice",
        text: "When you look at a successful business, what catches your attention first?",
        options: [
          { text: "The marketing machine \u2014 how they attract and convert customers", scores: { mktg: 4, creative: 4, sales: 2 } },
          { text: "The product \u2014 how it\u2019s built, what tech powers it, how it scales", scores: { dev: 4, labs: 5, ps: 2 } },
          { text: "The customer experience \u2014 how they make people feel and retain them", scores: { cs: 4, creative: 2, inline: 3 } },
          { text: "The operations \u2014 how the whole system runs efficiently as a unit", scores: { lead: 3, del: 2, labs: 2, creative: 2 } },
        ],
      },
      {
        type: "choice",
        text: "If you had to learn one of these skills from scratch, which would excite you most?",
        options: [
          { text: "Coding or building software tools", scores: { dev: 5, labs: 5 } },
          { text: "Running paid advertising campaigns and analyzing ROI", scores: { mktg: 5, creative: 4, sales: 2 } },
          { text: "Designing brand identities, websites, or physical signage", scores: { des: 5, creative: 2, inline: 3 } },
          { text: "Negotiation and high-stakes client relationship management", scores: { sales: 4, cs: 3, lead: 2, creative: 2, inline: 2 } },
        ],
      },
      {
        type: "choice",
        text: "You\u2019re explaining a complicated concept to a non-technical person. What\u2019s your natural approach?",
        options: [
          { text: "Use an analogy or metaphor \u2014 make it relatable", scores: { sales: 3, cs: 3, creative: 3, mktg: 2 } },
          { text: "Draw a diagram or sketch a quick visual", scores: { des: 4, dev: 2, labs: 2 } },
          { text: "Walk them through it step by step, building from simple to complex", scores: { lead: 3, cs: 2, dev: 2, inline: 1 } },
          { text: "Show them the end result first, then explain how it works backward", scores: { ps: 3, labs: 2, creative: 2, mktg: 1 } },
        ],
      },
      {
        type: "choice",
        text: "Which of these would you most enjoy spending a full day doing?",
        options: [
          { text: "Writing sales copy, scripting a video, or crafting a campaign strategy", scores: { mktg: 5, creative: 4, sales: 2 } },
          { text: "Building an app, automating a process, or solving a technical architecture problem", scores: { dev: 5, labs: 5, ps: 2 } },
          { text: "Talking to customers, closing deals, or nurturing leads through a pipeline", scores: { sales: 5, cs: 4, creative: 3, inline: 2 } },
          { text: "Designing layouts, mockups, or physical print/sign products", scores: { des: 5, inline: 4, creative: 2 } },
        ],
      },
      {
        type: "likert",
        text: "I think in systems \u2014 I naturally see how inputs, processes, and outputs connect.",
        scores: { ps: 0.5, labs: 0.6, dev: 0.3, lead: 0.3 },
      },
      {
        type: "likert",
        text: "I can sense what someone is feeling in a conversation, even when they don\u2019t say it.",
        scores: { cs: 0.6, sales: 0.5, lead: 0.4, creative: 0.2 },
      },
      {
        type: "likert",
        text: "I always know the right decision to make in every situation.",
        scores: { lead: 0.1 },
        isSD: true,
      },
    ],
  },
  {
    id: "scenarios",
    label: "Part 7 of 7",
    title: "Real-World Scenarios",
    desc: "Situational questions that reveal how you\u2019d operate in actual Klema situations.",
    questions: [
      {
        type: "choice",
        text: "A local HVAC company signs up for our basic Ignition package. After 2 weeks, they say \u2018We\u2019re not getting enough calls.\u2019 You check the data and see 14 leads came in but only 2 were called back. What do you tell them?",
        options: [
          { text: "Walk them through the data compassionately \u2014 show the missed leads, explain the speed-to-lead gap, and help them set up a process so they answer faster", scores: { cs: 5, creative: 4, sales: 2, lead: 2 } },
          { text: "Point out the numbers directly \u2014 14 leads, 2 callbacks. The system works. Offer to set up better notification triggers", scores: { ps: 4, ss: 3, creative: 3, labs: 2 } },
          { text: "Use it as an upsell opportunity \u2014 they may need a tier with live transfers since they can\u2019t handle follow-up themselves", scores: { sales: 5, creative: 3, sm: 1, mktg: 1 } },
          { text: "Dig into why the callbacks aren\u2019t happening \u2014 maybe the notification system needs tweaking on your end before drawing conclusions", scores: { ps: 5, dev: 3, labs: 3, cs: 2 } },
        ],
      },
      {
        type: "choice",
        text: "A Facebook Marketplace customer buys a $50 banner from InlineGraphics. During the pickup, they mention their landscaping business has been slow. What would you do?",
        options: [
          { text: "Build rapport, ask about their business, and casually mention \u2018We also help businesses like yours get more calls\u2019", scores: { sales: 5, inline: 5, creative: 3, cs: 2 } },
          { text: "Ask specific questions about their marketing and qualify whether they\u2019re a good fit for the growth engine", scores: { sales: 4, mktg: 3, creative: 3, inline: 3, lead: 2 } },
          { text: "Hand them a card and say \u2018If you ever want to grow, give us a call\u2019", scores: { sales: 3, inline: 3, creative: 2 } },
          { text: "Focus on making the banner pickup a great experience \u2014 good service creates word-of-mouth", scores: { cs: 3, inline: 3, sales: 1 } },
        ],
      },
      {
        type: "choice",
        text: "The dev team is building a new internal tool and you\u2019re asked to contribute. You discover the same feature exists as an open-source library. What\u2019s your call?",
        options: [
          { text: "Evaluate the library\u2019s quality \u2014 if it\u2019s well-maintained and fits your stack, use it; otherwise build custom", scores: { ps: 5, dev: 5, labs: 4, lead: 2 } },
          { text: "Propose using the library \u2014 focus engineering time on what\u2019s unique to your product", scores: { ps: 4, dev: 4, labs: 5, ss: 2 } },
          { text: "Build it custom \u2014 full control matters and you avoid dependency risk", scores: { dev: 3, labs: 2, ss: 3, ps: 2 } },
          { text: "Present both options to the team with pros/cons and let the group decide", scores: { lead: 3, del: 3, ps: 2, labs: 2 } },
        ],
      },
      {
        type: "choice",
        text: "A client on the Authority tier ($7,500/mo) threatens to cancel because they don\u2019t see results yet. They\u2019ve only been active for 6 weeks. What\u2019s your approach?",
        options: [
          { text: "Pull up their dashboard, walk through every metric trending in the right direction, and reset expectations with a 90-day benchmark", scores: { cs: 5, creative: 4, sales: 3, lead: 2 } },
          { text: "Acknowledge their frustration first \u2014 then share specific wins and explain the typical ramp-up timeline", scores: { cs: 4, creative: 3, sales: 2, lead: 2 } },
          { text: "If the data really isn\u2019t promising, be honest \u2014 maybe their market or offer needs adjusting before more budget will help", scores: { ps: 4, lead: 3, ss: 3, creative: 2 } },
          { text: "Offer a short-term incentive to keep them through the 90-day mark where results typically kick in", scores: { sales: 3, creative: 2, cs: 2, mktg: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You realize you accidentally sent a client an estimate that\u2019s $2,000 lower than it should be because you forgot a line item. The client already replied saying they love the price. What do you do?",
        options: [
          { text: "Call them immediately, explain the mistake, send the corrected estimate, and own it completely", scores: { lead: 4, cs: 3, ss: 3, creative: 3 } },
          { text: "Send an updated estimate with a brief professional note about the correction", scores: { cs: 4, ss: 3, creative: 2, lead: 2 } },
          { text: "Honor the lower price this time and eat the $2,000 as a learning experience", scores: { cs: 3, sales: 2, creative: 1, inline: 1 } },
          { text: "Find a way to reduce the scope slightly so the lower number still works without losing money", scores: { ps: 4, sales: 3, creative: 2, sm: 2 } },
        ],
      },
      {
        type: "choice",
        text: "A client asks you to add a feature that wasn\u2019t in the original scope. It would take 8 extra hours. They say \u2018I thought this was included.\u2019 What do you do?",
        options: [
          { text: "Explain it\u2019s outside scope, show them the original agreement, and quote the additional work clearly", scores: { lead: 4, cs: 4, creative: 4, ss: 3 } },
          { text: "Offer a compromise \u2014 include a smaller version of what they want and quote the full version as an add-on", scores: { cs: 5, sales: 4, creative: 3, ps: 3 } },
          { text: "Do it anyway to keep them happy \u2014 the relationship matters more than 8 hours", scores: { cs: 2, inline: 2, sales: 1 } },
          { text: "Escalate to your manager \u2014 scope decisions should be made above your level to protect the relationship", scores: { del: 2, cs: 2, inline: 2 } },
        ],
      },
      {
        type: "choice",
        text: "A new lead comes in at 4:55 PM on a Friday through the CRM. What do you do?",
        options: [
          { text: "Call them immediately \u2014 speed-to-lead is everything, they might be talking to a competitor in 5 minutes", scores: { sales: 5, creative: 5, cs: 3, sm: 3 } },
          { text: "Send a quick personalized text or email acknowledging the lead and schedule a Monday morning call", scores: { sales: 3, creative: 3, cs: 3, mktg: 1 } },
          { text: "Check their info to qualify them first, then decide if they\u2019re worth an immediate call", scores: { ps: 3, sales: 2, creative: 2, lead: 1 } },
          { text: "Log it in the CRM and reach out first thing Monday \u2014 a frantic Friday call isn\u2019t professional", scores: { cs: 2, inline: 3, sales: 1 } },
        ],
      },
      {
        type: "choice",
        text: "You\u2019re asked to do a task that seems well below your skill level \u2014 data entry, organizing files, or updating a spreadsheet. How do you handle it?",
        options: [
          { text: "Do it quickly and well \u2014 every task matters and I don\u2019t need every task to be stimulating", scores: { sm: 4, ss: 3, inline: 4, creative: 2 } },
          { text: "Do it but also flag to my manager that my time might be better used elsewhere", scores: { lead: 3, sm: 2, ss: 2, creative: 1 } },
          { text: "Automate or systematize it so nobody has to do it manually again", scores: { ps: 4, labs: 4, dev: 3, sm: 3 } },
          { text: "Ask if there\u2019s someone else better suited for this \u2014 my strengths are better used on higher-level work", scores: { lead: 1, del: 2, sales: 1 } },
        ],
      },
      {
        type: "likert",
        text: "I could see myself talking to small business owners about their growth challenges every day.",
        scores: { sales: 0.8, cs: 0.6, creative: 0.5, inline: 0.4 },
      },
      {
        type: "likert",
        text: "I get excited about building tools that save people time or eliminate repetitive work.",
        scores: { dev: 0.8, labs: 0.8, ps: 0.3 },
      },
      {
        type: "likert",
        text: "I\u2019d enjoy designing the visual identity of a brand \u2014 logo, colors, layout, signage.",
        scores: { des: 1, creative: 0.3, inline: 0.4 },
      },
      {
        type: "likert",
        text: "When I do work, I naturally think about how it connects to revenue or business growth.",
        scores: { creative: 0.8, sales: 0.6, mktg: 0.4, lead: 0.3 },
      },
      {
        type: "likert",
        text: "I take pride in doing repetitive tasks consistently well, day after day.",
        scores: { inline: 1, ss: 0.3, sm: 0.3, cs: 0.2 },
      },
      {
        type: "likert",
        text: "When I learn a new process, I instinctively write down the steps so I or someone else can repeat it.",
        scores: { inline: 0.8, lead: 0.4, del: 0.4, labs: 0.3 },
      },
    ],
  },
];

const TOTAL_QUESTIONS = SECTIONS.reduce((sum, s) => sum + s.questions.filter(q => !q.isSD).length, 0);
const TOTAL_ITEMS = SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);

const TRAIT_KEYS = ["ss", "ps", "sm", "lead", "del"] as const;
const COMPANY_KEYS = ["creative", "labs", "inline"] as const;
const ROLE_KEYS = ["cs", "sales", "des", "dev", "mktg"] as const;

const TRAIT_LABELS: Record<string, string> = {
  ss: "Self-Sufficiency", ps: "Problem Solving", sm: "Self-Motivation",
  lead: "Leadership", del: "Delegation",
};
const COMPANY_NAMES: Record<string, string> = {
  creative: "Klema Creative", labs: "Klema Labs", inline: "InlineGraphics",
};
const ROLE_NAMES: Record<string, string> = {
  cs: "Customer Success", sales: "Sales & Sales Support",
  des: "Design", dev: "Development / Vibe Coding", mktg: "Marketing",
};

// ============================================================
// SCORING ENGINE
// ============================================================

function calculateMaxPossible() {
  const maxes: Record<string, number> = {};
  const allKeys = [...TRAIT_KEYS, ...COMPANY_KEYS, ...ROLE_KEYS];
  allKeys.forEach(k => { maxes[k] = 0; });

  SECTIONS.forEach(sec => {
    sec.questions.forEach(q => {
      if (q.isSD) return;
      if (q.type === "choice" && q.options) {
        const qMaxes: Record<string, number> = {};
        q.options.forEach(opt => {
          Object.entries(opt.scores).forEach(([k, v]) => {
            qMaxes[k] = Math.max(qMaxes[k] || 0, v);
          });
        });
        Object.entries(qMaxes).forEach(([k, v]) => {
          if (k in maxes) maxes[k] += v;
        });
      } else if (q.type === "likert" && q.scores && !q.isSD) {
        Object.entries(q.scores).forEach(([k, v]) => {
          if (k in maxes) maxes[k] += v * 5;
        });
      }
    });
  });
  return maxes;
}

const MAX_POSSIBLE = calculateMaxPossible();

interface ArchetypeFlag {
  label: string;
  description: string;
  variant: "warning" | "info" | "positive";
}

function calculateResults(answers: Record<string, number>) {
  const scores: Record<string, number> = {};
  const allKeys = [...TRAIT_KEYS, ...COMPANY_KEYS, ...ROLE_KEYS, "sd"];
  allKeys.forEach(k => { scores[k] = 0; });

  let sdCount = 0;
  let sdHighCount = 0;

  SECTIONS.forEach((sec, si) => {
    sec.questions.forEach((q, qi) => {
      const val = answers[`s${si}q${qi}`];
      if (val === undefined) return;

      if (q.isSD) {
        sdCount++;
        if (val >= 3) sdHighCount++;
        return;
      }

      if (q.type === "choice" && q.options) {
        const opt = q.options[val];
        if (opt?.scores) {
          Object.entries(opt.scores).forEach(([k, v]) => {
            scores[k] = (scores[k] || 0) + v;
          });
        }
      } else if (q.type === "likert" && q.scores) {
        const mult = val / 4;
        Object.entries(q.scores).forEach(([k, v]) => {
          scores[k] = (scores[k] || 0) + (v * 5 * mult);
        });
      }
    });
  });

  // Normalize traits to 0-100 using calculated max
  const traits: Record<string, number> = {};
  TRAIT_KEYS.forEach(t => {
    const max = MAX_POSSIBLE[t] || 1;
    traits[t] = Math.min(100, Math.round((scores[t] / max) * 100));
  });

  // Normalize company scores (percentage of each company's max)
  const normalizedCompanies: Record<string, number> = {};
  COMPANY_KEYS.forEach(c => {
    const max = MAX_POSSIBLE[c] || 1;
    normalizedCompanies[c] = scores[c] / max;
  });
  const sortedCompanies = Object.entries(COMPANY_NAMES)
    .map(([key, name]) => ({ key, name, score: normalizedCompanies[key] || 0 }))
    .sort((a, b) => b.score - a.score);
  const primaryCompany = sortedCompanies[0].name;
  const companyTotal = sortedCompanies.reduce((s, c) => s + c.score, 0) || 1;

  // Normalize role scores
  const normalizedRoles: Record<string, number> = {};
  ROLE_KEYS.forEach(r => {
    const max = MAX_POSSIBLE[r] || 1;
    normalizedRoles[r] = scores[r] / max;
  });
  const sortedRoles = Object.entries(ROLE_NAMES)
    .map(([key, name]) => ({ key, name, score: normalizedRoles[key] || 0 }))
    .sort((a, b) => b.score - a.score);
  const primaryRole = sortedRoles[0].name;
  const secondaryRole = sortedRoles[1].name;
  const roleTotal = sortedRoles.reduce((s, r) => s + r.score, 0) || 1;

  // Management readiness
  const mgmtScore = traits.lead * 0.5 + traits.del * 0.5;
  let mgmtLevel: string, mgmtVariant: "strong" | "developing" | "ic", mgmtText: string;
  if (mgmtScore >= 70) {
    mgmtLevel = "Strong"; mgmtVariant = "strong";
    mgmtText = "Shows strong leadership instincts and delegation skills \u2014 management-track candidate.";
  } else if (mgmtScore >= 45) {
    mgmtLevel = "Developing"; mgmtVariant = "developing";
    mgmtText = "Has emerging leadership qualities. Would benefit from mentorship before a management role.";
  } else {
    mgmtLevel = "Individual Contributor"; mgmtVariant = "ic";
    mgmtText = "Strongest as an individual contributor. Prefers executing over managing \u2014 and that\u2019s valuable.";
  }

  // Narratives
  let companyWhy = "";
  if (primaryCompany === "Klema Creative") {
    companyWhy = "Thinks in terms of growth systems, client relationships, and measurable results. Wired for the high-accountability, speed-to-lead culture where every dollar is tracked and every lead matters.";
  } else if (primaryCompany === "Klema Labs") {
    companyWhy = "An architect at heart \u2014 thinks in systems, optimizes for efficiency, and gets excited by building tools that scale. Belongs where the engineering happens.";
  } else {
    companyWhy = "Approachable, practical, and relationship-driven. Thrives in face-to-face interactions and sees every conversation as an opportunity. The front door of the ecosystem.";
  }

  let roleWhy = "";
  if (primaryRole === "Customer Success") roleWhy = "Natural empathy combined with accountability \u2014 will own client relationships and make sure the system delivers.";
  else if (primaryRole === "Sales & Sales Support") roleWhy = "Persuasive, people-oriented, and comfortable with outbound hustle. Pipeline-minded.";
  else if (primaryRole === "Design") roleWhy = "Strong visual instincts and attention to craft. Sees details others miss.";
  else if (primaryRole === "Development / Vibe Coding") roleWhy = "Builder mentality \u2014 wants to make things work, automate the tedious, and ship products.";
  else if (primaryRole === "Marketing") roleWhy = "Thinks in campaigns, funnels, and conversions. Understands how to attract and convert attention.";

  // Archetype flags (trait combinations)
  const flags: ArchetypeFlag[] = [];
  if (traits.ss > 75 && traits.lead < 35 && traits.del < 30) {
    flags.push({ label: "Lone Wolf Tendency", description: "Thrives independently but may resist team integration. Excellent IC, but monitor collaboration.", variant: "warning" });
  }
  if (traits.sm > 75 && traits.del < 30) {
    flags.push({ label: "Burnout Risk", description: "Highly driven but reluctant to delegate. May overload themselves. Needs delegation coaching.", variant: "warning" });
  }
  if (traits.ps > 70 && traits.sm < 35) {
    flags.push({ label: "Engagement-Dependent", description: "Performs brilliantly on novel challenges but may disengage during routine work.", variant: "info" });
  }
  if (traits.lead > 70 && traits.ss < 35) {
    flags.push({ label: "Management-Dependent", description: "Strong leader who may struggle in a lean team where leaders also execute hands-on.", variant: "info" });
  }
  if (traits.sm > 70 && traits.ss > 70 && traits.del < 25) {
    flags.push({ label: "Starter Energy", description: "High initiative and drive, but may prefer starting new things over finishing existing ones. Validate follow-through.", variant: "info" });
  }
  if (mgmtScore >= 70 && traits.ss > 60) {
    flags.push({ label: "Leadership Ready", description: "Strong combination of leadership, delegation, and self-sufficiency. Can both direct and execute.", variant: "positive" });
  }

  // Social desirability flag
  const sdFlagged = sdCount >= 2 && sdHighCount >= 2;

  return {
    traits, sortedCompanies, primaryCompany, companyTotal, companyWhy,
    sortedRoles, primaryRole, secondaryRole, roleWhy, roleTotal,
    mgmtScore, mgmtLevel, mgmtVariant, mgmtText,
    flags, sdFlagged,
  };
}

// ============================================================
// OPTION SHUFFLING
// ============================================================
function seededShuffle(arr: number[], seed: number): number[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ============================================================
// UI COMPONENTS
// ============================================================

function ProgressBar({ answered, total }: { answered: number; total: number }) {
  const pct = Math.round((answered / total) * 100);
  return (
    <div className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border py-4">
      <div className="max-w-3xl mx-auto px-5">
        <div className="h-1.5 bg-white-6 rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-text-dim mt-2 text-right font-mono tracking-wide">{answered} of {total} answered</p>
      </div>
    </div>
  );
}

function OptionButton({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm leading-relaxed cursor-pointer ${selected ? "bg-accent-dim border-accent-border text-text" : "bg-surface border-border text-text-mid hover:bg-card hover:border-border-hover"}`}>
      {text}
    </button>
  );
}

function LikertButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex-1 py-3 px-2 rounded-xl border text-sm text-center transition-all duration-200 cursor-pointer ${selected ? "bg-accent-dim border-accent-border text-text" : "bg-surface border-border text-text-mid hover:bg-card hover:border-border-hover"}`}>
      {label}
    </button>
  );
}

function TraitBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-text">{label}</span>
        <span className="text-text-dim font-mono">{value}%</span>
      </div>
      <div className="h-2 bg-white-6 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-7 mb-4">
      <h3 className="text-lg font-semibold mb-5 text-text">{title}</h3>
      {children}
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function ApplyPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<ReturnType<typeof calculateResults> | null>(null);

  // Stable shuffle seed per session
  const shuffleSeed = useRef(Math.floor(Math.random() * 1000000));

  // Shuffled option indices for each choice question
  const shuffledIndices = useMemo(() => {
    const result: Record<string, number[]> = {};
    SECTIONS.forEach((sec, si) => {
      sec.questions.forEach((q, qi) => {
        if (q.type === "choice" && q.options) {
          const indices = q.options.map((_, i) => i);
          const seed = shuffleSeed.current + si * 100 + qi;
          result[`s${si}q${qi}`] = seededShuffle(indices, seed);
        }
      });
    });
    return result;
  }, []);

  const answeredCount = Object.keys(answers).filter(k => {
    // Don't count SD items in progress
    const [sPart, qPart] = k.replace("s", "").split("q");
    const si = parseInt(sPart);
    const qi = parseInt(qPart);
    return si < SECTIONS.length && qi < SECTIONS[si].questions.length && !SECTIONS[si].questions[qi].isSD;
  }).length;

  const startAssessment = useCallback(() => {
    if (!userName.trim()) { setNameError(true); return; }
    setNameError(false);
    setPhase("quiz");
    setCurrentSection(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userName]);

  const selectAnswer = useCallback((qKey: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qKey]: value }));
  }, []);

  const goSection = useCallback((idx: number) => {
    setCurrentSection(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const submitAssessment = useCallback(() => {
    const res = calculateResults(answers);
    setResults(res);
    setPhase("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [answers]);

  const retake = useCallback(() => {
    setPhase("intro");
    setAnswers({});
    setResults(null);
    setCurrentSection(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <div className="mb-8">
            <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[3px] text-accent mb-4">Talent Assessment</span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Find Your <span className="text-accent">Fit</span></h1>
            <p className="text-text-mid max-w-lg mx-auto leading-relaxed">
              This assessment maps how you think, solve problems, and work &mdash; then places you where you&apos;ll thrive across the Klema ecosystem.
            </p>
          </div>
          <div className="flex gap-3 justify-center flex-wrap mb-8">
            {["~28 min", `${TOTAL_QUESTIONS} questions`, "No wrong answers"].map(pill => (
              <span key={pill} className="px-4 py-2 rounded-full border border-border text-xs text-text-dim">{pill}</span>
            ))}
          </div>
          <p className="text-sm text-text-dim mb-8 max-w-md mx-auto">
            Answer based on how you actually operate &mdash; not how you think you should.
          </p>
          <div className="max-w-sm mx-auto mb-8 text-left">
            <label className="block text-[0.7rem] font-semibold uppercase tracking-[2px] text-text-dim mb-2">Your Name</label>
            <input
              type="text" value={userName}
              onChange={e => { setUserName(e.target.value); setNameError(false); }}
              onKeyDown={e => e.key === "Enter" && startAssessment()}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 bg-surface border rounded-xl text-text placeholder:text-text-dim/50 outline-none transition-colors ${nameError ? "border-red" : "border-border focus:border-accent-border"}`}
            />
            {nameError && <p className="text-red text-xs mt-2">Please enter your name to continue.</p>}
          </div>
          <button onClick={startAssessment} className="px-8 py-3.5 bg-accent text-bg font-semibold rounded-xl transition-all duration-200 btn-primary-hover cursor-pointer">
            Begin Assessment
          </button>
        </div>
      </section>
    );
  }

  // ── RESULTS ──
  if (phase === "results" && results) {
    const {
      traits, sortedCompanies, primaryCompany, companyTotal, companyWhy,
      sortedRoles, primaryRole, secondaryRole, roleWhy, roleTotal,
      mgmtScore, mgmtLevel, mgmtVariant, mgmtText, flags, sdFlagged,
    } = results;

    const companyColors: Record<string, string> = { "Klema Creative": "#4ade80", "Klema Labs": "#a78bfa", InlineGraphics: "#60a5fa" };
    const companyBadgeClasses: Record<string, string> = {
      "Klema Creative": "bg-accent-dim text-accent border border-accent-border",
      "Klema Labs": "bg-purple-dim text-purple border border-purple/30",
      InlineGraphics: "bg-blue-dim text-blue border border-blue/30",
    };
    const traitColors: Record<string, string> = { ss: "#60a5fa", ps: "#a78bfa", sm: "#4ade80", lead: "#fbbf24", del: "#22d3ee" };
    const mgmtClasses: Record<string, string> = {
      strong: "bg-accent-dim border border-accent-border text-accent",
      developing: "bg-amber-dim border border-amber/30 text-amber",
      ic: "bg-white-6 border border-border text-text-mid",
    };

    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[3px] text-accent mb-4">Assessment Complete</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Results for {userName}</h1>
            <p className="text-text-dim">Here&apos;s the full profile breakdown.</p>
          </div>

          {/* SD WARNING */}
          {sdFlagged && (
            <div className="bg-amber-dim border border-amber/30 rounded-2xl p-5 mb-4 flex items-start gap-3">
              <span className="text-amber text-lg mt-0.5">&#9888;</span>
              <div>
                <p className="text-amber font-semibold text-sm">Consistency Notice</p>
                <p className="text-text-mid text-sm mt-1">Some responses suggest an unusually positive self-assessment pattern. Results should be validated with a follow-up conversation.</p>
              </div>
            </div>
          )}

          {/* ARCHETYPE FLAGS */}
          {flags.length > 0 && (
            <ResultCard title="Behavioral Insights">
              <div className="space-y-3">
                {flags.map((flag, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${
                    flag.variant === "warning" ? "bg-amber-dim border border-amber/20" :
                    flag.variant === "positive" ? "bg-accent-dim border border-accent-border" :
                    "bg-white-6 border border-border"
                  }`}>
                    <span className={`text-sm mt-0.5 ${
                      flag.variant === "warning" ? "text-amber" :
                      flag.variant === "positive" ? "text-accent" : "text-blue"
                    }`}>
                      {flag.variant === "warning" ? "\u26A0" : flag.variant === "positive" ? "\u2713" : "\u2139"}
                    </span>
                    <div>
                      <p className={`font-semibold text-sm ${
                        flag.variant === "warning" ? "text-amber" :
                        flag.variant === "positive" ? "text-accent" : "text-blue"
                      }`}>{flag.label}</p>
                      <p className="text-text-mid text-sm mt-0.5">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ResultCard>
          )}

          {/* COMPANY PLACEMENT */}
          <ResultCard title="Company Placement">
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3 ${companyBadgeClasses[primaryCompany]}`}>{primaryCompany}</span>
            <p className="text-text-mid leading-relaxed mb-5">{companyWhy}</p>
            {sortedCompanies.map(c => {
              const pct = Math.round((c.score / companyTotal) * 100);
              return <TraitBar key={c.name} label={c.name} value={pct} color={companyColors[c.name] || "#4ade80"} />;
            })}
          </ResultCard>

          {/* ROLE FIT */}
          <ResultCard title="Role Fit">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-accent-dim text-accent border border-accent-border">{primaryRole}</span>
              <span className="px-4 py-1.5 rounded-full text-sm bg-white-6 border border-border text-text-dim">{secondaryRole}</span>
            </div>
            <p className="text-text-mid leading-relaxed mb-5">{roleWhy}</p>
            {sortedRoles.map(r => {
              const pct = Math.round((r.score / roleTotal) * 100);
              return <TraitBar key={r.name} label={r.name} value={pct} color="#4ade80" />;
            })}
          </ResultCard>

          {/* CORE TRAITS */}
          <ResultCard title="Core Trait Scores">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {(["ss", "ps", "sm", "lead"] as const).map(t => (
                <div key={t} className="bg-bg rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-accent">{traits[t]}</div>
                  <div className="text-[0.7rem] text-text-dim uppercase tracking-wider mt-1">{TRAIT_LABELS[t]}</div>
                </div>
              ))}
            </div>
            {(["ss", "ps", "sm", "lead", "del"] as const).map(t => (
              <TraitBar key={t} label={TRAIT_LABELS[t]} value={traits[t]} color={traitColors[t]} />
            ))}
          </ResultCard>

          {/* MANAGEMENT READINESS */}
          <ResultCard title="Management Readiness">
            <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold mb-4 ${mgmtClasses[mgmtVariant]}`}>{mgmtLevel}</div>
            <p className="text-text-mid leading-relaxed mb-5">{mgmtText}</p>
            <TraitBar label="Leadership" value={traits.lead} color="#fbbf24" />
            <TraitBar label="Delegation" value={traits.del} color="#22d3ee" />
          </ResultCard>

          {/* SUMMARY */}
          <ResultCard title="Summary">
            <p className="text-text-mid leading-relaxed">
              <strong className="text-text">{userName}</strong> is best placed at{" "}
              <strong className="text-accent">{primaryCompany}</strong> in a{" "}
              <strong className="text-text">{primaryRole}</strong> capacity
              {mgmtScore >= 70 ? ", with strong potential for a management track" : mgmtScore >= 45 ? ", with developing leadership potential" : ""}.
              Their secondary strength is <strong className="text-text">{secondaryRole}</strong>, which could serve as a cross-functional asset or growth path.
            </p>
          </ResultCard>

          {/* ACTIONS */}
          <div className="flex justify-center gap-4 mt-8 mb-12">
            <button onClick={() => window.print()} className="px-6 py-3 rounded-xl border border-border text-text-dim hover:text-text hover:border-border-hover transition-all text-sm cursor-pointer">Print / Save as PDF</button>
            <button onClick={retake} className="px-6 py-3 rounded-xl border border-border text-text-dim hover:text-text hover:border-border-hover transition-all text-sm cursor-pointer">Retake Assessment</button>
          </div>
        </div>
      </section>
    );
  }

  // ── QUIZ ──
  const sec = SECTIONS[currentSection];
  let qOffset = 0;
  for (let i = 0; i < currentSection; i++) {
    qOffset += SECTIONS[i].questions.filter(q => !q.isSD).length;
  }
  let displayNum = qOffset;

  return (
    <section className="min-h-screen pb-20">
      <ProgressBar answered={answeredCount} total={TOTAL_QUESTIONS} />
      <div className="max-w-3xl mx-auto px-5 pt-8">
        <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[3px] text-accent mb-2">{sec.label}</span>
        <h2 className="text-2xl font-bold tracking-tight mb-1">{sec.title}</h2>
        <p className="text-text-dim text-sm mb-6">{sec.desc}</p>
        <div className="h-px bg-border mb-8" />

        <div className="space-y-4">
          {sec.questions.map((q, qi) => {
            const qKey = `s${currentSection}q${qi}`;
            const isSD = q.isSD;
            if (!isSD) displayNum++;
            const num = isSD ? null : displayNum;
            const isAnswered = answers[qKey] !== undefined;
            const optionOrder = shuffledIndices[qKey];

            return (
              <div key={qKey} className={`bg-surface border rounded-2xl p-6 transition-colors ${isAnswered ? "border-white-10" : "border-border"}`}>
                {num && <div className="text-[0.65rem] text-text-dim uppercase tracking-[1.5px] mb-2 font-mono">Question {num} of {TOTAL_QUESTIONS}</div>}
                <div className="text-sm font-medium text-text mb-4 leading-relaxed">{q.text}</div>

                {q.type === "choice" && q.options && optionOrder && (
                  <div className="space-y-2">
                    {optionOrder.map(oi => (
                      <OptionButton key={oi} text={q.options![oi].text} selected={answers[qKey] === oi} onClick={() => selectAnswer(qKey, oi)} />
                    ))}
                  </div>
                )}

                {q.type === "likert" && (
                  <>
                    <div className="flex justify-between text-[0.65rem] text-text-dim mb-2 px-1">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                    <div className="flex gap-2">
                      {["1", "2", "3", "4", "5"].map((lbl, li) => (
                        <LikertButton key={li} label={lbl} selected={answers[qKey] === li} onClick={() => selectAnswer(qKey, li)} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* NAV */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
          {currentSection > 0 ? (
            <button onClick={() => goSection(currentSection - 1)} className="px-6 py-3 rounded-xl border border-border text-text-dim hover:text-text hover:border-border-hover transition-all text-sm cursor-pointer">Back</button>
          ) : <div />}
          {currentSection < SECTIONS.length - 1 ? (
            <button onClick={() => goSection(currentSection + 1)} className="px-8 py-3 bg-accent text-bg font-semibold rounded-xl transition-all duration-200 btn-primary-hover cursor-pointer text-sm">Continue</button>
          ) : (
            <button onClick={submitAssessment} className="px-8 py-3 bg-accent text-bg font-semibold rounded-xl transition-all duration-200 btn-primary-hover cursor-pointer text-sm">See My Results</button>
          )}
        </div>
      </div>
    </section>
  );
}
