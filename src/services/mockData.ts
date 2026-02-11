import { Vacancy } from '../types/vacancy';

export const mockVacancies: Vacancy[] = [
  {
    id: '1',
    name: 'Frontend Developer (React)',
    salary: {
      from: 150000,
      to: 250000,
      currency: 'RUR',
      gross: true,
    },
    area: { id: '1', name: 'Москва' },
    employer: {
      id: '123',
      name: 'TechCorp',
      logo_urls: {
        90: 'https://via.placeholder.com/90',
        240: 'https://via.placeholder.com/240',
        original: 'https://via.placeholder.com/300',
      },
    },
    experience: { id: 'between1And3', name: '1–3 года' },
    employment: { id: 'full', name: 'Полная занятость' },
    schedule: { id: 'remote', name: 'Удаленная работа' },
    key_skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Redux' },
    ],
    alternate_url: 'https://hh.ru/vacancy/1',
    published_at: '2024-01-15T10:30:00+0300',
    snippet: {
      requirement: 'Опыт разработки на React от 2 лет...',
      responsibility: 'Разработка пользовательских интерфейсов...',
    },
  
  },
  {
    id: '96012817',
    name: 'Senior Frontend Developer',
    salary: {
      from: 300000,
      to: 450000,
      currency: 'RUR',
      gross: true,
    },
    area: {
      id: '2',
      name: 'Санкт-Петербург',
    },
    employer: {
      id: '15478',
      name: 'VK',
      logo_urls: {
        original: 'https://hh.ru/employer-logo-original/15478',
        '240': 'https://hh.ru/employer-logo/240/15478',
        '90': 'https://hh.ru/employer-logo/90/15478',
      },
    },
    experience: {
      id: 'between3And6',
      name: '3–6 лет',
    },
    employment: {
      id: 'full',
      name: 'Полная занятость',
    },
    schedule: {
      id: 'hybrid',
      name: 'Гибридный график',
    },
    key_skills: [
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Redux Toolkit' },
      { name: 'Next.js' },
      { name: 'GraphQL' },
    ],
    alternate_url: 'https://hh.ru/vacancy/96012817',
    published_at: '2024-01-14T14:30:00+0300',
    snippet: {
      requirement: 'Опыт работы от 3 лет. Глубокое понимание React и экосистемы.',
      responsibility: 'Разработка архитектуры фронтенд приложений.',
    },
  },
  {
    id: '95943762',
    name: 'Frontend Developer (Middle)',
    salary: {
      from: 180000,
      to: null,
      currency: 'RUR',
      gross: false,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    employer: {
      id: '45678',
      name: 'Тинькофф',
    },
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
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Vue.js' },
      { name: 'Webpack' },
    ],
    alternate_url: 'https://hh.ru/vacancy/95943762',
    published_at: '2024-01-13T09:15:00+0300',
    snippet: {
      requirement: 'Знание React или Vue.js.',
      responsibility: 'Разработка клиентской части приложений.',
    },
  },
  {
    id: '96012345',
    name: 'Junior Frontend Developer',
    salary: {
      from: 80000,
      to: 120000,
      currency: 'RUR',
      gross: false,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    employer: {
      id: '78901',
      name: 'Сбер',
    },
    experience: {
      id: 'noExperience',
      name: 'Нет опыта',
    },
    employment: {
      id: 'full',
      name: 'Полная занятость',
    },
    schedule: {
      id: 'remote',
      name: 'Удаленная работа',
    },
    key_skills: [
      { name: 'JavaScript' },
      { name: 'HTML/CSS' },
      { name: 'React' },
    ],
    alternate_url: 'https://hh.ru/vacancy/96012345',
    published_at: '2024-01-12T11:20:00+0300',
    snippet: {
      requirement: 'Базовые знания JavaScript, HTML, CSS.',
      responsibility: 'Помощь в разработке интерфейсов.',
    },
  },
  {
    id: '95987654',
    name: 'React Developer',
    salary: {
      from: 200000,
      to: 350000,
      currency: 'RUR',
      gross: true,
    },
    area: {
      id: '2',
      name: 'Санкт-Петербург',
    },
    employer: {
      id: '23456',
      name: 'Газпром',
    },
    experience: {
      id: 'between3And6',
      name: '3–6 лет',
    },
    employment: {
      id: 'full',
      name: 'Полная занятость',
    },
    schedule: {
      id: 'hybrid',
      name: 'Гибридный график',
    },
    key_skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Redux' },
      { name: 'Jest' },
    ],
    alternate_url: 'https://hh.ru/vacancy/95987654',
    published_at: '2024-01-11T16:45:00+0300',
    snippet: {
      requirement: 'Опыт разработки на React от 3 лет.',
      responsibility: 'Разработка SPA приложений.',
    },
  },
  {
    id: '96011111',
    name: 'Frontend Team Lead',
    salary: {
      from: 400000,
      to: 600000,
      currency: 'RUR',
      gross: true,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    employer: {
      id: '34567',
      name: 'Ozon',
    },
    experience: {
      id: 'moreThan6',
      name: 'Более 6 лет',
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
      { name: 'Team Leadership' },
      { name: 'Architecture' },
    ],
    alternate_url: 'https://hh.ru/vacancy/96011111',
    published_at: '2024-01-10T14:10:00+0300',
    snippet: {
      requirement: 'Опыт руководства командой от 2 лет.',
      responsibility: 'Руководство командой фронтенд разработчиков.',
    },
  },
  {
    id: '96022222',
    name: 'Vue.js Developer',
    salary: {
      from: 150000,
      to: 250000,
      currency: 'RUR',
      gross: false,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    employer: {
      id: '45678',
      name: 'Wildberries',
    },
    experience: {
      id: 'between1And3',
      name: '1–3 года',
    },
    employment: {
      id: 'full',
      name: 'Полная занятость',
    },
    schedule: {
      id: 'remote',
      name: 'Удаленная работа',
    },
    key_skills: [
      { name: 'Vue.js' },
      { name: 'JavaScript' },
      { name: 'Vuex' },
      { name: 'Nuxt.js' },
    ],
    alternate_url: 'https://hh.ru/vacancy/96022222',
    published_at: '2024-01-09T10:30:00+0300',
    snippet: {
      requirement: 'Опыт работы с Vue.js от 1 года.',
      responsibility: 'Разработка клиентской части на Vue.js.',
    },
  },
  {
    id: '96033333',
    name: 'Angular Developer',
    salary: {
      from: 180000,
      to: 280000,
      currency: 'RUR',
      gross: true,
    },
    area: {
      id: '2',
      name: 'Санкт-Петербург',
    },
    employer: {
      id: '56789',
      name: 'VK',
    },
    experience: {
      id: 'between3And6',
      name: '3–6 лет',
    },
    employment: {
      id: 'full',
      name: 'Полная занятость',
    },
    schedule: {
      id: 'hybrid',
      name: 'Гибридный график',
    },
    key_skills: [
      { name: 'Angular' },
      { name: 'TypeScript' },
      { name: 'RxJS' },
      { name: 'NgRx' },
    ],
    alternate_url: 'https://hh.ru/vacancy/96033333',
    published_at: '2024-01-08T09:15:00+0300',
    snippet: {
      requirement: 'Опыт разработки на Angular от 3 лет.',
      responsibility: 'Разработка корпоративных приложений.',
    },
  },
  {
    id: '96044444',
    name: 'Fullstack Developer (Node.js + React)',
    salary: {
      from: 250000,
      to: 400000,
      currency: 'RUR',
      gross: true,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    employer: {
      id: '67890',
      name: 'Yandex',
    },
    experience: {
      id: 'between3And6',
      name: '3–6 лет',
    },
    employment: {
      id: 'full',
      name: 'Полная занятость',
    },
    schedule: {
      id: 'remote',
      name: 'Удаленная работа',
    },
    key_skills: [
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'TypeScript' },
      { name: 'PostgreSQL' },
    ],
    alternate_url: 'https://hh.ru/vacancy/96044444',
    published_at: '2024-01-07T13:40:00+0300',
    snippet: {
      requirement: 'Опыт fullstack разработки от 3 лет.',
      responsibility: 'Разработка полного цикла приложений.',
    },
  },
  {
    id: '96055555',
    name: 'Frontend Architect',
    salary: {
      from: 500000,
      to: 800000,
      currency: 'RUR',
      gross: true,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    employer: {
      id: '78901',
      name: 'Tinkoff',
    },
    experience: {
      id: 'moreThan6',
      name: 'Более 6 лет',
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
      { name: 'Architecture' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Microfrontends' },
    ],
    alternate_url: 'https://hh.ru/vacancy/96055555',
    published_at: '2024-01-06T15:20:00+0300',
    snippet: {
      requirement: 'Опыт проектирования архитектуры от 5 лет.',
      responsibility: 'Проектирование архитектуры фронтенд приложений.',
    },
  },
];

export const mockVacanciesResponse = {
  items: mockVacancies,
  found: mockVacancies.length,
  pages: Math.ceil(mockVacancies.length / 7),
  page: 0,
  per_page: 7,
};