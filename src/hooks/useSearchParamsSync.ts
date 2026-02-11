import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { updateFilters } from '../store/slices/vacanciesSlice';

export const useSearchParamsSync = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.vacancies);
  const [searchParams, setSearchParams] = useSearchParams();

  // Синхронизация из URL в Redux при загрузке страницы
  useEffect(() => {
    const text = searchParams.get('text') || '';
    const area = searchParams.get('area') || '';
    const skillsParam = searchParams.get('skills');
    const skills = skillsParam ? skillsParam.split(',').filter(Boolean) : [];
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam) - 1 : 0;
    
    dispatch(updateFilters({
      search: text,
      area: area,
      skills: skills,
      page: page,
    }));
  }, [dispatch, searchParams]);

  // Функция для обновления URL при изменении фильтров
  const updateSearchParams = useCallback((updates: {
    text?: string;
    area?: string;
    skills?: string[];
    page?: number;
  }) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (updates.text !== undefined) {
      if (updates.text) {
        newParams.set('text', updates.text);
      } else {
        newParams.delete('text');
      }
    }
    
    if (updates.area !== undefined) {
      if (updates.area) {
        newParams.set('area', updates.area);
      } else {
        newParams.delete('area');
      }
    }
    
    if (updates.skills !== undefined) {
      if (updates.skills.length > 0) {
        newParams.set('skills', updates.skills.join(','));
      } else {
        newParams.delete('skills');
      }
    }
    
    if (updates.page !== undefined) {
      if (updates.page > 0) {
        newParams.set('page', (updates.page + 1).toString());
      } else {
        newParams.delete('page');
      }
    }
    
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Синхронизация из Redux в URL при изменении фильтров
  useEffect(() => {
    updateSearchParams({
      text: filters.search,
      area: filters.area,
      skills: filters.skills,
      page: filters.page
    });
  }, [filters.search, filters.area, filters.skills, filters.page, updateSearchParams]);

  return { searchParams, updateSearchParams };
};