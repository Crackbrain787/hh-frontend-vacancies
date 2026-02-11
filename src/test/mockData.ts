import type { Vacancy } from '../types/vacancy';

export const mockVacancies: Vacancy[] = [
  {
    id: '1',
    name: 'Frontend Developer',
    area: {
      id: '1',
      name: 'Москва',
    },
    employer: {
      id: '100',
      name: 'Test Company',
    },
    salary: { from: 100000, to: 200000, currency: 'RUR', gross: true },
    snippet: {
      requirement: 'React',
      responsibility: 'UI development',
    },
    published_at: '2024-01-01',
    experience: {
      id: 'between1And3',
      name: '1–3 года',
    },
    employment: {
      id: 'full',
      name: 'Полная занятость',
    },
    schedule: {
      id: 'fullDay',
      name: 'Полный день',
    },
    key_skills: [
      { name: 'React' },
      { name: 'TypeScript' },
    ],
    alternate_url: 'https://hh.ru/vacancy/1',
  },
];