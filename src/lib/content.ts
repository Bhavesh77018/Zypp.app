// ─── CMS Content Registry ──────────────────────────────────────────────────
// Pure, client-safe (NO fs import here — the admin editor imports this).
// Defines the editable shape of every page's content + its defaults.
// Stored overrides live in data/cms/config.json under `pageContent[slug]`.

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "image"
  | "number"
  | "toggle"
  | "color"
  | "list";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  default: unknown;
  /** For type === "list": the shape of each item. */
  itemFields?: FieldDef[];
}

export interface SectionDef {
  key: string;
  label: string;
  description?: string;
  fields: FieldDef[];
}

export interface PageDef {
  slug: string;
  label: string;
  /** Public route this content drives, for the "view" link in admin. */
  path: string;
  sections: SectionDef[];
}

// ─── Registry ────────────────────────────────────────────────────────────────
export const PAGE_REGISTRY: PageDef[] = [
  {
    slug: "home",
    label: "Home Page",
    path: "/",
    sections: [
      {
        key: "hero",
        label: "Hero Banner",
        description: "The full-screen intro at the top of the homepage.",
        fields: [
          { key: "bgImage", label: "Background image", type: "image", default: "", hint: "Optional. Shown behind the dark gradient. Leave empty for the animated scene." },
          { key: "badge", label: "Badge text", type: "text", default: "India's Gig Economy Operating System" },
          { key: "titleLine1", label: "Headline (line 1)", type: "text", default: "Every Delivery." },
          { key: "titleHighlight", label: "Headline (highlighted word)", type: "text", default: "Powered by Zypp.", hint: "Shown in the brand colour." },
          { key: "titleLine2", label: "Sub-headline", type: "textarea", default: "The OS for India's 100 million gig entrepreneurs" },
          { key: "subtitle", label: "Paragraph", type: "textarea", default: "The infrastructure that makes 10-minute delivery possible — 26,000+ electric vehicles across 8 cities, serving India's largest quick-commerce platforms." },
          { key: "primaryCtaLabel", label: "Primary button label", type: "text", default: "Download the Zypp App" },
          { key: "primaryCtaLink", label: "Primary button link", type: "url", default: "https://play.google.com/store/apps/details?id=com.zyppdelivery" },
          { key: "secondaryCtaLabel", label: "Secondary button label", type: "text", default: "Partner with Us" },
          { key: "secondaryCtaLink", label: "Secondary button link", type: "url", default: "/contact" },
          {
            key: "stats",
            label: "Impact stats",
            type: "list",
            default: [
              { value: "2.5 Lakh+", label: "Lives Enabled" },
              { value: "26,827", label: "EVs on Road" },
              { value: "8", label: "Cities Live" },
              { value: "55Mn+ kg", label: "Carbon Saved" },
            ],
            itemFields: [
              { key: "value", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "services",
        label: "What We Offer",
        description: "The grid of service cards.",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "What We Offer" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "Explore categories of services that meet your goals of saving money and reducing emissions" },
          {
            key: "items",
            label: "Service cards",
            type: "list",
            default: [
              { icon: "🚚", title: "EV for Deliveries", desc: "Get Dedicated Rider for Last Mile Deliveries", href: "/ev-for-delivery" },
              { icon: "🛵", title: "2 Wheeler Rentals", desc: "Save on Petrol Cost, Rent a E-scooter", href: "/2w-Service-Zypp-Pilot" },
              { icon: "🚛", title: "3 Wheeler Rentals", desc: "Ensure Big Orders Delivered Emission-Free", href: "/3w-Service-Zypp-Pilot" },
              { icon: "🔑", title: "Rent to Own", desc: "Rent a vehicle today, own Tomorrow", href: "/rent-to-own" },
              { icon: "📢", title: "Advertising", desc: "Go Viral With ZYPP ₹0.10 Cost Per View", href: "/advertising" },
              { icon: "🤖", title: "FleetEase.ai", desc: "The Future of EV Ecosystem, Driven by AI", href: "/fleetease" },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
              { key: "href", label: "Link", type: "url", default: "/" },
            ],
          },
        ],
      },
      {
        key: "carbon",
        label: "Carbon Impact Counter",
        description: "The live-ticking CO₂ banner.",
        fields: [
          { key: "badge", label: "Badge text", type: "text", default: "🌱 Environmental Impact" },
          { key: "label", label: "Counter label", type: "text", default: "Carbon Saved" },
          { key: "baseValue", label: "Starting value (kg)", type: "number", default: 63454537.34, hint: "The live counter ticks up from here." },
          { key: "caption", label: "Caption", type: "textarea", default: "CO₂ emissions saved by Zypp riders across India" },
          {
            key: "stats",
            label: "Stat cards",
            type: "list",
            default: [
              { end: 250000, suffix: "+", label: "Lives Enabled" },
              { end: 26827, suffix: "", label: "EVs on Road" },
              { end: 20000, suffix: "+", label: "Active EV Riders" },
            ],
            itemFields: [
              { key: "end", label: "Number", type: "number", default: 0 },
              { key: "suffix", label: "Suffix", type: "text", default: "+" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "whyZypp",
        label: "Why Zypp",
        description: "Orbital animation + feature cards.",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Why Will You Choose Zypp Electric" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "Zypp Electric is India's leading EV Rental platform, offering electric scooters on rent that reduce pollution, save fuel costs, and boost your daily earnings." },
          { key: "centerValue", label: "Orbit centre value", type: "text", default: "20k+" },
          { key: "centerLabel", label: "Orbit centre label", type: "text", default: "Active Riders" },
          {
            key: "orbit",
            label: "Orbiting stats",
            type: "list",
            default: [
              { value: "2.5L+", label: "Lives Enabled" },
              { value: "20k+", label: "Active Riders" },
              { value: "8", label: "Cities Live" },
              { value: "55Mn+", label: "Kgs CO₂ Saved" },
            ],
            itemFields: [
              { key: "value", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
          {
            key: "features",
            label: "Feature cards",
            type: "list",
            default: [
              { icon: "📡", title: "IOT Enabled", desc: "Get real-time tracking of vehicles deployed across your fleet" },
              { icon: "🔋", title: "Robust EV Infra", desc: "Get extensive network of battery swapping stations across cities" },
              { icon: "⚡", title: "90%+ Uptime", desc: "AI-powered predictive vehicle maintenance keeps you on the road" },
              { icon: "🎧", title: "24/7 Support", desc: "AI-Enabled Chatbot for instant ticket resolution, always available" },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "howItWorks",
        label: "How It Works",
        description: "Step-by-step onboarding.",
        fields: [
          { key: "badge", label: "Badge text", type: "text", default: "On the Road in 4 Steps" },
          { key: "heading", label: "Heading", type: "text", default: "From Sign-Up to First Payout" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "No downpayment, no bank loan, no fuel bills. The whole journey is digital — most riders are earning within 24 hours of downloading the app." },
          {
            key: "steps",
            label: "Steps",
            type: "list",
            default: [
              { step: "01", icon: "📱", title: "Download the App", desc: "Get the Zypp Pilot app from the Play Store and sign up with your phone number — that's the only barrier to entry, and there is no joining cost beyond a small onboarding fee." },
              { step: "02", icon: "🪪", title: "Complete Your KYC", desc: "Upload Aadhaar, PAN, and bank details right inside the app. It takes under 10 minutes and is verified within 24 hours — fully paperless." },
              { step: "03", icon: "🛵", title: "Pick Your EV", desc: "Choose a swappable-battery 2-wheeler or a 3-wheeler loader at your nearest hub. Zero downpayment, insurance and maintenance included, battery swap in under 2 minutes." },
              { step: "04", icon: "💰", title: "Start Earning", desc: "Activate on any platform — Zomato, Swiggy, Blinkit, Zepto and more — and start delivering. Average riders earn ₹35,000–₹45,000/month, with 24/7 support always a tap away." },
            ],
            itemFields: [
              { key: "step", label: "Step number", type: "text", default: "01" },
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "savings",
        label: "Savings Calculator",
        description: "Headings + the cost-per-km assumptions behind the calculator.",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Still Unsure About EV? Let's Clarify!" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "Renting an EV is like putting money in the bank. Don't believe us? Do the math and see for yourself!" },
          { key: "petrolPerKm", label: "Petrol cost per km (₹)", type: "number", default: 4.2 },
          { key: "evPerKm", label: "EV cost per km (₹)", type: "number", default: 0.9 },
          { key: "evDailyRental", label: "EV daily rental add-on (₹)", type: "number", default: 8 },
          { key: "workingDays", label: "Working days per month", type: "number", default: 26 },
          { key: "savingsLabel", label: "Savings banner label", type: "text", default: "Monthly Savings with Zypp EV" },
        ],
      },
      {
        key: "partners",
        label: "Partners & Investors",
        description: "Delivery partner logos, impact stats and investor list.",
        fields: [
          { key: "heading", label: "Partners heading", type: "text", default: "Our Sustainable Journey is Powered by Our Partners" },
          { key: "subheading", label: "Partners sub-heading", type: "textarea", default: "We're making every delivery count towards a Zero carbon footprint." },
          { key: "investorsLabel", label: "Investors eyebrow", type: "text", default: "Our Investors" },
          { key: "investorsHeading", label: "Investors heading", type: "text", default: "Investors Who Believed in Us" },
          {
            key: "deliveryPartners",
            label: "Delivery partners",
            type: "list",
            default: [
              { name: "Blinkit", color: "#F9D210" },
              { name: "Zepto", color: "#8B1FA8" },
              { name: "Swiggy", color: "#FF6B00" },
              { name: "Zomato", color: "#E23744" },
              { name: "Amazon", color: "#FF9900" },
              { name: "BigBasket", color: "#84B53A" },
              { name: "JioMart", color: "#0066CC" },
              { name: "Flipkart", color: "#F7A831" },
              { name: "Dunzo", color: "#00B6A7" },
              { name: "Delhivery", color: "#D92B3A" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "color", label: "Brand colour", type: "color", default: "#00bc84" },
            ],
          },
          {
            key: "partnerImpact",
            label: "Partner impact cards",
            type: "list",
            default: [
              { name: "Zomato", color: "#E23744", co2: "78,961", deliveries: "7.4 Lakh+" },
              { name: "Zepto", color: "#8B1FA8", co2: "34,543", deliveries: "7.4 Lakh+" },
              { name: "Blinkit", color: "#F9D210", co2: "41,056", deliveries: "6.5 Lakh+" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "color", label: "Brand colour", type: "color", default: "#00bc84" },
              { key: "co2", label: "Ton CO₂ saved", type: "text", default: "" },
              { key: "deliveries", label: "Deliveries", type: "text", default: "" },
            ],
          },
          {
            key: "investors",
            label: "Investors",
            type: "list",
            default: [
              { name: "9Unicorns" }, { name: "Gogoro" }, { name: "LetsVenture" }, { name: "WFC" },
              { name: "Riso" }, { name: "AngelNetwork" }, { name: "Google" }, { name: "Shell" },
              { name: "Eneos" }, { name: "Anthill" }, { name: "Goodyear" }, { name: "Grip" },
            ],
            itemFields: [{ key: "name", label: "Name", type: "text", default: "" }],
          },
        ],
      },
      {
        key: "corpVideo",
        label: "Corporate Video",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Story" },
          { key: "heading", label: "Heading", type: "text", default: "Zypp Corporate Video" },
          { key: "body", label: "Body", type: "textarea", default: "Check what makes us India's Largest EV Rental Platform. Watch our founder's podcast and the Zypp story." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Watch on YouTube" },
          { key: "ctaLink", label: "Button link", type: "url", default: "https://www.youtube.com/@zyppelectric" },
          { key: "cardCaption", label: "Card caption", type: "text", default: "Podcast of our Founder" },
        ],
      },
      {
        key: "testimonials",
        label: "Testimonials",
        description: "Rider success-story carousel.",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "The Badlav" },
          { key: "heading", label: "Heading", type: "text", default: "Real Riders. Real Numbers." },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "Documented on Gig Ki Awaaz — India's only podcast by gig workers. 50+ stories, every number verified. Hosted by founder Akash Gupta." },
          {
            key: "items",
            label: "Stories",
            type: "list",
            default: [
              { name: "Raju Kumar", city: "Delhi NCR · Rapido · 1 yr with Zypp", earnings: "₹42,000/mo", quote: "Naukri se acha hai delivery ka kaam. Pehle koi loan nahi deta tha. Zypp ne mujhe chance diya. Daily wage se ab main ek entrepreneur hoon.", link: "https://youtube.com/@GigKiAwaaz" },
              { name: "Maqsood Sheikh", city: "Bengaluru · Zepto · 2 yrs with Zypp", earnings: "₹1,00,000/mo", quote: "Delivery karke monthly income ₹1,00,000. Zypp ki battery swap se time aur paise dono bachte hain. Cloud kitchen chhod ke ab main lakhpati hoon.", link: "https://youtube.com/@GigKiAwaaz" },
              { name: "Mukmal Hussain", city: "Hyderabad · Swiggy · 4 months with Zypp", earnings: "₹80,000/mo", quote: "Ek beti pilot banegi, dusri commando. Zypp se paise bachaye hain — unka sapna poora karunga. Metro supervisor se 3× income tak pahuncha.", link: "https://youtube.com/@GigKiAwaaz" },
              { name: "Rishab Mangal", city: "Darjeeling", earnings: "₹30,000–35,000/mo", quote: "I am from Darjeeling, and today with Zypp, I earn ₹30,000–35,000 every month. Zypp has given me not just an income, but also freedom and the confidence to pursue my dreams. My greatest happiness is that I can now support my family.", link: "https://www.youtube.com/shorts/sDoF0dVCXM0" },
              { name: "Roshan", city: "Delhi", earnings: "₹40,000+/mo", quote: "I used to work as a caretaker in a PG and was extremely busy, with hardly any time for my family. I used to earn ₹12,000 per month, but Zypp has empowered me to earn ₹40,000+ per month with time freedom.", link: "https://youtube.com/shorts/Is2bJqWfwbk" },
              { name: "Satyam Kushwah", city: "Gurgaon", earnings: "₹25,000–30,000/mo", quote: "My name is Satyam Kushwah. I have completed my graduation. I started working with Blinkit, and since I did not own a vehicle, I rented one through Zypp. Currently, I earn ₹25,000–₹30,000 per month.", link: "https://www.instagram.com/reel/DOybqGckzQA/" },
              { name: "Shivam", city: "Noida", earnings: "₹48,000/mo", quote: "My name is Shivam. I started working with Blinkit and rented a bike from Zypp Electric. I currently earn ₹48,000 per month, and recently completed the construction of my own house.", link: "https://www.instagram.com/reel/DKEZL_TzyCP/" },
              { name: "Ramdev Patel", city: "Jaipur", earnings: "₹35,000–40,000/mo", quote: "My name is Ramdev Patel. I started earning ₹35,000–₹40,000 per month after joining Zepto. I didn't have my own bike, so I rented one from Zypp Electric at a minimal price of ₹180 per month.", link: "https://www.instagram.com/reel/DKW0ukhz1SX/" },
              { name: "Karim Ulhaq", city: "Delhi", earnings: "₹40,000/mo", quote: "My name is Karim Ulhaq. I started working at Blinkit. Initially, I didn't have a vehicle of my own, but then I got to know about Zypp Electric. Now, I earn ₹40,000 per month using a rented vehicle from Zypp at ₹180 per month.", link: "https://www.instagram.com/reel/DJrSJsizY7H/" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "city", label: "City", type: "text", default: "" },
              { key: "earnings", label: "Earnings", type: "text", default: "" },
              { key: "quote", label: "Quote", type: "textarea", default: "" },
              { key: "link", label: "Story link", type: "url", default: "" },
            ],
          },
        ],
      },
      {
        key: "faq",
        label: "FAQ",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "FAQ" },
          { key: "heading", label: "Heading", type: "text", default: "Frequently Asked Questions" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "Find answers about Zypp electric scooter and loader rental services." },
          {
            key: "items",
            label: "Questions",
            type: "list",
            default: [
              { q: "Do I need money to start riding with Zypp?", a: "You need a small onboarding fee (₹2,000–3,000). No downpayment for the vehicle. No EMI. No fuel cost. Start earning from day one." },
              { q: "How much can I earn per month?", a: "Riders earn ₹20,000 to ₹1,00,000+ per month depending on city, hours, and platform. The average Zypp rider earns ₹35–45K/month." },
              { q: "What if the battery runs out or the bike breaks down?", a: "Gen3 bikes use battery swap — swap a depleted battery for a charged one in under 2 minutes, available every 5 km. For mechanical issues, our 20-minute-TAT service team comes to you. 96% uptime guaranteed." },
              { q: "Which delivery apps can I work with?", a: "All major platforms — Zomato, Swiggy, Blinkit, Zepto, Urban Company, Porter, Rapido and more. You have full freedom to choose your platform." },
              { q: "In which cities is Zypp available?", a: "Delhi NCR, Bangalore, Hyderabad, Mumbai, Pune, Goa, Jaipur, and Chandigarh — 8 cities live, scaling to 31 by FY27 via franchise." },
              { q: "How is Zypp different from renting EVs?", a: "Zypp is an uptime-as-a-service provider. You consume reliable delivery capacity — we handle supply, financing, battery, maintenance, and rider management, all invisible to you." },
            ],
            itemFields: [
              { key: "q", label: "Question", type: "text", default: "" },
              { key: "a", label: "Answer", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "news",
        label: "In the News",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "In the News" },
          { key: "heading", label: "Heading", type: "text", default: "India Is Watching" },
          {
            key: "items",
            label: "News items",
            type: "list",
            default: [
              { source: "Forbes India", date: "30 Under 30", title: "Zypp founders recognised among India's most influential young entrepreneurs" },
              { source: "Economic Times", date: "Coverage", title: "Zypp Electric crosses 176 million emission-free deliveries across 8 cities" },
              { source: "Inc42", date: "Startup Story", title: "How Zypp Electric turned EBITDA positive while scaling its EV fleet 73%" },
            ],
            itemFields: [
              { key: "source", label: "Source", type: "text", default: "" },
              { key: "date", label: "Date", type: "text", default: "" },
              { key: "title", label: "Headline", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "getInTouch",
        label: "Get In Touch",
        description: "Lead form heading + contact details.",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Get In Touch!" },
          { key: "heading", label: "Heading", type: "text", default: "Join India's Largest EV Rental Platform" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "Go 100% Electric With Us. Choose the reason to contact us below." },
          { key: "address", label: "Address", type: "text", default: "Sector 44, Gurugram, Haryana 122003" },
          { key: "phone", label: "Phone", type: "text", default: "+91 9289 222 111" },
          { key: "email", label: "Email", type: "text", default: "help@zypp.app" },
          {
            key: "reasons",
            label: "Contact reasons",
            type: "list",
            default: [
              { label: "I want to rent an EV" },
              { label: "I want to become a franchise partner" },
              { label: "EV delivery for my business" },
              { label: "Advertising inquiry" },
              { label: "FleetEase / Technology" },
              { label: "Support / Other" },
            ],
            itemFields: [{ key: "label", label: "Reason", type: "text", default: "" }],
          },
        ],
      },
    ],
  },
  {
    slug: "about",
    label: "About Page",
    path: "/about",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Our Story" },
          { key: "heading", label: "Heading", type: "text", default: "8 Years. 22 Pivots. One Mission." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Started in Jaipur with an idea and no blueprint. Today, Zypp is India's largest EV-powered gig logistics network — and we're building the operating system for India's gig economy." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Join as a Rider" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "/riders" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Work with Us" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "/careers" },
        ],
      },
      {
        key: "statsBar",
        label: "Stats Bar",
        fields: [
          {
            key: "stats",
            label: "Stats",
            type: "list",
            default: [
              { val: "2.5L+", label: "Lives Enabled" },
              { val: "26K+", label: "EVs on Road" },
              { val: "8", label: "Cities" },
              { val: "55M+ kg", label: "Carbon Saved" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "whoWeAre",
        label: "Mission & Vision",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Mission" },
          { key: "heading", label: "Heading", type: "text", default: "Zero Pollution Mobility for 100M Gig Entrepreneurs" },
          { key: "body1", label: "Paragraph 1 (Mission)", type: "textarea", default: "We started with EVs because mobility is where the gig worker's income begins and ends. Zero-pollution mobility for India's 100 million gig entrepreneurs is our foundation." },
          { key: "body2", label: "Paragraph 2 (Vision)", type: "textarea", default: "We're expanding into financial identity, credit, housing, and AI — because the gig worker deserves a full economic platform, not just a vehicle. That's HustleOS: India's first gig economy operating system." },
          { key: "linkLabel", label: "Link label", type: "text", default: "Our Environmental Impact" },
          { key: "linkHref", label: "Link href", type: "url", default: "/environment" },
          {
            key: "cards",
            label: "Highlight cards",
            type: "list",
            default: [
              { icon: "🚀", title: "Founded 2018", desc: "Started Mission Zero Emission with India's first e-bike sharing app" },
              { icon: "🌍", title: "NCR · Bengaluru · Mumbai", desc: "Pan-India presence and expanding to tier-2 cities" },
              { icon: "📈", title: "EBITDA+ Company", desc: "Profitable and scaling, now with a B2C model" },
              { icon: "🤝", title: "1000+ Team", desc: "A tribe building India's sustainable future" },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Journey Timeline",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Journey" },
          { key: "heading", label: "Heading", type: "text", default: "From Jaipur to India." },
          {
            key: "milestones",
            label: "Milestones",
            type: "list",
            default: [
              { year: "2017", title: "The Spark — Jaipur", desc: "Akash Gupta starts with a bicycle-sharing idea in Jaipur. The market says no. The first pivot begins." },
              { year: "2018–19", title: "Pivots 1–8 — Finding the Market", desc: "B2C cycles, e-bikes, corporate campuses, delivery logistics. Each pivot teaches something. Nothing sticks yet." },
              { year: "2020", title: "COVID + EV Pivot — The Breakthrough", desc: "The pandemic accelerates quick commerce. Zypp pivots to EV-powered last-mile delivery. First 100 EVs in Delhi. This one sticks." },
              { year: "2021–22", title: "Series A + Scale — 3 Cities", desc: "Raised Series A. Expanded to Bangalore and Hyderabad. Built the hub-and-spoke model. Hit 3,000 EVs." },
              { year: "2023", title: "B2C Shift + FleetEase Launch", desc: "Shifted from B2B2C to direct B2C. Launched FleetEase.ai as a standalone SaaS product. Hit 10,000 EVs." },
              { year: "2024", title: "Gen3 Fleet + EBITDA Positive", desc: "Launched Gen3 battery-swapping fleet — the most efficient cohort yet. Turned EBITDA positive in July 2025. Hit 20,000+ EVs." },
              { year: "2025–26", title: "Pre-IPO + 26,000 EVs + 8 Cities", desc: "EBITDA +10.08%. NRR ₹243 Cr (+92% YoY). Gen3 cohort PAT positive. Franchise expansion. IPO bankers appointed." },
              { year: "FY28", title: "IPO — India's Gig Economy Goes Public", desc: "Target listing on Indian stock exchanges. The story that goes public: India's first gig economy operating system." },
            ],
            itemFields: [
              { key: "year", label: "Year", type: "text", default: "" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "leadership",
        label: "Leadership Team",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "The Team" },
          { key: "heading", label: "Heading", type: "text", default: "Built by Operators. For Operators." },
          {
            key: "people",
            label: "People",
            type: "list",
            default: [
              { name: "Akash Gupta", role: "Co-Founder & CEO", initials: "AG" },
              { name: "Rashi Agarwal", role: "Co-Founder & CBO", initials: "RA" },
              { name: "Tushar Mehta", role: "Co-Founder & COO", initials: "TM" },
              { name: "Mukesh Singla", role: "CFO", initials: "MS" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "role", label: "Role", type: "text", default: "" },
              { key: "initials", label: "Initials", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Join us in making India Zero Emission" },
          { key: "body", label: "Body", type: "textarea", default: "Whether you're a rider, partner, investor, or talent — there's a place for you at Zypp." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "View Open Positions" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "/careers" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Partner With Us" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "ev-for-delivery",
    label: "EV for Delivery",
    path: "/ev-for-delivery",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "For Platforms & Enterprises" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Your Last-Mile. " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Our Infrastructure." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Not vehicles for rent — guaranteed delivery uptime as a service. You pay for reliable throughput. We absorb every complexity below: vehicles, battery, maintenance, and riders." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Contact us" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "/contact" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "How It Works" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "#how-it-works" },
        ],
      },
      {
        key: "statsBar",
        label: "Stats Bar",
        fields: [
          {
            key: "stats",
            label: "Stats",
            type: "list",
            default: [
              { val: "96%", label: "Fleet Uptime (Gen3)" },
              { val: "20 min", label: "Avg Breakdown Response" },
              { val: "21", label: "Service Hubs" },
              { val: "400", label: "Field Technicians" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "managed",
        label: "Managed Solution",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Managed Solution" },
          { key: "heading", label: "Heading", type: "text", default: "Your End-to-End Delivery Toolkit" },
          { key: "body", label: "Body", type: "textarea", default: "Our fully-managed platform is designed to integrate seamlessly into your business operations. Approx 50+ partners are live with us and trust us for last-mile deliveries." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Start Partnership" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
          {
            key: "features",
            label: "Feature checklist",
            type: "list",
            default: [
              { label: "Dedicated EV riders assigned to your hub" },
              { label: "Zero fuel cost — electricity-powered deliveries" },
              { label: "IOT-enabled real-time fleet monitoring" },
              { label: "90%+ vehicle uptime with AI maintenance" },
              { label: "Fully insured riders and vehicles" },
              { label: "Scalable from 10 to 10,000 riders" },
            ],
            itemFields: [{ key: "label", label: "Feature", type: "text", default: "" }],
          },
          {
            key: "toolkit",
            label: "Toolkit cards",
            type: "list",
            default: [
              { icon: "🛡️", title: "Dedicated, Backup Rider", desc: "Always covered for hassle-free deliveries." },
              { icon: "📊", title: "Merchant Panel", desc: "Dedicated for deliveries, rider tracking, and payouts." },
              { icon: "📍", title: "Rider Tracking", desc: "Track riders in real-time and stay updated on your deliveries." },
              { icon: "🔌", title: "API Integration", desc: "Easy order tracking, insights, and real-time delivery updates." },
              { icon: "📦", title: "Multiple Orders", desc: "With custom scooters, deliver multiple orders to nearby locations." },
              { icon: "🎽", title: "Trained Branded Riders", desc: "Customize riders with your branding to boost visibility." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "partners",
        label: "Delivery Partners",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Trusted By" },
          { key: "heading", label: "Heading", type: "text", default: "India's Fastest Platforms Trust Zypp" },
          {
            key: "items",
            label: "Partners",
            type: "list",
            default: [
              { name: "Zomato", orders: "Live", color: "#E23744" },
              { name: "Swiggy", orders: "Live", color: "#FF6B00" },
              { name: "Blinkit", orders: "Live", color: "#F9D210" },
              { name: "Zepto", orders: "Live", color: "#8B1FA8" },
              { name: "Urban Company", orders: "Live", color: "#1A1A2E" },
              { name: "Porter", orders: "Live", color: "#FFC72C" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "orders", label: "Orders", type: "text", default: "" },
              { key: "color", label: "Brand colour", type: "color", default: "#00bc84" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Ready to Go Electric?" },
          { key: "body", label: "Body", type: "textarea", default: "Scale your delivery operations with zero-emission EVs and dedicated riders. Contact us for a custom quote." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Get Started Today" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "franchise",
    label: "Franchise Page",
    path: "/franchise",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Franchise Opportunity" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Own a City. " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Build an Empire." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Zypp is expanding to 31 cities. We're looking for franchise partners who want to own the EV delivery infrastructure in their city — with our brand, tech, and playbook behind them. ₹50–80L investment, 20–25% annual return, zero capex from Zypp." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Apply for a Franchise City" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
      {
        key: "models",
        label: "Franchise Models",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Two Models" },
          { key: "heading", label: "Heading", type: "text", default: "Choose How You Want to Own" },
          { key: "fofoBadge", label: "FOFO badge", type: "text", default: "FOFO — Franchise Owned, Franchise Operated" },
          { key: "fofoTitle", label: "FOFO title", type: "text", default: "You Own It. You Run It." },
          { key: "fofoDesc", label: "FOFO description", type: "textarea", default: "You invest in the fleet and hub, and operate with your own team. Zypp provides brand, tech platform, OEM access, and the ops playbook. Highest return, most control." },
          { key: "fofoCtaLabel", label: "FOFO button", type: "text", default: "Apply for FOFO" },
          { key: "fofoCtaLink", label: "FOFO link", type: "url", default: "/contact" },
          {
            key: "fofoFeatures",
            label: "FOFO features",
            type: "list",
            default: [
              { label: "Investment: ₹50–80 Lakhs" },
              { label: "Annual return: 20–25%" },
              { label: "Fleet size (start): 500 EVs" },
              { label: "Zypp platform fee: ₹600/EV/month" },
              { label: "Zypp software fee: ₹150/EV/month" },
              { label: "Capital from Zypp: ₹0 (zero)" },
            ],
            itemFields: [{ key: "label", label: "Feature", type: "text", default: "" }],
          },
          { key: "focoBadge", label: "FOCO badge", type: "text", default: "FOCO — Franchise Owned, Company Operated" },
          { key: "focoTitle", label: "FOCO title", type: "text", default: "You Own It. We Run It." },
          { key: "focoDesc", label: "FOCO description", type: "textarea", default: "You invest in the fleet. Zypp operates it entirely — riders, hub management, maintenance, and revenue collection. Passive investment with Zypp's operational excellence." },
          { key: "focoCtaLabel", label: "FOCO button", type: "text", default: "Apply for FOCO" },
          { key: "focoCtaLink", label: "FOCO link", type: "url", default: "/contact" },
          {
            key: "focoFeatures",
            label: "FOCO features",
            type: "list",
            default: [
              { label: "Investment: ₹50–80 Lakhs" },
              { label: "Annual return: 18–22%" },
              { label: "Fleet size (start): 500 EVs" },
              { label: "Operations: 100% by Zypp" },
              { label: "Your time required: minimal" },
              { label: "Capital from Zypp: ₹0 (zero)" },
            ],
            itemFields: [{ key: "label", label: "Feature", type: "text", default: "" }],
          },
        ],
      },
      {
        key: "steps",
        label: "Process Steps",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "How to Get Started" },
          { key: "heading", label: "Heading", type: "text", default: "From first call to fleet launch in ~6 weeks" },
          {
            key: "items",
            label: "Steps",
            type: "list",
            default: [
              { step: "01", title: "Discovery Call", desc: "Schedule a 30-min call to understand your goals, city, and capacity." },
              { step: "02", title: "Site Identification", desc: "Franchise shortlists ~1,500 sq ft hub locations in your target market." },
              { step: "03", title: "Agreement & Payment", desc: "Sign the 5-year partner agreement and complete the investment." },
              { step: "04", title: "Hub Setup", desc: "Branding, racks, charging, CCTV, fire safety — Zypp coordinates." },
              { step: "05", title: "Team & Training", desc: "Hire a 2-person hub team; Zypp trains them on SOPs & operations." },
              { step: "06", title: "Fleet Launch", desc: "Scooters delivered, rider onboarding starts, revenue begins Day 1." },
            ],
            itemFields: [
              { key: "step", label: "Step number", type: "text", default: "01" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Start Your EV Business Today" },
          { key: "body", label: "Body", type: "textarea", default: "Join 200+ franchise partners already earning with Zypp." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Talk to Franchise Team" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "2w-Service-Zypp-Pilot",
    label: "2 Wheeler Service",
    path: "/2w-Service-Zypp-Pilot",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "2 Wheeler EV Rentals" },
          { key: "titleLine1", label: "Heading line 1", type: "text", default: "Choose Your Preferred" },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "2 Wheeler Rentals" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Two models, unlimited possibilities. Choose the service that fits your lifestyle and goals — Zypp Rental for independent use, or Zypp Pilot to deliver and earn daily." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Explore Zypp Pilot" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "/zypp-pilot" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Explore Zypp Rental" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "/zypp-rental" },
        ],
      },
      {
        key: "plans",
        label: "Plans",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Plans" },
          { key: "heading", label: "Heading", type: "text", default: "Pick the Right Plan For You" },
          {
            key: "items",
            label: "Plan cards",
            type: "list",
            default: [
              { name: "Zypp Pilot", subtitle: "B2B · Postpaid · Deliver & Earn Daily", badge: "For Delivery Partners", badgeColor: "bg-primary text-white", desc: "Ideal for delivery partners who want to earn ₹25K–₹35K every month along with incentives and discounted rentals.", price: "₹180", period: "/day", features: "Earn per delivery — more rides, more earnings\nUnlimited battery swapping\nIncentivized payout by Zypp\nMaintenance fully covered by Zypp\nInsurance up to ₹5,00,000 (opt-in)\nRegistration included", cta: "Become a Zypp Pilot", href: "/zypp-pilot" },
              { name: "Zypp Rental", subtitle: "B2C · Prepaid · Fixed Rent, Flexible Future", badge: "For Independent Use", badgeColor: "bg-slate-800 text-white", desc: "Ideal for riders who want an electric scooter on rent for doing deliveries independently with predictable monthly costs.", price: "₹180", period: "/day", features: "Fixed affordable rent — no surprise costs\nDirect payout by client on your own ID\nWork independently during your own hours\nUnlimited battery swapping\nMaintenance fully covered by Zypp\nInsurance up to ₹2,00,000 (opt-in)", cta: "Become a Zypp Rental Rider", href: "/zypp-rental" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "subtitle", label: "Subtitle", type: "text", default: "" },
              { key: "badge", label: "Badge", type: "text", default: "" },
              { key: "badgeColor", label: "Badge classes", type: "text", default: "bg-primary text-white", hint: "Tailwind classes for the badge pill." },
              { key: "desc", label: "Description", type: "textarea", default: "" },
              { key: "price", label: "Price", type: "text", default: "" },
              { key: "period", label: "Period", type: "text", default: "" },
              { key: "features", label: "Features (one per line)", type: "textarea", default: "" },
              { key: "cta", label: "Button label", type: "text", default: "" },
              { key: "href", label: "Button link", type: "url", default: "/" },
            ],
          },
        ],
      },
      {
        key: "models",
        label: "Scooter Models",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Fleet" },
          { key: "heading", label: "Heading", type: "text", default: "Choose Your Scooter" },
          {
            key: "items",
            label: "Models",
            type: "list",
            default: [
              { img: "🛵", name: "Yulu Miracle", range: "60 km", speed: "25 kmph", battery: "Swappable" },
              { img: "⚡", name: "Zypp S1", range: "80 km", speed: "45 kmph", battery: "Swappable" },
              { img: "🏍️", name: "Zypp Pro", range: "100 km", speed: "55 kmph", battery: "Swappable" },
            ],
            itemFields: [
              { key: "img", label: "Icon (emoji)", type: "text", default: "🛵" },
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "range", label: "Range", type: "text", default: "" },
              { key: "speed", label: "Top speed", type: "text", default: "" },
              { key: "battery", label: "Battery", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Ready to Ditch Petrol?" },
          { key: "body", label: "Body", type: "textarea", default: "Start your electric journey today. Download the app and get started in minutes." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Get Started" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "3w-Service-Zypp-Pilot",
    label: "3 Wheeler Service",
    path: "/3w-Service-Zypp-Pilot",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "3 Wheeler EV" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Big Vehicle for Bigger Earnings " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "with Zypp 3 Wheeler" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "We've thought through all the details so you don't have to. Here's what makes our logistics service different — with approx 1000+ 3W on road running smoothly." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Download Pilot App" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
          { key: "visualEmoji", label: "Visual icon (emoji)", type: "text", default: "🚛" },
          { key: "visualTitle", label: "Visual title", type: "text", default: "Zypp 3-Wheeler" },
          { key: "visualSubtitle", label: "Visual subtitle", type: "text", default: "Zero Emission · High Payload" },
        ],
      },
      {
        key: "statsBar",
        label: "Stats Bar",
        fields: [
          {
            key: "stats",
            label: "Stats",
            type: "list",
            default: [
              { val: "5,000+", label: "3-Wheelers Deployed" },
              { val: "500 kg", label: "Max Payload" },
              { val: "100 km", label: "Range Per Charge" },
              { val: "₹0", label: "Fuel Cost" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "benefits",
        label: "Benefits",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Grow Faster with Zypp Electric" },
          { key: "heading", label: "Heading", type: "text", default: "What makes our logistics service different" },
          {
            key: "items",
            label: "Benefit cards",
            type: "list",
            default: [
              { icon: "🚚", title: "India's Largest EV Fleet", desc: "Leading EV fleet in 2W & 3W for last-mile delivery." },
              { icon: "🌱", title: "Zero Carbon Emissions", desc: "Reduces emissions and supports ESG goals." },
              { icon: "⚡", title: "Least Latency in Charging", desc: "Fast charging for longer and more efficient rides." },
              { icon: "📍", title: "Delhi NCR & Bangalore", desc: "Expanding rapidly across major Indian cities." },
              { icon: "📡", title: "Data / IoT-Based Fleet", desc: "Real-time tracking for fleet and delivery efficiency." },
              { icon: "🧑‍🔧", title: "Expert Drivers", desc: "Skilled drivers ensuring timely, happy deliveries." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "kyc",
        label: "Registration Steps",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Registration" },
          { key: "heading", label: "Heading", type: "text", default: "Get Started in 4 Steps" },
          {
            key: "items",
            label: "Steps",
            type: "list",
            default: [
              { step: "01", title: "Aadhaar Verification", desc: "Upload your Aadhaar card for identity verification" },
              { step: "02", title: "PAN & DL Upload", desc: "Provide your PAN card and valid driving licence" },
              { step: "03", title: "Bank Account Link", desc: "Add your bank account details for earnings transfer" },
              { step: "04", title: "Start Delivering", desc: "Get your 3-wheeler assigned and start earning" },
            ],
            itemFields: [
              { key: "step", label: "Step number", type: "text", default: "01" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Scale Your Deliveries With EVs" },
          { key: "body", label: "Body", type: "textarea", default: "Contact us to discuss a custom fleet plan for your business." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Talk to Our Team" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "advertising",
    label: "Advertising Page",
    path: "/advertising",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "ZyppAds · Mobility Advertising" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Go Viral at " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "₹0.10 CPV" },
          { key: "priceLine", label: "Price line", type: "text", default: "8–12× more cost-effective than billboards" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "26,000+ branded EVs moving through India's densest delivery zones — the most cost-effective out-of-home advertising platform in India. Your brand, on every street, every day." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Start Advertising" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
      {
        key: "stats",
        label: "Stats Grid",
        fields: [
          {
            key: "items",
            label: "Stats",
            type: "list",
            default: [
              { val: "₹0.10", label: "Cost Per View (vs ₹0.80–1.20 OOH)" },
              { val: "26K+", label: "Branded EVs" },
              { val: "8", label: "Metro Cities" },
              { val: "10M+", label: "Daily Impressions" },
              { val: "6am–11pm", label: "Active Hours" },
              { val: "100%", label: "Hyperlocal Targeting" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "formats",
        label: "Ad Formats",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Ad Formats" },
          { key: "heading", label: "Heading", type: "text", default: "How Your Brand Gets Seen" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "From vehicle wraps to delivery bags to in-app feeds — turn 26,000+ EVs and 2.5L+ riders into your moving billboard." },
          {
            key: "items",
            label: "Format cards",
            type: "list",
            default: [
              { icon: "🛵", title: "Vehicle Wrap · ₹0.10/view", desc: "Full or partial vinyl wrap on the EV body — premium visual real estate on a moving vehicle. High recall, street-level visibility." },
              { icon: "🎒", title: "Delivery Bag Branding · ₹0.15/delivery", desc: "Your logo on the rider's delivery bag — reaching the consumer at the door, the highest-attention moment of the delivery journey." },
              { icon: "📱", title: "Rider App In-Feed · ₹0.08/impression", desc: "Targeted digital ads inside the Zypp Pilot App — reaching 2.5L+ active gig workers, a hard-to-reach, high-intent demographic." },
              { icon: "📦", title: "Insert Advertising · Custom", desc: "Brand inserts, samples, or pamphlets placed in deliveries — direct-to-consumer at the moment of package opening." },
              { icon: "🔋", title: "Swap Station Branding · Custom", desc: "Placements at 1,500+ battery swap stations. 50+ riders per station daily — high dwell time, captive audience." },
              { icon: "📊", title: "Performance Reports · Included", desc: "Real-time dashboard of impressions, routes, zones covered, and estimated reach. Full accountability for every rupee." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "cities",
        label: "City Coverage",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Your Audience is Here. So Are We." },
          { key: "heading", label: "Heading", type: "text", default: "On-ground across 7+ cities" },
          {
            key: "items",
            label: "Cities",
            type: "list",
            default: [
              { name: "Gurgaon · 6500+ riders" }, { name: "Delhi · 3000+ riders" }, { name: "Faridabad · 500+ riders" },
              { name: "Bengaluru · 6500+ riders" }, { name: "Mumbai · 3000+ riders" }, { name: "Jaipur · 500+ riders" },
              { name: "Hyderabad · 700+ riders" }, { name: "Chennai & Pune · coming soon" },
            ],
            itemFields: [{ key: "name", label: "City", type: "text", default: "" }],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Ready to Advertise?" },
          { key: "body", label: "Body", type: "textarea", default: "Join 100+ brands already advertising on Zypp's EV fleet. Get a custom proposal today." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Get Custom Proposal" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "technologies",
    label: "Technologies Page",
    path: "/technologies",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "🤖 Powered by AI & IoT" },
          { key: "titleHighlight", label: "Heading", type: "text", default: "FleetEase.ai" },
          { key: "tagline", label: "Tagline", type: "text", default: "AI-Driven Platform for EV Infrastructure" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Simplify your operations with our leading fleet management software — an AI-driven platform that leverages advanced telematics to provide predictive intelligence for peak efficiency, maximum uptime, and reduced costs." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Book A Demo" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "https://fleetease.ai" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Manage Your Fleet" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "/contact" },
        ],
      },
      {
        key: "platform",
        label: "Platform Features",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Platform" },
          { key: "heading", label: "Heading", type: "text", default: "Intelligent EV Technology That Powers Your Fleet" },
          {
            key: "items",
            label: "Feature cards",
            type: "list",
            default: [
              { icon: "📡", title: "IoT Enabled Bikes", desc: "Imparting real-time location, State of Charge & other vital parameters using advanced tracking units." },
              { icon: "📱", title: "Reliable Pilot App", desc: "A dedicated pilot app targeting 50% wallet share amongst top clients." },
              { icon: "🎫", title: "Smart Ticketing", desc: "Automated workflows ensure a 30-minute roadside assistance turnaround time (TAT)." },
              { icon: "📊", title: "Real-time Analytics Dashboard", desc: "Vehicle tracking software giving clients real-time visibility of P&L based on fleet & pilots." },
              { icon: "🔋", title: "Smart Infrastructure", desc: "Exclusive charging and swapping stations to ensure higher fleet uptime." },
              { icon: "🧰", title: "Fleet & Inventory Management", desc: "Monitor fleet utilization down to every spare part and individual vehicle level." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "hardware",
        label: "Hardware",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Products" },
          { key: "heading", label: "Heading", type: "text", default: "Software & Hardware Telematics" },
          { key: "body", label: "Body", type: "textarea", default: "Explore our suite of tools designed to help you manage, track, and secure your fleet data seamlessly." },
          { key: "visualEmoji", label: "Visual icon (emoji)", type: "text", default: "🛰️" },
          { key: "visualTitle", label: "Visual title", type: "text", default: "FleetEase Telematics" },
          { key: "visualSubtitle", label: "Visual subtitle", type: "text", default: "30,000+ vehicles managed" },
          {
            key: "items",
            label: "Hardware list",
            type: "list",
            default: [
              { name: "Fleetease Pilot App", desc: "All-in-one app for pilots to manage tasks, accept deliveries, track earnings, and raise support" },
              { name: "Fleetease Mechanic App", desc: "For ground teams to track pilot progress and assign maintenance tasks" },
              { name: "TL / Sales Management App", desc: "Fleet & rider overview, KYC updates, ride management, and ticket resolution" },
              { name: "Comprehensive Dashboard", desc: "Web-based tracking with live fleet counts, heat maps, and deployment strategy" },
              { name: "4G Enabled GPS Tracker", desc: "Advanced telematics, real-time diagnostics, and seamless dashboard integration" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "desc", label: "Description", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "whiteLabel",
        label: "White Label",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "For Enterprises" },
          { key: "heading", label: "Heading", type: "text", default: "White-Label Fleet Management Solutions for Your Business" },
          { key: "body", label: "Body", type: "textarea", default: "We offer a 100% white-label fleet management solution, enabling you to use our real-time tracking technology as your own. Boost your EV adoption and ensure reliable deliveries with tech that showcases your logo." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Learn About FleetEase" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "rent-to-own",
    label: "Rent to Own",
    path: "/rent-to-own",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "🏠 Rent to Own" },
          { key: "titleLine1", label: "Heading line 1", type: "text", default: "Ab Bano E-Scooter Ke Maalik!" },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Own from ₹9,999" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Own your electric scooter in just 52 weeks. Low upfront cost, no credit check — turn your daily rides into a valuable asset and earn up to ₹40,000/month." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Apply now" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
      {
        key: "statsBar",
        label: "Stats Bar",
        fields: [
          {
            key: "stats", label: "Stats", type: "list",
            default: [
              { val: "₹9,999", label: "Upfront Down Payment" },
              { val: "52 weeks", label: "To Own Your Scooter" },
              { val: "₹40,000", label: "Earn up to / month" },
              { val: "₹5,00,000", label: "Insurance Cover" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "benefits",
        label: "Benefits",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Benefits" },
          { key: "heading", label: "Heading", type: "text", default: "Why Rent-to-Own?" },
          {
            key: "items", label: "Benefit cards", type: "list",
            default: [
              { icon: "💰", title: "Earning", desc: "Earn up to ₹40,000 per month while you ride towards ownership." },
              { icon: "🔑", title: "Own the Scooter", desc: "Full electric scooter ownership in just 52 weeks." },
              { icon: "🏦", title: "Low Cost", desc: "Low upfront cost and no credit check required." },
              { icon: "🛡️", title: "Insurance", desc: "Sum Insured up to ₹5,00,000." },
              { icon: "🔋", title: "Unlimited Swapping", desc: "Enjoy unlimited battery swapping across India." },
              { icon: "📈", title: "Earn More, Pay Less", desc: "A flexible rental model that makes you earn more and pay less." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Path to Ownership",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "How it works?" },
          { key: "heading", label: "Heading", type: "text", default: "From Zypp Pilot to E-Scooter Owner in 4 steps" },
          {
            key: "items", label: "Phases", type: "list",
            default: [
              { phase: "Step 1", title: "Apply", desc: "Apply as a Zypp Pilot with the Rent-to-Own (RTO) plan." },
              { phase: "Step 2", title: "Pay ₹9,999", desc: "Pay ₹9,999 upfront as your down payment." },
              { phase: "Step 3", title: "Ride & Pay Weekly", desc: "Give weekly rental from your earnings as you ride." },
              { phase: "Step 4", title: "Own It", desc: "Own the scooter outright after 52 weeks." },
            ],
            itemFields: [
              { key: "phase", label: "Phase", type: "text", default: "" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "eligibility",
        label: "Eligibility to Apply",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Eligibility to Apply" },
          { key: "heading", label: "Heading", type: "text", default: "Can You Apply? Most Likely, Yes." },
          { key: "body", label: "Body", type: "textarea", default: "Anyone aged 18+ with a valid Driving License, Aadhaar, and PAN card can apply. You consent to 52 weeks of riding with Zypp to own your scooter — no bank loan, no credit check." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Download Pilot App to Apply" },
          { key: "ctaLink", label: "Button link", type: "url", default: "https://play.google.com/store/apps/details?id=com.zyppdelivery" },
          {
            key: "items", label: "Requirements", type: "list",
            default: [
              { icon: "🪪", title: "Age 18+", desc: "Open to anyone above 18 years of age." },
              { icon: "🚗", title: "Valid Driving License", desc: "A current two-wheeler driving licence." },
              { icon: "📄", title: "Aadhaar & PAN", desc: "Standard KYC documents — submitted digitally." },
              { icon: "🤝", title: "52-Week Commitment", desc: "Ride with Zypp for 52 weeks to own your scooter." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Start Your Ownership Journey" },
          { key: "body", label: "Body", type: "textarea", default: "No down payment. No bank loan. Just ride and earn your way to ownership." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Apply for Rent to Own" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "fleetease",
    label: "FleetEase Page",
    path: "/fleetease",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "A Zypp Product · B2B SaaS" },
          { key: "titleHighlight", label: "Heading (brand)", type: "text", default: "FleetEase" },
          { key: "titleSuffix", label: "Heading suffix", type: "text", default: ".ai" },
          { key: "tagline", label: "Tagline", type: "text", default: "The EV Fleet OS You Need." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Built from running 26,000+ EVs across 8 cities. If you operate an EV fleet — 50 vehicles or 50,000 — FleetEase.ai is the AI-powered platform that cuts downtime, maximises utilisation, and gives you P&L visibility you've never had." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Request a Demo" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "/contact" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Visit fleetease.ai" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "https://fleetease.ai" },
        ],
      },
      {
        key: "statsBar",
        label: "Stats Bar",
        fields: [
          {
            key: "stats", label: "Stats", type: "list",
            default: [
              { val: "9+", label: "Enterprise Clients" },
              { val: "30K+", label: "EVs Running on FleetEase" },
              { val: "40%", label: "Less Unplanned Downtime" },
              { val: "Real-Time", label: "IoT Fleet Tracking" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "modules",
        label: "Platform Modules",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Platform Features" },
          { key: "heading", label: "Heading", type: "text", default: "Everything Your Fleet Needs" },
          {
            key: "items", label: "Module cards", type: "list",
            default: [
              { icon: "📡", title: "Real-Time Fleet Tracking", desc: "Live dashboard of every vehicle — location, battery %, health status, and rider activity. IoT-powered, refreshed every 30 seconds." },
              { icon: "🤖", title: "AI Predictive Maintenance", desc: "ML model analyses vehicle data to flag failures before they happen. Reduce unplanned downtime by up to 40%." },
              { icon: "📊", title: "Rider Performance Analytics", desc: "Earnings, delivery counts, routes, efficiency per rider per shift. Identify top performers, coach the rest with data." },
              { icon: "🔄", title: "Automated Dispatch", desc: "AI-powered vehicle allocation replaces manual decisions. Right vehicle to right rider at the right time, automatically." },
              { icon: "🔧", title: "Spare Parts Inventory", desc: "Track 2,500+ parts across multiple hubs. Auto-reorder triggers. Full audit trail. Never run out of critical parts." },
              { icon: "💰", title: "Financial Dashboards", desc: "Per-vehicle P&L, cohort economics, cost-per-km, real-time MIS — the financial visibility fleet operators never had." },
              { icon: "🔗", title: "API Integration", desc: "REST APIs to integrate with your ERP, CRM, and delivery platforms. Full documentation and sandbox." },
              { icon: "📱", title: "Mobile-First Field App", desc: "Field technicians log maintenance, run inspection checklists, and communicate in real time from the FleetEase app." },
              { icon: "☁️", title: "Multi-Hub Management", desc: "Manage 1 hub or 100 from a single dashboard. City-level and hub-level views with role-based access." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "pricing",
        label: "Pricing",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Pricing" },
          { key: "heading", label: "Heading", type: "text", default: "Simple Pricing. Scales with You." },
          {
            key: "items", label: "Plans", type: "list",
            default: [
              { name: "Starter", price: "₹149", desc: "per EV / month · up to 200 EVs", highlight: false, features: "Real-time fleet tracking\nBasic rider analytics\nMaintenance logging\nMobile app for field team\nEmail support", ctaLabel: "Get Started" },
              { name: "Growth", price: "₹99", desc: "per EV / month · 200–2,000 EVs", highlight: true, features: "Everything in Starter\nAI predictive maintenance\nAutomated dispatch\nSpare parts inventory\nFinancial dashboards + MIS\nAPI access\nDedicated account manager", ctaLabel: "Start Free Trial" },
              { name: "Enterprise", price: "Custom", desc: "for 2,000+ EVs · SLA-backed", highlight: false, features: "Everything in Growth\nCustom integrations\nWhite-label option\nOn-site onboarding\n24/7 priority support\nCustom reporting", ctaLabel: "Talk to Sales" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "price", label: "Price", type: "text", default: "" },
              { key: "desc", label: "Description", type: "text", default: "" },
              { key: "highlight", label: "Highlighted plan", type: "toggle", default: false },
              { key: "features", label: "Features (one per line)", type: "textarea", default: "" },
              { key: "ctaLabel", label: "Button label", type: "text", default: "Get Started" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Ready to Manage Your Fleet Smarter?" },
          { key: "body", label: "Body", type: "textarea", default: "Book a free demo and see FleetEase in action with your own fleet data." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Book Free Demo" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "environment",
    label: "Environment Page",
    path: "/environment",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Human & Environmental Impact" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Every Delivery " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Changes a Life" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Zypp's impact isn't measured in EVs deployed. It's measured in families fed, dreams funded, and carbon avoided. Here's what 26,000+ EVs and 2.5 Lakh+ gig entrepreneurs actually means." },
        ],
      },
      {
        key: "counter",
        label: "Carbon Counter",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Sustainable Journey" },
          { key: "value", label: "Counter value", type: "text", default: "197,144" },
          { key: "unit", label: "Unit", type: "text", default: "Ton" },
          { key: "caption", label: "Caption", type: "textarea", default: "CO₂ saved across our partner deliveries — every delivery counts towards a zero carbon footprint." },
        ],
      },
      {
        key: "impactStats",
        label: "Impact Stats",
        fields: [
          {
            key: "items", label: "Stats", type: "list",
            default: [
              { val: "55M+", unit: "kg", label: "CO₂ prevented — equal to planting 2.5M trees" },
              { val: "2.4 Cr", unit: "L", label: "Petrol kept out of India's atmosphere" },
              { val: "1,500+", unit: "", label: "Battery swap stations for a zero-emission last mile" },
              { val: "176M+", unit: "", label: "Deliveries completed with zero tailpipe emissions" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "unit", label: "Unit", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "sdg",
        label: "SDG Goals",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "UN Sustainable Development Goals" },
          { key: "heading", label: "Heading", type: "text", default: "Aligned with Global Sustainability Goals" },
          {
            key: "items", label: "Goals", type: "list",
            default: [
              { num: "SDG 3", title: "Good Health", desc: "Reducing air pollution for cleaner, healthier cities" },
              { num: "SDG 8", title: "Decent Work", desc: "Creating sustainable livelihoods for gig workers" },
              { num: "SDG 11", title: "Sustainable Cities", desc: "Enabling clean last-mile mobility in urban India" },
              { num: "SDG 13", title: "Climate Action", desc: "Directly reducing CO₂ through EV adoption" },
            ],
            itemFields: [
              { key: "num", label: "SDG number", type: "text", default: "" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "goals",
        label: "2030 Roadmap",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Roadmap" },
          { key: "heading", label: "Heading", type: "text", default: "2030 Sustainability Goals" },
          {
            key: "items", label: "Goals", type: "list",
            default: [
              { year: "2025", title: "50,000 EVs on Road", progress: 40 },
              { year: "2026", title: "100 Cities Coverage", progress: 22 },
              { year: "2027", title: "1 Billion Green Deliveries", progress: 11 },
              { year: "2030", title: "Net Zero Operations", progress: 5 },
            ],
            itemFields: [
              { key: "year", label: "Year", type: "text", default: "" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "progress", label: "Progress %", type: "number", default: 0 },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Join the Green Revolution" },
          { key: "body", label: "Body", type: "textarea", default: "Every ride with Zypp is a vote for a cleaner planet." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Partner With Us" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "careers",
    label: "Careers Page",
    path: "/careers",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Join Zypp" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Build India's " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Gig Decade." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "We are pre-IPO, growing fast, and building something that has never been built in India. Come join a team that moves at the speed of the gig economy." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Explore Open Roles" },
          { key: "ctaLink", label: "Button link", type: "url", default: "#openings" },
        ],
      },
      {
        key: "perks",
        label: "Perks",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Why Zypp" },
          { key: "heading", label: "Heading", type: "text", default: "What It Means to Work Here." },
          {
            key: "items", label: "Perk cards", type: "list",
            default: [
              { icon: "🚀", title: "Pre-IPO Momentum", desc: "Join before the listing. Work on the IPO story as it's being written — your work directly impacts a public company in the making." },
              { icon: "🌍", title: "Real Impact, Real Scale", desc: "2.5 Lakh+ riders' livelihoods depend on what you build. Not abstract impact — riders you can meet, stories you can see." },
              { icon: "🧠", title: "Operate & Build", desc: "This isn't a desk job. Zypp team members operate the infrastructure and build on it simultaneously. You own outcomes, not tasks." },
              { icon: "⚡", title: "Speed of the Gig Economy", desc: "We move as fast as the riders we serve. Decisions in hours. Experiments in days. Results in weeks." },
              { icon: "🤝", title: "Founder Access", desc: "Akash, Rashi, and Tushar are accessible and active. You'll work alongside the founders, not in a hierarchy below them." },
              { icon: "📈", title: "ESOPs Available", desc: "Senior hires get equity in a pre-IPO company. Build the business, own a piece of it — the listing creates a real liquidity event." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "roles",
        label: "Open Roles",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Open positions" },
          { key: "heading", label: "Heading", type: "text", default: "Your next career-defining move awaits" },
          { key: "openNote", label: "Open application note", type: "text", default: "Don't see your role? Send us your resume anyway." },
          { key: "openLinkLabel", label: "Open application link", type: "text", default: "Send Open Application" },
          {
            key: "items", label: "Roles", type: "list",
            default: [
              { title: "City Head", dept: "2 Wheeler", type: "Full Time", location: "Chandigarh" },
              { title: "AGM - 2W Operations", dept: "2W Operations", type: "Full Time", location: "Bangalore" },
              { title: "Cluster Manager", dept: "3W Operation", type: "Full Time", location: "Rohini Hub" },
              { title: "Cluster Manager - Operation", dept: "3W Operation", type: "Full Time", location: "SafedPul (Mumbai)" },
              { title: "AGM - Business Development", dept: "Business Development", type: "Full Time", location: "Gurgaon" },
              { title: "Data Analyst", dept: "Data & BI", type: "Full Time", location: "Gurgaon" },
              { title: "Director - Fleet", dept: "Fleet - Central", type: "Full Time", location: "Gurgaon" },
              { title: "Hub Head", dept: "Fleet - Central", type: "Full Time", location: "Chennai" },
            ],
            itemFields: [
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "dept", label: "Department", type: "text", default: "" },
              { key: "type", label: "Type", type: "text", default: "Full-time" },
              { key: "location", label: "Location", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner",
        label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Ready to Make a Difference?" },
          { key: "body", label: "Body", type: "textarea", default: "Join us and help build a cleaner, greener India." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Email careers@zypp.app" },
          { key: "ctaLink", label: "Button link", type: "url", default: "mailto:careers@zypp.app" },
        ],
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact Page",
    path: "/contact",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Get in Touch" },
          { key: "heading", label: "Heading", type: "text", default: "We'd Love to Hear from You." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Whether you're a rider, platform partner, franchise investor, or just curious — reach out. We respond within 24 hours." },
        ],
      },
      {
        key: "form",
        label: "Contact Form",
        fields: [
          { key: "heading", label: "Form heading", type: "text", default: "Send us a Message" },
          { key: "reasonLabel", label: "Reasons label", type: "text", default: "I'm reaching out about" },
          {
            key: "reasons", label: "Reason chips", type: "list",
            default: [
              { label: "Rent an EV scooter" },
              { label: "EV deliveries for my business" },
              { label: "Franchise / partnership" },
              { label: "Advertising on EV fleet" },
              { label: "FleetEase / Technology" },
              { label: "Career enquiry" },
              { label: "Press / Media" },
              { label: "Support / Other" },
            ],
            itemFields: [{ key: "label", label: "Reason", type: "text", default: "" }],
          },
        ],
      },
      {
        key: "quickContact",
        label: "Quick Contact",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Quick Contact" },
          {
            key: "items", label: "Contact methods", type: "list",
            default: [
              { iconType: "phone", label: "Call / WhatsApp", val: "+91 9289 222 111", href: "tel:+919289222111" },
              { iconType: "mail", label: "General Enquiries", val: "help@zypp.app", href: "mailto:help@zypp.app" },
              { iconType: "mail", label: "Press & Media", val: "pr@zypp.app", href: "mailto:pr@zypp.app" },
            ],
            itemFields: [
              { key: "iconType", label: "Icon (phone/mail)", type: "text", default: "mail" },
              { key: "label", label: "Label", type: "text", default: "" },
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "href", label: "Link", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "offices",
        label: "Offices",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Our Offices" },
          {
            key: "items", label: "Offices", type: "list",
            default: [
              { city: "Gurugram (HQ)", address: "Spaze Business Park, Sector 66, Badshapur, Tower A, 2nd Floor, Gurugram, Haryana - 122018", phone: "help@zypp.app" },
              { city: "Mumbai", address: "12, Kurla Industrial Estate, Nari Seva Sadan Road, Off L B S Marg, Ghatkopar, Mumbai - 400086", phone: "help@zypp.app" },
              { city: "Bangalore", address: "611, 3rd Floor, 80 Feet Road, 6th Block, Koramangala, Bengaluru, Karnataka - 560095", phone: "help@zypp.app" },
            ],
            itemFields: [
              { key: "city", label: "City", type: "text", default: "" },
              { key: "address", label: "Address", type: "text", default: "" },
              { key: "phone", label: "Phone", type: "text", default: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "zyppNews",
    label: "News Page",
    path: "/zyppNews",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "📰 Press & Media" },
          { key: "heading", label: "Heading", type: "text", default: "Zypp in the News" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "See how Zypp Electric is making headlines across India's top media outlets." },
        ],
      },
      {
        key: "articles",
        label: "Articles",
        description: "The first article is shown as the featured story.",
        fields: [
          { key: "featuredLabel", label: "Featured label", type: "text", default: "Featured Story" },
          { key: "listLabel", label: "List label", type: "text", default: "All News" },
          {
            key: "items", label: "News articles", type: "list",
            default: [
              { source: "Press", date: "Apr 28, 2025", title: "Exclusive | Zypp Electric looks to double Series C fundraise to $50 million", category: "Funding" },
              { source: "Press", date: "Feb 01, 2025", title: "Union Budget 2025 Reactions | Budget reaffirms India's commitment to fostering entrepreneurship, says Rashi Agarwal, co-founder of Zypp Electric", category: "Feature" },
              { source: "Press", date: "Dec 03, 2024", title: "Zypp Electric surpasses India's quick commerce revolution with 20.5 mn emission-free deliveries", category: "Milestone" },
              { source: "Press", date: "Nov 25, 2024", title: "Motul India with Zypp Electric launches EV training program", category: "Partnership" },
              { source: "Press", date: "Nov 18, 2024", title: "Odysse to supply 40,000 EVs to Zypp as part of investment deal", category: "Partnership" },
              { source: "Press", date: "Oct 25, 2024", title: "Zypp Electric Celebrates Diwali with Gold & Silver Coin Distribution and ESOPs for Delivery Partners", category: "Riders" },
              { source: "Press", date: "Oct 13, 2024", title: "Zypp Electric Surpasses Rs 300 Cr in Revenue for FY24 Amid Rapid Expansion", category: "Market" },
              { source: "Press", date: "Sep 03, 2024", title: "Zypp Electric Unveils ZyppX Franchise Model to Accelerate EV Adoption in India", category: "Expansion" },
            ],
            itemFields: [
              { key: "source", label: "Source", type: "text", default: "" },
              { key: "date", label: "Date", type: "text", default: "" },
              { key: "title", label: "Headline", type: "textarea", default: "" },
              { key: "category", label: "Category", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "press",
        label: "Press Contact",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Press Enquiries" },
          { key: "body", label: "Body", type: "textarea", default: "For media interviews, data requests, or press kit access — reach out to our communications team." },
          { key: "email", label: "Email", type: "text", default: "pr@zypp.app" },
        ],
      },
    ],
  },
  {
    slug: "life-at-zypp",
    label: "Life at Zypp",
    path: "/life-at-zypp",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "💚 Life at Zypp" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "A Culture That " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Wins Together" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "At Zypp, our Zyppsters are at the heart of everything we do. From celebrations to competitions, we create experiences that bring us closer together." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Explore Careers At Zypp" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/careers" },
        ],
      },
      {
        key: "culture", label: "Culture",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Culture" },
          { key: "heading", label: "Heading", type: "text", default: "What Drives Us" },
          {
            key: "items", label: "Culture cards", type: "list",
            default: [
              { icon: "🌱", title: "Mission First", desc: "Every decision is guided by our goal of zero emission India" },
              { icon: "🤝", title: "People First", desc: "Our riders, partners, and team are our most valued stakeholders" },
              { icon: "💡", title: "Innovation Always", desc: "We build, learn, iterate, and improve every day" },
              { icon: "🌍", title: "Inclusive Workplace", desc: "A diverse team from all backgrounds united by purpose" },
              { icon: "🎉", title: "Celebrate Wins", desc: "We celebrate every milestone — big and small" },
              { icon: "📈", title: "Grow Together", desc: "Your growth is our growth. We invest in our people." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "photos", label: "Photo Wall",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Moments" },
          { key: "heading", label: "Heading", type: "text", default: "Life in Pictures" },
          {
            key: "items", label: "Photos", type: "list",
            default: [
              { emoji: "🏏", label: "Zypp Cricket League" },
              { emoji: "🪔", label: "Diwali Celebrations" },
              { emoji: "🎉", label: "Festivities" },
              { emoji: "♟️", label: "Carrom Championship" },
              { emoji: "🎊", label: "Annual Party" },
              { emoji: "💻", label: "HACK(AI)THON 2025" },
              { emoji: "🏅", label: "Sports Week Extravaganza" },
            ],
            itemFields: [
              { key: "emoji", label: "Emoji", type: "text", default: "📷" },
              { key: "label", label: "Caption", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "testimonials", label: "Team Stories",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Team Stories" },
          { key: "heading", label: "Heading", type: "text", default: "Hear From Our Team" },
          {
            key: "items", label: "Stories", type: "list",
            default: [
              { name: "Arjun Sharma", role: "Senior Engineer", quote: "Zypp is the first place where I felt my work directly contributed to something bigger than myself. The team is incredible and the mission is real." },
              { name: "Priya Nair", role: "City Ops Manager, Bengaluru", quote: "In 2 years at Zypp, I grew from ops executive to city manager. The growth trajectory here is unmatched." },
              { name: "Rahul Singh", role: "Data Analyst", quote: "The data problems here are fascinating — real-time fleet optimization at scale. And the culture is genuinely fun." },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "role", label: "Role", type: "text", default: "" },
              { key: "quote", label: "Quote", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner", label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Want to Be Part of This?" },
          { key: "body", label: "Body", type: "textarea", default: "Explore open positions and join us on our mission." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "See Open Roles" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/careers" },
        ],
      },
    ],
  },
  {
    slug: "zypp-evolve",
    label: "Zypp Evolve",
    path: "/zypp-evolve",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "🚀 Innovation Challenge · Season 3" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Zypp Evolve " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Innovation Challenge" },
          { key: "tagline", label: "Tagline", type: "text", default: "Co-Create the Future of EV-Led Sustainability" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Zypp Electric invites India's brightest EV entrepreneurs, startups, students, and researchers to shape the future of green mobility — dedicated exclusively to Electric Vehicles and adjacent technologies." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Apply Now" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "/contact" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Explore Technology" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "/technologies" },
        ],
      },
      {
        key: "features", label: "Platform Features",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Benefits for Top Innovators" },
          { key: "heading", label: "Heading", type: "text", default: "Selected top ideas get up to ₹30 Lakh in funding" },
          {
            key: "items", label: "Feature cards", type: "list",
            default: [
              { icon: "💰", title: "Seed Funding", desc: "Secure funding up to ₹30 Lakh for high-potential startups, backed by Zypp & VCs." },
              { icon: "🏆", title: "Funding + Trophy", desc: "Win significant cash rewards and the prestigious Evolve Trophy of Innovation." },
              { icon: "🏢", title: "Incubation Support", desc: "Work at Zypp Electric's office to prototype and test for committed months." },
              { icon: "🤝", title: "Investor Access", desc: "Present to top VCs and get direct access to Zypp's investment network." },
              { icon: "🧠", title: "Mentorship", desc: "Get mentored by top industry leaders across EV, logistics, and deep tech." },
              { icon: "📜", title: "Certificate of Recognition", desc: "Official Zypp Electric certificate for the top 5 finalists." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "baas", label: "Battery as a Service",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Competition Tiers" },
          { key: "heading", label: "Heading", type: "text", default: "Opportunity to Win Big" },
          { key: "body", label: "Body", type: "textarea", default: "Up to ₹30 Lakh funding opportunity, backed by Zypp and partnered VCs. Champion, runner-up, and third place each unlock funding to take their EV innovation to market." },
          { key: "visualTitle", label: "Visual title", type: "text", default: "Up to ₹30 Lakh" },
          { key: "visualSubtitle", label: "Visual subtitle", type: "text", default: "Funding Unlock for Top Innovators" },
          {
            key: "stats", label: "Stats", type: "list",
            default: [
              { val: "₹10 L", label: "Champion (1st)" },
              { val: "₹5 L", label: "2nd Position" },
              { val: "₹3 L", label: "3rd Position" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "partners", label: "OEM Partners",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Partnerships" },
          { key: "heading", label: "Heading", type: "text", default: "EV OEM Partners" },
          {
            key: "items", label: "Partners", type: "list",
            default: [
              { icon: "⚡", name: "Ather Energy" },
              { icon: "🚀", name: "Bounce Infinity" },
              { icon: "🏍️", name: "Hero Electric" },
              { icon: "🔌", name: "Okinawa" },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "⚡" },
              { key: "name", label: "Name", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner", label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Be First to Experience Zypp Evolve" },
          { key: "body", label: "Body", type: "textarea", default: "Join our beta program and get early access to next-gen features." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Join Beta Program" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "zypp-pilot",
    label: "Zypp Pilot",
    path: "/zypp-pilot",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Zypp Pilot · B2B Postpaid" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "More Deliveries. Less Rent. " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Guaranteed Payouts." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "The all-inclusive Zypp Postpaid Plan — the best electric scooter for delivery, with a plan that covers everything you need to succeed on the road." },
          { key: "price", label: "Price", type: "text", default: "₹180" },
          { key: "priceUnit", label: "Price unit", type: "text", default: "/day" },
          { key: "priceNote", label: "Price note", type: "text", default: "Discounted rent — earn more, pay less" },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Download Zypp App" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "/contact" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Download App" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "https://play.google.com/store/apps/details?id=com.zyppdelivery" },
          {
            key: "platforms", label: "Platforms", type: "list",
            default: [
              { name: "Blinkit", color: "#F9D210", orders: "Grocery delivery" },
              { name: "Zepto", color: "#8B1FA8", orders: "10-min delivery" },
              { name: "Swiggy", color: "#FF6B00", orders: "Food delivery" },
              { name: "Zomato", color: "#E23744", orders: "Food delivery" },
              { name: "Amazon", color: "#FF9900", orders: "Ecommerce" },
              { name: "BigBasket", color: "#84B53A", orders: "Grocery" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "color", label: "Brand colour", type: "color", default: "#00bc84" },
              { key: "orders", label: "Tagline", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "statsBar", label: "Stats Bar",
        fields: [
          {
            key: "stats", label: "Stats", type: "list",
            default: [
              { val: "₹48,000+", label: "Max Monthly Earnings" },
              { val: "₹180/day", label: "Starting Rental" },
              { val: "₹0", label: "Fuel Cost" },
              { val: "20,000+", label: "Active Pilots" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "benefits", label: "Benefits",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "The All-Inclusive Postpaid Plan" },
          { key: "heading", label: "Heading", type: "text", default: "Everything Included in One Plan" },
          {
            key: "items", label: "Benefit checklist", type: "list",
            default: [
              { label: "No Fuel / No Maintenance — ride freely and earn more" },
              { label: "Discounted Rent — the more deliveries you complete, the lower the rent" },
              { label: "Insurance — Sum Insured up to ₹5,00,000" },
              { label: "24x7 Customer Support via chatbots and in-app tickets" },
              { label: "Weekly / Monthly Payouts — choose flexible payment options" },
              { label: "Growth — preference for Team Lead roles after 12 months" },
            ],
            itemFields: [{ key: "label", label: "Benefit", type: "text", default: "" }],
          },
          { key: "testimonialQuote", label: "Testimonial quote", type: "textarea", default: "I started with Blinkit and rented a bike from Zypp. I currently earn ₹48,000 per month and was able to build my own house." },
          { key: "testimonialName", label: "Testimonial name", type: "text", default: "Shivam" },
          { key: "testimonialMeta", label: "Testimonial meta", type: "text", default: "Zypp Pilot · Noida · ₹48,000/mo" },
          { key: "testimonialLink", label: "Testimonial link", type: "url", default: "https://www.instagram.com/reel/DKEZL_TzyCP/" },
        ],
      },
      {
        key: "howItWorks", label: "How It Works",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Registration" },
          { key: "heading", label: "Heading", type: "text", default: "Start Earning in 4 Steps" },
          {
            key: "items", label: "Steps", type: "list",
            default: [
              { step: "01", title: "Complete Your KYC", desc: "Add your personal details like Aadhaar, PAN, and Bank details." },
              { step: "02", title: "Choose Your Scooter", desc: "Select your scooter, like a swappable-battery scooter." },
              { step: "03", title: "Start Earning", desc: "Activate your client ID and begin deliveries to earn more!" },
              { step: "04", title: "Download Now", desc: "Get the Zypp app on Android & iOS to manage everything." },
            ],
            itemFields: [
              { key: "step", label: "Step number", type: "text", default: "01" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner", label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Ready to Become a Zypp Pilot?" },
          { key: "body", label: "Body", type: "textarea", default: "Join 20,000+ riders already earning with Zypp Electric." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Apply Today" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "zypp-rental",
    label: "Zypp Rental",
    path: "/zypp-rental",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "🛵 Zypp Rental · B2C Prepaid" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Fixed Rent. Direct Payouts. " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "Total Freedom." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "The all-inclusive Zypp Rental Prepaid Plan — the best electric scooter for your independent use, with a fixed plan and affordable rentals starting at just ₹180*/day." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Download Zypp App" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
      {
        key: "plans", label: "Rental Plans",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Rental Plans" },
          { key: "heading", label: "Heading", type: "text", default: "Choose Your Plan" },
          {
            key: "items", label: "Plan cards", type: "list",
            default: [
              { name: "Daily", price: "₹299", period: "/day", min: "1 day", highlight: false, features: "Any available scooter\nHelmet included\nBattery swap access\nApp tracking" },
              { name: "Weekly", price: "₹999", period: "/week", min: "7 days", highlight: false, features: "Choose your model\nHelmet included\nBattery swap access\nApp tracking\nPriority support" },
              { name: "Monthly", price: "₹2,999", period: "/month", min: "30 days", highlight: true, features: "Premium scooter models\nHelmet + gear bag\nUnlimited swaps\nInsurance included\nFree servicing\n24/7 support" },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "price", label: "Price", type: "text", default: "" },
              { key: "period", label: "Period", type: "text", default: "" },
              { key: "min", label: "Minimum", type: "text", default: "" },
              { key: "highlight", label: "Best value", type: "toggle", default: false },
              { key: "features", label: "Features (one per line)", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "faq", label: "FAQ",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "FAQ" },
          { key: "heading", label: "Heading", type: "text", default: "Common Questions" },
          {
            key: "items", label: "Questions", type: "list",
            default: [
              { q: "What is included in Zypp's 2-wheeler rental service?", a: "Every plan is all-inclusive — the electric scooter, unlimited battery swapping, insurance, free maintenance, and 24x7 customer support." },
              { q: "How much does it cost to rent a Zypp electric scooter?", a: "Affordable rentals start at just ₹180*/day. Exact pricing depends on your plan and city." },
              { q: "Can I use Zypp electric scooters for food delivery services?", a: "Yes. For delivery work with platforms like Blinkit, Zepto, Swiggy and Zomato, choose Zypp Pilot (B2B). Zypp Rental (B2C) is for independent personal use." },
              { q: "What is the range of Zypp electric scooters on a single charge?", a: "Our scooters comfortably cover a full day of city riding, and with unlimited battery swapping you never wait for a charge." },
              { q: "Do I need a special license to rent Zypp electric scooters?", a: "A valid driving licence is recommended, along with your Aadhaar, PAN, and bank details for KYC — all uploaded digitally via the Zypp app." },
            ],
            itemFields: [
              { key: "q", label: "Question", type: "text", default: "" },
              { key: "a", label: "Answer", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner", label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Start Riding Electric Today" },
          { key: "body", label: "Body", type: "textarea", default: "No fuel, no pollution, no tension. Rent your EV in minutes." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Book Your Scooter" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "fofo",
    label: "FOFO Model",
    path: "/fofo",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Be an Entrepreneur" },
          { key: "titleLine1", label: "Heading line 1", type: "text", default: "Start a ZYPP EV Franchise" },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "(FOFO) in your City" },
          { key: "tagline", label: "Tagline", type: "text", default: "Greater than 236% ROI" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Franchise Owned, Franchise Operated. Zypp Electric is an 8-year-old, India's largest EV rental platform on a Mission Zero Emission. Run local operations while Zypp powers the tech, demand, and branding." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Become a Franchise Partner" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
          { key: "highlightsTitle", label: "Highlights card title", type: "text", default: "FOFO Highlights (100-Scooter Fleet)" },
          {
            key: "highlights", label: "Highlights", type: "list",
            default: [
              { label: "₹55 L total investment (fleet + franchise fee)" },
              { label: "₹1.8 Cr net profit over 5 years" },
              { label: "236% ROI · ~1.38-year payback" },
              { label: "55% partner share" },
            ],
            itemFields: [{ key: "label", label: "Highlight", type: "text", default: "" }],
          },
        ],
      },
      {
        key: "why", label: "Why FOFO",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "We handle everything, you focus on growth" },
          { key: "subtitle", label: "Sub-heading", type: "textarea", default: "From vehicle procurement to customer service, we provide end-to-end support for your rental business success." },
          {
            key: "items", label: "Cards", type: "list",
            default: [
              { iconType: "settings", title: "Franchisee (You)", desc: "Run the hub day-to-day, onboard riders, collect rentals, and manage local fleet & security." },
              { iconType: "target", title: "Zypp (Franchisor)", desc: "Bike procurement, demand generation, rider app, centralized data, hub-team support, and branding." },
              { iconType: "users", title: "Grow Together", desc: "Powered by AI-enabled FleetEase software for fleet uptime, utilization, and predictable returns." },
            ],
            itemFields: [
              { key: "iconType", label: "Icon (settings/target/users)", type: "text", default: "settings" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    label: "Privacy Policy",
    path: "/privacy-policy",
    sections: [
      {
        key: "doc", label: "Document",
        description: "In each section's body, start a line with '- ' to render it as a bullet.",
        fields: [
          { key: "title", label: "Title", type: "text", default: "Privacy Policy" },
          { key: "lastUpdated", label: "Last updated", type: "text", default: "Last Updated: October 2025" },
          { key: "intro", label: "Intro paragraph", type: "textarea", default: "At Zypp Electric, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application." },
          {
            key: "sections", label: "Sections", type: "list",
            default: [
              { heading: "Information We Collect", body: "We may collect information about you in a variety of ways. The information we may collect includes:\n- Personal Data: Name, shipping address, email address, and telephone number.\n- KYC Documents: Aadhaar card, PAN card, and Driving License images required for verification.\n- Location Data: Real-time location data from the app to track rides and ensure vehicle security." },
              { heading: "How We Use Your Information", body: "- To create and manage your account.\n- To process your transactions and subscriptions.\n- To verify your identity and prevent fraud.\n- To improve our app's functionality and user experience." },
              { heading: "Data Security", body: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable." },
              { heading: "Contact Us", body: "If you have questions or comments about this Privacy Policy, please contact us at: privacy@zypp.app" },
            ],
            itemFields: [
              { key: "heading", label: "Heading", type: "text", default: "" },
              { key: "body", label: "Body", type: "textarea", default: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "term-and-conditions",
    label: "Terms & Conditions",
    path: "/term-and-conditions",
    sections: [
      {
        key: "doc", label: "Document",
        description: "In each section's body, start a line with '- ' to render it as a bullet.",
        fields: [
          { key: "title", label: "Title", type: "text", default: "Terms and Conditions" },
          { key: "lastUpdated", label: "Last updated", type: "text", default: "Last Updated: October 2025" },
          { key: "intro", label: "Intro paragraph", type: "textarea", default: "" },
          {
            key: "sections", label: "Sections", type: "list",
            default: [
              { heading: "1. Acceptance of Terms", body: "By accessing and using the Zypp Electric platform (\"App\" or \"Website\"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services." },
              { heading: "2. Service Description", body: "Zypp Electric provides electric vehicle rental services, including but not limited to 2-wheelers and 3-wheelers for B2B logistics and B2C rental purposes." },
              { heading: "3. User Obligations", body: "- You must provide accurate and complete KYC information.\n- You must possess a valid driver's license.\n- You agree to use the vehicles responsibly and in accordance with local traffic laws.\n- You are responsible for any damages to the vehicle during your rental period, subject to our insurance policy terms." },
              { heading: "4. Payments and Billing", body: "All payments must be made through the authorized payment gateways in the Zypp App. Security deposits are refundable subject to vehicle condition upon return." },
              { heading: "5. Limitation of Liability", body: "Zypp Electric shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service." },
            ],
            itemFields: [
              { key: "heading", label: "Heading", type: "text", default: "" },
              { key: "body", label: "Body", type: "textarea", default: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "foco",
    label: "FOCO Investment",
    path: "/foco",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "📈 FOCO Investment" },
          { key: "titlePrefix", label: "Heading prefix", type: "text", default: "Earn 90% ROI " },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "in just 3 years" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Partner with India's largest EV Rental Company. Zypp Electric is an 8-year-old EV rental platform on a Mission Zero Emission — invest in electric scooters and earn predictable returns." },
          { key: "perScooter", label: "Per-scooter cost", type: "text", default: "₹45,000" },
          { key: "perScooterNote", label: "Per-scooter note", type: "text", default: "Per scooter cost · ~26% ROI over 3 years" },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Become a Franchise Partner" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
      {
        key: "stats", label: "Why Choose Zypp",
        fields: [
          {
            key: "items", label: "Stats", type: "list",
            default: [
              { val: "20,000+", label: "Active Fleet" },
              { val: "400Cr+", label: "Equity Raised" },
              { val: "₹500Cr+", label: "ARR" },
              { val: "110Mn+", label: "Deliveries" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "safety", label: "Investment Safety",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Why It's Safe" },
          { key: "heading", label: "Heading", type: "text", default: "How Is the Investment Safe with Zypp?" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "Four reasons investing with Zypp is a secure choice over traditional franchise models." },
          {
            key: "items", label: "Safety cards", type: "list",
            default: [
              { icon: "🤝", title: "Legally Binding Agreement", desc: "A transparent digital contract ensures fixed monthly lease rental for 48 months — legally enforceable." },
              { icon: "📑", title: "Collateral Ownership", desc: "You own the vehicle, billed under your name, giving you complete asset security." },
              { icon: "🛡️", title: "Risk Mitigation Guarantee", desc: "Even if operations face disruption, your earnings remain consistent and protected." },
              { icon: "🏆", title: "India's Largest EV Rental Co.", desc: "Zypp has ~26,000 EVs and 25+ clients like Zomato, Blinkit, Swiggy and Zepto." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "tech", label: "Technology-Backed Growth",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Technology-Backed Growth" },
          { key: "heading", label: "Heading", type: "text", default: "Zypp's AI-enabled tech-stack ensures maximum utilization" },
          {
            key: "items", label: "Cards", type: "list",
            default: [
              { icon: "📍", title: "Real Time Tracking", desc: "Enables consistent fleet monitoring & status." },
              { icon: "📊", title: "Optimize Fleet Utilization", desc: "Control over fleet enables efficient utilization." },
              { icon: "🧠", title: "Predictive Maintenance", desc: "Maintenance alerts keep the fleet up and running." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "steps", label: "Get Started",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Get Started" },
          { key: "heading", label: "Heading", type: "text", default: "Start your investment journey in 4 simple steps" },
          {
            key: "items", label: "Steps", type: "list",
            default: [
              { step: "01", title: "Account Setup", desc: "Create your investor account." },
              { step: "02", title: "Agreement Signing", desc: "Sign the FOCO partner agreement." },
              { step: "03", title: "Payment Completion", desc: "Complete your investment payment." },
              { step: "04", title: "Track Your Fleet", desc: "Track your scooters and returns live." },
            ],
            itemFields: [
              { key: "step", label: "Step number", type: "text", default: "01" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "dashboard", label: "Track Your Investment",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Track Your Investment" },
          { key: "heading", label: "Heading", type: "text", default: "Full visibility on a single dashboard" },
          {
            key: "items", label: "Cards", type: "list",
            default: [
              { icon: "📈", title: "View Your Returns", desc: "See returns on a single dashboard and check remaining returns." },
              { icon: "🌱", title: "Sustainability Metrics", desc: "See the environmental impact your investment adds." },
              { icon: "📄", title: "All Your Fleet Documents", desc: "All your documents in one place, anytime." },
              { icon: "📍", title: "Live Fleet Location", desc: "Track the location and return status of your scooters." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner", label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Invest in India's EV Revolution" },
          { key: "body", label: "Body", type: "textarea", default: "Join 200+ happy investors earning promising returns while driving Mission Zero Emission." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Invest Now" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "esg-impact",
    label: "ESG Impact",
    path: "/esg-impact",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "🌏 ESG Impact" },
          { key: "titleLine1", label: "Heading line 1", type: "text", default: "ONE FLEET." },
          { key: "titleHighlight", label: "Heading highlight", type: "text", default: "INFINITE IMPACT." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Tracking our commitment to a greener future through sustainable electric mobility." },
        ],
      },
      {
        key: "impact", label: "Economic Value Enabled",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Economic Value Enabled" },
          {
            key: "items", label: "Stats", type: "list",
            default: [
              { val: "₹1,914.2 Cr", label: "Economic Value Enabled" },
              { val: "2.20 Cr L", label: "Fuel Saved" },
              { val: "41,043 T", label: "CO₂ Avoided" },
              { val: "12.68 L+", label: "People Impacted" },
              { val: "₹1,126 Cr", label: "Rider Earnings" },
              { val: "20.9 Cr", label: "Orders Delivered" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "pillars", label: "ESG Pillars",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Our Key Pillars of ESG Impact" },
          { key: "heading", label: "Heading", type: "text", default: "Five pillars driving change" },
          {
            key: "items", label: "Pillars", type: "list",
            default: [
              { icon: "👥", title: "People", desc: "12.68 L+ riders and families supported across India's urban corridors." },
              { icon: "💸", title: "Earnings", desc: "₹1,126 Cr in earnings enabled on the platform." },
              { icon: "📈", title: "Economy", desc: "₹1,914.2 Cr of economic value enabled." },
              { icon: "⚡", title: "Energy", desc: "22M litres of petrol imports reduced/saved." },
              { icon: "🌍", title: "Planet", desc: "41,043 tonnes of CO₂ avoided — 18.85 L trees equivalent." },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "social", label: "Social Impact",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Social Impact" },
          { key: "heading", label: "Heading", type: "text", default: "Empowering communities & sustainable livelihoods" },
          {
            key: "items", label: "Stats", type: "list",
            default: [
              { val: "2,53,671", label: "Rider Partners" },
              { val: "23,868", label: "Active Now" },
              { val: "₹26.9K", label: "Avg. Earnings / Month" },
              { val: "5,000+", label: "Mechanics Trained" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "governance", label: "Governance & Transparency",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Governance & Transparency" },
          { key: "heading", label: "Heading", type: "text", default: "Operational excellence & compliance" },
          {
            key: "items", label: "Stats", type: "list",
            default: [
              { val: "22M L", label: "Petrol Imports Saved" },
              { val: "₹226 Cr", label: "Cost of Petrol Saved" },
              { val: "83%", label: "Uptime (Last 30 Days)" },
            ],
            itemFields: [
              { key: "val", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "riders",
    label: "Riders Landing",
    path: "/riders",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "For Gig Entrepreneurs" },
          { key: "titleLine1", label: "Heading line 1", type: "text", default: "Earn More. Pay Less." },
          { key: "titleHighlight", label: "Heading line 2 (green)", type: "text", default: "Ride Zypp." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Zero downpayment. Zero fuel cost. Zero maintenance worry. Just ride and earn ₹35–45K+ every month with India's largest EV platform." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Download Zypp Pilot App" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "https://play.google.com/store/apps/details?id=com.zyppdelivery" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Calculate My Savings" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "#rider-savings" },
          { key: "earningsValue", label: "Earnings card value", type: "text", default: "₹40,000+" },
          { key: "earningsLabel", label: "Earnings card label", type: "text", default: "Potential Earnings / Month" },
          { key: "savingsValue", label: "Savings card value", type: "text", default: "₹7,000" },
          { key: "savingsLabel", label: "Savings card label", type: "text", default: "Saved on fuel / month" },
          {
            key: "stats", label: "Stat chips", type: "list",
            default: [
              { icon: "💰", title: "₹500–₹1500", desc: "Daily Earning Potential" },
              { icon: "⛽", title: "No Petrol Cost", desc: "Zero fuel spend" },
              { icon: "🔋", title: "Battery Swapping", desc: "Network across the city" },
              { icon: "🎧", title: "24x7 Support", desc: "Always here to help" },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Sub-text", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "help", label: "How Can We Help",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "How can we help you?" },
          { key: "subheading", label: "Sub-heading", type: "text", default: "Choose what you're looking for:" },
          {
            key: "items", label: "Path cards", type: "list",
            default: [
              { icon: "🛵", title: "I Want To Earn as a Rider", href: "/zypp-pilot" },
              { icon: "🏍️", title: "I Need an EV on Rent", href: "/zypp-rental" },
              { icon: "🏢", title: "I Need Delivery Riders", href: "/ev-for-delivery" },
              { icon: "🤝", title: "I Want a Franchise", href: "/franchise" },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "href", label: "Link", type: "url", default: "/" },
            ],
          },
        ],
      },
      {
        key: "savings", label: "Savings Calculator",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Calculate Your Savings" },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "See how much you can save and earn every day by switching to a Zypp EV." },
          { key: "petrolPerKm", label: "Petrol cost / km (₹)", type: "number", default: 2.5 },
          { key: "evPerKm", label: "EV cost / km (₹)", type: "number", default: 0.4 },
          { key: "workingDays", label: "Working days / month", type: "number", default: 26 },
        ],
      },
      {
        key: "testimonials", label: "Rider Testimonials",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Trusted by 20,000+ Riders" },
          {
            key: "items", label: "Stories", type: "list",
            default: [
              { name: "Mohit", role: "Blinkit Partner", earnings: "₹42,000 / month", quote: "Petrol pe ₹300 roz kharch hota tha, ab Zypp se zyada bachta hoon aur zyada kamata bhi hoon." },
              { name: "Salman", role: "Zomato Partner", earnings: "₹37,500 / month", quote: "Battery swap bahut easy hai, time bachta hai aur earnings bhi consistent rehte hain." },
              { name: "Ravi", role: "Zepto Partner", earnings: "₹45,000 / month", quote: "EV chalana smooth hai, maintenance ki tension nahi aur support 24x7 mil jata hai." },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "role", label: "Role", type: "text", default: "" },
              { key: "earnings", label: "Earnings", type: "text", default: "" },
              { key: "quote", label: "Quote", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "steps", label: "3 Simple Steps",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Start in 3 Simple Steps" },
          { key: "subheading", label: "Sub-heading", type: "text", default: "Get on the road and start earning in just 48 hours!" },
          { key: "totalTime", label: "Total time value", type: "text", default: "48 Hours" },
          { key: "totalTimeNote", label: "Total time note", type: "text", default: "from registration to earning" },
          {
            key: "items", label: "Steps", type: "list",
            default: [
              { step: "1", title: "Complete KYC", desc: "Submit your documents online in minutes." },
              { step: "2", title: "Get EV", desc: "Choose your EV and pick up from the nearest hub." },
              { step: "3", title: "Start Earning", desc: "Go online and start earning right away." },
            ],
            itemFields: [
              { key: "step", label: "Step number", type: "text", default: "1" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "why", label: "Why Riders Choose Zypp",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Why Riders Choose Zypp" },
          {
            key: "items", label: "Feature cards", type: "list",
            default: [
              { icon: "⛽", title: "No Petrol Cost", desc: "Save up to ₹7,000 monthly" },
              { icon: "💰", title: "Higher Take Home", desc: "Keep more of what you earn" },
              { icon: "⚡", title: "90%+ Uptime", desc: "Reliable EVs for uninterrupted rides" },
              { icon: "🎧", title: "24/7 Assistance", desc: "Help whenever you need it" },
              { icon: "🔋", title: "Battery Swap Network", desc: "Quick swaps in 2 minutes" },
              { icon: "🛡️", title: "Insurance Coverage", desc: "Complete safety and peace of mind" },
            ],
            itemFields: [
              { key: "icon", label: "Icon (emoji)", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "ctaBanner", label: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "Ready to earn more with Zypp?" },
          { key: "body", label: "Body", type: "textarea", default: "Join thousands of riders who are already earning more and living better." },
          { key: "ctaLabel", label: "Button label", type: "text", default: "Start Earning Today" },
          { key: "ctaLink", label: "Button link", type: "url", default: "/contact" },
        ],
      },
    ],
  },
  {
    slug: "investors",
    label: "Investors (Pre-IPO)",
    path: "/investors",
    sections: [
      {
        key: "hero", label: "Hero",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Pre-IPO Round Open · FY28 IPO Track" },
          { key: "titleLine1", label: "Heading line 1", type: "text", default: "India's 100M Gig Workers" },
          { key: "titleHighlight", label: "Heading line 2 (green)", type: "text", default: "Finally Have Their OS." },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "Every Zomato order. Every Blinkit delivery. Every Zepto bag at your door — carried by a gig entrepreneur who, until now, had no vehicle infra, no financial identity, and no way up." },
          { key: "primaryCtaLabel", label: "Primary button", type: "text", default: "Request a Meeting" },
          { key: "primaryCtaLink", label: "Primary link", type: "url", default: "mailto:invest@zypp.app?subject=Zypp Pre-IPO — Investor Interest" },
          { key: "secondaryCtaLabel", label: "Secondary button", type: "text", default: "Watch Gig Ki Awaaz ↗" },
          { key: "secondaryCtaLink", label: "Secondary link", type: "url", default: "https://youtube.com/@KaashSeAkash" },
          {
            key: "stats", label: "Hero stats", type: "list",
            default: [
              { n: "26,827", label: "EVs on Road", sub: "Across 8 cities" },
              { n: "₹243 Cr", label: "Monthly NRR", sub: "+92% YoY" },
              { n: "+10.08%", label: "EBITDA Margin", sub: "May-26 · Profitable" },
              { n: "2.5L+", label: "Gig Entrepreneurs", sub: "Enabled & Growing" },
            ],
            itemFields: [
              { key: "n", label: "Value", type: "text", default: "" },
              { key: "label", label: "Label", type: "text", default: "" },
              { key: "sub", label: "Sub-text", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "partners", label: "Partner Strip",
        fields: [
          { key: "label", label: "Label", type: "text", default: "Powering last-mile for" },
          {
            key: "logos", label: "Logos", type: "list",
            default: [{ name: "Zomato" }, { name: "Blinkit" }, { name: "Swiggy" }, { name: "Zepto" }, { name: "Rapido" }, { name: "Porter" }, { name: "Dunzo" }, { name: "ONDC" }],
            itemFields: [{ key: "name", label: "Name", type: "text", default: "" }],
          },
        ],
      },
      {
        key: "opportunity", label: "The Opportunity",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "The Opportunity" },
          { key: "heading1", label: "Heading line 1", type: "text", default: "Three Tailwinds." },
          { key: "heading2", label: "Heading line 2", type: "text", default: "One Platform." },
          { key: "subheading", label: "Sub-heading", type: "textarea", default: "India's gig economy is at an inflection point. Three forces are converging — Zypp sits at the exact intersection of all three." },
          {
            key: "items", label: "Tailwind cards", type: "list",
            default: [
              { title: "Quick Commerce Explosion", body: "Blinkit, Zepto, Swiggy Instamart growing at 35–40% annually. Every order needs a delivery partner. Every partner needs a reliable vehicle. Zypp is the supply infrastructure that makes 10-minute delivery possible." },
              { title: "Fuel Price Surge → EV Demand", body: "Petrol crossed ₹105/litre in metros. A petrol bike costs ₹6,000–8,000/month in fuel alone. A Zypp EV cuts that to near-zero. Demand is outpacing our supply." },
              { title: "The New Middle Class Is Gig", body: "A Zypp rider earning ₹35–45K/month is a micro-entrepreneur — building wealth on hustle, not heritage. With Zypp Credit and Zypp CIBIL score, he is entering the formal economy for the first time." },
            ],
            itemFields: [
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "body", label: "Body", type: "textarea", default: "" },
            ],
          },
        ],
      },
      {
        key: "traction", label: "The Numbers",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "The Numbers" },
          { key: "heading1", label: "Heading line 1", type: "text", default: "One Year." },
          { key: "heading2", label: "Heading line 2", type: "text", default: "Transformed." },
          { key: "noteLabel", label: "Note label", type: "text", default: "Without raising a single rupee" },
          { key: "note", label: "Note", type: "text", default: "All metrics shown are May-25 vs May-26 actuals." },
          {
            key: "numbers", label: "Metrics", type: "list",
            default: [
              { metric: "Fleet (utilisable)", may25: "15,497", may26: "26,827", pct: 73, change: "+73%" },
              { metric: "NRR (Gross Revenue)", may25: "₹126.9 Cr", may26: "₹243.2 Cr", pct: 92, change: "+92%" },
              { metric: "EBITDA", may25: "₹-1.79 Cr", may26: "₹+3.89 Cr", pct: 100, change: "Positive" },
              { metric: "EBITDA Margin", may25: "-4.6%", may26: "+10.08%", pct: 100, change: "+14.7 pts" },
              { metric: "Net Revenue / month", may25: "₹10.57 Cr", may26: "₹20.26 Cr", pct: 92, change: "+92%" },
              { metric: "PAT Improvement", may25: "₹-6.09 Cr", may26: "₹-2.94 Cr", pct: 52, change: "Loss halved" },
            ],
            itemFields: [
              { key: "metric", label: "Metric", type: "text", default: "" },
              { key: "may25", label: "Prior value", type: "text", default: "" },
              { key: "may26", label: "Current value", type: "text", default: "" },
              { key: "pct", label: "Bar %", type: "number", default: 100 },
              { key: "change", label: "Change tag", type: "text", default: "" },
            ],
          },
          { key: "quote", label: "Quote", type: "textarea", default: "In 12 months without fresh capital — fleet grew 73%, revenue nearly doubled, EBITDA went from negative to +10%, and our newest fleet cohort turned PAT positive." },
          { key: "quoteName", label: "Quote name", type: "text", default: "Akash Gupta" },
          { key: "quoteRole", label: "Quote role", type: "text", default: "Co-Founder & CEO · May-26 MIS Actuals" },
        ],
      },
      {
        key: "gig", label: "Gig Stories",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "The Badlav" },
          { key: "heading1", label: "Heading line 1", type: "text", default: "Real Riders." },
          { key: "heading2", label: "Heading line 2", type: "text", default: "Real Numbers." },
          { key: "intro", label: "Intro", type: "textarea", default: "These are not case studies. Real people documented on Gig Ki Awaaz — India's only podcast by gig workers, for gig workers." },
          {
            key: "pills", label: "Stat pills", type: "list",
            default: [{ n: "50+", label: "Episodes" }, { n: "2.5L+", label: "Riders reached" }, { n: "6", label: "Stories below" }],
            itemFields: [{ key: "n", label: "Value", type: "text", default: "" }, { key: "label", label: "Label", type: "text", default: "" }],
          },
          {
            key: "stories", label: "Rider stories", type: "list",
            default: [
              { name: "Raju Kumar", city: "Delhi NCR · Rapido · 1 yr", earn: "₹42K", from: "₹12K", before: "Daily wage worker", after: "Micro-entrepreneur", yt: "https://www.youtube.com/shorts/ZOOCnPm6kLY", img: "https://img.youtube.com/vi/ZOOCnPm6kLY/maxresdefault.jpg", quote: '"Naukri se acha hai delivery ka kaam. Pehle koi loan nahi deta tha. Zypp ne mujhe chance diya."' },
              { name: "Maqsood Sheikh", city: "Bengaluru · Zepto · 2 yrs", earn: "₹1L", from: "Cloud Kitchen", before: "Cloud Kitchen worker", after: "₹1 Lakh/month", yt: "https://youtube.com/@KaashSeAkash", img: "https://images.unsplash.com/photo-1781276532606-12957bd9a930?cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", quote: '"Delivery karke monthly income ₹1,00,000. Zypp ki battery swap se time aur paise dono bachte hain."' },
              { name: "Ujala Mandal", city: "Delhi NCR · Porter · 5 yrs", earn: "₹30K", from: "Village", before: "Village migrant", after: "5 yrs stable income", yt: "https://youtube.com/@KaashSeAkash", img: "https://images.unsplash.com/photo-1607529378676-a20456ee2f6b?cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", quote: '"EV vs petrol — main Zypp choose karti hoon kyunki maintenance ka tension nahi."' },
              { name: "Gaurav Kumar", city: "Mumbai · Rapido · 4 yrs", earn: "₹40K", from: "Student", before: "Student", after: "₹40K Hustler", yt: "https://youtube.com/@KaashSeAkash", img: "https://images.unsplash.com/photo-1676972157370-0a699f240ef6?cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", quote: '"Padhai ke baad job dhundh raha tha. Zypp ne mujhe apna khud ka kaam diya. Ab main apna boss hoon."' },
              { name: "Mukmal Hussain", city: "Hyderabad · Swiggy · 4 months", earn: "₹80K", from: "₹25K", before: "Metro supervisor", after: "3.2× income", yt: "https://youtube.com/@KaashSeAkash", img: "https://images.unsplash.com/photo-1551825687-f9de1603ed8b?cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", quote: '"Ek beti pilot banegi, dusri commando. Zypp se paise bachaye hain — unka sapna poora karunga."' },
              { name: "Amit", city: "Delhi NCR · Blinkit · 6 months", earn: "₹52K", from: "Labour", before: "Labour work", after: "₹52K Entrepreneur", yt: "https://youtube.com/@KaashSeAkash", img: "https://images.unsplash.com/photo-1777661272606-28b142a951ce?cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", quote: '"Mehnat aur Zypp ka saath — yahi meri asli pehchaan hai. Ab ghar bhi chala raha hoon."' },
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "city", label: "City / platform", type: "text", default: "" },
              { key: "earn", label: "Earnings", type: "text", default: "" },
              { key: "from", label: "From", type: "text", default: "" },
              { key: "before", label: "Before", type: "text", default: "" },
              { key: "after", label: "After", type: "text", default: "" },
              { key: "quote", label: "Quote", type: "textarea", default: "" },
              { key: "img", label: "Photo", type: "image", default: "" },
              { key: "yt", label: "Video link", type: "url", default: "" },
            ],
          },
          { key: "podcastTitle", label: "Podcast title", type: "text", default: "Gig Ki Awaaz" },
          { key: "podcastDesc", label: "Podcast description", type: "textarea", default: "India's only podcast by gig workers, for gig workers. 50+ documented episodes. Every story real. Hosted by Akash Gupta." },
          { key: "podcastCtaLabel", label: "Podcast button", type: "text", default: "Watch All Episodes ↗" },
          { key: "podcastCtaLink", label: "Podcast link", type: "url", default: "https://youtube.com/@KaashSeAkash" },
        ],
      },
      {
        key: "platform", label: "HustleOS Platform",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "HustleOS" },
          { key: "heading1", label: "Heading line 1", type: "text", default: "This Is Not" },
          { key: "heading2", label: "Heading line 2", type: "text", default: "a Vehicle Company." },
          { key: "intro", label: "Intro", type: "textarea", default: "Zepto gave the kirana store an intelligence layer. Zypp is doing the same for India's gig economy. Mobility is just Layer 1." },
          { key: "quote", label: "Quote", type: "textarea", default: "Zypp is not a vehicle rental company. It is the operating system for India's 100 million gig entrepreneurs." },
          { key: "quoteName", label: "Quote attribution", type: "text", default: "— Akash Gupta, Co-Founder & CEO" },
          {
            key: "layers", label: "Layers", type: "list",
            default: [
              { name: "Mobility", desc: "26,827 EVs. No downpayment. 96% uptime. ₹5,100+ saved/month vs petrol. Already profitable.", badge: "LIVE ✓" },
              { name: "Financial Identity", desc: "Zypp CIBIL score from ride data. Formal credit at 10–12% vs moneylender's 36%. Bank accounts, SIPs, insurance.", badge: "Building" },
              { name: "Urban Living", desc: "Affordable housing near demand hubs. Cut commute from 2 hrs to 20 mins. More earning hours.", badge: "Roadmap" },
              { name: "AI HustleOS", desc: "Earnings optimiser. Surge predictor. Route intelligence. The same AI layer Zepto uses for logistics.", badge: "Roadmap" },
              { name: "Community", desc: "Zypp Academy for skilling. 2.5 Lakh+ riders in the network. A flywheel that gets stronger with every new rider.", badge: "Building" },
            ],
            itemFields: [
              { key: "name", label: "Layer name", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
              { key: "badge", label: "Badge", type: "text", default: "" },
            ],
          },
        ],
      },
      {
        key: "roadmap", label: "Roadmap",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "What's Next" },
          { key: "heading", label: "Heading", type: "text", default: "The Path to PAT & IPO." },
          { key: "intro", label: "Intro", type: "textarea", default: "Four concrete levers — no new cities, no new products. Just execution compounding to a public listing in FY28." },
          {
            key: "steps", label: "Steps", type: "list",
            default: [
              { q: "Q2–Q3 '26", title: "Fleet Mix Shift to Gen3", metricLabel: "Gen3 PAT", metricValue: "₹+1.09 Cr/mo", desc: "Gen3 swapping fleet is already PAT positive. Retiring Gen1, replacing with Gen3 — mechanical PAT improvement. No new cities, no new capital." },
              { q: "Q3 '26", title: "AI-Driven Cost Optimisation", metricLabel: "Target", metricValue: "30% cost cut", desc: "AI fleet allocation, auto-reconciliation, and smarter routing cut overhead while the fleet grows. Fewer ops staff per vehicle." },
              { q: "Q3–Q4 '26", title: "5,000 EVs/Month Deployment", metricLabel: "Scale", metricValue: "2K → 5K/mo", desc: "Fuel at ₹105/litre created unprecedented demand. 2.5× deployment acceleration backed by real rider waitlists on the ground." },
              { q: "Q4 '26", title: "Franchise Expansion — Asset Light", metricLabel: "Fee margin", metricValue: "~90%", desc: "Franchise partners fund local fleet and hubs. Zypp earns software fees. 5 cities launching, 15+ in pipeline by FY27. Zero capex." },
            ],
            itemFields: [
              { key: "q", label: "Quarter", type: "text", default: "" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "metricLabel", label: "Metric label", type: "text", default: "" },
              { key: "metricValue", label: "Metric value", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" },
            ],
          },
          { key: "ipoTitle", label: "IPO title", type: "text", default: "IPO — FY28" },
          { key: "ipoBankers", label: "IPO bankers", type: "text", default: "Axis Capital · SBI Capital Markets" },
          { key: "ipoBody", label: "IPO body", type: "textarea", default: "The story won't be \"India's largest EV network\" — it will be \"India's first gig economy operating system.\" That's the narrative. That's the multiple." },
          {
            key: "ipoMetrics", label: "IPO metrics", type: "list",
            default: [{ label: "NRR Target", value: "₹1,000 Cr+" }, { label: "PAT Streak", value: "12+ months" }, { label: "EV Fleet", value: "75,000+" }, { label: "Cities", value: "25+" }],
            itemFields: [{ key: "label", label: "Label", type: "text", default: "" }, { key: "value", label: "Value", type: "text", default: "" }],
          },
          { key: "ipoCtaLabel", label: "IPO button", type: "text", default: "Secure Your Position →" },
        ],
      },
      {
        key: "round", label: "The Round",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "The Round" },
          { key: "heading1", label: "Heading line 1", type: "text", default: "Pre-IPO." },
          { key: "heading2", label: "Heading line 2", type: "text", default: "Last Private Entry." },
          { key: "intro", label: "Intro", type: "textarea", default: "We are raising a pre-IPO round for strategic partners who want to be part of India's gig economy infrastructure story before it goes public." },
          {
            key: "checklist", label: "Checklist", type: "list",
            default: [{ text: "EBITDA positive as of May-26" }, { text: "IPO bankers appointed (Axis Capital + SBI Capital Markets)" }, { text: "FY28 listing window confirmed" }, { text: "26,827 EVs generating daily cash flow" }, { text: "Zero additional capital needed to reach PAT positive" }],
            itemFields: [{ key: "text", label: "Item", type: "text", default: "" }],
          },
          { key: "detailsTitle", label: "Details title", type: "text", default: "Round Details" },
          {
            key: "details", label: "Round details", type: "list",
            default: [{ label: "Round Size", value: "$25–30M" }, { label: "Target IPO", value: "FY28" }, { label: "IPO Bankers", value: "Appointed ✓" }, { label: "Structure", value: "Pre-IPO Bridge" }],
            itemFields: [{ key: "label", label: "Label", type: "text", default: "" }, { key: "value", label: "Value", type: "text", default: "" }],
          },
          { key: "note", label: "Note", type: "textarea", default: "For family offices, HNIs, and institutional investors who understand long-cycle infrastructure bets. Minimum ticket size and full terms shared on request." },
          { key: "ctaPrimaryLabel", label: "Primary button", type: "text", default: "Request Investment Deck" },
          { key: "ctaSecondaryLabel", label: "Secondary button", type: "text", default: "Schedule a Call →" },
        ],
      },
      {
        key: "founder", label: "The Founder",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "The Founder" },
          { key: "heading1", label: "Heading line 1", type: "text", default: "Built on Hustle." },
          { key: "heading2", label: "Heading line 2", type: "text", default: "Not Heritage." },
          { key: "intro", label: "Intro", type: "textarea", default: "Started from Jaipur with a middle-class background and a conviction that India's gig economy deserved better infrastructure. Eight years later, he's building India's first gig OS." },
          { key: "name", label: "Name", type: "text", default: "Akash Gupta" },
          { key: "role", label: "Role", type: "text", default: "Co-Founder & CEO, Zypp Electric" },
          { key: "photo", label: "Photo", type: "image", default: "https://images.unsplash.com/photo-1627729085140-e0912b70e79e?cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" },
          {
            key: "facts", label: "Facts", type: "list",
            default: [
              { strong: "8 years. 22 pivots.", rest: " Started in Jaipur with a middle-class background. Built Zypp through every pivot, every city, every crisis — the kind of founder obsession that cannot be hired." },
              { strong: "500K+ followers @KaashSeAkash.", rest: " The founder IS the brand. Rider acquisition cost near zero because riders trust the face behind the company." },
              { strong: "Gig Ki Awaaz podcast", rest: " — direct trust with 2.5 Lakh riders. Nobody else in India has this kind of earned community with gig workers." },
              { strong: "HarperCollins book deal", rest: " — business memoir from Jaipur to IPO. The story is already being written." },
            ],
            itemFields: [{ key: "strong", label: "Bold lead", type: "text", default: "" }, { key: "rest", label: "Rest", type: "textarea", default: "" }],
          },
          {
            key: "stats", label: "Founder stats", type: "list",
            default: [{ label: "Instagram Followers", value: "500K+" }, { label: "Podcast Episodes", value: "50+" }, { label: "Years Building", value: "8 yrs" }, { label: "Headquartered", value: "Gurugram" }],
            itemFields: [{ key: "label", label: "Label", type: "text", default: "" }, { key: "value", label: "Value", type: "text", default: "" }],
          },
          {
            key: "socials", label: "Social links", type: "list",
            default: [{ label: "@KaashSeAkash", href: "https://instagram.com/kaashseakash" }, { label: "YouTube", href: "https://youtube.com/@KaashSeAkash" }, { label: "LinkedIn", href: "https://linkedin.com/in/akashg" }],
            itemFields: [{ key: "label", label: "Label", type: "text", default: "" }, { key: "href", label: "Link", type: "url", default: "" }],
          },
        ],
      },
      {
        key: "whyNow", label: "Why Now",
        fields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", default: "Why Now" },
          { key: "heading", label: "Heading", type: "text", default: "The Window Is Closing." },
          {
            key: "cards", label: "Cards", type: "list",
            default: [
              { title: "EBITDA Positive", desc: "First time in Zypp's history. May-26 crossed +10.08% EBITDA margin. The unit economics are proven." },
              { title: "IPO Bankers Appointed", desc: "Axis Capital + SBI Capital Markets confirmed. FY28 listing window. This is the final private round." },
              { title: "Demand > Supply", desc: "Fuel at ₹105/litre. Thousands of riders on waiting lists for Zypp EVs. Every week of delay is lost market." },
            ],
            itemFields: [{ key: "title", label: "Title", type: "text", default: "" }, { key: "desc", label: "Description", type: "textarea", default: "" }],
          },
        ],
      },
      {
        key: "finalCta", label: "Final CTA",
        fields: [
          { key: "badge", label: "Badge", type: "text", default: "Pre-IPO Round Open" },
          { key: "heading1", label: "Heading line 1", type: "text", default: "Own a Piece of" },
          { key: "heading2", label: "Heading line 2", type: "text", default: "India's Gig OS." },
          { key: "body", label: "Body", type: "textarea", default: "We don't do decks-first. We do conversations-first. Tell us who you are and we'll share what's relevant to you." },
          { key: "primaryLabel", label: "Primary button", type: "text", default: "invest@zypp.app" },
          { key: "primaryLink", label: "Primary link", type: "url", default: "mailto:invest@zypp.app?subject=Zypp Pre-IPO — Investor Interest" },
          { key: "secondaryLabel", label: "Secondary button", type: "text", default: "Schedule a Call" },
          { key: "secondaryLink", label: "Secondary link", type: "url", default: "mailto:invest@zypp.app?subject=Zypp Pre-IPO — Schedule Call" },
          {
            key: "contacts", label: "Contact grid", type: "list",
            default: [{ label: "Investor Email", value: "invest@zypp.app" }, { label: "Instagram", value: "@KaashSeAkash" }, { label: "YouTube", value: "@KaashSeAkash" }, { label: "Website", value: "zypp.app" }],
            itemFields: [{ key: "label", label: "Label", type: "text", default: "" }, { key: "value", label: "Value", type: "text", default: "" }],
          },
        ],
      },
    ],
  },
  {
    slug: "about",
    label: "About Us Page",
    path: "/about",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "badge", label: "Badge text", type: "text", default: "Our Mission" },
          { key: "titleLine1", label: "Title Line 1", type: "text", default: "Decarbonizing" },
          { key: "titleHighlight", label: "Title Highlight", type: "text", default: "Last-Mile Delivery" },
          { key: "subtitle", label: "Subtitle", type: "textarea", default: "We are on a mission to build the largest EV-as-a-service platform in India. Zero emissions, zero hassle, maximum impact." },
        ],
      },
      {
        key: "coreValues",
        label: "Core Values",
        fields: [
          {
            key: "values",
            label: "Core Values List",
            type: "list",
            default: [
              { icon: "🌱", title: "Sustainability First", desc: "We are committed to a zero-emission future. Every delivery made on our platform directly reduces India's carbon footprint." },
              { icon: "💻", title: "Deep Tech Driven", desc: "Hardware is just the beginning. Our proprietary IoT and AI algorithms are what make scaling our massive fleet possible." },
              { icon: "🤝", title: "Rider Centric", desc: "Our gig-workers are our partners. We focus obsessively on increasing their earnings, safety, and career growth." }
            ],
            itemFields: [
              { key: "icon", label: "Icon Emoji", type: "text", default: "✨" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" }
            ]
          }
        ]
      },
      {
        key: "timeline",
        label: "The Journey (Timeline)",
        fields: [
          {
            key: "milestones",
            label: "Milestones",
            type: "list",
            default: [
              { year: "2017", title: "The Inception", desc: "Started in Gurgaon with a mission to decarbonize last-mile delivery." },
              { year: "2019", title: "Seed Funding", desc: "Raised seed capital from IAN Fund to expand our EV fleet." },
              { year: "2021", title: "1 Million Deliveries", desc: "Crossed a massive milestone of 1M zero-emission deliveries." },
              { year: "2023", title: "Series B & Fleet Expansion", desc: "Raised $25M Series B to deploy 10,000+ EVs across major Indian cities." },
              { year: "2024", title: "35M+ Deliveries", desc: "Now the largest EV-as-a-service platform in India, operating in 6 cities." }
            ],
            itemFields: [
              { key: "year", label: "Year", type: "text", default: "" },
              { key: "title", label: "Title", type: "text", default: "" },
              { key: "desc", label: "Description", type: "textarea", default: "" }
            ]
          }
        ]
      },
      {
        key: "founders",
        label: "The Founders",
        fields: [
          {
            key: "people",
            label: "Founders List",
            type: "list",
            default: [
              {
                name: "Akash Gupta",
                role: "Co-Founder & CEO",
                initials: "AG",
                imageSrc: "/media/founder-short.jpg",
                bio: "8 years. 22 pivots. Started in Jaipur and built Zypp through every crisis, every city, every pivot. With 500K+ followers, the founder is the brand—driving near-zero rider acquisition cost through immense trust."
              },
              {
                name: "Rashi Agarwal",
                role: "Co-Founder & CBO",
                initials: "RA",
                imageSrc: "",
                bio: "The powerhouse driving Zypp's explosive business growth and massive enterprise partnerships. Building the largest EV delivery ecosystem in India from the ground up."
              }
            ],
            itemFields: [
              { key: "name", label: "Name", type: "text", default: "" },
              { key: "role", label: "Role", type: "text", default: "" },
              { key: "initials", label: "Initials", type: "text", default: "" },
              { key: "imageSrc", label: "Image Path", type: "text", default: "" },
              { key: "bio", label: "Biography", type: "textarea", default: "" }
            ]
          }
        ]
      },
      {
        key: "environment",
        label: "Environmental Impact",
        fields: [
          { key: "heading", label: "Heading", type: "text", default: "The Impact of Zero Emissions" },
          { key: "videoUrl", label: "Video URL", type: "url", default: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { key: "imageUrl", label: "Overlay Image Path", type: "text", default: "/media/app-screen-1.png" },
          { key: "statValue", label: "Stat Value", type: "text", default: "55Mn+" },
          { key: "statLabel", label: "Stat Label", type: "text", default: "Kgs CO2 Saved" },
        ]
      }
    ]
  }
];

// ─── Helpers (pure) ───────────────────────────────────────────────────────────
export function getPageDef(slug: string): PageDef | undefined {
  return PAGE_REGISTRY.find((p) => p.slug === slug);
}

/** Build the default content object for a page from its registry definition. */
export function getDefaults(slug: string): Record<string, Record<string, unknown>> {
  const def = getPageDef(slug);
  if (!def) return {};
  const out: Record<string, Record<string, unknown>> = {};
  for (const section of def.sections) {
    out[section.key] = {};
    for (const field of section.fields) {
      out[section.key][field.key] = field.default;
    }
  }
  return out;
}

/** Merge stored overrides on top of registry defaults (stored wins, per field). */
export function resolveContent(
  slug: string,
  stored?: Record<string, Record<string, unknown>>,
): Record<string, Record<string, unknown>> {
  const defaults = getDefaults(slug);
  if (!stored) return defaults;
  const out: Record<string, Record<string, unknown>> = {};
  for (const sectionKey of Object.keys(defaults)) {
    out[sectionKey] = { ...defaults[sectionKey], ...(stored[sectionKey] ?? {}) };
  }
  return out;
}
