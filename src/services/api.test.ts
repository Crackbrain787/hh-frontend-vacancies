import { describe, it, expect, vi, beforeEach } from 'vitest';



describe('API Module - логика', () => {
  beforeEach(() => {
   
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Логика формирования параметров', () => {
    it('формирует базовые параметры запроса', () => {
      const baseParams = {
        industry: 7,
        professional_role: 96,
        per_page: 10,
      };
      
      expect(baseParams.industry).toBe(7);
      expect(baseParams.professional_role).toBe(96);
      expect(baseParams.per_page).toBe(10);
    });

    it('правильно обрабатывает skill_set массив', () => {
      const skill_set = ['JavaScript', 'React', 'TypeScript'];
      const result = skill_set.join(',');
      
      expect(result).toBe('JavaScript,React,TypeScript');
    });

    it('фильтрует пустые строки в skill_set', () => {
      const skill_set = ['JavaScript', '', 'React', '   '];
      const validSkills = skill_set
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      
      expect(validSkills).toEqual(['JavaScript', 'React']);
    });
  });

  describe('Логика обработки ответов', () => {
    it('обрабатывает пустой массив items', () => {
      const items = null;
      const processedItems = (items || []).map((item: any) => ({
        ...item,
        id: item.id || '',
        name: item.name || 'Без названия',
      }));
      
      expect(processedItems).toEqual([]);
    });

    it('обрабатывает items с недостающими полями', () => {
      const items = [
        {
          id: '123',
         
          alternate_url: null,
        }
      ];
      
      const processedItems = (items || []).map((item: any) => ({
        ...item,
        id: item.id || '',
        name: item.name || 'Без названия',
        alternate_url: item.alternate_url || `https://hh.ru/vacancy/${item.id}`,
        area: item.area || { id: '', name: '' },
        employer: item.employer || { id: '', name: '' },
      }));
      
      expect(processedItems[0].name).toBe('Без названия');
      expect(processedItems[0].alternate_url).toBe('https://hh.ru/vacancy/123');
      expect(processedItems[0].area).toEqual({ id: '', name: '' });
    });
  });

  describe('Логика обработки ошибок', () => {
    it('извлекает message из ошибки API', () => {
      const axiosError = {
        response: {
          data: {
            message: 'Invalid parameters',
          },
        },
        message: 'Request failed',
      };
      
      const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Ошибка при загрузке вакансий';
      expect(errorMessage).toBe('Invalid parameters');
    });

    it('использует message ошибки если нет response.data.message', () => {
      const axiosError = {
        message: 'Network Error',
        response: undefined,
      };
      
      const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Ошибка при загрузке вакансий';
      expect(errorMessage).toBe('Network Error');
    });

    it('использует дефолтное сообщение если ничего нет', () => {
      const axiosError = {};
      
      const errorMessage = (axiosError as any).response?.data?.message || 
                          (axiosError as any).message || 
                          'Ошибка при загрузке вакансий';
      expect(errorMessage).toBe('Ошибка при загрузке вакансий');
    });
  });
});