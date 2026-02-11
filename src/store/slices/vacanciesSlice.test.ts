import { describe, it, expect } from 'vitest';
import vacanciesReducer, {
  updateFilters,
  addSkill,
  removeSkill,
  resetFilters,
  setCurrentPage,
  loadVacancies,
} from './vacanciesSlice';
import type { VacanciesState } from '../../types/vacancy';

const initialState: VacanciesState = {
  vacancies: [],
  total: 0,
  totalPages: 0,
  currentPage: 0,
  loading: false,
  error: null,
  filters: {
    search: '',
    area: '',
    skills: ['TypeScript', 'React', 'Redux'],
    page: 0,
  },
};

describe('vacanciesSlice', () => {
  describe('reducers', () => {
    it('Начальное значение', () => {
      expect(vacanciesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('должен обрабатывать фильтры обновления', () => {
      const actual = vacanciesReducer(
        initialState,
        updateFilters({ search: 'Frontend', area: '1' })
      );
      expect(actual.filters.search).toBe('Frontend');
      expect(actual.filters.area).toBe('1');
      expect(actual.filters.skills).toEqual(['TypeScript', 'React', 'Redux']);
    });

    it('должен обрабатывать добавление скила', () => {
      const actual = vacanciesReducer(initialState, addSkill('Jest'));
      expect(actual.filters.skills).toContain('Jest');
      expect(actual.filters.skills).toHaveLength(4);
    });

    it('не следует добавлять дублирующий навык', () => {
      const stateWithSkill = vacanciesReducer(initialState, addSkill('Jest'));
      const actual = vacanciesReducer(stateWithSkill, addSkill('Jest'));
      expect(actual.filters.skills).toHaveLength(4);
      expect(actual.filters.skills.filter(skill => skill === 'Jest')).toHaveLength(1);
    });

    it('показывает удаление навыка', () => {
      const actual = vacanciesReducer(initialState, removeSkill('React'));
      expect(actual.filters.skills).not.toContain('React');
      expect(actual.filters.skills).toEqual(['TypeScript', 'Redux']);
    });

    it('должен обрабатывать сброс фильтров', () => {
      const modifiedState = vacanciesReducer(
        initialState,
        updateFilters({ search: 'Frontend', area: '1', skills: ['Vue'] })
      );
      const actual = vacanciesReducer(modifiedState, resetFilters());
      expect(actual.filters).toEqual(initialState.filters);
    });

    it('должен обрабатывать установленную текущую страницу', () => {
      const actual = vacanciesReducer(initialState, setCurrentPage(2));
      expect(actual.currentPage).toBe(2);
      expect(actual.filters.page).toBe(2);
    });
  });

  describe('дополнительные reducers', () => {
    it('В компоненте обрабатывается состояние загрузки (pending) от Redux thunk', () => {
      const action = { type: loadVacancies.pending.type };
      const state = vacanciesReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('Компонент обрабатывает успешное завершение загрузки вакансий (состояние fulfilled в Redux Toolkit).', () => {
      const mockResponse = {
        items: [
          {
            id: '1',
            name: 'Frontend Developer',
            salary: null,
            area: { id: '1', name: 'Москва' },
            employer: { id: '1', name: 'Company' },
            experience: { id: '1', name: '1-3 года' },
            employment: { id: '1', name: 'Полная занятость' },
            schedule: { id: '1', name: 'Удаленная работа' },
            key_skills: [],
            alternate_url: 'https://hh.ru/vacancy/1',
            published_at: '2024-01-01',
            snippet: { requirement: '', responsibility: '' },
          },
        ],
        found: 1,
        pages: 1,
        page: 0,
        per_page: 10,
      };

      const action = {
        type: loadVacancies.fulfilled.type,
        payload: mockResponse,
      };

      const state = vacanciesReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.vacancies).toEqual(mockResponse.items);
      expect(state.total).toBe(1);
      expect(state.totalPages).toBe(1);
      expect(state.currentPage).toBe(0);
    });

    it('компонент обрабатывает состояние ошибки при загрузке вакансий', () => {
      const errorMessage = 'Network error';
      const action = {
        type: loadVacancies.rejected.type,
        payload: errorMessage,
      };

      const state = vacanciesReducer(initialState, action);
      
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.vacancies).toEqual([]);
    });
  });
});
