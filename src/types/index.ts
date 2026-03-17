// Shared literals for job/role level and employment type
export type Seniority = "any" | "junior" | "mid" | "senior" | "lead" | "principal"
export type EmploymentType = "any" | "full-time" | "part-time" | "contract" | "freelance"
export type WorkPreference = "any" | "remote" | "hybrid" | "onsite"

export type PriorityPreference =
  | "High salary"
  | "Remote work"
  | "Flexible hours"
  | "Work-life balance"
  | "Fast growth"
  | "Learning & mentorship"
  | "Stability"
  | "Great team / culture"
  | "Interesting product"
  | "Strong tech stack"
  | "Impact / ownership"
  | "Equity upside"

export type CompensationPreference =
  | "Performance bonus"
  | "Revenue share / commission"
  | "Equity / stock options"
  | "Signing bonus"
  | "Profit sharing"
  | "Retention bonus"
  | "Tips / variable earnings"
  | "Overtime pay"
  | "Benefits (health, pension, etc.)"
  | "Flexible compensation (choose your mix)"
  | "Not important"

export interface Address {
  addressLine1?: string
  addressLine2?: string
  city?: string
  stateRegion?: string
  postalCode?: string
  country?: string
}

export interface JobPosition {
  id: string

  // Job information
  industry: string
  departments?: string[]
  seniority: Seniority
  employmentType: EmploymentType

  // Location
  country?: string
  city?: string
  workPreference: WorkPreference

  // Job content
  shortDescription?: string
  responsibilities?: string[]
  requirements?: string[]
  skillsRequired?: string[]

  // Compensation
  salaryMin?: number
  salaryMax?: number
  currency?: string
  equity?: boolean

  // Hiring
  applicationUrl?: string
}

export interface Experience {
  id: string

  // Job
  companyName: string
  jobTitle: string
  industry?: string
  employmentType: EmploymentType

  // When
  yearsInCompany?: number

  // Where
  country?: string
  city?: string
  workPreference?: WorkPreference

  // What
  description?: string
  responsibilities?: string[]
  skillsUsed?: string[]
}

export interface TalentDetails {
  id: string
  type: "talent"

  // Identity
  firstName: string
  lastName: string
  fullName: string
  avatarUrl: string
  imageUrl: string
  backgroundColor: string

  // Professional
  role: string
  headline?: string
  yearsOfExperience: number
  employmentPreference: EmploymentType

  // Location (talent's preference)
  country?: string
  city?: string
  workPreference: WorkPreference

  // Profile
  bio: string
  skills: string[]
  languages?: string[]

  // Compensation
  expectedSalaryMin?: number
  expectedSalaryMax?: number
  currency?: string

  // Links
  linkedinUrl?: string
  portfolioUrl?: string
  resumeUrl?: string
  githubUrl?: string

  // Contact
  email: string
  phoneNumber: string
  address?: Address

  // Availability
  availableForWork: boolean
  availableFrom?: string
  noticePeriodWeeks?: number

  // Preferences (step 1)
  priorities?: PriorityPreference[]
  compensationPreferences?: CompensationPreference[]

  // Current / desired position (single)
  jobPosition: JobPosition

  // Past jobs
  experiences?: Experience[]

  // Meta
  isVerified?: boolean
  tags?: string[]
  matchScore?: number
}

export interface CompanyDetails {
  id: string
  type: "company"

  // Identity
  companyName: string
  logoUrl: string
  imageUrl: string
  backgroundColor: string
  websiteUrl?: string

  // Contact
  email?: string
  phoneNumber?: string
  address?: Address

  // Company info
  industry?: string
  description?: string
  companySize?: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+"
  foundedYear?: number

  // Hiring
  isActivelyHiring?: boolean

  // Open positions
  positions: JobPosition[]

  // Meta
  tags?: string[]
  matchScore?: number
}

// -----------------------------
// Registration step payloads
// -----------------------------

export type TalentDetailsDraft = Partial<TalentDetails> & { type: "talent"; id: string }
export type CompanyDetailsDraft = Partial<CompanyDetails> & { type: "company"; id: string }

export interface JobSeekerStep0Data {
  jobPosition: Omit<JobPosition, "id">
  availability?: string
  priorities?: PriorityPreference[]
  compensationPreferences?: CompensationPreference[]
}

export interface JobSeekerCvParsedData {
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  country: string | null
  city: string | null
  bio: string | null
  linkedin: string | null
  portfolio: string | null
  github: string | null
  resumeUrl: null
  experience: Array<{
    companyName: string | null
    industry: string | null
    years: string | null
    role: string | null
  }>
  skills: string[]
  languages: string[]
}

export interface JobSeekerStep1Data {
  agreedToCvExtraction: boolean
  cvFileName?: string
  parsed?: JobSeekerCvParsedData
}

export interface JobSeekerStep2Data {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  bio: string
  address?: Pick<Address, "city" | "country">
  linkedinUrl?: string
  portfolioUrl?: string
  githubUrl?: string
  resumeUrl?: string
  skills: string[]
  languages?: string[]
  experiences?: Array<Pick<Experience, "companyName" | "jobTitle" | "industry" | "yearsInCompany">>
}

export interface EmployerStep0Data {
  companyName: string
  industry?: string
  websiteUrl?: string
}

export interface EmployerStep1Data {
  positions: Array<Omit<JobPosition, "id">>
}
