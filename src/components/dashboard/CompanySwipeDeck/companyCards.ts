/** Rich position copy shown in the info sheet (80% screen panel). */
export type PositionDetail = {
  /** Short hook under the title */
  summary: string;
  /** What the team does and why this role exists */
  roleOverview: string;
  /** Day-to-day ownership */
  responsibilities: string[];
  /** Must-have qualifications */
  requirements: string[];
  /** Bonus skills */
  niceToHave?: string[];
  /** Perks & comp notes beyond headline */
  benefits: string[];
  /** How the team works */
  teamAndCulture: string;
  employmentType: string;
  seniority: string;
  location: string;
  teamSize?: string;
  postedAgo?: string;
};

/** Partner HR / recruiting firms that work with this type of role at the company */
export type HrPartnerCompany = {
  name: string;
  tagline?: string;
  region?: string;
};

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
  positionDetail: PositionDetail;
  /** HR companies that collaborate on hiring for this position */
  partnerHrs: HrPartnerCompany[];
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
    positionDetail: {
      summary:
        "Own backend systems for Search & AI ranking and serving at global scale—with SLOs measured in milliseconds.",
      roleOverview:
        "You’ll join a team that designs, builds, and operates high-throughput services behind query understanding and retrieval. Work spans design reviews, production launches, on-call rotation, and cross-functional alignment with ML, product, and infra. Expect deep ownership of reliability, latency, and cost at planetary scale.",
      responsibilities: [
        "Design and implement distributed services (Go, C++, Java) for ranking, retrieval, and feature serving.",
        "Drive performance work: profiling, capacity planning, and latency reduction across regions.",
        "Partner with ML to productionize models safely with guardrails, monitoring, and rollback paths.",
        "Participate in design docs, code reviews, and incident response; write postmortems with action items.",
        "Mentor engineers and help raise the bar for testing, observability, and operational excellence.",
      ],
      requirements: [
        "8+ years software engineering; strong systems background.",
        "Experience building and operating large-scale distributed systems in production.",
        "Proficiency in at least one of Go, C++, or Java; comfort with performance tuning.",
        "Strong communication and ability to work across product, ML, and SRE-style partners.",
      ],
      niceToHave: [
        "Background in search, ads, or recommendation systems.",
        "Experience with Kubernetes, service mesh, or multi-region deployments.",
        "Familiarity with ML inference or feature stores at scale.",
      ],
      benefits: [
        "Competitive salary, equity (GSUs), and annual refresh programs.",
        "Health, dental, vision; wellness and mental health resources.",
        "Generous PTO, parental leave, and backup care options.",
        "On-site perks where applicable: meals, fitness, learning stipends.",
      ],
      teamAndCulture:
        "The team values clarity, blameless postmortems, and data-driven decisions. You’ll work in a hybrid model with flexible days on campus; async-friendly docs and design reviews keep distributed teammates aligned.",
      employmentType: "Full-time",
      seniority: "Senior (L5–L6 equivalent)",
      location: "Mountain View, CA · Hybrid (3 days on-site typical)",
      teamSize: "12–18 engineers",
      postedAgo: "Posted 5 days ago",
    },
    partnerHrs: [
      { name: "TechMatch Global", tagline: "Executive & staff eng", region: "US · EMEA" },
      { name: "Silicon Search Partners", tagline: "FAANG & scale-ups", region: "Bay Area" },
      { name: "BluePeak Recruiting", tagline: "Distributed systems", region: "Remote-first" },
      { name: "Vertex Talent Collective", tagline: "Product & infra", region: "North America" },
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
    positionDetail: {
      summary:
        "Build and harden Azure platform primitives that power tenant isolation, deployment, and safe rollouts for enterprise customers.",
      roleOverview:
        "You’ll work on core platform services that other Azure teams depend on: APIs, control planes, and automation for provisioning and lifecycle. Emphasis on security, compliance, and operability—tight integration with Kubernetes, identity, and networking stacks.",
      responsibilities: [
        "Design and ship platform features for multi-tenant workloads and safe deployment pipelines.",
        "Improve reliability: SLOs, alerting, runbooks, and incident response with partner teams.",
        "Collaborate with security on threat models, secrets handling, and least-privilege patterns.",
        "Optimize CI/CD, canary strategies, and rollback tooling for large-scale services.",
        "Mentor peers on Azure patterns, .NET/Go services, and cloud-native best practices.",
      ],
      requirements: [
        "6+ years in backend/platform engineering; production cloud experience (Azure, AWS, or GCP).",
        "Strong Kubernetes or container orchestration experience.",
        "Proficiency in C#, Go, or similar; solid grasp of APIs and distributed systems.",
        "Understanding of networking, identity, and security fundamentals in cloud environments.",
      ],
      niceToHave: [
        "Azure-specific certifications or hands-on with ARM, AKS, or Entra ID.",
        "Experience with service mesh, policy engines, or GitOps.",
      ],
      benefits: [
        "Base + RSU with refresh; employee stock purchase plan.",
        "Healthcare, HSA/FSA, and family support programs.",
        "Learning budget, internal mobility, and hybrid work flexibility.",
        "Discounts on Microsoft products and partner perks.",
      ],
      teamAndCulture:
        "Engineering-led culture with emphasis on customer trust and operational maturity. Hybrid schedule with core collaboration days; async documentation in Azure DevOps and Teams.",
      employmentType: "Full-time",
      seniority: "Senior IC",
      location: "Greater Seattle · Hybrid",
      teamSize: "10–15 engineers",
      postedAgo: "Posted 1 week ago",
    },
    partnerHrs: [
      { name: "CloudStaff Executive", tagline: "Azure & platform", region: "Seattle · Remote" },
      { name: "Enterprise Hire Group", tagline: "Microsoft ecosystem", region: "US & Canada" },
      { name: "Northbridge Recruiters", tagline: "Security & cloud", region: "Hybrid" },
      { name: "Stackline Partners", tagline: "Senior IC & leads", region: "Global" },
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
    positionDetail: {
      summary:
        "Bridge research and production: ship GPU-accelerated ML workflows, from kernels to platform APIs.",
      roleOverview:
        "You’ll improve end-to-end ML performance on NVIDIA stacks—training, inference, and tooling. Work includes profiling, kernel-aware optimizations, integration with PyTorch/CUDA stacks, and collaboration with research and driver teams to land features customers can rely on.",
      responsibilities: [
        "Profile and optimize training/inference pipelines on GPUs; reduce latency and memory use.",
        "Build and maintain platform components for model serving, batch jobs, and observability.",
        "Partner with research to productionize models with reproducible benchmarks and regression tests.",
        "Contribute to internal libraries, examples, and documentation for external developers.",
        "Participate in design reviews for performance, correctness, and scalability.",
      ],
      requirements: [
        "MS/PhD in CS/EE or equivalent experience; 5+ years in ML or systems engineering.",
        "Strong Python; experience with PyTorch or TensorFlow in production.",
        "Solid understanding of GPU programming concepts (CUDA familiarity strongly preferred).",
        "Ability to communicate complex tradeoffs to both research and product stakeholders.",
      ],
      niceToHave: [
        "Experience with TensorRT, Triton, or custom CUDA kernels.",
        "Background in LLM inference, quantization, or distributed training.",
      ],
      benefits: [
        "Competitive compensation and equity (RSUs).",
        "Premium medical plans and employee assistance programs.",
        "On-site amenities, gym, and learning allowances.",
        "Relocation support for eligible candidates.",
      ],
      teamAndCulture:
        "Fast-paced, research-friendly environment with a strong hardware–software co-design mindset. Hybrid work with flexible hours around experiments and cross-site collaboration.",
      employmentType: "Full-time",
      seniority: "Senior",
      location: "Santa Clara, CA · Hybrid",
      teamSize: "8–12 engineers",
      postedAgo: "Posted 3 days ago",
    },
    partnerHrs: [
      { name: "DeepTech Search", tagline: "ML & research eng", region: "Santa Clara · Remote" },
      { name: "GPU Talent Syndicate", tagline: "Hardware-adjacent SW", region: "West Coast" },
      { name: "AI Staffing Collective", tagline: "Inference & training", region: "US" },
      { name: "Circuit Recruiters", tagline: "Semiconductor & AI", region: "NA · EU" },
    ],
  },
];
