---
title: "What an autonomous SOC actually does at 3am"
date: 2026-12-03
slug: "what-an-autonomous-soc-does-at-3am"
author: "Anthony Keen"
proofArm: "prosentinel"
summary: "The part every autonomous-SOC pitch skips: the ninety seconds after an alert fires. Walked minute by minute, with the exact six-line message the on-call gets."
cta:
  label: "Three design-partner slots open this quarter — apply through the intake"
  href: "https://akeen13.github.io/tacticalsolutions-site/prosentinel/?utm_source=pov&utm_medium=web&utm_campaign=pov-2026-12-03-autonomous-soc&utm_content=cta"
draft: false
---

> The two incidents below are composites. We're standing ProSentinel up now and design partners are not signed yet. The patterns are real — drawn from a decade of running and rebuilding SOCs — but the specific timelines are constructed to make the loop concrete. When we have real production incidents to write about, we'll write about those. Today, the teach is the pattern.

Every "autonomous SOC" pitch skips the part that decides whether it works: what happens in the ninety seconds after an alert fires. So here is the ninety seconds, minute by minute. Numbers aren't decoration. They're the whole argument.

**3:14:00 — Signal.** A sales laptop in the Denver office beacons to a domain registered 11 days ago. Random-looking subdomain, 60-second interval, identical 42 bytes each time. That shape reads as DNS exfiltration. It also reads as a noisy browser extension. From the alert alone you cannot tell which.

The first forty seconds are retrieval, not judgment. Six things get pulled before anything reasons about them: seven days of DNS history from that host, the CMDB record, the primary user and their recent travel, the last three installs on the box, what the host is domain-joined to, and every other host in the estate beaconing to the same domain. Two other laptops show the same beacon. That's a data point. Not an answer.

**3:14:40 — Three branches, explicit.** The system holds three dispositions and must pick one and log why.

*Branch A — autonomous close.* The pattern matches a named benign cause: a stale extension, a known recent change, a vendor app phoning home. Close it, record the reason, wake nobody.

*Branch B — autonomous containment.* Rotate the session token, block the destination at the resolver, isolate from internal subnets, notify the on-call by SMS. Not a page. Containment is reversible and quiet, and a page at 3am costs the on-call forty minutes of sleep even when nothing is wrong.

*Branch C — escalate.* Assemble the packet, hand it to the named on-call, start a 5-minute callback timer.

**3:14:52 — The call.** No vendor match on the domain. CMDB says the laptop is 14 months old with no approved travel this quarter. Last install: six days ago, a PDF converter pulled from a search ad. The two sibling beacons are the same extension on two other machines.

Not benign. Not confirmed compromise. The system takes B. All three containment actions go in: token rotates, resolver block lands, host isolates from internal subnets. Both sibling hosts get the same block. SMS and one email go to the on-call.

**The message.** Six lines. No dashboard link, no "please investigate."

```
3:14am — beacon to 11-day-old domain, host DVR-LT-0442, user m.torres
Branch: autonomous containment — resolver block + token rotation + isolation
Also blocked: DVR-LT-0451, DVR-LT-0469, same beacon, same extension
Evidence: install 6d ago from search ad, no vendor match, no travel
Pending: user callback, extension removal, resolver unblock, isolation lift
Reversal: on-call has 5 min to undo any of it, otherwise containment stands
```

The on-call reads that in twenty seconds, flat on his back, phone at 40% brightness. Calls back at minute 3, gets a human on the second ring, confirms the extension story, says leave the block up, goes back to sleep. The analyst touches nothing until 8am.

**8:10am — Queue review.** Four closed tickets, one open. The four closed ones have the same six-line shape. Reviewing four is twenty minutes of work. Triaging forty from scratch is the whole morning, and the open one gets the attention it deserves because it's the only one left.

Now the second composite, shorter. Different night, different shape.

One host authenticating to six machines in ninety seconds. None of them its usual targets. The system takes C, not B. Containment would have been wrong here: the host is the payroll batch runner and it is Thursday night. Isolate it and you wake somebody at 11pm Friday to unfreeze a month of payroll. Escalation with the packet costs the on-call five minutes and no goodwill.

That's the distinction people miss about this class of system. Autonomy isn't "let it rip." It's a small number of dispositions, held explicitly, chosen against evidence, and reversible inside a window the on-call controls.

Three numbers tell you whether any of this is working:

- Share of alerts closed without a human touch. Steady-state target: above 70%.
- Median alert-to-action time on the autonomous branches. Target: under 90 seconds.
- Median analyst minutes per closed ticket at queue review. Target: under 4.

Miss the first and you built a pager with extra steps. Miss the third and you moved the work instead of removing it.

This is one domain. The loop is general — signal, retrieve, branch, act, hand off, review. Same shape in quality, field service, an ops floor. The domain changes. The rules don't.

Three design-partner slots for ProSentinel are open this quarter. If you run a SOC or an MDR and want to compare notes on the branch logic, reply — or apply through the intake and tell us what your stack looks like.
