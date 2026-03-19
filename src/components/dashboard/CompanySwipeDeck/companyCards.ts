export type CompanySwipeCard = {
  id: string;
  companyName: string;
  logoUrl: string;
  roleTitle: string;
  roleMeta: string;
  compensation: string;
  about: string;
  tags: string[];
  facts: { label: string; value: string }[];
  highlights: string[];
};

export const COMPANY_SWIPE_CARDS: CompanySwipeCard[] = [
  {
    id: "google-senior-software-engineer",
    companyName: "Google",
    logoUrl: "/assets/companyImages/google.png",
    roleTitle: "Senior Software Engineer",
    roleMeta: "Search & AI · Mountain View · Hybrid",
    compensation: "$220k-$320k · Equity",
    about:
      "Google builds products used by billions across Search, YouTube, Android, Cloud, and AI research.",
    tags: ["Distributed systems", "Go", "C++", "Large scale"],
    facts: [
      { label: "Industry", value: "Internet & AI" },
      { label: "Size", value: "180k+ employees" },
      { label: "HQ", value: "Mountain View" },
    ],
    highlights: [
      "Design and optimize critical backend services",
      "Ship features with strict reliability targets",
      "Collaborate across product, infra, and ML teams",
    ],
  },
  {
    id: "microsoft-cloud-platform-engineer",
    companyName: "Microsoft",
    logoUrl: "/assets/companyImages/microsoft.png",
    roleTitle: "Cloud Platform Engineer",
    roleMeta: "Azure · Seattle · Hybrid",
    compensation: "$190k-$280k · RSU",
    about:
      "Microsoft powers enterprise software, cloud infrastructure, and developer tools across the globe.",
    tags: ["Azure", ".NET", "Kubernetes", "Cloud security"],
    facts: [
      { label: "Industry", value: "Cloud & Enterprise" },
      { label: "Size", value: "220k+ employees" },
      { label: "HQ", value: "Redmond" },
    ],
    highlights: [
      "Build resilient multi-tenant platform services",
      "Improve deployment and observability workflows",
      "Partner with security and product engineering",
    ],
  },
  {
    id: "nvidia-ml-engineer",
    companyName: "NVIDIA",
    logoUrl: "/assets/companyImages/nvidia.png",
    roleTitle: "Machine Learning Engineer",
    roleMeta: "AI Platform · Santa Clara · Hybrid",
    compensation: "$230k-$340k · Equity",
    about:
      "NVIDIA advances accelerated computing and AI infrastructure across GPUs, software platforms, and data center systems.",
    tags: ["Python", "CUDA", "PyTorch", "Model optimization"],
    facts: [
      { label: "Industry", value: "Semiconductors & AI" },
      { label: "Size", value: "30k+ employees" },
      { label: "HQ", value: "Santa Clara" },
    ],
    highlights: [
      "Optimize training and inference performance",
      "Collaborate with hardware and research teams",
      "Ship production-grade ML platform features",
    ],
  },
];
