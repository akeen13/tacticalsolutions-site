---
title: "The non-conformance that takes nine days to become a number"
date: 2026-12-10
slug: "non-conformance-nine-days"
author: "Anthony Keen"
proofArm: "weft"
summary: "One deviation, from the press to the audit, and every hand-off where the context falls out. The QMS is rarely the failure. Capture is."
draft: false
---

> The trace below is a composite. Weft PocketQS is pre-design-partner, so nobody is running this in their plant yet. The forms, the fields, the hand-offs and the day counts are drawn from real floors I have walked. The specific plant is assembled. The pattern is not.

A press operator at Plant 2 pulls a part at 09:47 and the bore is 0.3mm under. He knows what it means. He has run this press for six years. He also knows it is not his to fix, so he does what the procedure says and writes it up.

The form is one page, paper, in a rack by the press. Date, shift, press number, part number, quantity affected, description, operator initials. Eight fields. The one that would settle everything (which tool, which batch of stock, when the offset changed) is not on the form, because the form was designed in 2014 by somebody in an office who was solving for a signature.

**09:52.** He writes "bore undersize, approx 40 pcs, tool 7." Five words. That is the entire record of a deviation that will eventually cost the plant a customer-witnessed audit finding.

**14:00.** Shift change. The form goes in the tray. It is not handed over out loud. The trays swap, and the next shift's supervisor has 30 seconds of overlap with the last one and 14 things to talk about.

**19:30.** End of second shift. The supervisor collects the tray. Eleven forms. He sorts out the three that need a hold decision tonight and leaves the rest for the morning.

**Next morning, 08:15.** The quality coordinator (one person, three plants, this one is not their home site) types yesterday's forms into the tracking spreadsheet. It takes 50 minutes. The spreadsheet has different columns than the form: NCR number, date, source, part, qty, description, disposition, owner, due date. "Tool 7" goes into the description cell. There is no tool-number column. It is now free text.

**Day 3.** The coordinator opens a CAPA in the QMS from the spreadsheet row. They were not in the building when this happened. The CAPA asks for root cause. They type "tooling offset drift, investigate." A CAPA is the corrective-action ticket the QMS makes you open. It is a form, not an investigation. The operator, who could have told them the offset had been walked in twice that week, is not consulted, because consulting him is a phone call nobody has time for.

**Day 9.** The CAPA is assigned to the tooling engineer, who verifies offset drift, corrects the setup sheet, and closes it. Nine days, three systems, one real answer that was available in the first five minutes and was lost in the first five.

**Four months later.** A customer auditor pulls the record for the press. What is in front of them is a QMS ticket with a closing date, a signature and a root cause. What is not in front of them is that the offset walked twice in one week, because that was never captured. The auditor asks why the first walk wasn't flagged as a near-miss. Nobody can answer, because nobody recorded it.

The finding is not "you had a deviation." Every plant has deviations. The finding is "your system did not detect the pattern."

Now the part that makes people argue with me. Plant 2 is not a bad plant. It has a QMS. It has SOPs, a calibration schedule, a document control process, and an auditor who has passed it twice. The software is fine. **The capture is analog, and everything downstream inherits the loss.**

Every hand-off in that trace is a human being doing their best with a form that asked them for eight fields instead of the four that mattered.

Three things fix it, and none of them are a better QMS:

**Capture where the operator already is.** Under 60 seconds, on the phone in his pocket, offline because the far end of Plant 2 has no signal. Structured on the way in. The tool number is a field, not a sentence. He should not have to be a good writer to leave a good record.

**Route on arrival, not at the end of the shift.** Severity decides whether it is a hold, a ticket or a trend item, at 09:48 rather than 19:30. The person who has to act finds out while the press is still set up.

**Draft the CAPA from the record.** The coordinator should be approving a draft built from the capture, the machine history and the last 90 days of events on that tool, not authoring one from a spreadsheet row. They sign. They stop being the typist. The operator's five words stay attached to the evidence instead of being rewritten by somebody who wasn't there.

The audit trail then falls out of the system running, instead of being reconstructed in the four weeks before somebody arrives.

Two numbers would tell you whether it worked: median hours from capture to a routed, owned action. Target: under four, from nine days. And the share of CAPAs whose root cause is confirmed by the person who raised the deviation. Target: most of them, instead of none.

If you run quality at a multi-site contract manufacturer and this trace looks like your Tuesday, reply. Same if you run it anywhere the paperwork is beating you. That is the whole ask.
