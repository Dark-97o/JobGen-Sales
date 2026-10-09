export const AGENTS = {
  jenny: {
    id: "jenny",
    name: "Jenny",
    role: "AI Receptionist",
    tagline: "The front desk that never sleeps",
    headline: "Hi, I’m Jenny.",
    subheadline: "The AI receptionist that keeps your business moving.",
    lead: "I answer every call in your brand voice, understand caller intent, book appointments on live calendars, and turn conversations into visible next steps — 24/7.",
    image: "/assets/jenny-portrait.jpg",
    statusText: "Available now · Answering 24/7",
    color: "#2563EB",
    badgeTone: "reception",
    audioSrc: "/audio/inbound-appointment-booking.m4a",
    stats: [
      { value: "24/7", label: "Front desk coverage" },
      { value: "100%", label: "Calls logged & summarised" },
      { value: "< 3 mins", label: "Setup to first live call" }
    ],
    features: [
      "Natural 24/7 call answering in your practice voice",
      "Live calendar booking, rescheduling & cancellations",
      "Document intake, checklist emails & triage",
      "Emergency routing & contextual staff handoffs"
    ],
    primaryCta: "Deploy Jenny",
    audioLabel: "Hear Jenny book an appointment"
  },
  olivia: {
    id: "olivia",
    name: "Olivia",
    role: "AI Sales & Outreach Agent",
    tagline: "Proactive growth & follow-up",
    headline: "Hey, I’m Olivia.",
    subheadline: "Your next customer conversation starts here.",
    lead: "I qualify incoming leads, reactivate quiet databases, and run proactive outbound campaigns across phone and WhatsApp with verified context and graceful human handoffs.",
    image: "/assets/olivia-portrait.jpg",
    statusText: "Active · Qualifying leads",
    color: "#3B82F6",
    badgeTone: "sales",
    audioSrc: "/audio/real-call-property-report.m4a",
    stats: [
      { value: "3.8x", label: "Faster lead response" },
      { value: "92%", label: "Verified contact rate" },
      { value: "0", label: "Dropped customer leads" }
    ],
    features: [
      "Purposeful outbound calls to existing contacts",
      "Stale listing & valuation report follow-ups",
      "Student & course enquiry qualification",
      "Structured CRM sync & instant team handover"
    ],
    primaryCta: "Deploy Olivia",
    audioLabel: "Hear Olivia qualify a property owner"
  }
};

export const INTEGRATIONS = [
  { name: "Google Calendar", category: "Calendar", color: "#4285F4" },
  { name: "Stripe", category: "Payments", color: "#635BFF" },
  { name: "WhatsApp", category: "Messaging", color: "#25D366" },
  { name: "Slack", category: "Team Chat", color: "#ECB22E" },
  { name: "Microsoft Teams", category: "Collaboration", color: "#6264A7" },
  { name: "LinkedIn", category: "Network", color: "#0A66C2" },
  { name: "HubSpot", category: "CRM", color: "#FF7A59" },
  { name: "MYOB", category: "Accounting", color: "#9A1F6E" },
  { name: "Calendly", category: "Scheduling", color: "#006BFF" },
  { name: "Google Drive", category: "Storage", color: "#34A853" },
  { name: "Dropbox", category: "Storage", color: "#0061FF" },
  { name: "Notion", category: "Workspace", color: "#FFFFFF" },
  { name: "Zapier", category: "Automation", color: "#FF4A00" },
  { name: "Airtable", category: "Database", color: "#18BFFF" },
  { name: "Salesforce", category: "Enterprise CRM", color: "#00A1E0" },
  { name: "Mailchimp", category: "Email", color: "#FFE01B" }
];

export const CONNECTED_STACK = [
  { name: "Xero", detail: "Live invoice & payment sync", status: "Connected", icon: "FileText", tone: "blue" },
  { name: "Outlook Calendar", detail: "Staff availability & room buffers", status: "Connected", icon: "Calendar", tone: "sky" },
  { name: "Twilio Voice", detail: "Global low-latency telephony infrastructure", status: "Connected", icon: "PhoneCall", tone: "blue" },
  { name: "SMS Gateway", detail: "Automated booking confirmations & links", status: "Connected", icon: "MessageSquare", tone: "indigo" },
  { name: "Gmail & Outlook Inbox", detail: "Inbound document intake & triage", status: "Active Beta", icon: "Mail", tone: "purple" }
];

export const PLATFORM_PILLARS = [
  {
    number: "01",
    tag: "Website Agent",
    title: "A website that starts a conversation.",
    description: "Bring web visitors into AI voice or chat instantly. Answer questions using your knowledge base and capture verified intent before they bounce.",
    metric: "4.2x higher conversion"
  },
  {
    number: "02",
    tag: "Inbound Reception",
    title: "Be there the second a customer calls.",
    description: "Your AI front desk answers in your business name, books live appointments, handles emergencies, and routes urgent handoffs.",
    metric: "0 missed calls"
  },
  {
    number: "03",
    tag: "Outbound Outreach",
    title: "Turn database contacts into active revenue.",
    description: "Execute respectful follow-ups, appraisal offers, course advisories, and reservation re-engagements with strict compliance guardrails.",
    metric: "88% contact pickup"
  },
  {
    number: "04",
    tag: "WhatsApp + Voice",
    title: "Omnichannel conversations that never drop context.",
    description: "Seamlessly transition between voice calls and WhatsApp messages with meeting links, checklists, and calendar invites.",
    metric: "Instant SMS / WhatsApp"
  },
  {
    number: "05",
    tag: "CRM & Follow-up",
    title: "Turn every conversation into an owned next step.",
    description: "JobGen extracts structured fields, call outcomes, transcripts, and tags directly into HubSpot, Salesforce, or JobGen CRM.",
    metric: "100% transcript logging"
  },
  {
    number: "06",
    tag: "Human-in-the-Loop",
    title: "Graceful handover to your people when it matters.",
    description: "Live call transfer to available staff, or structured callback tickets with complete caller history so your team never asks twice.",
    metric: "Zero blind transfers"
  }
];

export const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Start wherever they are",
    description: "A customer visits your website, calls your main phone number, or messages on WhatsApp."
  },
  {
    step: "02",
    title: "Understand with intelligence",
    description: "The AI agent verifies identity, references your approved business knowledge, and identifies exact intent."
  },
  {
    step: "03",
    title: "Execute the action",
    description: "Books the staff calendar, captures property or enquiry details, or sends automated preparation materials."
  },
  {
    step: "04",
    title: "Hand off with rich context",
    description: "Your human team receives the audio recording, searchable transcript, action items, and notification."
  }
];

export const CALL_RECORDINGS = [
  {
    id: "receptionist-tax",
    category: "Reception & Tax",
    title: "Tax return booking & checklist",
    speaker: "Jenny · AI Receptionist",
    duration: "1:52",
    audioSrc: "/audio/inbound-appointment-booking.m4a",
    outcome: "In-person appointment confirmed + document checklist emailed",
    transcript: [
      { time: 0, speaker: "Jenny", text: "Thank you for calling Apex Advisory. This is Jenny. How can I help you today?" },
      { time: 5, speaker: "Client", text: "Hi Jenny, I need to book an appointment for my annual tax return." },
      { time: 10, speaker: "Jenny", text: "I can help with that. Are you an existing client with Apex Advisory?" },
      { time: 14, speaker: "Client", text: "Yes, I am. My name is David Miller." },
      { time: 18, speaker: "Jenny", text: "Thanks David. Let me check the schedule. Would you prefer an in-person meeting or an online video call?" },
      { time: 27, speaker: "Client", text: "In person would be great." },
      { time: 30, speaker: "Jenny", text: "Got it. We have openings this Thursday the 14th at 10:00 am or Friday the 15th at 2:00 pm. Do either work?" },
      { time: 40, speaker: "Client", text: "Thursday at 10:00 am sounds good." },
      { time: 43, speaker: "Jenny", text: "Perfect. In-person tax return appointment for Thursday at 10:00 am with Sarah. Is your mobile 0412 345 678?" },
      { time: 56, speaker: "Client", text: "Yes, that’s right." },
      { time: 59, speaker: "Jenny", text: "I’ll send a confirmation SMS and an email with the checklist of documents to bring. Anything else today?" },
      { time: 70, speaker: "Client", text: "No, that covers it. Thank you." },
      { time: 74, speaker: "Jenny", text: "You’re welcome, David. Have a great day!" }
    ]
  },
  {
    id: "sales-property-report",
    category: "Property Outreach",
    title: "Digital property report & appraisal",
    speaker: "Olivia · AI Sales Agent",
    duration: "1:35",
    audioSrc: "/audio/real-call-property-report.m4a",
    outcome: "Free valuation report accepted + Friday agent appraisal booked",
    transcript: [
      { time: 0, speaker: "Olivia", text: "Hi Amelia, I’m Olivia from Hart Property. We are providing a complimentary digital property value report for Richmond homeowners." },
      { time: 8, speaker: "Olivia", text: "Would you like us to email you a copy?" },
      { time: 15, speaker: "Homeowner", text: "All right, sounds okay to me." },
      { time: 20, speaker: "Olivia", text: "Great, thank you. Just to confirm, is amelia@example.com the best email address?" },
      { time: 31, speaker: "Homeowner", text: "Yeah, that email is fine." },
      { time: 36, speaker: "Olivia", text: "Perfect. Out of curiosity, have you thought about selling in the next six to twelve months?" },
      { time: 54, speaker: "Homeowner", text: "Um, I can't guarantee exactly when, but we will keep an eye on the market." },
      { time: 64, speaker: "Olivia", text: "Totally understand. Would you like Buta to give you a call about an in-home appraisal at no cost?" },
      { time: 73, speaker: "Homeowner", text: "Yep, I think that’s fine. I can do this Friday." },
      { time: 82, speaker: "Olivia", text: "Great, Buta will call you back this Friday to confirm the appraisal time." }
    ]
  },
  {
    id: "education-support",
    category: "Education & Student",
    title: "Student enrolment & timetable inquiry",
    speaker: "Jenny · AI Receptionist",
    duration: "1:08",
    audioSrc: "/audio/real-call-education.m4a",
    outcome: "Tuition verified ($37,500) and Cloud Lab location confirmed",
    transcript: [
      { time: 0, speaker: "Jenny", text: "Hi Shiqi, thank you for calling McGill Institute. This is Jenny, AI receptionist. How may I help you today?" },
      { time: 7, speaker: "Student", text: "Hey Jenny, I just want to check when is my next class." },
      { time: 13, speaker: "Jenny", text: "Could you please provide your student number?" },
      { time: 16, speaker: "Student", text: "[Student number provided]" },
      { time: 23, speaker: "Jenny", text: "Your next class is scheduled for today at 2 p.m. in Computer Lab 3. It's Cloud Lab for Diploma of Information Technology." },
      { time: 33, speaker: "Student", text: "Okay, and what is the total tuition for this term?" },
      { time: 41, speaker: "Jenny", text: "Your total tuition for this term is $37,500 across your two enrolled diplomas." }
    ]
  },
  {
    id: "stale-listing",
    category: "Property Outreach",
    title: "Stale 97-day property listing outreach",
    speaker: "Olivia · AI Sales Agent",
    duration: "1:34",
    audioSrc: "/audio/real-call-property-listing.m4a",
    outcome: "Vendor callback scheduled for Monday morning",
    transcript: [
      { time: 0, speaker: "Olivia", text: "Hi Shiqi, this is Olivia from Buta Deogun. I noticed the property has been on the market for 97 days. Is it okay for a quick chat?" },
      { time: 16, speaker: "Owner", text: "Yeah, I've got a few minutes. It hasn't been going great honestly." },
      { time: 38, speaker: "Olivia", text: "What kind of buyer feedback have you received so far, and have there been offers?" },
      { time: 42, speaker: "Owner", text: "We got a couple, but the prices were too low." },
      { time: 51, speaker: "Olivia", text: "Would you be open to a brief, confidential call with Buta for a fresh perspective on the campaign?" },
      { time: 59, speaker: "Owner", text: "Yeah, why not. If Buta can help, I'd appreciate that." },
      { time: 79, speaker: "Olivia", text: "Confirmed for next Monday morning. Have a wonderful day." }
    ]
  },
  {
    id: "restaurant-booking",
    category: "Hospitality",
    title: "Birthday dining reservation follow-up",
    speaker: "Olivia · AI Concierge",
    duration: "1:14",
    audioSrc: "/audio/real-call-restaurant.m4a",
    outcome: "Sunday dinner table for 4 confirmed for manager callback",
    transcript: [
      { time: 0, speaker: "Olivia", text: "Hi, this is Olivia following up on your table inquiry with Golden Time Restaurant." },
      { time: 10, speaker: "Guest", text: "Hey, yes! This Sunday is my birthday and I need a table for 4." },
      { time: 43, speaker: "Olivia", text: "Are there any dietary, allergy or seating requirements our chef should prepare for?" },
      { time: 48, speaker: "Guest", text: "No allergies, just a nice booth if possible." },
      { time: 62, speaker: "Olivia", text: "Understood. The restaurant team will confirm your birthday booking shortly!" }
    ]
  }
];

export const WORKFLOW_COMPARISON = [
  {
    work: "Incoming after-hours & overflow calls",
    before: "Rings out to generic voicemail; 65% of callers never leave a message and dial a competitor.",
    withJobGen: "Jenny answers instantly 24/7 in your business name, books appointments, and captures structured notes."
  },
  {
    work: "Lead outreach & database follow-ups",
    before: "Stale contacts sit untouched; sales reps spend 70% of their day manually dialling voicemails.",
    withJobGen: "Olivia conducts respectful, compliant outreach campaigns and books qualified appraisal callbacks."
  },
  {
    work: "Caller identity & customer context",
    before: "Staff scramble across 4 different tabs and fragmented sticky notes to know who is calling.",
    withJobGen: "Instant customer profile lookup from CRM, past appointment history, and approved answers."
  },
  {
    work: "Post-conversation administration",
    before: "Manual typing, forgotten details, and dropped follow-up tasks between front desk and technicians.",
    withJobGen: "Automated summary, verbatim searchable transcript, calendar entry, and CRM task creation."
  },
  {
    work: "Urgent matters & sensitive exceptions",
    before: "Urgent emergencies sit in an inbox overnight until the morning staff arrive.",
    withJobGen: "Deterministic escalation rules execute live priority transfers to on-call duty managers."
  }
];

export const CONSOLE_STATS = {
  callsToday: 48,
  callsChange: "+14% vs avg",
  appointmentsBooked: 14,
  appointmentsDetail: "8 upcoming today",
  emailsProcessed: 31,
  emailsDetail: "Inbox zero maintained",
  revenueFollowedUp: "$18,450",
  revenueDetail: "5 invoices recovered"
};

export const RECENT_ACTIVITY = [
  { time: "10:42 AM", client: "Sarah Miller", type: "Tax Return Consultation", agent: "Jenny", status: "Booked", badge: "success" },
  { time: "10:31 AM", client: "James Kelly", type: "Missing BAS Documents Follow-up", agent: "Jenny", status: "Sent", badge: "info" },
  { time: "10:18 AM", client: "Anya Petrov", type: "Invoice #1042 Payment Query", agent: "Jenny", status: "Resolved", badge: "success" },
  { time: "09:56 AM", client: "David Zhang", type: "Urgent Flood Water Isolation", agent: "Jenny", status: "Escalated", badge: "warning" },
  { time: "09:30 AM", client: "Amelia Hart", type: "Digital Property Valuation Offer", agent: "Olivia", status: "Appraisal Booked", badge: "success" }
];

export const INDUSTRIES = [
  {
    slug: "property",
    name: "Property & Real Estate",
    description: "Inbound tenant/buyer inquiries, rental inspection bookings, and database outreach for owner appraisals.",
    icon: "Building2",
    accent: "#2563EB"
  },
  {
    slug: "accounting",
    name: "Accounting & Tax Practices",
    description: "Tax return bookings, BAS inquiry triage, automated document checklists, and overdue invoice chasing.",
    icon: "Calculator",
    accent: "#3B82F6"
  },
  {
    slug: "trades",
    name: "Trades & Emergency Services",
    description: "Plumbing, electrical, and HVAC job triage. Emergency active leak screening and immediate technician dispatch.",
    icon: "Wrench",
    accent: "#1D4ED8"
  },
  {
    slug: "healthcare",
    name: "Medical & Dental Clinics",
    description: "Patient appointment bookings, multi-practitioner calendar rules, and non-clinical administrative screening.",
    icon: "Activity",
    accent: "#60A5FA"
  },
  {
    slug: "ndis",
    name: "NDIS & Community Care",
    description: "Respectful participant intake, support coordination intake, and priority safeguarding escalations.",
    icon: "HeartHandshake",
    accent: "#3B82F6"
  },
  {
    slug: "education",
    name: "Education & Institutes",
    description: "Student enrolment advising, timetable assistance, tuition balance inquiries, and admissions follow-up.",
    icon: "GraduationCap",
    accent: "#2563EB"
  }
];

export const FAQS = [
  {
    q: "How do Jenny and Olivia work together under JobGen?",
    a: "Jenny serves as your 24/7 Inbound Front Desk Receptionist—handling incoming calls, live calendar bookings, FAQs, and office triage. Olivia is your Outbound Growth Agent—reaching out to customer lists, verifying property/sales intent, and booking warm appointments for your team. You can deploy one or both under a single unified dashboard."
  },
  {
    q: "Does the AI sound robotic or delay responses?",
    a: "Not at all. JobGen runs on ultra-low latency conversational voice engines (sub-500ms voice round-trip), delivering natural intonation, dynamic pacing, and intelligent interruption handling. Most callers speak with Jenny or Olivia without realizing they are speaking with an AI assistant."
  },
  {
    q: "How does live calendar booking and reschedule work?",
    a: "JobGen connects directly to Outlook, Google Calendar, and Calendly. It evaluates live staff availability, enforces buffer times, avoids double-bookings, and books or modifies meetings on the spot. Both caller and staff receive immediate confirmation notifications."
  },
  {
    q: "What happens when an urgent call or sensitive issue occurs?",
    a: "You define custom boundary rules and escalation criteria (e.g., active water leak, high-value client, angry caller). JobGen can execute a live warm transfer directly to your on-call team's mobile number, or immediately dispatch a high-priority SMS and email ticket with full call history."
  },
  {
    q: "Can I keep my existing phone number?",
    a: "Yes. You can simply forward unanswered, after-hours, or busy calls to your dedicated JobGen routing number without changing your existing public business number. We also provide dedicated local and mobile numbers if you need a new direct line."
  },
  {
    q: "How long does setup take?",
    a: "Most businesses go live in under 10 minutes. You input your basic company information, services, calendar links, and call instructions. You can test call your agent in the browser immediately before turning on call forwarding."
  }
];
