export interface Salary {
  from: number | null;
  to: number | null;
  currency: string;
  gross: boolean;
}

export interface Area {
  id: string;
  name: string;
}

export interface Employer {
  id: string;
  name: string;
  logo_urls?: {
    original: string;
    '240': string;
    '90': string;
  };
  url?: string;
  alternate_url?: string;
  trusted?: boolean;
}

export interface Experience {
  id: string;
  name: string;
}

export interface Employment {
  id: string;
  name: string;
}

export interface Schedule {
  id: string;
  name: string;
}

export interface KeySkill {
  name: string;
}

export interface Snippet {
  requirement?: string;
  responsibility?: string;
}


export interface ProfessionalRole {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Address {
  city: string;
  street: string;
  building: string;
  description?: string;
  lat?: number;
  lng?: number;
  raw?: string;
}

export interface Phone {
  comment?: string;
  city: string;
  number: string;
  country: string;
}

export interface Contacts {
  name: string;
  email: string;
  phones: Phone[];
}

export interface InsiderInterview {
  id: string;
  url: string;
}

export interface VacancyType {
  id: string;
  name: string;
}

export interface WorkingDay {
  id: string;
  name: string;
}

export interface WorkingTimeInterval {
  id: string;
  name: string;
}

export interface WorkingTimeMode {
  id: string;
  name: string;
}

export interface Relation {
  id: string;
  name: string;
 
}

export interface Brand {
  id: string;
  name: string;
  
}

export interface Vacancy {
  id: string;
  name: string;
  salary: Salary | null;
  area: Area;
  employer: Employer;
  experience: Experience;
  employment: Employment;
  schedule: Schedule;
  key_skills: KeySkill[];
  alternate_url: string;
  published_at: string;
  snippet: Snippet;
  
 
  type?: VacancyType;
  has_test?: boolean;
  response_letter_required?: boolean;
  response_url?: string | null;
  sort_point_distance?: number | null;
  professional_roles?: ProfessionalRole[];
  address?: Address | null;
  archived?: boolean;
  apply_alternate_url?: string;
  department?: Department | null;
  contacts?: Contacts | null;
  description?: string;
  accept_temporary?: boolean;
  code?: string | null;
  created_at?: string;
  insider_interview?: InsiderInterview | null;
  premium?: boolean;
  relations?: Relation[];
  brand?: Brand;
  suitable_resumes_url?: string | null;
  working_days?: WorkingDay[];
  working_time_intervals?: WorkingTimeInterval[];
  working_time_modes?: WorkingTimeMode[];
}

export interface Cluster {
  name: string;
  id: string;
  
}

export interface Argument {
  name: string;
  
}

export interface VacanciesResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
  clusters?: Cluster[];
  arguments?: Argument[];
  alternate_url?: string;
  error?: string;
}

export interface VacancyFilters {
  search: string;
  area: string;
  skills: string[];
  page: number;
}

export interface VacanciesState {
  vacancies: Vacancy[];
  total: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  currentVacancy: Vacancy | null; 
  vacancyLoading: boolean; 
  vacancyError: string | null; 
  filters: VacancyFilters;
}