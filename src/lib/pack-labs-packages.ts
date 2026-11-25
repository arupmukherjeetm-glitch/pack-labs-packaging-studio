export const packageTiers = [
  {
    id: "start",
    number: "01",
    name: "Brand Start",
    title: "Start with an identity that’s built to last.",
    summary:
      "A clear identity is the first thing customers, clients and partners judge. We build one around what your business stands for.",
    scopeNote: "A clear foundation for what comes next.",
    deliverables: [
      "Competition scan",
      "Brand personality",
      "Logo design",
      "Colour system",
      "Typography system",
      "Business card, stationery + email signature",
    ],
    timeline: "2–3 weeks",
    image: "/pack-labs/brand-foundation.jpg",
    imageAlt: "A considered forest-green brand identity kit with printed pieces",
  },
  {
    id: "launch",
    number: "02",
    name: "Brand Launch",
    title: "Launch looking like the brand you want to become.",
    summary:
      "Your product is nearly ready. We make sure the brand and packaging structure are ready for market too.",
    scopeNote: "Everything in Brand Start, plus",
    deliverables: [
      "Category + competition insights",
      "Target consumer insights",
      "Brand promise",
      "Basic brand guidelines",
      "Naming evaluation",
      "Packaging architecture",
    ],
    timeline: "4 weeks",
    image: "/pack-labs/product-packaging.jpg",
    imageAlt: "Minimal skincare packaging concepts arranged as a product family",
  },
  {
    id: "grow",
    number: "03",
    name: "Brand Grow",
    title: "Your business has grown. Your brand should too.",
    summary:
      "Many SKUs, many designers, many looks. We bring your portfolio together as one brand, without losing what customers already recognise.",
    scopeNote: "Everything in Brand Launch, plus",
    deliverables: [
      "Category gap report",
      "Brand key + positioning",
      "Comprehensive brand guidelines",
      "Portfolio packaging (up to 5 SKUs)",
      "Communication templates",
      "Printer + vendor briefing",
    ],
    timeline: "6 weeks",
    image: "/pack-labs/portfolio-growth.jpg",
    imageAlt: "A visual system showing multiple product formats unified as one portfolio",
  },
  {
    id: "scale",
    number: "04",
    name: "Brand Scale",
    title: "Take your brand to new markets and channels.",
    summary:
      "New markets, retailers and platforms each ask something different of a brand. We build the system and tools to meet them.",
    scopeNote: "Everything in Brand Grow, plus",
    deliverables: [
      "E-commerce visual package",
      "Consumer brand launch toolkit",
      "Retail branding system",
      "Retailer + distributor toolkit",
      "3 months of roll-out guidance",
    ],
    timeline: "8–10 weeks",
    image: "/pack-labs/channel-rollout.jpg",
    imageAlt: "Packaging concepts prepared for retail, e-commerce and new markets",
  },
] as const;

export type PackageTier = (typeof packageTiers)[number];