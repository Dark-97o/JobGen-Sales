# JobGen Platform Merge Context: Receptionist & Sales

This document provides a comprehensive, section-by-section specification and content audit of both live JobGen landing pages:
1. **AI Receptionist** (`https://receptionist.jobgen.ai/`) — Featuring **Jenny**
2. **AI Sales & Platform** (`https://sales.jobgen.ai/`) — Featuring **Olivia**

The goal is to merge both websites into a single, cohesive, unified flagship web application under **JobGen.ai**.

---

## Table of Contents
1. [Executive Summary & High-Level Comparison](#1-executive-summary--high-level-comparison)
2. [Receptionist Landing Page (`receptionist.jobgen.ai`) Deep Dive](#2-receptionist-landing-page-receptionistjobgenai-deep-dive)
   - 2.1 Navigation & Brand Header
   - 2.2 Hero Section (Editorial V3 & Classic V1)
   - 2.3 Integration Marquee (16 Supported Platforms)
   - 2.4 Solutions Showcase (4 Tabbed Scenarios)
   - 2.5 Operational Comparison (Before & After Matrix)
   - 2.6 Real Call Library (Interactive Audio Demos & Transcripts)
   - 2.7 Customer Testimonial & Case Study Video
   - 2.8 How It Works (3 Quick Steps & 3 Deep-Dive Cards)
   - 2.9 Real-Time Operational Metrics Strip
   - 2.10 Core Capabilities (6 Primary Jobs & 14 Background Smarts)
   - 2.11 Live Operations Console Preview (Dashboard UI & Chart)
   - 2.12 Integration Ecosystem Grid (Connected Stack)
   - 2.13 FAQ Section (7 Questions & Answers)
   - 2.14 Final Call-to-Action Banner
   - 2.15 Footer & Global Corporate Links
   - 2.16 Supported Industry Verticals (12 Detailed Configurations)
3. [Sales Landing Page (`sales.jobgen.ai`) Deep Dive](#3-sales-landing-page-salesjobgenai-deep-dive)
   - 3.1 Public Header & Navigation
   - 3.2 Hero Section (Olivia & Value Propositions)
   - 3.3 Integration Marquee
   - 3.4 The JobGen Platform: 6 Core Capabilities & Connected Journey
   - 3.5 Inbound + Outbound Strategic Pillars
   - 3.6 Real Call Recordings Showcase (4 Industry Areas & Transcripts)
   - 3.7 Connected Process Flow (How Olivia Works: 4 Steps)
   - 3.8 Workflow Comparison Matrix & Outcome Measurement
   - 3.9 Setup, Boundaries & Guardrails (3 Setup Steps & Control Rules)
   - 3.10 The Wider JobGen AI Workforce (Jenny, Olivia, Jess, Emma)
   - 3.11 Closing Call-to-Action Section
   - 3.12 Footer & Legal Navigation
   - 3.13 Industry & Solution Blueprints
   - 3.14 Dynamic Pricing Calculator (`/pricing`)
4. [Visual Design System & Frontend Architecture Comparison](#4-visual-design-system--frontend-architecture-comparison)
   - 4.1 Typography & Fonts
   - 4.2 Color Palettes & Tokens
   - 4.3 Component Patterns & Interactive Widgets
5. [Proposed Unified Information Architecture & Merge Strategy](#5-proposed-unified-information-architecture--merge-strategy)
   - 5.1 Unified Value Proposition & Positioning
   - 5.2 Recommended Page Hierarchy & Navigation Structure
   - 5.3 Section-by-Section Merged Landing Page Blueprint
   - 5.4 Cross-Product Synergy Matrix (Jenny + Olivia)

---

## 1. Executive Summary & High-Level Comparison

| Dimension | AI Receptionist (`receptionist.jobgen.ai`) | AI Sales & Outreach (`sales.jobgen.ai`) | Unified Merge Vision |
| :--- | :--- | :--- | :--- |
| **Lead Agent / Persona** | **Jenny** · AI Receptionist | **Olivia** · AI Sales Agent & Inbound Assistant | **JobGen AI Workforce** (Dual leads: Jenny for Inbound/Reception, Olivia for Outbound/Sales) |
| **Core Value Proposition** | "The AI receptionist that keeps your business moving. I answer every call, understand what your customer needs, and turn the conversation into a clear next step — 24/7." | "Hey, I’m Olivia. Your next customer conversation starts here. AI agents for your website, inbound calls and outbound follow-up." | "Every conversation. A clear next step." Unified conversational intelligence across web, calls, WhatsApp & CRM. |
| **Primary Direction** | 100% Inbound call handling, calendar bookings, inbox triage, overflow & handoffs. | Inbound call handling + Outbound campaigns, property prospecting, student follow-ups. | Full-cycle communication: Inbound Answering + Outbound Outreach + Omnichannel CRM. |
| **Hero Visual Style** | Modern editorial with warm corporate tones, video avatar with live audio toggle, waveform animation. | Clean, confident tech-forward look with portrait avatar, live audio wave, assurance pills. | High-end editorial dark/light hybrid, supporting dual-agent audio previews. |
| **Key Proof Assets** | Live console dashboard mockup, operational metrics, firm video testimonial (Mandar Gokhale), audio library. | 5 real audio recordings across 4 verticals, workflow before/after table, interactive 4-step process viewer. | Combine the live console dashboard + audio recordings library + video testimonials + interactive comparison. |
| **Target Verticals** | Accounting, Legal, Medical, Dental, Trades, Automotive, NDIS, Home Services. | Property & Real Estate, Education, Hospitality/Restaurants, Daycare/Child Care, Trades. | Unified industry selector covering Trades, Professional Services, Healthcare, Property & Education. |
| **Interactive Demos** | Embedded audio player, live console chart preview, `<jobgen-voice-demo>` trigger. | Embedded audio player with synchronized transcripts, dynamic pricing calculator, `<jobgen-voice-demo>`. | Synchronized live audio transcript player + dynamic pricing calculator + instant voice test widget. |

---

## 2. Receptionist Landing Page (`receptionist.jobgen.ai`) Deep Dive

### 2.1 Navigation & Brand Header
- **Logo**: `JOBGEN.AI` logo badge (icon + bold uppercase text). Subtitle: "Jenny AI Receptionist" (on industry pages).
- **Navigation Links**:
  - **Solutions (Dropdown Menu)**:
    - *24/7 answering*: "Every caller gets a useful answer"
    - *Appointment booking*: "Live calendars, confirmed on the call"
    - *Overflow & after-hours*: "Keep your number. Cover the calls you miss"
    - *Smart handoffs*: "The right calls reach the right person"
  - **Industries (Dropdown Menu)**: Categorized list of 12 industries with icons.
  - **Features**: Anchor link `#smarts`
  - **Integrations**: Anchor link `#integrations`
  - **Customers**: Anchor link `#customer`
  - **Book a demo**: External link to `https://calendly.com/jobgen-demo/30min`
- **Action Buttons**:
  - Secondary: "Log in" (`/login`)
  - Primary CTA: "Start free" (`/register`)

### 2.2 Hero Section
The landing page includes two versions: the modern editorial version (V3, default on `/`) and classic version (V1, accessible via `/old-version`).

#### Version 3 (Editorial Hero - Active Default)
- **Kicker Badge**: `Jenny · AI receptionist`
- **Headline (H1)**: `Hi, I’m Jenny.`
- **Subheadline (H2)**: `The AI receptionist that keeps your business moving.`
- **Lead Paragraph**:
  > "I answer every call, understand what your customer needs, and turn the conversation into a clear next step — 24/7."
- **Call-to-Action Buttons**:
  - Primary: `Start free` (Icon: right arrow) -> `/register`
  - Secondary: `Try Jenny live` (Triggers voice demo modal `<jobgen-voice-demo>`)
- **Assurance Proof Badges**:
  - ✓ `No card required`
  - ✓ `Human handoff built in`
- **Hero Media Stage**:
  - Autoplaying muted video portrait with video poster frame (`poster.jpg`).
  - Audio toggle button with speaker icon (`Turn video sound on` / `Mute video`).
  - Status card overlay: `Jenny · AI receptionist` with green indicator `● Available now`.
  - Visual 20-bar dynamic soundwave animation (`aria-hidden="true"`).

#### Version 1 (Classic Hero Option)
- **Headline**: `Meet Jenny — the only receptionist you need`
- **Paragraph**: `Jenny answers every call, books appointments, and keeps every handoff moving. Your front desk stays covered — even after hours.`
- **Stat Strip**:
  - `24/7`: Call answering
  - `100%`: Calls logged & summarised
  - `Minutes`: To set up & go live
- **Visual Mockups**:
  - Live call badge: "Live call — Booking Thursday 2:00 pm"
  - Task bubble: "Follow-up created — Tax checklist emailed"
  - Embedded YouTube video introducing Jenny: `https://www.youtube.com/embed/pAc02bUqoJ0`

### 2.3 Integration Marquee (16 Supported Platforms)
An infinite-scroll marquee showcasing platforms that integrate with JobGen:
1. Google Calendar
2. Stripe
3. WhatsApp
4. Slack
5. Microsoft Teams
6. LinkedIn
7. HubSpot
8. MYOB
9. Calendly
10. Google Drive
11. Dropbox
12. Notion
13. Zapier
14. Airtable
15. Salesforce
16. Mailchimp

### 2.4 Solutions Showcase (4 Tabbed Scenarios)
- **Section Heading**:
  - Kicker: `Solutions`
  - Title: `Start with the call problem you need to solve.`
  - Subhead: `Jenny is one connected receptionist workspace. Choose where she helps first, then expand the workflow as your team is ready.`
- **Interactive Tabs & Descriptions**:
  1. **24/7 Answering**:
     - *Headline*: Every caller gets a useful answer.
     - *Detail*: Jenny greets callers in your business name, answers approved questions, and keeps the conversation moving after hours and during busy periods.
  2. **Appointment Booking**:
     - *Headline*: Live calendars, confirmed on the call.
     - *Detail*: Jenny finds valid times, applies duration and staff rules, books or reschedules, and sends the caller a confirmation.
  3. **Overflow & After-Hours**:
     - *Headline*: Keep your number. Cover the calls you miss.
     - *Detail*: Forward unanswered, overflow, or after-hours calls without replacing the number customers already know.
  4. **Smart Handoffs**:
     - *Headline*: The right calls reach the right person.
     - *Detail*: Urgent, sensitive, or high-value conversations can trigger a live transfer or a fully contextual staff handoff.
- **Universal Commitments (Listed per solution)**:
  - Uses your approved rules and brand voice
  - Leaves every outcome visible to your team
  - Hands off when a person is required
- **Action**: Button "Try this with Jenny"

### 2.5 Operational Comparison (Before & After Matrix)
- **Section Heading**:
  - Kicker: `Before and after`
  - Title: `From missed call to completed next step.`
  - Subhead: `Jenny removes the gaps between answering, understanding, action, and follow-up.`
- **Comparison Table**:

| Operational Moment | Before Jenny | With Jenny |
| :--- | :--- | :--- |
| **Staff are busy** | The call rings out or interrupts active work | Jenny answers in your business name |
| **A caller wants an appointment** | Voicemail and calendar ping-pong | Availability checked and booking confirmed |
| **The matter is urgent** | Urgency sits inside a generic message | Priority transfer or contextual handoff |
| **The conversation ends** | Notes are scattered or forgotten | Summary, transcript, outcome, and owner recorded |

### 2.6 Real Call Library (Interactive Audio Demos & Transcripts)
- **Section Heading**:
  - Kicker: `Real call library`
  - Title: `Hear Jenny handle both sides of the phone.`
  - Subhead: `Listen to two real Jenny conversations. Press play and the compact transcript will follow each speaker, one sentence at a time.`
- **Featured Call Demo**:
  - **ID**: `inbound-appointment`
  - **Direction**: Inbound
  - **Title**: Appointment booking
  - **Detail**: "A returning client calls to book an in-person tax return appointment and Jenny confirms it on the spot."
  - **Audio Source**: `/audio/inbound-appointment-booking.m4a` (Duration: 112.74 seconds)
  - **Speaker Tag**: Jenny · Appointment booking
  - **Full Verbatim Transcript**:
    - `00:00` Jenny: *"Thank you for calling Apex Advisory. This is Jenny. How can I help you today?"*
    - `00:05` Client: *"Hi Jenny, I need to book an appointment for my annual tax return."*
    - `00:10` Jenny: *"I can help with that. Are you an existing client with Apex Advisory?"*
    - `00:14` Client: *"Yes, I am. My name is David Miller."*
    - `00:18` Jenny: *"Thanks David. Let me check the schedule for David Miller. Would you prefer an in-person meeting or an online video call?"*
    - `00:27` Client: *"In person would be great."*
    - `00:30` Jenny: *"Got it. We have openings this Thursday, the 14th at 10:00 am or Friday, the 15th at 2:00 pm. Do either of those work for you?"*
    - `00:40` Client: *"Thursday at 10:00 am sounds good."*
    - `00:43` Jenny: *"Perfect. That’s an in-person tax return appointment for Thursday, the 14th at 10:00 am with Sarah. Is your mobile number still 0412 345 678?"*
    - `00:56` Client: *"Yes, that’s right."*
    - `00:59` Jenny: *"I’ll send a confirmation SMS and an email with the checklist of documents to bring. Is there anything else you need help with today?"*
    - `01:08` Client: *"No, that covers it. Thank you."*
    - `01:11` Jenny: *"You’re welcome, David. Have a great day!"*

### 2.7 Customer Testimonial & Case Study Video
- **Review Rating**: 5.0 / 5.0 Stars (★★★★★)
- **Quote**:
  > “Jenny answers every client call, books straight into our diary, and chases the documents we used to lose. It’s like adding a **full-time receptionist** to the practice — without the overhead.”
- **Author**: Mandar Gokhale
- **Company**: M&S Business Solutions
- **Video Case Study**: Embedded YouTube video (`https://www.youtube.com/embed/CA_NEg3xJz0`)
  - Title: *How This Accounting Firm Saves $65K+ a Year — customer testimonial*

### 2.8 How It Works (3 Quick Steps & 3 Deep-Dive Cards)
- **Section Heading**:
  - Kicker: `How it works`
  - Title: `From first ring to finished work.`
  - Subhead: `Jenny compresses the usual voicemail, callback, booking, and follow-up loop into one clear conversation — then leaves your team with the full outcome.`

#### 3 Quick Steps:
1. **Jenny picks up**: "Inbound or outbound, every conversation starts in your practice voice." (*Proof: 24/7 coverage*)
2. **Jenny gets it done**: "She books, reschedules, takes messages, and gathers the details your team needs." (*Proof: One conversation*)
3. **Your team stays in control**: "The outcome, transcript, follow-up, email, and invoice workflow are all recorded." (*Proof: Every outcome logged*)

#### 3 Detailed Step Cards & Visual Simulations:
- **Card 01: Always available**
  - *Title*: Jenny answers every client call — day or night
  - *Description*: Jenny greets callers in your practice voice, recognises returning clients, understands what they need, and stays available after hours.
  - *Key Bullets*:
    - 24/7 call answering in a natural, on-brand voice
    - Takes and confirms messages accurately
    - Offers a live transfer or callback handoff when needed
  - *Interactive Visual Mockup*: Simulated live incoming call screen (Caller: Existing client recognised; Intent: Book tax-return appointment; Next step: Checking practice calendar; Status: Answered instantly, Message ready).
- **Card 02: Calendar connected**
  - *Title*: She books, changes, and routes the next step
  - *Description*: Jenny checks live staff calendars, offers valid times, and can book, reschedule, or cancel appointments while keeping the right person in the loop.
  - *Key Bullets*:
    - Real-time availability and appointment booking
    - Rescheduling, cancellation, and confirmations
    - Messages, checklists, and staff handoffs
  - *Interactive Visual Mockup*: Simulated booking calendar (Date: Thursday 12 February; 9:00 am Available; 2:00 pm Booked by Jenny; 4:30 pm Available; Confirmation sent).
- **Card 03: Nothing gets lost**
  - *Title*: She follows up and keeps every detail organised
  - *Description*: Every conversation becomes organised work. Jenny records the outcome, monitors intake emails, files client documents, and creates the follow-up your team needs.
  - *Key Bullets*:
    - Call summaries and searchable transcripts
    - Email scanning and document intake
    - Follow-up tasks and workflow monitoring
  - *Interactive Visual Mockup*: Follow-up queue (SM: Tax return booked [Done]; JD: Missing BAS documents [Chasing]; PR: Callback requested [New]).

### 2.9 Real-Time Operational Metrics Strip
- **Section Heading**: `Real-time metrics · Live — See the work move, as it happens.`
- **Subhead**: `A clear operational snapshot across calls, bookings, email, invoicing, and revenue follow-up.`
- **Metrics Grid**:
  1. **1,248** Calls answered (*No voicemail queue · +18% this month*)
  2. **286** Bookings created (*Direct to staff calendars · 92% confirmed*)
  3. **814** Emails processed (*Classified and routed · 6.2 hrs saved*)
  4. **173** Invoices generated (*Drafted and tracked · 41 followed up*)
  5. **$84.6k** Revenue followed up (*Outstanding client work · $12.4k recovered*)
- *Footnote*: Illustrative workspace data shown for the product preview.

### 2.10 Core Capabilities (6 Primary Jobs & 14 Background Smarts)
- **Section Heading**: `Core capabilities — What does Jenny do? Six essential front-desk jobs, handled from the first ring through to follow-up.`

#### 6 Core Front-Desk Capabilities:
1. **Answers & routes every call**: Picks up 24/7 in your practice voice, recognises the caller, and transfers or creates a callback handoff when needed.
2. **Books the right appointment**: Checks live staff availability, applies appointment and meeting rules, and books the right time directly into the calendar.
3. **Reschedules, cancels & confirms**: Handles appointment changes over the phone and keeps clients informed with confirmations and secure scheduling links.
4. **Emails “what to bring”**: Generates tailored document checklists and sends them before the appointment so clients arrive prepared.
5. **Reads & organises email**: Monitors connected inboxes, identifies appointment requests, BAS matters and payments, and files incoming attachments.
6. **Invoices & follows up in Xero**: Supports client sync, invoice drafts, payment tracking, overdue follow-up, and reconciliation workflows.

#### 14 Background Capabilities (Two-Row Marquee):
- Leaves confirmed messages
- Recognises returning clients
- Reviews every transcript
- Files client documents
- Creates staff handoffs
- Defines business hours
- Captures callback requests
- Syncs Outlook calendars
- Generates document checklists
- Scans BAS & payment emails
- Tracks overdue invoices
- Uses your greeting & script
- Confirms caller details
- Creates meeting reminders

### 2.11 Live Operations Console Preview (Dashboard UI & Chart)
- **Section Header**: `Operations console — Every call becomes visible work.`
- **Subhead**: `This preview follows your product’s real dashboard language: calls today, appointments, messages, email processing, staff handoffs, and invoice follow-up in one operational view.`
- **Console Brandbar**: Jenny (Operations / Live overview) with green badge `● AI receptionist live`.
- **Top Metric Cards**:
  - Calls today: **48** (+12%)
  - Appointments booked: **14** (8 upcoming)
  - Emails processed: **31** (Inbox clear)
  - Invoice follow-up: **$12.4k** (7 active)
- **Interactive SVG Activity Chart**:
  - Compares *Jenny work handled today* against *7-day average baseline curve*.
- **Recent Work Live Activity Table**:

| Time | Client | Work Handled | Status | Owner |
| :--- | :--- | :--- | :--- | :--- |
| `10:42` | Sarah M. | Tax return appointment | **Booked** | Jenny |
| `10:31` | James K. | Missing document follow-up | **Sent** | Jenny |
| `10:18` | Anya P. | Invoice payment query | **Resolved** | Jenny |
| `09:56` | Tom W. | ATO call · urgent handoff | **Escalated** | Mia |

- **Core Value Pillars**:
  - **Review every conversation**: Call outcomes, summaries, transcripts, and escalation context.
  - **Track what was completed**: Bookings, messages, emails, and follow-up tasks stay attributable.
  - **Know what needs a human**: Sensitive and urgent requests are clearly routed to the right owner.

### 2.12 Integration Ecosystem Grid (Connected Stack)
- **Heading**: `Works with your stack — Plugs into the tools you already use.`
- **Subhead**: `Connect Jenny to the systems that already run your calls, calendars, inbox, messages, and invoicing — without replacing the tools your team knows.`
- **Dedicated Service Cards**:
  1. **Xero**: Invoice syncing (`Connected`)
  2. **Outlook Calendar**: Calendar availability (`Connected`)
  3. **Gmail**: Email intake (`Coming soon`)
  4. **Twilio**: Voice infrastructure (`Connected`)
  5. **SMS**: Confirmations & reminders (`Connected`)
- *Footer Note*: Connected today: Xero, Outlook Calendar, Twilio, and SMS. Additional connectors shown as configurable or planned integrations.

### 2.13 FAQ Section (7 Questions & Answers)
1. **What is an AI receptionist?**
   > An AI receptionist answers phone calls in a natural voice, understands what callers need, books appointments, captures details, and follows up automatically. Jenny brings those front-desk jobs into one consistent workflow.
2. **Is Jenny built for accounting practices?**
   > Yes. Jenny is designed around accounting workflows, including tax-return appointments, BAS enquiries, document intake, invoice follow-up, and careful escalation of sensitive matters.
3. **Does Jenny sound like a robot?**
   > Jenny uses a natural conversational voice and follows your preferred greeting, tone, and call instructions. She confirms important details clearly and knows when a person should take over.
4. **How does Jenny book appointments?**
   > She checks live staff availability, applies appointment type, duration, buffer, and meeting rules, then books or reschedules the right time and sends the appropriate confirmation.
5. **What happens after a call?**
   > Jenny saves a summary and transcript, records confirmed messages, creates callback or staff handoff tasks, and keeps the next action visible to your team.
6. **Can Jenny answer after hours and during tax season?**
   > Jenny can answer around the clock, including weekends and peak periods. You choose the business hours, transfer rules, unavailable messaging, and callback behaviour.
7. **How much control do I have?**
   > You control the greeting, scripts, calendars, booking rules, business hours, transfer settings, and follow-up instructions. Your team can review calls and refine Jenny as your practice changes.

### 2.14 Final Call-to-Action Banner
- **Avatar**: Jenny portrait
- **Kicker**: `Never miss another call`
- **Headline**: `Give your practice a front desk that never sleeps.`
- **Subhead**: `Set Jenny up in minutes — she starts answering the same day.`
- **Buttons**:
  - Primary: `Start your trial` (Icon: arrow) -> `/register`
  - Secondary: `Book a demo` -> `https://calendly.com/jobgen-demo/30min`
- **Proof Tag**: `✓ No credit card required · Cancel anytime`

### 2.15 Footer & Global Corporate Links
- **Brand Slogan**: "Grow your business. Empower your people with your AI-powered workforce."
- **Columns**:
  - **Product**:
    - Jenny · AI Receptionist (`/`)
    - Olivia · Property Sales (`https://sales.jobgen.ai/`)
    - Jess · AI Recruitment (`https://jobgen.ai/recruiter-agent`)
    - Emma · Job Search (`https://jobgen.ai/coach`)
  - **Company**:
    - Web Development (`https://jobgen.ai/web-development`)
    - News (`https://jobgen.ai/news`)
    - Partner Program (`https://jobgen.ai/partners`)
    - Careers (`https://recruiter.jobgen.ai/jobs/jobgen-ai-4`)
  - **Others / Legal**:
    - Contact (`mailto:hello@jobgen.ai`)
    - Privacy Policy (`https://www.jobgen.ai/privacy/`)
    - Terms of Service (`https://www.jobgen.ai/terms/`)
- **Wordmark & Copyright**:
  - Big background wordmark: `JOBGEN.AI`
  - Copyright: `© 2026 JobGen.AI. JobGen® is a registered trademark.`
  - Physical Offices:
    - 🇺🇸 **San Francisco**: 580 California St, CA 94104
    - 🇦🇺 **Sydney**: 60 Martin Place, NSW 2000

### 2.16 Supported Industry Verticals (12 Detailed Configurations)
The receptionist application contains specialized industry landing pages located at `/industries/:industrySlug`:
1. **Plumbing**: Emergency triage, service-area verification, quote & job dispatch, active flooding screening.
2. **Electricians**: Urgent hazards, switchboard repairs, residential/commercial quote intake.
3. **Home Services**: Routine maintenance, cleaning, pest control, recurring scheduling.
4. **Construction**: Subcontractor messages, site visits, client quote inquiries.
5. **Accounting**: Tax returns, BAS enquiries, document checklists, invoice chasing.
6. **Legal**: Client intake, matter confidentiality, consultation booking, solicitor escalation.
7. **Real Estate**: Rental inquiries, appraisal bookings, inspection times, buyer registration.
8. **Mortgage Brokers**: Loan assessment intake, document collection, broker calendar booking.
9. **Medical**: Administrative inquiries, appointment reschedules, triage non-clinical escalation.
10. **Dental**: Check-up/hygiene bookings, dental emergencies, multi-chair calendar rules.
11. **NDIS Providers**: Respectful participant intake, support coordination, safeguarding escalation.
12. **Automotive**: Workshop bay availability, registration & vehicle model intake, repair quotes.

---

## 3. Sales Landing Page (`sales.jobgen.ai`) Deep Dive

### 3.1 Public Header & Navigation
- **Branding**: `JOBGEN.AI` logo with minimalist typography.
- **Top Navigation Menus**:
  - **Solutions (Dropdown Menu)**:
    - *After-hours answering*: "Your business can close. Your phone can still be helpful."
    - *Overflow call handling*: "Let your team answer when they can — and JobGen step in when they cannot."
    - *Appointment booking*: "Move callers from “I need help” to a confirmed next step."
    - *Property owner outreach*: "Turn an owner database into respectful, structured conversations."
  - **Industries (Dropdown Menu)**:
    - Property & Real Estate
    - Plumbing
    - Electricians
    - (and additional service verticals)
  - **Platform / How it Works**: Anchor `#how-it-works`
  - **Compare**: Anchor `#with-jobgen`
  - **Workforce**: Anchor `#ai-workforce`
  - **Pricing**: Route `/pricing`
  - **Book a Demo**: External link `https://calendly.com/jobgen-demo/30min`
- **Actions**:
  - Sign in: `/login`
  - CTA Button: `Start free` -> `/register`

### 3.2 Hero Section (Olivia & Value Propositions)
- **Headline (H1)**: `Hey, I’m Olivia.`
- **Rule Divider**: Clean horizontal design accent.
- **Lead Subhead**: `Your next customer conversation starts here.`
- **Body Copy**:
  > "Meet JobGen: AI agents for your website, inbound calls and outbound follow-up. Connect chat, WhatsApp and CRM, with your team ready to take the next step."
- **Call-to-Action Buttons**:
  - Primary: `Start free` (Icon: right arrow) -> `/register`
  - Secondary: `Try Live Demo` (Icon: phone, triggers JobGen Voice Demo widget)
- **Assurance Badges**:
  - ✓ `No card required`
  - ✓ `Human handoff built in`
- **AI Stage Avatar**:
  - Olivia portrait frame with green indicator: `Olivia · AI receptionist / Available now`.
  - 22-bar continuous waveform animation.

### 3.3 Integration Marquee
- Marquee tracking 16 industry platforms (Google Calendar, Stripe, WhatsApp, Slack, MS Teams, LinkedIn, HubSpot, MYOB, Calendly, Google Drive, Dropbox, Notion, Zapier, Airtable, Salesforce, Mailchimp).
- Pauses on keyboard focus or mouse hover.

### 3.4 The JobGen Platform: 6 Core Capabilities & Connected Journey
- **Section Heading**:
  - Eyebrow: `The JobGen platform`
  - Headline: `Every conversation. A clear next step.`
  - Lead: `From the first visit to the next phone call, connect your website, AI agents and customer follow-up. We bring chat, voice, WhatsApp and CRM together around the way your business works.`
  - Anchor Link: `Follow the customer journey →`

#### 6 Platform Pillars:
1. **01 / Website**:
   - *Title*: A website that starts a conversation.
   - *Description*: Bring your website, AI chat and browser voice together. Answer visitor questions using your business information and capture what they need before they leave.
   - *Action Link*: `Explore website services` (`/web-development`)
2. **02 / Inbound voice**:
   - *Title*: Be there when customers call.
   - *Description*: Your AI receptionist answers enquiries, takes messages and helps with appointments. Give callers a useful next step, even when your team is busy or the office is closed.
   - *Action Link*: `Meet your AI receptionist` (`/solutions/after-hours`)
3. **03 / Outbound voice**:
   - *Title*: Make the next conversation happen.
   - *Description*: Follow up with eligible contacts, qualify interest and arrange callbacks. Give every campaign a clear purpose, with your contact rules and calling schedule built in.
   - *Action Link*: `Explore outbound calls` (`/solutions/property-outreach`)
4. **04 / WhatsApp + voice**:
   - *Title*: Keep the conversation going.
   - *Description*: Connect WhatsApp with your voice workflow for messages, callback requests and follow-up. We configure the connection around your team and how your customers prefer to talk.
   - *Action Link*: `See the connected journey` (`#connected-workflow`)
5. **05 / CRM + leads**:
   - *Title*: Turn interest into an owned next step.
   - *Description*: Capture contact details, customer intent and the conversation summary. Use JobGen’s CRM or scope a connection to your existing system, so a qualified lead reaches the right team.
   - *Action Link*: `See the lead handoff` (`#connected-workflow`)
6. **06 / Human handoff**:
   - *Title*: Bring a real person into the conversation.
   - *Description*: Transfer a live call to your configured team when available. If nobody can take it, collect a message or callback request with the context they need to follow up.
   - *Action Link*: `See how your team takes over` (`#connected-workflow`)

#### Connected Customer Journey (`#connected-workflow`):
- **Heading**: `A lead is a person. Give them a proper handover.`
- **Description**: `Agree the channels, details to capture and handoff rules with us. Here is what a connected customer journey can look like.`
- **4 Customer Journey Steps**:
  - `01`: **Start wherever they are** — A visitor asks a question on your website, sends a WhatsApp message or calls your business.
  - `02`: **Understand the request** — The agent answers approved questions and collects their needs, contact details and preferred next step.
  - `03`: **Pass the lead with context** — The configured CRM workflow gives your team the enquiry, summary and follow-up action.
  - `04`: **Let your people take it from here** — Connect a live caller when the team is available, or leave a clear callback request for a person to pick up.

### 3.5 Inbound + Outbound Strategic Pillars
- **Eyebrow**: `Inbound + outbound`
- **Headline**: `Be there when they call. Follow up when it matters.`
- **Lead**: `One assistant for both sides of the conversation: answering customer enquiries and reaching out with a clear purpose.`

#### 01 / Inbound:
- *Headline*: Turn incoming calls into useful answers.
- *Description*: Handle routine questions, collect the details behind an enquiry, capture booking requests and pass the exceptions to your team.
- *Capabilities*:
  - Business information and customer enquiries
  - Appointment requests and structured messages
  - Busy-time, overflow and after-hours coverage
- *Link*: `Explore inbound by industry →`

#### 02 / Outbound:
- *Headline*: Give every campaign a clear purpose.
- *Description*: Reach out to existing contacts, qualify interest, gather preferences and arrange the right follow-up call with your team.
- *Capabilities*:
  - Purposeful follow-up campaigns and customer outreach
  - Structured qualification questions and interest capture
  - Clear agent handover and scheduled callbacks
- *Link*: `Explore outbound by industry →`

### 3.6 Real Call Recordings Showcase (4 Industry Areas & Transcripts)
- **Section Heading**:
  - Kicker: `Real call recordings`
  - Title: `Hear how our AI receptionist works.`
  - Subhead: `Listen to real conversations from education, property, restaurant and child care call flows. Follow the transcript as the receptionist listens, responds and secures the next step.`
- **Category Tabs**:
  1. `Education`
  2. `Property`
  3. `Restaurant`
  4. `Daycare / Child care`

#### Call Details & Verbatim Transcripts:
1. **Education — "Student course enquiry" (Inbound · 68.6s)**
   - *Organization*: McGill Institute
   - *AI Speaker*: Jenny, AI receptionist
   - *Outcome*: Course and tuition details confirmed ($37,500 tuition, Cloud Lab timetable)
   - *Verbatim Excerpt*:
     > AI: "Hi Shiqi, thank you for calling McGill Institute. This is Jenny, AI receptionist... Could you please provide your student number?"
     > Caller: "[Student number redacted]"
     > AI: "Your next class is scheduled for today, Tuesday at 2 p.m. in Computer Lab 3. It’s a Cloud Lab session for your Diploma of Information Technology."
2. **Property — "Property value follow-up" (Outbound · 95.7s)**
   - *Direction*: Outbound call to known homeowner
   - *Outcome*: Free digital property report accepted + appraisal callback booked for Friday with agent Buta
   - *Verbatim Excerpt*:
     > AI: "The reason for my call is that a lot of homeowners in your area are curious to know what their property is worth in today’s market. We are providing a digital property value report at no cost. Would you like us to email you one?"
     > Caller: "All right, sounds okay to me... I can do this Friday."
     > AI: "Great, just to confirm, Buta will call you back this Friday."
3. **Property — "Stale listing follow-up" (Outbound · 94.15s)**
   - *Direction*: Outbound call to vendor
   - *Scenario*: Property has been on the market for 97 days
   - *Outcome*: Agent callback booked for Monday morning with Buta
4. **Restaurant — "Birthday table booking" (Outbound · 74.3s)**
   - *Organization*: Golden Time Restaurant
   - *Scenario*: Follow-up on website table inquiry
   - *Outcome*: Sunday dinner booking callback requested (3–4 guests, birthday)
5. **Daycare — "Child care centre tour" (Outbound · 89.67s)**
   - *Scenario*: Parent requested center visit
   - *Priority Highlighted*: Safety & facility security
   - *Outcome*: Friday 4:00 pm center tour callback confirmed

### 3.7 Connected Process Flow (How Olivia Works: 4 Steps)
- **Section Heading**:
  - Eyebrow: `How Olivia works`
  - Headline: `More than a voice. A connected process.`
  - Subhead: `Follow one student enquiry from the first question to the record your team can review.`
- **Interactive 4-Step Viewer**:
  - **Step 01: Recognise the caller**
    - Body: Use configured identity checks before discussing customer-specific information. If verification is incomplete, keep the response general or hand off.
    - Data: Caller verified -> Student record accessed.
  - **Step 02: Find the relevant context**
    - Body: Use the business knowledge and linked information relevant to this enquiry. A student’s timetable is different from a property owner’s selling plans.
    - Data: Timetable record matched.
  - **Step 03: Answer or capture the request**
    - Body: Give an answer grounded in your information, ask for missing details, or capture a booking or callback request. Unsupported questions stay with a person.
    - Data: Natural voice answer delivered with fallback for student services.
  - **Step 04: Leave a record your team can use**
    - Body: Review the call and transcript. Where follow-up is needed, keep the request, priority and next owner together instead of asking the caller to start again.
    - Data: Call outcome logged, transcript saved, follow-up assigned to student services.

### 3.8 Workflow Comparison Matrix & Outcome Measurement
- **Section Heading**: `What changes for your team — Less work between the call and the next step.`

#### Workflow Comparison Table:

| The Work | Without a Configured Call Assistant | With JobGen |
| :--- | :--- | :--- |
| **Busy or after-hours calls** | Missed calls can become a callback queue. | Configured coverage captures the enquiry and its next step. |
| **Owner and student follow-ups** | People work through lists and record notes between calls. | Campaigns use selected audiences, templates and contact rules. |
| **Customer context** | Staff look across separate records before answering. | Relevant saved information supports configured call flows. |
| **After the conversation** | Someone has to reconstruct the request and find an owner. | Calls, transcripts and structured follow-ups stay reviewable. |
| **Exceptions** | An urgent or unusual request depends on who picks up. | Defined escalation rules keep the right people involved. |

#### Measurement Framework:
- **Heading**: `Measure the outcomes that matter to you.`
- **Pipeline Progression**: `Reached → Interested → Callback requested → Booking confirmed`
- **Explanation**: Review reached contacts, recorded interest, callback requests and confirmed bookings separately to track operational performance across the full conversion funnel.

### 3.9 Setup, Boundaries & Guardrails (3 Setup Steps & Control Rules)
- **Section Heading**: `Setup & control — Start with one call flow. Keep control as you grow.`
- **Subhead**: `Set up the information, questions and boundaries for your first use case. Test it with your team before routing calls or launching a campaign.`

#### 3 Setup Steps:
1. **01 / Give her the facts you already use**: Services, opening hours, course information or property details. Add approved answers and the questions your team cannot answer without a person. (*Business information · Approved answers*)
2. **02 / Decide what a complete enquiry needs**: A property address and selling timeframe. A student number. A booking preference. Set the details to capture and the situations to escalate. (*Required details · Escalation rules*)
3. **03 / Test the call. Then hand over with context**: Try your own scenarios before routing calls. Review the transcript, request and next step, so the person following up knows where to begin. (*Test calls · Transcripts · Follow-up owner*)

#### Boundaries & Control Sidebar:
- **Heading**: `You decide where Olivia stops.`
- **Definition List**:
  - **Knowledge**: Your approved business facts and answers.
  - **Identity**: Verification before customer-specific information.
  - **Outreach**: Selected contacts, DNC checks and configured schedules.
  - **Exceptions**: Urgent or unsupported requests go to your chosen team.
  - **Review**: Call records, transcripts and follow-up status.
- **Core Guardrails**:
  - **Approved information**: Answers stay grounded in the details you provide.
  - **People stay in the loop**: Urgent or unsupported requests follow your escalation rules.
  - **A reviewable record**: Keep the conversation and next step together.

### 3.10 The Wider JobGen AI Workforce (Jenny, Olivia, Jess, Emma)
- **Section Heading**: `Meet the wider JobGen team — Different work. A specialist for each.`
- **Subhead**: `Customer conversations are part of the story. Explore the JobGen assistants built for reception, sales, recruitment and job searching.`
- **The Team**:
  1. **Jenny** (`AI receptionist`): "A welcoming first answer for incoming calls, appointments and customer enquiries." -> `https://receptionist.jobgen.ai/`
  2. **Olivia** (`AI sales agent`): "Purposeful outbound conversations, interest qualification and follow-up for your team." -> `#capabilities`
  3. **Jess** (`AI recruitment assistant`): "Support for recruiters and hiring teams, from candidate screening to a clearer shortlist." -> `https://recruiter.jobgen.ai/`
  4. **Emma** (`AI job search assistant`): "Support for job seekers and career development." -> `https://jobgen.ai/coach`

### 3.11 Closing Call-to-Action Section
- **Eyebrow**: `Bring your own scenario`
- **Headline**: `Where does your next customer conversation begin?`
- **Copy**: `Your website. A WhatsApp message. An incoming call. Let’s connect it to the right next step.`
- **Action Buttons**:
  - Primary: `Start free` -> `/register`
  - Secondary: `Book a demo` -> `https://calendly.com/jobgen-demo/30min`

### 3.12 Footer & Legal Navigation
- Brand: `JOBGEN.AI` — "AI call handling and property outreach that turns conversations into visible next steps."
- Nav Columns:
  - **Solutions**: After-hours, Overflow, Appointment booking, Property outreach.
  - **Industries**: Property & Real estate, Education, Hospitality, Daycare, Trades.
  - **Account**: Pricing (`/pricing`), Get started (`/register`), Log in (`/login`), Book a demo.
  - **Legal**: `© 2026 JOBGEN.AI` · Privacy · Terms · Security.

### 3.13 Industry & Solution Blueprints
Detailed sub-pages for specific use cases:
- `/solutions/after-hours`
- `/solutions/overflow`
- `/solutions/booking`
- `/solutions/property-outreach`
- `/industries/property`
- `/industries/plumbing`
- `/industries/electricians`
- `/web-development` (Web agency offering bundled with AI voice/chat agents)
- `/partners` & `/partners/genesystel` (Telecom & Reseller programs)

### 3.14 Dynamic Pricing Calculator (`/pricing`)
The sales website features an interactive pricing calculation engine with the following options:
- **Call Direction**: Inbound vs Outbound
- **Industry Profile**: Property, Education, Trades, etc.
- **Estimated Call Volume Slider**: (e.g., 50 to 10,000 calls/month)
- **Call Duration**: (e.g., 1.0 to 5.0 minutes)
- **LLM Engine Selection**:
  - `GPT-5.5` (Flagship, 1.55x)
  - `GPT-5.4 mini` (Balanced, 0.5x)
  - `GPT-4.1` (Reliable, 1.15x)
  - `GPT-4.1 mini` (Efficient, 0.55x)
  - `GPT-4o` (Recommended, 1.0x)
  - `GPT-4o mini` (Lowest price, 0.3x)
- **Voice Engine Selection**:
  - `ElevenLabs Flash / Turbo` (Natural conversational voice, 1.0x)
  - `ElevenLabs v3 Conversational` (Natural conversational voice, 1.0x)
  - `ElevenLabs v3` (Expressive voice)
- **Speech-to-Text Engine**: `Scribe Realtime`, etc.
- **Telephony Model**: Managed Dedicated Numbers (Mobile or Local) vs BYO Twilio SIP Trunk.
- **Instant Output**: Cost per call estimate + estimated monthly investment.

---

## 4. Visual Design System & Frontend Architecture Comparison

### 4.1 Typography & Fonts
- **Primary Body / UI Font**: `DM Sans, system-ui, sans-serif` & `Inter, system-ui, sans-serif`
- **Display / Editorial Font**: `Manrope, sans-serif` and high-contrast serif accents (`Bodoni Moda, Georgia, Times New Roman, serif`)
- **Code / Metrics / Numbers**: `JetBrains Mono, ui-monospace, Menlo, monospace`
- **Branding / Wordmark**: Bold uppercase geometric sans (`JOBGEN.AI`)

### 4.2 Color Palettes & Tokens

#### Receptionist (`receptionist.jobgen.ai`):
- **Base Background**: Clean editorial ivory/alabaster (`#faf9f5` / `#ffffff`)
- **Dark Sections / Brand Accent**: Deep Forest Emerald (`#102f29`, `#163e37`)
- **Action Accents**: Warm Coral / Terracotta (`#e76f51`, `#f4a261`) and Sapphire Blue (`#1d4fd8`)
- **Status Colors**: Emerald Green (`#059669` for Live/Booked), Amber (`#d97706` for Pending), Coral (`#ef4444` for Urgent/Escalated)

#### Sales (`sales.jobgen.ai`):
- **Theme Color**: Rich Dark Pine / Slate Green (`#102f29`)
- **Surfaces**: Crisp white cards with ultra-subtle slate borders (`rgba(15, 23, 42, 0.08)`)
- **Primary Action**: Minimalist dark button (`#102f29`) and light variant (`#ffffff`)
- **Text Scale**: Deep charcoal headers (`#0f172a`), muted slate body (`#475569`), light muted text (`#64748b`)

### 4.3 Component Patterns & Interactive Widgets
Both sites share core interactive technologies:
1. **Interactive Audio Players (`<audio>`)**:
   - Audio waveform animations (`20–22 bars`).
   - Time-synced transcript scrolling highlighting speaker bubbles (`AI` vs `Caller`).
   - Play/pause state with custom duration formatters.
2. **Interactive Web Component**: `<jobgen-voice-demo>`
   - Triggered by `Try Live Demo` / `Try Jenny live`.
   - Opens an in-browser microphone/audio conversation session.
3. **Infinite Marquee Tracks**:
   - Double-array rendering `[...logos, ...logos]` with CSS hardware-accelerated translation.
   - Pause on `:hover` and `:focus-visible`.
4. **SVG Visualizations**:
   - Live activity curve charts with linear gradient fills.
5. **Simulated Product Previews**:
   - Incoming call cards, live calendar appointment slots, task follow-up queues.

---

## 5. Proposed Unified Information Architecture & Merge Strategy

### 5.1 Unified Value Proposition & Positioning
- **The Core Problem**: Businesses lose revenue and opportunities between missed calls, neglected leads, slow callbacks, and disjointed tools (website chat, phone, WhatsApp, CRM).
- **The Unified Solution**: **JobGen.ai** is the unified conversational workforce that answers when customers reach out and follows up when it counts.
  - **Inbound AI Receptionist (Jenny)**: 24/7 call answering, live calendar booking, message taking, document checklist emailing, triage, and human handoff.
  - **Outbound AI Sales & Outreach (Olivia)**: Proactive lead engagement, property report follow-up, customer interest qualification, and warm callback scheduling.
  - **Connected Platform Ecosystem**: Web chat, phone calls, WhatsApp messages, and CRM sync unified in one place.

### 5.2 Recommended Page Hierarchy & Navigation Structure

```
[Header Navigation]
├── Solutions (Dropdown)
│   ├── Inbound Reception (Jenny)
│   ├── Outbound Sales & Follow-up (Olivia)
│   ├── 24/7 After-Hours & Overflow
│   ├── Live Calendar Booking
│   └── WhatsApp & Multi-Channel Messaging
├── Industries (Dropdown)
│   ├── Property & Real Estate
│   ├── Accounting & Financial Services
│   ├── Trades (Plumbing, Electrical, Construction)
│   ├── Healthcare (Medical, Dental, NDIS)
│   └── Education & Training
├── Platform (Anchor #platform / Journey #journey)
├── Real Calls (Anchor #recordings - Audio Showcase)
├── Pricing (/pricing - Interactive Calculator)
├── Try Live Demo (Triggers Voice Widget)
└── Actions: [Log In] | [Start Free / Book a Demo]
```

### 5.3 Section-by-Section Merged Landing Page Blueprint

1. **Top Announcement Bar**:
   - Announce unified capabilities: "JobGen now connects 24/7 Inbound Reception & Proactive Outbound Sales in one platform."
2. **Unified Hero Section**:
   - **Headline**: "Every conversation. A clear next step."
   - **Subhead**: "Meet Jenny & Olivia: Your AI workforce for 24/7 inbound reception, website enquiries, WhatsApp and outbound customer follow-up."
   - **Interactive Switcher**: Toggle between **Jenny (Inbound Front Desk)** and **Olivia (Outbound Sales & Campaigns)** with instant audio preview, live portrait, and feature badges.
   - **CTAs**: `Start free (No card required)` + `Try Live Voice Demo` + `Book a demo`.
3. **Integration Ecosystem Marquee**:
   - Combined 16+ integration partners (Xero, Outlook, Google Calendar, Twilio, WhatsApp, Stripe, HubSpot, Salesforce, etc.).
4. **Core Value Matrix: Inbound + Outbound (The Two Halves of Conversation)**:
   - Side-by-side presentation of:
     - **Inbound Reception (Jenny)**: Never miss an inquiry, appointment, or emergency.
     - **Outbound Sales (Olivia)**: Never let a lead, database, or quote request go cold.
5. **Interactive Real Call Library (Unified Audio Player)**:
   - Filter by: `Reception / Booking`, `Property Sales`, `Education Support`, `Hospitality`, `Trades Emergency`.
   - Synchronized audio playback with live highlighted transcripts.
6. **The JobGen Platform & 4-Step Customer Journey**:
   - The 6 platform pillars (Website, Inbound Voice, Outbound Voice, WhatsApp, CRM & Leads, Human Handoff).
   - The 4 journey stages (Start anywhere → Understand request → CRM handoff → Human follow-up).
7. **Interactive Operations Console & Live Metrics**:
   - The live operations preview (calls today, bookings, follow-ups, revenue recovered, chart visualization, recent work audit log).
8. **Workflow Transformation Matrix (Before vs After)**:
   - Comprehensive comparison table demonstrating the reduction in manual work and zero dropped leads.
9. **Setup, Control & Safety Guardrails**:
   - The 3-step setup framework + "You decide where AI stops" (Identity checks, approved business facts, DNC rules, human escalation).
10. **Customer Proof & Testimonials**:
    - Mandar Gokhale (M&S Business Solutions) case study video & quote, plus multi-industry customer metrics.
11. **Interactive Pricing Preview / Calculator Hook**:
    - Embedded dynamic calculator snippet with link to full `/pricing` studio.
12. **Unified FAQ Section**:
    - Consolidated answers covering call handling, outbound ethics/compliance, calendar syncing, CRM integration, security, and onboarding speed.
13. **Final High-Conversion CTA Banner**:
    - "Ready to give your business an AI workforce that never sleeps?"
    - Buttons: Start Free Trial & Book a 30-Min Demo.
14. **Unified Global Footer**:
    - Solutions, Industries, Platform, Company, Legal, San Francisco & Sydney office addresses.

### 5.4 Cross-Product Synergy Matrix (Jenny + Olivia)

```
       ┌────────────────────────────────────────────────────────┐
       │                     JOBGEN.AI                          │
       │           Every Conversation. A Clear Next Step.       │
       └──────────────────────────┬─────────────────────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
   INBOUND FRONT DESK                              OUTBOUND CAMPAIGNS
   [Jenny · AI Receptionist]                       [Olivia · AI Sales Agent]
   • 24/7 Call Answering                           • Stale Listing & Database Reactivation
   • Live Calendar Bookings                        • Property Valuation Reports
   • Document Intake & Email Triage                • Course & Admission Follow-ups
   • Urgent Triage & Transfers                     • Quote & Lead Qualification
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  │
                                  ▼
               COMMON PLATFORM & OPERATIONAL BACKBONE
               • Multi-Channel: Web Chat + Voice + WhatsApp + SMS
               • Integrations: Xero, Outlook, Google, Twilio, HubSpot
               • Operations Console: Transcripts, Analytics, Recordings
               • Guardrails: Verified Identity, Approved Facts, Human Handoff
```

---
*Created as the baseline reference context for merging `receptionist.jobgen.ai` and `sales.jobgen.ai` into a unified JobGen web platform.*
