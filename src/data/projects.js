export const creatorProfile = {
  name: "ARSHAAN",
  title: "Creative Technologist & Frontend Architect",
  location: "New Delhi / Global Remote",
  email: "arsh44n.me@gmail.com",
  phone: "+91 8837866368",
  whatsapp: "+91 8837866368",
  whatsappUrl: "https://wa.me/918837866368",
  linkedin: "https://www.linkedin.com/in/arsh44n/",
  linkedinDisplay: "linkedin.com/in/arsh44n",
  avatar: "./assets/arshaan_profile_sq.png",
  avatarFull: "./assets/arshaan_profile.png",
  pitchText: `Hey,\nAre you looking for a high-end premium website for your business with immersive experience?\nLet's connect.`,
  bio: "Architecting high-conversion digital flagships, 3D interactive systems, and sub-second web platforms. Combining tactile graphic design, kinetic motion physics, and conversion velocity.",
  stats: [
    { label: "PUBLISHED PROJECTS", value: "07" },
    { label: "FRAME RATE TARGET", value: "120 FPS" },
    { label: "CLIENT REACH", value: "GLOBAL" },
    { label: "COMMISSIONS", value: "OPEN" },
  ],
  skills: [
    "Tactile 3D Glassmorphism",
    "Tailwind CSS Architecture",
    "React & Framer Motion",
    "Sub-Second Performance",
    "E-Commerce & Sports Digital Platforms",
    "Interactive UI/UX Design"
  ]
};

export const projects = [
  {
    id: "indian-celebritie",
    title: "Indian Celebritie",
    category: "Luxury Fragrance E-Commerce",
    industry: "Haute Perfumerie & Luxury Retail",
    liveUrl: "https://arsh44n.github.io/Indian-Celebritie/love-drop.html",
    displayUrl: "indian-celebritie.store",
    image: "./assets/projects/indian_celebritie.png",
    caption: "High-conversion luxury perfume storefront with scent accord telemetry",
    pills: ["Luxury Retail", "Fragrance Oils", "Cart Drawer", "Motion Physics"],
    whatItDoes: "Indian Celebritie is a bespoke haute perfumerie e-commerce platform designed to convey olfactory luxury digitally. It enables connoisseurs to explore handcrafted pure perfume oils, visualize scent sillage longevity across hours, and purchase bespoke blends through an instant slide-out cart drawer without page reloads.",
    usps: [
      {
        metric: "8-12 Hours",
        title: "Sillage Telemetry Visualizer",
        desc: "Interactive timeline demonstrating how top, heart, and base notes unfold across time."
      },
      {
        metric: "0.2s Drawer",
        title: "Zero-Latency Checkout Flow",
        desc: "Instant slide-out cart drawer maintaining continuous shopping context."
      },
      {
        metric: "100% Bespoke",
        title: "Editorial Lookbook Experience",
        desc: "Editorial typography and art direction designed specifically for high-ticket luxury clientele."
      }
    ],
    whatWeDid: [
      "Engineered real-time olfactory sillage telemetry visualizer",
      "Built instant zero-friction slide-out cart drawer with live state synchronization",
      "Crafted luxury editorial typography system and high-contrast product lookbook",
      "Optimized imagery and layout shifts achieving sub-second first contentful paint"
    ],
    techStack: ["Tailwind CSS", "Interactive Lightbox", "Cart Drawer", "Motion Physics", "JavaScript"]
  },
  {
    id: "battle-park-india",
    title: "Battle Park India",
    category: "Sports Club & Venue Platform",
    industry: "Sports Facilities & Community Networks",
    liveUrl: "https://arsh44n.github.io/Battle-park-India/",
    displayUrl: "battlepark.in",
    image: "./assets/projects/battle_park.png",
    caption: "South Delhi premier pickleball and night sports venue platform",
    pills: ["Sports Platform", "Court Booking", "Tournament Fixtures", "Delhi NCR"],
    whatItDoes: "Battle Park India is the digital command center for South Delhi's premier pickleball facility. The platform handles floodlit court scheduling, tournament fixture brackets, coaching clinic reservations, and direct WhatsApp player RSVPs, transforming a physical sports venue into an automated community ecosystem.",
    usps: [
      {
        metric: "6 Floodlit Courts",
        title: "Real-Time Slot Reservations",
        desc: "Visual court grid with immediate morning and night play slot confirmation."
      },
      {
        metric: "WhatsApp API",
        title: "One-Tap Instant RSVP",
        desc: "Seamless booking pipeline routing reservations directly to venue concierge."
      },
      {
        metric: "Live Fixtures",
        title: "Tournament Telemetry",
        desc: "Dynamic schedule tables and community tournament standings updated live."
      }
    ],
    whatWeDid: [
      "Architected interactive court reservation calendar and slot availability grid",
      "Created tournament fixture tables and player leaderboard systems",
      "Integrated one-touch WhatsApp reservation pipeline with pre-populated matchplay details",
      "Optimized mobile viewport layout for players booking court slots from the sidelines"
    ],
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "Responsive Design", "WhatsApp Integration"]
  },
  {
    id: "the-paddle-store",
    title: "The Paddle Store",
    category: "Pro Athletic Gear Storefront",
    industry: "Athletic Equipment & Racket Sports",
    liveUrl: "https://arsh44n.github.io/the-paddle-store/",
    displayUrl: "thepaddlestore.com",
    image: "./assets/projects/paddle_store.png",
    caption: "Specialized tournament padel and pickleball gear platform",
    pills: ["Carbon Weave", "Weight Matrix", "Padel Pro", "Order Drawer"],
    whatItDoes: "The Paddle Store is a high-performance equipment storefront for elite padel and pickleball athletes. Rather than generic catalog browsing, it empowers players to evaluate paddles based on carbon weave stiffness, balance point millimeters, swing-weight telemetry, and core foam density.",
    usps: [
      {
        metric: "12K / 18K",
        title: "Carbon Weave Flex Matrix",
        desc: "Comparative stiffness analysis allowing players to match paddle flex to their swing style."
      },
      {
        metric: "Gram Precision",
        title: "Balance & Weight Analysis",
        desc: "Interactive balance telemetry categorizing head-heavy vs control-oriented rackets."
      },
      {
        metric: "Instant Drawer",
        title: "Frictionless Gear Checkout",
        desc: "Slide-out equipment bag drawer keeping the athlete immersed in product comparison."
      }
    ],
    whatWeDid: [
      "Constructed carbon weave stiffness telemetry comparison matrix",
      "Built dynamic equipment filter sorting by balance point, core foam, and skill tier",
      "Engineered slide-out bag drawer with immediate gear spec summary",
      "Delivered crisp, high-contrast athletic imagery with technical specifications"
    ],
    techStack: ["Tailwind CSS", "JavaScript", "Dynamic Filter", "Cart Drawer", "Athletic Telemetry"]
  },
  {
    id: "padel-ae",
    title: "Padel AE",
    category: "UAE Venue & Club Network",
    industry: "Sports Tourism & Regional Venues",
    liveUrl: "https://arsh44n.github.io/PadelAe/",
    displayUrl: "padelae.com",
    image: "./assets/projects/padel_ae.png",
    caption: "UAE and Dubai sports court discovery directory",
    pills: ["Dubai Venues", "Abu Dhabi", "AC Indoor Courts", "Geo Filter"],
    whatItDoes: "Padel AE is the comprehensive sports venue discovery platform spanning the United Arab Emirates. It connects athletes across Dubai, Abu Dhabi, and Sharjah with verified clubs, featuring specialized filters for indoor air-conditioned courts during extreme summer months, certified coaching staffs, and direct booking links.",
    usps: [
      {
        metric: "100% UAE",
        title: "Regional Club Network",
        desc: "Complete coverage of premier padel facilities across Dubai, Abu Dhabi, and Sharjah."
      },
      {
        metric: "Climate Filter",
        title: "Air-Conditioned Indoor Search",
        desc: "Critical filter for UAE climate allowing players to find temperature-controlled indoor courts."
      },
      {
        metric: "Direct Links",
        title: "Verified Venue Concierge",
        desc: "Direct WhatsApp and web booking links for every verified club in the emirates."
      }
    ],
    whatWeDid: [
      "Built regional discovery engine with multi-emirate geo-filtering",
      "Implemented climate-specific indoor air-conditioned facility tags and filter telemetry",
      "Designed high-contrast responsive club showcase cards with court specifications",
      "Streamlined player contact pathways with direct club concierge connections"
    ],
    techStack: ["JavaScript", "Tailwind CSS", "Directory Engine", "Geo Filter", "Responsive Layout"]
  },
  {
    id: "pickleads",
    title: "Pickleads",
    category: "SaaS Sports Venue Telemetry",
    industry: "Enterprise SaaS & Club Automation",
    liveUrl: "https://arsh44n.github.io/pickleads/",
    displayUrl: "pickleads.com",
    image: "./assets/projects/pickleads.png",
    caption: "Sports venue automation and membership telemetry platform",
    pills: ["SaaS Platform", "Occupancy", "Membership", "Analytics"],
    whatItDoes: "Pickleads is an enterprise software platform architected for sports venue operators and club owners. It automates player lead acquisition, manages court occupancy pipelines, streamlines recurring memberships, and provides actionable analytics on court utilization and hourly revenue yield.",
    usps: [
      {
        metric: "+68% Yield",
        title: "Court Occupancy Optimization",
        desc: "Automated booking reminders and off-peak promotions that fill idle court hours."
      },
      {
        metric: "Real-Time",
        title: "Live Venue Telemetry",
        desc: "Dashboard metrics tracking daily court hours booked, membership churn, and revenue."
      },
      {
        metric: "Automated",
        title: "Lead Acquisition Funnels",
        desc: "High-conversion onboarding pipelines converting casual players into club members."
      }
    ],
    whatWeDid: [
      "Architected clean SaaS marketing interface with interactive telemetry dashboards",
      "Designed conversion-engineered funnel pages targeting club managers and venue founders",
      "Built modular metric telemetry cards showcasing revenue yield and court occupancy",
      "Engineered responsive data tables and analytics previews with sub-second performance"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Venue Telemetry", "Analytics Engine"]
  },
  {
    id: "metaminds-luxury",
    title: "Metaminds Cybernetic",
    category: "Luxury Agency Web Engine",
    industry: "Creative Technology & Digital Studios",
    liveUrl: "https://metaminds.studio",
    displayUrl: "metaminds.studio",
    image: "./assets/projects/metaminds.png",
    caption: "Cybernetic luxury web design engine for elite digital agencies",
    pills: ["Lenis Scroll", "GSAP Trigger", "Spotlight Mask", "Luxury UX"],
    whatItDoes: "Metaminds Cybernetic is an ultra-premium web engine designed for avant-garde AI agencies and creative technology studios. Architected around Lenis smooth inertial physics, magnetic cursor spotlights, glowing gradient-mask cards, and SplitType kinetic typography, it redefines the benchmark for cybernetic luxury.",
    usps: [
      {
        metric: "120 FPS",
        title: "Lenis Inertial Physics",
        desc: "Silky smooth scroll physics completely eliminating desktop and trackpad scroll stutter."
      },
      {
        metric: "Dynamic",
        title: "Cursor Proximity Illumination",
        desc: "Radial lighting masks that follow the pointer, revealing subtle micro-textures."
      },
      {
        metric: "Sub-Second",
        title: "Zero-Latency Performance",
        desc: "99/100 Lighthouse performance despite complex multi-layer WebGL and GSAP animations."
      }
    ],
    whatWeDid: [
      "Integrated Lenis inertial smooth scroll physics with GSAP ScrollTrigger timeline orchestration",
      "Built dynamic cursor-tracking radial spotlights and glowing gradient-mask card components",
      "Engineered responsive glassmorphic pill navigation with fluid backdrop blur",
      "Achieved cinematic dark luxury aesthetic with zero performance compromises"
    ],
    techStack: ["React", "GSAP ScrollTrigger", "Lenis Scroll", "Tailwind CSS", "Kinetic Physics"]
  },
  {
    id: "aurix-one-acoustics",
    title: "Aurix One Acoustics",
    category: "Audiophile Hardware Showcase",
    industry: "Consumer Electronics & Acoustics",
    liveUrl: "https://aurix-acoustics.live",
    displayUrl: "aurix-acoustics.live",
    image: "./assets/projects/aurix_one.png",
    caption: "Audiophile graphene acoustic hardware flagship showcase",
    pills: ["WebGL 3D", "Three.js", "Noise Cancelling", "Frequency"],
    whatItDoes: "Aurix One Acoustics is a flagship product showcase for precision graphene audio hardware. It features interactive 3D scroll-driven chassis disassembly, real-time active noise cancellation frequency wave simulations, and an exploded view highlighting CNC-machined aerospace aluminum enclosures.",
    usps: [
      {
        metric: "3D Exploded",
        title: "Chassis Scroll Disassembly",
        desc: "Scroll-linked exploded view separating drivers, graphene diaphragm, and acoustic housing."
      },
      {
        metric: "Real-Time",
        title: "ANC Frequency Wave Simulation",
        desc: "Interactive canvas waveform simulating ambient phase-inverted noise cancellation."
      },
      {
        metric: "Aerospace",
        title: "CNC Aluminum Enclosure",
        desc: "Precision industrial design presentation highlighting acoustic chamber geometry."
      }
    ],
    whatWeDid: [
      "Built scroll-synchronized 3D exploded chassis view using Three.js and Canvas rendering",
      "Engineered real-time audio frequency wave simulator with interactive noise-cancellation toggle",
      "Created sleek Swiss technical spec sheets detailing driver impedance and frequency response",
      "Optimized 3D asset pipeline ensuring fluid 60fps rendering across mobile and desktop devices"
    ],
    techStack: ["WebGL", "Three.js", "Canvas Scrubber", "Framer Motion", "Audio Telemetry"]
  }
];
