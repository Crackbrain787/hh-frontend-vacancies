import axios, { AxiosError } from 'axios';
import { VacanciesResponse, Vacancy } from '../types/vacancy';

const API_BASE_URL = 'https://api.hh.ru/vacancies';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'User-Agent': 'hh-frontend-vacancies/1.0',
    'Accept': 'application/json',
  },
});

export interface FetchVacanciesParams {
  text?: string;
  area?: string;
  skill_set?: string[];
  page?: number;
  per_page?: number;
}

interface ApiError {
  message?: string;
  description?: string;
  errors?: Array<{ type: string; value: string }>;
}

type RequestParams = Record<string, string | number | string[] | undefined>;

interface RawVacancy {
  id?: string;
  name?: string;
  alternate_url?: string;
  area?: {
    id?: string;
    name?: string;
  } | null;
  employer?: {
    id?: string;
    name?: string;
    logo_urls?: {
      original?: string;
      '240'?: string;
      '90'?: string;
    };
    url?: string;
    alternate_url?: string;
    trusted?: boolean;
  } | null;
  experience?: {
    id?: string;
    name?: string;
  } | null;
  employment?: {
    id?: string;
    name?: string;
  } | null;
  schedule?: {
    id?: string;
    name?: string;
  } | null;
  key_skills?: Array<{ name: string }>;
  snippet?: {
    requirement?: string;
    responsibility?: string;
  } | null;
  salary?: {
    from?: number | null;
    to?: number | null;
    currency?: string;
    gross?: boolean;
  } | null;
  published_at?: string;
  description?: string;
}

interface HhApiResponse {
  items: RawVacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
}

export const fetchVacancies = async (
  params: FetchVacanciesParams
): Promise<VacanciesResponse> => {
  try {
    const queryParams: RequestParams = {
      per_page: params.per_page || 10,
    };

    if (params.text?.trim()) {
      queryParams.text = params.text.trim();
      queryParams.search_field = ['name', 'company_name'];
    }

    if (params.area?.trim()) {
      queryParams.area = params.area.trim();
    }

    if (params.page !== undefined) {
      queryParams.page = params.page;
    }

    if (params.skill_set?.length) {
      const skills = Array.from(
        new Set(params.skill_set.filter((s) => s && s.trim()))
      ).map((s) => s.trim());
      if (skills.length) {
        queryParams.skill_set = skills.join(',');
      }
    }

    const response = await api.get<HhApiResponse>('', {
      params: queryParams,
    });

    const items: Vacancy[] = (response.data.items || []).map((item) => ({
      id: item.id || '',
      name: item.name || 'Без названия',
      alternate_url: item.alternate_url || `https://hh.ru/vacancy/${item.id}`,
      area: item.area
        ? {
            id: item.area.id ?? '',
            name: item.area.name ?? '',
          }
        : { id: '', name: '' },
      employer: item.employer
        ? {
            id: item.employer.id ?? '',
            name: item.employer.name ?? '',
            logo_urls: item.employer.logo_urls
              ? {
                  original: item.employer.logo_urls.original ?? '',
                  '240': item.employer.logo_urls['240'] ?? '',
                  '90': item.employer.logo_urls['90'] ?? '',
                }
              : undefined,
            url: item.employer.url,
            alternate_url: item.employer.alternate_url,
            trusted: item.employer.trusted,
          }
        : { id: '', name: '' },
      experience: item.experience
        ? {
            id: item.experience.id ?? '',
            name: item.experience.name ?? '',
          }
        : { id: '', name: '' },
      employment: item.employment
        ? {
            id: item.employment.id ?? '',
            name: item.employment.name ?? '',
          }
        : { id: '', name: '' },
      schedule: item.schedule
        ? {
            id: item.schedule.id ?? '',
            name: item.schedule.name ?? '',
          }
        : { id: '', name: '' },
      key_skills: item.key_skills || [],
      snippet: item.snippet
        ? {
            requirement: item.snippet.requirement ?? '',
            responsibility: item.snippet.responsibility ?? '',
          }
        : { requirement: '', responsibility: '' },
      salary: item.salary
        ? {
            from: item.salary.from ?? null,
            to: item.salary.to ?? null,
            currency: item.salary.currency ?? '',
            gross: item.salary.gross ?? false,
          }
        : null,
      published_at: item.published_at || '',
    }));

    return {
      items,
      found: response.data.found || 0,
      pages: response.data.pages || 0,
      page: response.data.page || 0,
      per_page: response.data.per_page || 10,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return {
      items: [],
      found: 0,
      pages: 0,
      page: 0,
      per_page: params.per_page || 10,
      error:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Ошибка при загрузке вакансий',
    };
  }
};

export const fetchVacancyById = async (id: string): Promise<Vacancy> => {
  try {
    const response = await api.get<RawVacancy>(`/${id}`);
    const item = response.data;

    const vacancy: Vacancy = {
      id: item.id || '',
      name: item.name || 'Без названия',
      alternate_url: item.alternate_url || `https://hh.ru/vacancy/${item.id}`,
      area: item.area
        ? {
            id: item.area.id ?? '',
            name: item.area.name ?? '',
          }
        : { id: '', name: '' },
      employer: item.employer
        ? {
            id: item.employer.id ?? '',
            name: item.employer.name ?? '',
            logo_urls: item.employer.logo_urls
              ? {
                  original: item.employer.logo_urls.original ?? '',
                  '240': item.employer.logo_urls['240'] ?? '',
                  '90': item.employer.logo_urls['90'] ?? '',
                }
              : undefined,
            url: item.employer.url,
            alternate_url: item.employer.alternate_url,
            trusted: item.employer.trusted,
          }
        : { id: '', name: '' },
      experience: item.experience
        ? {
            id: item.experience.id ?? '',
            name: item.experience.name ?? '',
          }
        : { id: '', name: '' },
      employment: item.employment
        ? {
            id: item.employment.id ?? '',
            name: item.employment.name ?? '',
          }
        : { id: '', name: '' },
      schedule: item.schedule
        ? {
            id: item.schedule.id ?? '',
            name: item.schedule.name ?? '',
          }
        : { id: '', name: '' },
      key_skills: item.key_skills || [],
      snippet: item.snippet
        ? {
            requirement: item.snippet.requirement ?? '',
            responsibility: item.snippet.responsibility ?? '',
          }
        : { requirement: '', responsibility: '' },
      salary: item.salary
        ? {
            from: item.salary.from ?? null,
            to: item.salary.to ?? null,
            currency: item.salary.currency ?? '',
            gross: item.salary.gross ?? false,
          }
        : null,
      published_at: item.published_at || '',
      description: item.description || '',
    };

    return vacancy;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    throw new Error(
      axiosError.response?.data?.message ||
        axiosError.message ||
        'Ошибка при загрузке вакансии'
    );
  }
};

export default api;
