/**
 * MongoDB payloads for `/dashboard/swipe`: major technology employers and open roles with
 * full card fields (`positionDetail`, requirement matrix, tags, highlights). Image paths
 * point at files under `public/` (`swipeSeedPublicPaths.ts`, `public/assets/dashboard-swipe/README.md`).
 */
import type { CompanySwipeCard, PositionDetail, RequirementMatrixRow } from "@/components/dashboard/CompanySwipeDeck/companyCards";
import { COMPANY_SWIPE_CARDS } from "@/components/dashboard/CompanySwipeDeck/companyCards";
import type { NewCompanyInput } from "@/lib/company-repository";
import { companySwipeCardToDeckPosition } from "@/lib/company-swipe-mongo";
import {
  SWIPE_COMPANY_LOGO_PATHS,
  SWIPE_PARTNER_HRS_AMAZON,
  SWIPE_PARTNER_HRS_APPLE,
  SWIPE_PARTNER_HRS_GOOGLE,
  SWIPE_PARTNER_HRS_META,
  SWIPE_PARTNER_HRS_MICROSOFT,
} from "@/data/swipeSeedPublicPaths";

function mergeCard(
  base: CompanySwipeCard,
  patch: Partial<CompanySwipeCard> & { positionDetail?: Partial<PositionDetail> }
): CompanySwipeCard {
  const { positionDetail: pdPatch, ...rest } = patch;
  const c = structuredClone(base);
  Object.assign(c, rest);
  if (pdPatch) {
    c.positionDetail = { ...c.positionDetail, ...pdPatch };
  }
  return c;
}

const [googleBase, microsoftBase, nvidiaBase] = COMPANY_SWIPE_CARDS;

function googleShell(): CompanySwipeCard {
  const c = structuredClone(googleBase);
  c.logoUrl = SWIPE_COMPANY_LOGO_PATHS.google;
  c.partnerHrs = SWIPE_PARTNER_HRS_GOOGLE;
  return c;
}

function microsoftShell(): CompanySwipeCard {
  const c = structuredClone(microsoftBase);
  c.logoUrl = SWIPE_COMPANY_LOGO_PATHS.microsoft;
  c.partnerHrs = SWIPE_PARTNER_HRS_MICROSOFT;
  return c;
}

/** Six-row matrix for cloud / B2B product management roles */
const cloudPmMatrix: RequirementMatrixRow[] = [
  {
    category: "Experience",
    requirement: "Product management for enterprise cloud, ML, or data platforms",
    level: "8+ yrs PM · Principal",
    required: "Yes",
    weight: 5,
  },
  {
    category: "Skills",
    requirement: "Roadmaps, GTM alignment, pricing & packaging collaboration",
    level: "Expert",
    required: "Yes",
    weight: 5,
  },
  {
    category: "Domain",
    requirement: "AI/ML platform, MLOps, or API-first B2B products",
    level: "Strong",
    required: "Yes",
    weight: 4,
  },
  {
    category: "Soft",
    requirement: "Executive storytelling & cross-functional leadership",
    level: "Principal-level",
    required: "Yes",
    weight: 4,
  },
  {
    category: "Tools",
    requirement: "Analytics, experimentation, and customer research workflows",
    level: "Strong",
    required: "Yes",
    weight: 3,
  },
  {
    category: "Education",
    requirement: "BS+ or equivalent; MBA or technical depth valued",
    level: "Typical for principal PM",
    required: "Nice-to-have",
    weight: 2,
  },
];

const tpmSecurityMatrix: RequirementMatrixRow[] = [
  {
    category: "Experience",
    requirement: "TPM for security, identity, or compliance-heavy products",
    level: "7+ yrs TPM",
    required: "Yes",
    weight: 5,
  },
  {
    category: "Skills",
    requirement: "Cross-org roadmaps, RAID logs, exec reporting",
    level: "Expert",
    required: "Yes",
    weight: 5,
  },
  {
    category: "Domain",
    requirement: "Zero trust, threat protection, or M365 security surfaces",
    level: "Strong",
    required: "Yes",
    weight: 4,
  },
  {
    category: "Soft",
    requirement: "Align eng, policy, legal, and GTM under tight timelines",
    level: "Partner-facing",
    required: "Yes",
    weight: 4,
  },
  {
    category: "Tools",
    requirement: "Azure DevOps, Jira, or similar at enterprise scale",
    level: "Solid",
    required: "Yes",
    weight: 3,
  },
  {
    category: "Education",
    requirement: "Technical degree or proven depth in security programs",
    level: "Typical for senior TPM",
    required: "Nice-to-have",
    weight: 2,
  },
];

// --- Google (Alphabet) — 2 roles ---
const googleSearchStaff = mergeCard(googleShell(), {
  id: "google-senior-staff-search-ranking",
  roleTitle: "Senior Staff Software Engineer, Search Quality & Ranking",
  roleMeta: "Search & AI · Mountain View · Hybrid",
  compensation: "$320k-$500k · Equity",
  tags: ["Search", "Go", "C++", "Distributed systems", "ML serving"],
  highlights: [
    "Own ranking and retrieval paths measured in milliseconds at global scale",
    "Partner with research on safe productionization of new ranking signals",
    "Drive SLOs, cost efficiency, and incident prevention across regions",
  ],
  positionDetail: {
    summary:
      "Lead backend systems for Search quality and ranking—retrieval, feature serving, and experimentation with strict latency and reliability targets.",
    positionTeaser:
      "Staff-level ownership where every millisecond and every launch touches billions of queries.",
    teamDomain: "Search Quality & Ranking",
    locationType: "Hybrid · Mountain View, CA",
    coreImpact:
      "Improve relevance, freshness, and trust signals in Search while maintaining planetary-scale reliability.",
    requirementMatrix: structuredClone(googleBase.positionDetail.requirementMatrix),
    roleOverview:
      "You will design and evolve services behind query understanding, retrieval, and ranking feature pipelines. Expect deep collaboration with ML, product, and SRE on tier-1 systems, capacity planning, and progressive rollouts.",
    responsibilities: [
      "Architect and implement distributed services for ranking, retrieval, and feature serving at extreme QPS.",
      "Lead performance and reliability programs: profiling, SLOs, error budgets, and multi-region failover.",
      "Productionize ML signals with guardrails, monitoring, and safe rollback paths.",
      "Mentor senior engineers; raise the bar for design docs, testing, and operational excellence.",
    ],
    requirements: [
      "10+ years software engineering; proven staff-level impact on large systems.",
      "Expertise in Go, C++, or Java and production distributed systems.",
      "Strong track record in search, retrieval, ads-scale serving, or adjacent high-QPS domains.",
      "Excellent communication across ML, product, and infrastructure partners.",
    ],
    niceToHave: [
      "Experience with learning-to-rank or large-scale experimentation platforms.",
      "Multi-region active-active deployments and disaster recovery.",
    ],
    benefits: structuredClone(googleBase.positionDetail.benefits),
    teamAndCulture:
      "Hybrid model with flexible campus days; blameless culture, data-driven decisions, and strong documentation habits.",
    employmentType: "Full-time",
    seniority: "Senior Staff (L6–L7 band)",
    location: "Mountain View, CA · Hybrid",
    teamSize: "14–20 engineers",
    postedAgo: "Posted 4 days ago",
  },
});

const googleCloudAiPm = mergeCard(googleShell(), {
  id: "google-principal-pm-cloud-ai-platform",
  roleTitle: "Principal Product Manager, Google Cloud AI Platform",
  roleMeta: "Google Cloud · Sunnyvale · Hybrid",
  compensation: "$280k-$420k · Equity",
  tags: ["Vertex AI", "MLOps", "Enterprise", "APIs", "GTM"],
  highlights: [
    "Shape Vertex AI and adjacent platform APIs for enterprise builders",
    "Partner with GTM, research, and eng on roadmap and packaging",
    "Define success metrics tied to adoption, latency, and customer outcomes",
  ],
  positionDetail: {
    summary:
      "Own strategy and execution for Google Cloud AI platform surfaces—Vertex AI, notebooks, and model lifecycle experiences for enterprise customers.",
    positionTeaser:
      "Principal PM scope: from API design narratives to launch readiness with Global 2000 customers.",
    teamDomain: "Google Cloud AI Platform",
    locationType: "Hybrid · Sunnyvale, CA",
    coreImpact:
      "Accelerate safe, scalable adoption of generative AI and classical ML on Google Cloud.",
    requirementMatrix: cloudPmMatrix,
    roleOverview:
      "You will prioritize capabilities across training, tuning, evaluation, and deployment workflows. Balance research-forward bets with enterprise requirements: IAM, VPC-SC, quotas, and compliance narratives.",
    responsibilities: [
      "Define multi-quarter roadmaps with clear customer and revenue hypotheses.",
      "Run discovery with ML engineers, partners, and field teams; synthesize into PRDs and OKRs.",
      "Align engineering, UX, and GTM on launches, pricing inputs, and migration paths.",
      "Instrument adoption funnels and quality metrics; iterate with data.",
    ],
    requirements: [
      "8+ years product management; principal-level scope on technical B2B products.",
      "Deep familiarity with cloud platforms and ML/AI product patterns.",
      "Strong written communication and executive stakeholder management.",
    ],
    niceToHave: ["Experience with MLOps, evaluation harnesses, or responsible AI guardrails."],
    benefits: structuredClone(googleBase.positionDetail.benefits),
    teamAndCulture:
      "Cloud pace with Google infrastructure depth; hybrid Sunnyvale / Bay with global partner teams.",
    employmentType: "Full-time",
    seniority: "Principal Product Manager",
    location: "Sunnyvale, CA · Hybrid",
    teamSize: "PM pod + 30–50 eng",
    postedAgo: "Posted 1 week ago",
  },
});

// --- Microsoft — 2 roles ---
const microsoftAks = mergeCard(microsoftShell(), {
  id: "microsoft-senior-swe-azure-kubernetes-service",
  roleTitle: "Senior Software Engineer, Azure Kubernetes Service",
  roleMeta: "Azure Core · Seattle · Hybrid",
  compensation: "$200k-$290k · RSU",
  tags: ["Kubernetes", "Go", "Control plane", "SRE", "Multi-tenant"],
  highlights: [
    "Build control plane and dataplane features for AKS at hyperscale",
    "Harden isolation, upgrades, and fleet operations for enterprise tenants",
    "Partner with Azure networking and identity on secure defaults",
  ],
  positionDetail: {
    summary:
      "Ship core AKS platform capabilities—cluster lifecycle, upgrades, node management, and reliability for one of Azure’s fastest-growing services.",
    positionTeaser:
      "Kubernetes at cloud scale: your code runs the control planes customers trust for production.",
    teamDomain: "Azure Kubernetes Service",
    locationType: "Hybrid · Greater Seattle",
    coreImpact:
      "Improve availability, security posture, and operational excellence for millions of Kubernetes clusters.",
    requirementMatrix: structuredClone(microsoftBase.positionDetail.requirementMatrix),
    roleOverview:
      "You’ll work on services and operators that manage cluster creation, upgrades, and fleet-wide automation. Expect design reviews with sibling Azure teams, SLO-driven on-call, and customer-impacting change management.",
    responsibilities: [
      "Design and implement control plane APIs and background reconciliation loops.",
      "Improve upgrade safety: canaries, rollbacks, and blast-radius containment.",
      "Drive observability, SLOs, and incident response with partner teams.",
      "Mentor engineers on Kubernetes internals and Azure-scale operations.",
    ],
    requirements: [
      "6+ years backend or platform engineering in production cloud environments.",
      "Strong Kubernetes experience (controllers, operators, or service integration).",
      "Proficiency in Go, C#, or similar; solid distributed systems fundamentals.",
    ],
    niceToHave: ["AKS, EKS, or GKE internals.", "Service mesh or CNI-adjacent experience."],
    benefits: structuredClone(microsoftBase.positionDetail.benefits),
    teamAndCulture:
      "Customer-obsessed Azure culture; hybrid Seattle with core collaboration days and strong async docs.",
    employmentType: "Full-time",
    seniority: "Senior IC",
    location: "Greater Seattle · Hybrid",
    teamSize: "12–18 engineers",
    postedAgo: "Posted 3 days ago",
  },
});

const microsoftM365SecTpm = mergeCard(microsoftShell(), {
  id: "microsoft-senior-tpm-m365-security",
  roleTitle: "Senior Technical Program Manager, Microsoft 365 Security",
  roleMeta: "Microsoft 365 · Redmond · Hybrid",
  compensation: "$175k-$240k · RSU",
  tags: ["TPM", "Security", "Compliance", "M365", "Zero trust"],
  highlights: [
    "Orchestrate cross-product security initiatives across M365 surfaces",
    "Align engineering, compliance, and field on ship criteria",
    "Own executive-ready reporting on risk, milestones, and customer commitments",
  ],
  positionDetail: {
    summary:
      "Drive complex, cross-org programs for Microsoft 365 security—threat protection, identity alignment, and customer trust milestones.",
    positionTeaser:
      "High-visibility TPM work where policy, engineering, and enterprise expectations intersect.",
    teamDomain: "Microsoft 365 Security",
    locationType: "Hybrid · Redmond, WA",
    coreImpact:
      "Deliver coordinated security outcomes that reduce customer risk and strengthen regulated-industry readiness.",
    requirementMatrix: tpmSecurityMatrix,
    roleOverview:
      "You will translate ambiguous security goals into sequenced engineering plans, dependencies, and executive narratives. Partner with PM, eng leads, and compliance on audits, previews, and GA.",
    responsibilities: [
      "Build and maintain multi-team roadmaps with clear exit criteria and RAID tracking.",
      "Facilitate technical design checkpoints and readiness reviews for major releases.",
      "Coordinate with legal, privacy, and policy teams on disclosure and documentation.",
      "Report status to leadership with metrics on adoption, incidents, and quality bars.",
    ],
    requirements: [
      "7+ years technical program management in software organizations.",
      "Demonstrated delivery on security, identity, compliance, or platform programs.",
      "Excellent structured communication and executive presence.",
    ],
    niceToHave: ["Familiarity with Entra ID, Defender, or Microsoft Graph ecosystems."],
    benefits: structuredClone(microsoftBase.positionDetail.benefits),
    teamAndCulture:
      "Inclusive, growth-oriented Microsoft culture with flexible hybrid and strong TPM community.",
    employmentType: "Full-time",
    seniority: "Senior TPM",
    location: "Redmond, WA · Hybrid",
    teamSize: "Program office + 6–10 partner teams",
    postedAgo: "Posted 5 days ago",
  },
});

function appleShell(): CompanySwipeCard {
  const c = structuredClone(googleBase);
  c.companyName = "Apple";
  c.logoUrl = SWIPE_COMPANY_LOGO_PATHS.apple;
  c.companyTagline =
    "Apple designs iconic consumer hardware and software across iPhone, Mac, services, and wearables.";
  c.about =
    "Apple designs iconic consumer hardware and software across iPhone, Mac, services, and wearables.";
  c.companyMore =
    "Deep integration of hardware, software, and services with a focus on privacy, performance, and craft.";
  c.facts = [
    { label: "Industry", value: "Consumer Technology" },
    { label: "Size", value: "160k+ employees" },
    { label: "HQ", value: "Cupertino" },
  ];
  c.partnerHrs = SWIPE_PARTNER_HRS_APPLE;
  return c;
}

const appleSiliconPerf = mergeCard(appleShell(), {
  id: "apple-silicon-performance-architect",
  roleTitle: "Silicon Performance Architect",
  roleMeta: "Hardware Technology · Cupertino · On-site",
  compensation: "$240k-$360k · Equity",
  tags: ["Silicon", "Performance", "Power", "Simulation", "Pre-silicon"],
  highlights: [
    "Model and optimize performance per watt across Apple silicon generations",
    "Partner with architecture, software, and system teams on tradeoff analysis",
    "Influence RTL-adjacent decisions with data-driven projections",
  ],
  positionDetail: {
    summary:
      "Architect performance and power strategies for Apple silicon—from workload characterization through pre-silicon modeling and post-silicon correlation.",
    positionTeaser:
      "Where microarchitecture meets product experience: your models inform chips in billions of devices.",
    teamDomain: "Silicon Performance Architecture",
    locationType: "On-site · Cupertino, CA",
    coreImpact:
      "Raise the bar for sustained performance, thermals, and battery life across iPhone, iPad, and Mac.",
    requirementMatrix: structuredClone(nvidiaBase.positionDetail.requirementMatrix),
    roleOverview:
      "You will build performance models, analyze competitive workloads, and partner with CPU/GPU teams on floorplan and microarchitectural choices. Expect tight collaboration with OS and framework teams.",
    responsibilities: [
      "Develop and validate performance/power models tied to product scenarios.",
      "Drive analysis for hot workloads: graphics, ML accelerators, and system-level interactions.",
      "Present findings to leadership with clear recommendations and risk tradeoffs.",
      "Support bring-up correlation and post-silicon tuning loops.",
    ],
    requirements: [
      "8+ years in performance architecture, silicon, or closely related systems roles.",
      "Strong quantitative skills and experience with simulation or workload analysis.",
      "Deep curiosity about hardware–software co-design.",
    ],
    niceToHave: ["ML accelerator or GPU performance experience.", "Thermal or power management background."],
    benefits: [
      "Competitive compensation and equity.",
      "Premium health and wellness programs.",
      "Product discounts and on-campus resources.",
      "Education reimbursement.",
    ],
    teamAndCulture:
      "Detail-oriented, secretive where required, with world-class labs and cross-functional partners in Cupertino.",
    employmentType: "Full-time",
    seniority: "Architect / Senior",
    location: "Cupertino, CA · On-site",
    teamSize: "10–16 engineers",
    postedAgo: "Posted 6 days ago",
  },
});

const applePrivacyAds = mergeCard(appleShell(), {
  id: "apple-senior-privacy-engineer-ad-platforms",
  roleTitle: "Senior Privacy Engineer, Ad Platforms",
  roleMeta: "Ads & Privacy · Cupertino · Hybrid",
  compensation: "$220k-$320k · Equity",
  tags: ["Privacy", "Swift", "Data minimization", "Measurement", "Policy"],
  highlights: [
    "Design privacy-preserving measurement and targeting guardrails",
    "Partner with legal and policy on App Store and ads ecosystem changes",
    "Ship APIs that balance developer needs with user trust",
  ],
  positionDetail: {
    summary:
      "Engineer privacy-centric systems for Apple’s ads and measurement stack—on-device processing, aggregation, and policy-aligned APIs.",
    positionTeaser:
      "Protect users while enabling responsible advertising innovation at Apple scale.",
    teamDomain: "Ad Platforms · Privacy Engineering",
    locationType: "Hybrid · Cupertino, CA",
    coreImpact:
      "Strengthen user trust through technical privacy guarantees in ads-related products and frameworks.",
    requirementMatrix: structuredClone(microsoftBase.positionDetail.requirementMatrix),
    roleOverview:
      "You’ll implement and review systems handling identifiers, attribution, and aggregated reporting. Collaborate with policy, legal, and partner teams on threat models and user-facing disclosures.",
    responsibilities: [
      "Build and harden services and client components for privacy-preserving measurement.",
      "Lead privacy reviews for new ads features and third-party integrations.",
      "Prototype PETs (differential privacy, on-device ML) where applicable.",
      "Document architectures for internal and external transparency.",
    ],
    requirements: [
      "6+ years software engineering with meaningful privacy or security exposure.",
      "Strong Swift, Objective-C, or systems language skills; familiarity with Apple platforms valued.",
      "Ability to translate policy constraints into concrete engineering designs.",
    ],
    niceToHave: ["Ads tech or attribution domain knowledge.", "Cryptography or PET research background."],
    benefits: [
      "Competitive compensation and equity.",
      "Premium health and wellness programs.",
      "Product discounts and on-campus resources.",
      "Education reimbursement.",
    ],
    teamAndCulture:
      "Privacy-first culture with hybrid flexibility and rigorous cross-functional review.",
    employmentType: "Full-time",
    seniority: "Senior IC",
    location: "Cupertino, CA · Hybrid",
    teamSize: "8–14 engineers",
    postedAgo: "Posted 2 days ago",
  },
});

function amazonShell(): CompanySwipeCard {
  const c = structuredClone(googleBase);
  c.companyName = "Amazon";
  c.logoUrl = SWIPE_COMPANY_LOGO_PATHS.amazon;
  c.companyTagline =
    "Amazon builds global consumer platforms and cloud services through AWS, e-commerce, and logistics innovation.";
  c.about =
    "Amazon builds global consumer platforms and cloud services through AWS, e-commerce, and logistics innovation.";
  c.companyMore =
    "Customer obsession, operational excellence, and long-term thinking guide teams from retail to AWS.";
  c.facts = [
    { label: "Industry", value: "E-commerce & Cloud" },
    { label: "Size", value: "1.5M+ employees" },
    { label: "HQ", value: "Seattle" },
  ];
  c.partnerHrs = SWIPE_PARTNER_HRS_AMAZON;
  return c;
}

const amazonAlexaNlu = mergeCard(amazonShell(), {
  id: "amazon-senior-applied-scientist-alexa-nlu",
  roleTitle: "Senior Applied Scientist, Alexa NLU",
  roleMeta: "Alexa AI · Seattle · Hybrid",
  compensation: "$220k-$340k · RSU",
  tags: ["NLP", "PyTorch", "ASR", "Dialog", "Production ML"],
  highlights: [
    "Improve intent classification and slot filling for Alexa at global scale",
    "Partner with product on new multimodal experiences",
    "Ship models with latency budgets and continuous evaluation",
  ],
  positionDetail: {
    summary:
      "Research and deploy NLU models for Alexa—understanding, disambiguation, and dialog quality across locales and devices.",
    positionTeaser:
      "From offline experiments to live traffic: applied science with strict latency and customer impact metrics.",
    teamDomain: "Alexa Natural Language Understanding",
    locationType: "Hybrid · Seattle, WA",
    coreImpact:
      "Make Alexa more accurate, natural, and helpful for everyday requests worldwide.",
    requirementMatrix: structuredClone(nvidiaBase.positionDetail.requirementMatrix),
    roleOverview:
      "You will train and iterate on transformer and classical NLU components, design offline/online metrics, and work with engineering on efficient serving and safe rollouts.",
    responsibilities: [
      "Prototype and productionize NLU improvements with A/B validation.",
      "Collaborate on data pipelines, labeling, and active learning loops.",
      "Publish internal tech docs and partner with peer scientists on shared benchmarks.",
    ],
    requirements: [
      "PhD in CS/ML/linguistics or MS with 5+ years applied ML in industry.",
      "Strong Python and deep learning frameworks; track record shipping models.",
      "Experience with speech or conversational AI preferred.",
    ],
    niceToHave: ["Multilingual NLU.", "On-device or edge model optimization."],
    benefits: [
      "Competitive base and RSU.",
      "Healthcare and parental leave programs.",
      "Career Choice and internal mobility.",
    ],
    teamAndCulture:
      "Leadership principles and customer obsession; hybrid Seattle with flexible collaboration.",
    employmentType: "Full-time",
    seniority: "Senior Applied Scientist",
    location: "Seattle, WA · Hybrid",
    teamSize: "Scientists + 15–25 eng",
    postedAgo: "Posted 4 days ago",
  },
});

const amazonPrimePlayback = mergeCard(amazonShell(), {
  id: "amazon-sde-ii-prime-video-playback",
  roleTitle: "Software Development Engineer II, Prime Video Playback",
  roleMeta: "Prime Video · Seattle · Hybrid",
  compensation: "$170k-$240k · RSU",
  tags: ["Java", "Streaming", "CDN", "Reliability", "Live events"],
  highlights: [
    "Build playback services for live and VOD across devices worldwide",
    "Harden edge cases: DRM, concurrency spikes, and regional outages",
    "Partner with client teams on QoE metrics and experimentation",
  ],
  positionDetail: {
    summary:
      "Develop backend services powering Prime Video playback—manifests, entitlement, and resilience for high-profile live events.",
    positionTeaser:
      "SDE II scope with ownership of services customers feel on every play button press.",
    teamDomain: "Prime Video Playback",
    locationType: "Hybrid · Seattle, WA",
    coreImpact:
      "Deliver dependable playback experiences during peak sports and global premieres.",
    requirementMatrix: structuredClone(microsoftBase.positionDetail.requirementMatrix),
    roleOverview:
      "You’ll implement APIs consumed by apps and living room devices, improve caching and failover paths, and participate in on-call for owned services.",
    responsibilities: [
      "Design and code services for playback orchestration and entitlement checks.",
      "Improve observability, SLOs, and incident playbooks.",
      "Collaborate with CDN and client engineers on latency and rebuffer goals.",
    ],
    requirements: [
      "3+ years professional software development.",
      "Proficiency in Java or similar; distributed systems fundamentals.",
      "Interest in video streaming or high-scale consumer products.",
    ],
    niceToHave: ["HLS/DASH or DRM familiarity.", "Load testing and chaos engineering exposure."],
    benefits: [
      "Competitive base and RSU.",
      "Healthcare and parental leave programs.",
      "Prime and Amazon retail perks.",
    ],
    teamAndCulture:
      "Fast ownership culture; hybrid Seattle with operational excellence expectations.",
    employmentType: "Full-time",
    seniority: "SDE II",
    location: "Seattle, WA · Hybrid",
    teamSize: "10–16 engineers",
    postedAgo: "Posted 1 week ago",
  },
});

function metaShell(): CompanySwipeCard {
  const c = structuredClone(googleBase);
  c.companyName = "Meta";
  c.logoUrl = SWIPE_COMPANY_LOGO_PATHS.meta;
  c.companyTagline =
    "Meta builds technologies that help people connect, find communities, and grow businesses—from Facebook and Instagram to WhatsApp, Quest, and generative AI.";
  c.about =
    "Meta builds technologies that help people connect, find communities, and grow businesses—from Facebook and Instagram to WhatsApp, Quest, and generative AI.";
  c.companyMore =
    "Engineering culture emphasizes bold bets, infrastructure at planetary scale, and open collaboration across product and research.";
  c.facts = [
    { label: "Industry", value: "Social & AI" },
    { label: "Size", value: "70k+ employees" },
    { label: "HQ", value: "Menlo Park" },
  ];
  c.partnerHrs = SWIPE_PARTNER_HRS_META;
  return c;
}

const metaPeInstagram = mergeCard(metaShell(), {
  id: "meta-production-engineer-instagram-infra",
  roleTitle: "Production Engineer, Instagram Infrastructure",
  roleMeta: "Instagram · Menlo Park · Hybrid",
  compensation: "$210k-$320k · Equity",
  tags: ["Python", "C++", "Capacity", "Automation", "SRE"],
  highlights: [
    "Keep Instagram reliable for billions of daily actives",
    "Automate fleet management, deploys, and config safety",
    "Partner with product eng on performance and incident response",
  ],
  positionDetail: {
    summary:
      "Production engineering for Instagram—automation, capacity, config pipelines, and reliability programs across the stack.",
    positionTeaser:
      "Hybrid PE/SRE work at one of the world’s largest social surfaces.",
    teamDomain: "Instagram Infrastructure",
    locationType: "Hybrid · Menlo Park, CA",
    coreImpact:
      "Reduce incidents, toil, and latency regressions while enabling rapid product iteration.",
    requirementMatrix: structuredClone(googleBase.positionDetail.requirementMatrix),
    roleOverview:
      "You will build tooling and services that make safe changes at scale possible—job schedulers, rollout systems, and observability bridges between infra and product teams.",
    responsibilities: [
      "Design automation for provisioning, config changes, and rollback.",
      "Drive capacity planning and efficiency initiatives.",
      "Participate in incident command and long-term prevention work.",
      "Partner with SWE teams on service ownership and SLO alignment.",
    ],
    requirements: [
      "5+ years in production engineering, SRE, or backend infra roles.",
      "Strong coding skills in Python, C++, Hack, or similar.",
      "Comfort with high-scale distributed systems and on-call.",
    ],
    niceToHave: ["Experience with Meta-style PE tooling or large PHP/Hack stacks."],
    benefits: [
      "Competitive compensation and equity.",
      "Health, wellness, and family programs.",
      "On-site amenities and remote flexibility by team.",
    ],
    teamAndCulture:
      "Move fast with open internal collaboration; hybrid Menlo Park with global teammates.",
    employmentType: "Full-time",
    seniority: "Production Engineer",
    location: "Menlo Park, CA · Hybrid",
    teamSize: "12–20 engineers",
    postedAgo: "Posted 3 days ago",
  },
});

const metaRsLlama = mergeCard(metaShell(), {
  id: "meta-research-scientist-generative-ai-llama",
  roleTitle: "Research Scientist, Generative AI (Llama)",
  roleMeta: "FAIR · Menlo Park · Hybrid",
  compensation: "$250k-$400k · Equity",
  tags: ["LLMs", "PyTorch", "Pretraining", "Alignment", "Open research"],
  highlights: [
    "Advance Llama-family models from research to productizable milestones",
    "Publish and collaborate with the broader AI community",
    "Partner with infra on large-scale training efficiency",
  ],
  positionDetail: {
    summary:
      "Research next-generation Llama models—architecture, data, training efficiency, and safety/alignment techniques.",
    positionTeaser:
      "Core GenAI research with access to world-class clusters and cross-functional partners.",
    teamDomain: "Fundamental AI Research (FAIR) · Llama",
    locationType: "Hybrid · Menlo Park, CA",
    coreImpact:
      "Push the frontier of open and responsible large language models used across Meta products.",
    requirementMatrix: structuredClone(nvidiaBase.positionDetail.requirementMatrix),
    roleOverview:
      "You will propose experiments, run large training jobs, analyze scaling laws, and partner with product teams on evaluation harnesses and red-teaming feedback loops.",
    responsibilities: [
      "Lead research projects with clear hypotheses and reproducible results.",
      "Collaborate on datasets, evals, and post-training techniques.",
      "Mentor interns and junior researchers; contribute to publications where appropriate.",
    ],
    requirements: [
      "PhD in ML/NLP or equivalent research experience with strong publication or production record.",
      "Deep expertise in LLMs, transformers, or large-scale training.",
      "Proficiency in PyTorch and distributed training concepts.",
    ],
    niceToHave: ["Multimodal modeling.", "Hardware-aware optimization for training."],
    benefits: [
      "Competitive compensation and equity.",
      "Health, wellness, and family programs.",
      "Conference support and open publication culture.",
    ],
    teamAndCulture:
      "Research-led with product impact; hybrid Menlo Park with global research offices.",
    employmentType: "Full-time",
    seniority: "Research Scientist",
    location: "Menlo Park, CA · Hybrid",
    teamSize: "Research pod + partner eng",
    postedAgo: "Posted 5 days ago",
  },
});

function buildCompanyInput(slug: string, websiteUrl: string | undefined, cards: CompanySwipeCard[]): NewCompanyInput {
  const first = cards[0];
  return {
    slug,
    companyName: first.companyName,
    logoUrl: first.logoUrl,
    imageUrl: first.logoUrl,
    websiteUrl,
    industry: first.facts.find((f) => f.label === "Industry")?.value,
    description: first.about,
    companySize: "1000+",
    companyTagline: first.companyTagline,
    about: first.about,
    companyMore: first.companyMore,
    facts: first.facts,
    partnerHrs: first.partnerHrs,
    isActivelyHiring: true,
    positions: cards.map(companySwipeCardToDeckPosition),
  };
}

/** Five global technology employers × two open roles each for the swipe deck. */
export const MONGO_COMPANY_SEED_INPUTS: NewCompanyInput[] = [
  buildCompanyInput("apple", "https://jobs.apple.com", [appleSiliconPerf, applePrivacyAds]),
  buildCompanyInput("microsoft", "https://careers.microsoft.com", [microsoftAks, microsoftM365SecTpm]),
  buildCompanyInput("google", "https://careers.google.com", [googleSearchStaff, googleCloudAiPm]),
  buildCompanyInput("amazon", "https://www.amazon.jobs", [amazonAlexaNlu, amazonPrimePlayback]),
  buildCompanyInput("meta", "https://www.metacareers.com", [metaPeInstagram, metaRsLlama]),
];
