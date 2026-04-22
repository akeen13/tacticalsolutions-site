---
title: "The last mile of autonomy is not the model"
date: 2026-04-23
slug: "last-mile-of-autonomy"
author: "Anthony Keen"
proofArm: "master"
summary: "Everyone argues about model quality. After a year shipping autonomy into real operations, the bottleneck is somewhere else entirely."
cta:
  label: "Reply if you're running ops and want to compare notes"
  href: "mailto:anthony@tacticalsolutions.com"
draft: false
---

The AI conversation has been running on one question for three years: is GPT-N smarter than GPT-N-1? I don't find it useful.

I've spent the last year building autonomous systems into real operations — a security operations center that runs at 3am with nobody awake, a quality system that walks a factory floor in a plant manager's pocket. Here's what I learned. The model is almost never the bottleneck.

The bottleneck is the last mile.

The last mile is the ugly part nobody writes about. It's the radio on a security guard's hip, the clipboard on a manufacturing line, the three spreadsheets the QMS was supposed to replace. It's the judgment call at 2:14am when an alert fires and the on-call is at a wedding. It's the accountability question: who signed off, who owns the miss, who can be fired.

Models don't close those loops. Systems do. And building those systems is not a prompt engineering problem. It's an operations problem dressed up as an AI problem.

Three things I've learned that aren't in the model benchmarks:

**1. Integration is the work, not the overhead.**
The clean autonomy demo runs inside a notebook. The real one runs inside a ticketing system that was bought in 2009, a VPN that was configured by someone who left the company, and a paging tool that only accepts webhooks from two IPs. The last mile is 80% plumbing. Teams that don't respect that ship demos, not systems.

**2. Judgment shows up when the model is wrong.**
Every autonomous loop I've seen break in production breaks at the ambiguous case. Not the obvious false positive, not the obvious true positive — the one where the right answer depends on context the model doesn't have. Building that loop well means designing for the handoff, not the happy path. You don't close 100% autonomously. You close 80% autonomously and escalate the other 20% cleanly. That's the product.

**3. Accountability is architecture.**
If an autonomous system makes a call, someone has to own the outcome. The customer, usually. But the architecture has to make it possible: every decision logged, every input visible, every action reversible for the narrow window where reversal matters. If you can't audit it, you can't deploy it into a regulated ops environment. This is not a feature. It's the floor.

None of this is glamorous. It's why the consulting gap is real. A lot of teams can fine-tune a model. Very few can walk into a mid-market manufacturer, map the quality workflow, wire the autonomy into their stack, and hand it off in 90 days.

That's the work we're doing at Tactical Solutions. It's what ProSentinel does for security operations. It's what Weft PocketQS does for quality. It's what Tactical Solutions Applied — our consulting arm — does when an operator has a P&L problem that can't wait for a SaaS roadmap.

The next 18 months of "AI" won't be won by the smartest model. They'll be won by whoever can actually ship the last mile — into businesses that run on phones, radios, paper, and people.

We're hiring against that thesis. We're taking on design partners against it. If you're an operator with a real loop you want closed, reply. Three design-partner slots left this quarter.
