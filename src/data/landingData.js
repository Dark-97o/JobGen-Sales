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
    "id": "inbound-appointment",
    "category": "Tax & Reception",
    "title": "Tax return booking & checklist",
    "speaker": "Jenny · AI Receptionist",
    "duration": "1:53",
    "audioSrc": "/audio/inbound-appointment-booking.m4a",
    "outcome": "In-person appointment booked for Monday, Aug 3 at 10:00 am",
    "transcript": [
      {
        "time": 0,
        "speaker": "Jenny",
        "text": "Hi Shiqi. Thanks for calling M&S Solutions. This is Jenny, AI Receptionist. This call may be transcribed. How can I help?"
      },
      {
        "time": 11.44,
        "speaker": "Caller",
        "text": "I just want to book another meeting next Monday."
      },
      {
        "time": 16.24,
        "speaker": "Jenny",
        "text": "Would you like to meet in person at the office or have the meeting online?"
      },
      {
        "time": 20.24,
        "speaker": "Caller",
        "text": "I’d like to meet in person, actually."
      },
      {
        "time": 28.16,
        "speaker": "Jenny",
        "text": "We have tax return, consultation, and company or business return appointments. Which one would you like to book?"
      },
      {
        "time": 34.76,
        "speaker": "Caller",
        "text": "I want to book a tax return appointment."
      },
      {
        "time": 37.76,
        "speaker": "Jenny",
        "text": "How many people are we preparing tax returns for?"
      },
      {
        "time": 43.12,
        "speaker": "Caller",
        "text": "Just one."
      },
      {
        "time": 49.04,
        "speaker": "Jenny",
        "text": "I can see we have one investment property, zero crypto accounts or reports, and zero share-trading accounts or portfolios on file."
      },
      {
        "time": 57.28,
        "speaker": "Jenny",
        "text": "Has anything changed since last time?"
      },
      {
        "time": 59.8,
        "speaker": "Caller",
        "text": "No, nothing has changed."
      },
      {
        "time": 66.8,
        "speaker": "Jenny",
        "text": "Please give me a few seconds."
      },
      {
        "time": 69.84,
        "speaker": "Jenny",
        "text": "The first available slot for your tax return appointment is Monday, August 3, from 10:00 am to 10:45 am."
      },
      {
        "time": 78.24,
        "speaker": "Jenny",
        "text": "Would you like to book this time?"
      },
      {
        "time": 80.8,
        "speaker": "Caller",
        "text": "Yes, please."
      },
      {
        "time": 86.52,
        "speaker": "Jenny",
        "text": "Please give me a few seconds."
      },
      {
        "time": 88.88,
        "speaker": "Jenny",
        "text": "Your tax return appointment has been successfully booked for Monday, August 3, from 10:00 am to 10:45 am in the office."
      },
      {
        "time": 97.64,
        "speaker": "Jenny",
        "text": "Is there another meeting you’d like me to book?"
      },
      {
        "time": 101.12,
        "speaker": "Caller",
        "text": "No, thank you."
      },
      {
        "time": 105.72,
        "speaker": "Jenny",
        "text": "Thank you."
      },
      {
        "time": 106.56,
        "speaker": "Jenny",
        "text": "If you need anything else, feel free to call me back."
      },
      {
        "time": 109.64,
        "speaker": "Jenny",
        "text": "Have a great day."
      }
    ]
  },
  {
    "id": "sales-property-report",
    "category": "Property Outreach",
    "title": "Property value follow-up",
    "speaker": "Olivia · AI Sales Agent",
    "duration": "1:36",
    "audioSrc": "/audio/real-call-property-report.m4a",
    "outcome": "Appraisal callback booked for Friday",
    "transcript": [
      {
        "time": 0.62,
        "speaker": "Olivia",
        "text": "I don’t believe we have spoken before."
      },
      {
        "time": 2.56,
        "speaker": "Olivia",
        "text": "The reason for my call is that a lot of homeowners in your area are curious to know what their property is worth in today’s market."
      },
      {
        "time": 8.26,
        "speaker": "Olivia",
        "text": "We are providing a digital property value report at no cost."
      },
      {
        "time": 11.88,
        "speaker": "Olivia",
        "text": "Would you like us to email you one?"
      },
      {
        "time": 15.9,
        "speaker": "Homeowner",
        "text": "All right, sounds okay to me."
      },
      {
        "time": 20.42,
        "speaker": "Olivia",
        "text": "Great, thank you. Just to confirm, is [email address redacted] the best email address for us to send the free property report to?"
      },
      {
        "time": 31.44,
        "speaker": "Homeowner",
        "text": "Yeah, the email is okay."
      },
      {
        "time": 35.64,
        "speaker": "Olivia",
        "text": "Perfect, thank you."
      },
      {
        "time": 36.92,
        "speaker": "Olivia",
        "text": "Before I arrange the report, just to confirm, are you still residing at [property address redacted]?"
      },
      {
        "time": 44.02,
        "speaker": "Homeowner",
        "text": "Yeah, I’m still living over there."
      },
      {
        "time": 48.7,
        "speaker": "Olivia",
        "text": "Thanks for confirming."
      },
      {
        "time": 50.44,
        "speaker": "Olivia",
        "text": "Out of curiosity, have you thought about selling in the next six to twelve months?"
      },
      {
        "time": 54.64,
        "speaker": "Homeowner",
        "text": "Um, I can’t guarantee exactly when, but I will keep an eye on the market."
      },
      {
        "time": 64.66,
        "speaker": "Olivia",
        "text": "Totally understand. It’s always good to keep an eye on the market."
      },
      {
        "time": 68.14,
        "speaker": "Olivia",
        "text": "Would you like Buta to give you a call about an in-home appraisal at no cost?"
      },
      {
        "time": 73.58,
        "speaker": "Homeowner",
        "text": "Yep, I think that’s fine."
      },
      {
        "time": 76.46,
        "speaker": "Homeowner",
        "text": "I can do it this Friday."
      },
      {
        "time": 82.26,
        "speaker": "Olivia",
        "text": "Great, just to confirm, Buta will call you back this Friday. Is that right?"
      },
      {
        "time": 86.44,
        "speaker": "Homeowner",
        "text": "Yeah, that’s correct."
      },
      {
        "time": 89.8,
        "speaker": "Olivia",
        "text": "Okay, we’ll arrange for Buta to call you back this Friday."
      },
      {
        "time": 93.16,
        "speaker": "Homeowner",
        "text": "Okay, that’s awesome."
      },
      {
        "time": 94.68,
        "speaker": "Homeowner",
        "text": "Thank you."
      },
      {
        "time": 95.28,
        "speaker": "Olivia",
        "text": "Thank you."
      }
    ]
  },
  {
    "id": "education-support",
    "category": "Education & Student",
    "title": "Student course enquiry",
    "speaker": "Jenny · AI Receptionist",
    "duration": "1:09",
    "audioSrc": "/audio/real-call-education.m4a",
    "outcome": "Tuition verified ($37,500 across 2 diplomas) & Cloud Lab confirmed",
    "transcript": [
      {
        "time": 0,
        "speaker": "Jenny",
        "text": "Hi Shiqi, thank you for calling McGill Institute."
      },
      {
        "time": 2.8,
        "speaker": "Jenny",
        "text": "This is Jenny, AI receptionist."
      },
      {
        "time": 4.44,
        "speaker": "Jenny",
        "text": "This call might be transcribed."
      },
      {
        "time": 5.96,
        "speaker": "Jenny",
        "text": "How may I help you today?"
      },
      {
        "time": 7.36,
        "speaker": "Student",
        "text": "Hey Jenny, I just want to check when is my next class."
      },
      {
        "time": 13.56,
        "speaker": "Jenny",
        "text": "Could you please provide your student number?"
      },
      {
        "time": 16.26,
        "speaker": "Student",
        "text": "[Student number redacted]"
      },
      {
        "time": 23.1,
        "speaker": "Jenny",
        "text": "Your next class is scheduled for today, Tuesday at 2 p.m. in Computer Lab 3."
      },
      {
        "time": 27.38,
        "speaker": "Jenny",
        "text": "It’s a Cloud Lab session for your Diploma of Information Technology."
      },
      {
        "time": 30.64,
        "speaker": "Jenny",
        "text": "If you have any other questions, feel free to ask."
      },
      {
        "time": 33.72,
        "speaker": "Student",
        "text": "Okay, so what is the total tuition for this term?"
      },
      {
        "time": 36.7,
        "speaker": "Student",
        "text": "And how many courses did I enrol in?"
      },
      {
        "time": 41.38,
        "speaker": "Jenny",
        "text": "Your total tuition for this term is $37,500."
      },
      {
        "time": 44.72,
        "speaker": "Jenny",
        "text": "You are enrolled in two courses."
      },
      {
        "time": 46.2,
        "speaker": "Jenny",
        "text": "One: Diploma of Leadership and Management, course code BSB50420."
      },
      {
        "time": 50.72,
        "speaker": "Jenny",
        "text": "Diploma of Information Technology, course code ICT50220."
      },
      {
        "time": 55.36,
        "speaker": "Jenny",
        "text": "If you have any other questions, feel free to ask."
      },
      {
        "time": 58.6,
        "speaker": "Student",
        "text": "No, thank you."
      },
      {
        "time": 63.1,
        "speaker": "Jenny",
        "text": "You’re welcome, Shiqi."
      },
      {
        "time": 64.36,
        "speaker": "Jenny",
        "text": "If you have any more questions in the future, feel free to reach out."
      },
      {
        "time": 67.22,
        "speaker": "Jenny",
        "text": "Have a great day."
      }
    ]
  },
  {
    "id": "stale-listing",
    "category": "Property Outreach",
    "title": "Stale listing follow-up",
    "speaker": "Leo · AI Sales Assistant",
    "duration": "1:34",
    "audioSrc": "/audio/real-call-property-listing.m4a",
    "outcome": "Agent callback booked for Monday morning",
    "transcript": [
      {
        "time": 0,
        "speaker": "Olivia",
        "text": "Hi Shiqi, this is Leo, Buta’s assistant from Buta Deogun."
      },
      {
        "time": 4.14,
        "speaker": "Olivia",
        "text": "I noticed the property at [property address redacted] has been on the market for 97 days."
      },
      {
        "time": 10.76,
        "speaker": "Olivia",
        "text": "I just wanted to check in and see how things have been going with the sale."
      },
      {
        "time": 14.1,
        "speaker": "Olivia",
        "text": "Is it an okay time for a quick chat?"
      },
      {
        "time": 16.86,
        "speaker": "Property Owner",
        "text": "Yeah, I’ve got a few minutes from now. How can I help you?"
      },
      {
        "time": 21.16,
        "speaker": "Olivia",
        "text": "Great, thanks for taking the time."
      },
      {
        "time": 23.24,
        "speaker": "Olivia",
        "text": "How has the sale been progressing for you so far?"
      },
      {
        "time": 26.4,
        "speaker": "Property Owner",
        "text": "You know, it has been on the market for around 100 days, and it wasn’t really good."
      },
      {
        "time": 35.02,
        "speaker": "Olivia",
        "text": "I’m sorry to hear that."
      },
      {
        "time": 36.56,
        "speaker": "Olivia",
        "text": "It sounds frustrating."
      },
      {
        "time": 38.02,
        "speaker": "Olivia",
        "text": "What kind of buyer interest or feedback have you received so far?"
      },
      {
        "time": 41,
        "speaker": "Olivia",
        "text": "And have there been any offers?"
      },
      {
        "time": 42.52,
        "speaker": "Property Owner",
        "text": "Yeah, I got a few ones, but the price is kind of low, so I didn’t accept them."
      },
      {
        "time": 49.9,
        "speaker": "Olivia",
        "text": "Thanks for sharing that."
      },
      {
        "time": 51.38,
        "speaker": "Olivia",
        "text": "Would you be open to a brief, confidential, no-obligation call with Buta for a fresh perspective on the sale?"
      },
      {
        "time": 59.74,
        "speaker": "Property Owner",
        "text": "Yeah, why not? If Buta can help me, I’m glad to have one."
      },
      {
        "time": 67.2,
        "speaker": "Olivia",
        "text": "Okay, that’s awesome."
      },
      {
        "time": 69.32,
        "speaker": "Olivia",
        "text": "What day and time would suit you for a callback from Buta?"
      },
      {
        "time": 73.16,
        "speaker": "Property Owner",
        "text": "How about next Monday?"
      },
      {
        "time": 75,
        "speaker": "Property Owner",
        "text": "Morning or afternoon?"
      },
      {
        "time": 77.36,
        "speaker": "Property Owner",
        "text": "That’s fine."
      },
      {
        "time": 79.04,
        "speaker": "Olivia",
        "text": "Just to confirm, Buta will call you back next Monday morning. Is that right?"
      },
      {
        "time": 82.6,
        "speaker": "Property Owner",
        "text": "Yeah, yeah, it’s cool."
      },
      {
        "time": 86.32,
        "speaker": "Olivia",
        "text": "Okay, we’ll arrange for Buta to call you back next Monday morning."
      },
      {
        "time": 89.92,
        "speaker": "Property Owner",
        "text": "Okay, that’s awesome."
      },
      {
        "time": 91.66,
        "speaker": "Olivia",
        "text": "Thank you. Have a good one."
      }
    ]
  },
  {
    "id": "restaurant-booking",
    "category": "Hospitality",
    "title": "Birthday table booking",
    "speaker": "Mark · AI Concierge",
    "duration": "1:14",
    "audioSrc": "/audio/real-call-restaurant.m4a",
    "outcome": "Sunday dinner booking callback requested for table of 4",
    "transcript": [
      {
        "time": 0,
        "speaker": "Olivia",
        "text": "Hi, this is Mark calling from Golden Time Restaurant."
      },
      {
        "time": 3.5,
        "speaker": "Olivia",
        "text": "I’m following up on your table inquiry and wanted to check whether you still need help with the booking."
      },
      {
        "time": 8.02,
        "speaker": "Olivia",
        "text": "Have I caught you at an okay time for a quick chat?"
      },
      {
        "time": 10.76,
        "speaker": "Guest",
        "text": "Hey, yeah. Can I please book a table?"
      },
      {
        "time": 16.54,
        "speaker": "Olivia",
        "text": "Are you still looking to make a table booking with us?"
      },
      {
        "time": 19.76,
        "speaker": "Guest",
        "text": "Yes, I do."
      },
      {
        "time": 20.88,
        "speaker": "Guest",
        "text": "I want to book a table."
      },
      {
        "time": 23.1,
        "speaker": "Guest",
        "text": "This Sunday is my birthday."
      },
      {
        "time": 28.14,
        "speaker": "Olivia",
        "text": "Thanks for letting me know."
      },
      {
        "time": 29.64,
        "speaker": "Olivia",
        "text": "What date, preferred time and number of guests should the team plan for?"
      },
      {
        "time": 32.68,
        "speaker": "Guest",
        "text": "Okay, it’s going to be this Sunday dinner."
      },
      {
        "time": 35.48,
        "speaker": "Guest",
        "text": "And there’s only going to be three to four people."
      },
      {
        "time": 41.96,
        "speaker": "Olivia",
        "text": "Thanks, that’s helpful."
      },
      {
        "time": 43.3,
        "speaker": "Olivia",
        "text": "Are there any dietary, allergy, accessibility or seating requirements the team should know about?"
      },
      {
        "time": 48.34,
        "speaker": "Guest",
        "text": "I don’t think so."
      },
      {
        "time": 52.84,
        "speaker": "Olivia",
        "text": "Would you like the restaurant team to call you to confirm the booking?"
      },
      {
        "time": 56.96,
        "speaker": "Guest",
        "text": "Um, yeah, I don’t mind the callback."
      },
      {
        "time": 62.9,
        "speaker": "Olivia",
        "text": "Okay, the restaurant team will call you to confirm the booking."
      },
      {
        "time": 65.84,
        "speaker": "Olivia",
        "text": "Is there anything else you’d like to ask about the follow-up?"
      },
      {
        "time": 68.7,
        "speaker": "Guest",
        "text": "Nah, that’s all good."
      },
      {
        "time": 72.36,
        "speaker": "Olivia",
        "text": "Thanks for your time."
      },
      {
        "time": 73.52,
        "speaker": "Olivia",
        "text": "Have a good one."
      }
    ]
  },
  {
    "id": "daycare-tour",
    "category": "Daycare & Child Care",
    "title": "Child care centre tour",
    "speaker": "Olivia · AI Sales Agent",
    "duration": "1:30",
    "audioSrc": "/audio/real-call-daycare.m4a",
    "outcome": "Friday centre tour callback confirmed",
    "transcript": [
      {
        "time": 0,
        "speaker": "Olivia",
        "text": "Hi Shiqi, this is Olivia from your company."
      },
      {
        "time": 2.4,
        "speaker": "Olivia",
        "text": "I’m calling about your interest in visiting the centre and meeting the team."
      },
      {
        "time": 5.3,
        "speaker": "Olivia",
        "text": "Have I caught you at an okay time to discuss a tour?"
      },
      {
        "time": 9.78,
        "speaker": "Parent",
        "text": "Hey, yeah, I did call you yesterday."
      },
      {
        "time": 13.12,
        "speaker": "Parent",
        "text": "How can I help you?"
      },
      {
        "time": 16.8,
        "speaker": "Olivia",
        "text": "I’m calling to follow up on your interest in arranging a tour of the centre."
      },
      {
        "time": 20.1,
        "speaker": "Olivia",
        "text": "Would you still like to arrange a tour?"
      },
      {
        "time": 21.9,
        "speaker": "Parent",
        "text": "Yeah, I do want to have a look over the centre because I want to leave my kid over there."
      },
      {
        "time": 28.76,
        "speaker": "Olivia",
        "text": "Great, I’m glad to hear that."
      },
      {
        "time": 30.16,
        "speaker": "Olivia",
        "text": "Which days or times generally suit you for a visit?"
      },
      {
        "time": 33.82,
        "speaker": "Parent",
        "text": "Let me check my calendar."
      },
      {
        "time": 35.66,
        "speaker": "Parent",
        "text": "Please give me a few seconds."
      },
      {
        "time": 39.46,
        "speaker": "Olivia",
        "text": "Of course, take your time."
      },
      {
        "time": 41.8,
        "speaker": "Parent",
        "text": "How about this Friday, 4 p.m.?"
      },
      {
        "time": 48.04,
        "speaker": "Olivia",
        "text": "Thanks, that’s helpful."
      },
      {
        "time": 49.44,
        "speaker": "Olivia",
        "text": "What would you most like to see or discuss during the tour?"
      },
      {
        "time": 53.1,
        "speaker": "Parent",
        "text": "I would say the most important thing would be security, because I have to make sure my kid’s safety is guaranteed."
      },
      {
        "time": 63.32,
        "speaker": "Olivia",
        "text": "That makes sense."
      },
      {
        "time": 64.74,
        "speaker": "Olivia",
        "text": "Ensuring security is very important."
      },
      {
        "time": 66.28,
        "speaker": "Olivia",
        "text": "Would you like a team member to call and confirm a suitable tour time?"
      },
      {
        "time": 72.06,
        "speaker": "Parent",
        "text": "Yes, actually I’m free for the whole Friday."
      },
      {
        "time": 75.78,
        "speaker": "Parent",
        "text": "But yeah, I’m fine to get the call."
      },
      {
        "time": 80.08,
        "speaker": "Olivia",
        "text": "Okay, that’s awesome."
      },
      {
        "time": 81.32,
        "speaker": "Olivia",
        "text": "Is there anything else you’d like to ask about the follow-up?"
      },
      {
        "time": 84.2,
        "speaker": "Parent",
        "text": "No, thank you."
      },
      {
        "time": 87.74,
        "speaker": "Olivia",
        "text": "Thanks for your time."
      },
      {
        "time": 88.9,
        "speaker": "Olivia",
        "text": "Have a good one."
      }
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
    q: "What is an AI receptionist?",
    a: "An AI receptionist answers phone calls in a natural voice, understands what callers need, books appointments, captures details, and follows up automatically. Jenny brings those essential front-desk jobs into one consistent, reliable workflow."
  },
  {
    q: "Does the AI sound like a robot?",
    a: "No. Jenny and Olivia use ultra-low latency conversational voice engines (sub-500ms voice round-trip) with natural intonation, dynamic pacing, and intelligent interruption handling. Most callers speak with Jenny or Olivia without realizing they are speaking with an AI assistant."
  },
  {
    q: "How does live calendar booking and rescheduling work?",
    a: "The AI checks live staff availability across Outlook, Google Calendar, and Calendly. It evaluates appointment type, duration, buffer times, and meeting rules, then books or reschedules the right time directly into the calendar and sends immediate confirmations."
  },
  {
    q: "What happens after a call ends?",
    a: "Jenny saves a concise summary and searchable transcript, records confirmed caller notes, updates your CRM, and creates callback or staff handoff tasks so every conversation turns into organized, visible work."
  },
  {
    q: "Can Jenny answer after hours and during peak seasons?",
    a: "Yes. Jenny can answer around the clock, 24/7, including weekends, holidays, and peak call overflow. You choose your business hours, transfer rules, unavailable messaging, and callback behavior."
  },
  {
    q: "How much control do I have over greetings, scripts, and rules?",
    a: "You have complete control. You configure the greeting, tone, business knowledge base, calendar availability, transfer rules, and escalation boundaries. Your team can review call logs and refine your agent's instructions at any time."
  },
  {
    q: "Is JobGen tailored for specific industry workflows?",
    a: "Yes. JobGen comes with tailored workflows and vocabularies for accounting practices, legal intake, dental and healthcare clinics, trades and home services, property and real estate, education, and hospitality."
  },
  {
    q: "Can I keep my existing business phone number?",
    a: "Yes. You can keep your existing phone number and simply set up call forwarding (unconditional, busy, or after-hours) to your dedicated JobGen routing number. You can also provision new dedicated local or toll-free numbers directly through the platform."
  },
  {
    q: "How do Inbound Reception (Jenny) and Outbound Sales (Olivia) work together?",
    a: "Jenny serves as your 24/7 Inbound Front Desk Receptionist—handling incoming calls, calendar bookings, and office triage. Olivia is your Outbound Growth Agent—following up with customer inquiries, property leads, and outreach campaigns. Both share the same unified operations console and client records."
  },
  {
    q: "How does JobGen connect to my tools and CRM?",
    a: "JobGen connects natively to your existing stack—including Outlook, Google Calendar, HubSpot, Salesforce, Xero, Twilio, and webhooks. Every call summary, transcript, confirmed booking, and follow-up task syncs automatically without double handling."
  },
  {
    q: "What happens when an urgent call or sensitive issue occurs?",
    a: "You define custom boundary rules and escalation criteria (e.g., emergency service request, VIP client, urgent legal or medical matter). JobGen immediately initiates a warm live transfer to your on-call staff or dispatches a high-priority SMS and email alert."
  }
];

