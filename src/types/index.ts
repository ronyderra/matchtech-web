// Shared literals for job/role level and employment type
export type Seniority = "any" | "junior" | "mid" | "senior" | "lead" | "principal"
export type EmploymentType = "any" | "full-time" | "part-time" | "contract" | "freelance"
export type WorkPreference = "any" | "remote" | "hybrid" | "onsite"

export interface JobPosition {
  id: string

  // Job information
  industry: string
  department?: string
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
  department?: string
  employmentType: EmploymentType

  // When
  startDate: string
  endDate?: string
  isCurrent?: boolean

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
  industries?: string[]

  // Compensation
  expectedSalaryMin?: number
  expectedSalaryMax?: number
  currency?: string

  // Links
  linkedinUrl?: string
  portfolioUrl?: string
  resumeUrl?: string
  githubUrl?: string

  // Availability
  availableForWork: boolean
  availableFrom?: string
  noticePeriodWeeks?: number

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

  // Company info
  industry?: string
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
