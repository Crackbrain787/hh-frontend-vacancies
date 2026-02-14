import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { updateFilters, setCurrentPage, loadVacancies } from '../store/slices/vacanciesSlice';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SkillsAndCityFilter from '../components/SkillsAndCityFilter';
import VacanciesList from '../components/VacanciesList';

const VacanciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.vacancies.filters);

  const isUpdatingFromUrl = useRef(false);

useEffect(() => {
    const hasInitialized = sessionStorage.getItem('filtersInitialized');
    // Если инициализация ещё не выполнялась и URL пуст
    if (!hasInitialized && searchParams.toString() === '') {
      // Устанавливаем дефолтные навыки и страницу в URL
      setSearchParams({
        skill: ['TypeScript', 'React', 'Redux'],
        page: '0'
      });
      // Немедленно загружаем вакансии с этими навыками
      dispatch(loadVacancies({
        text: 'TypeScript React Redux',
        area: undefined,
        page: 0,
      }));
      // Запоминаем, что инициализация выполнена
      sessionStorage.setItem('filtersInitialized', 'true');
    }
  }, []); // Пустой массив – выполняется только при монтировании

  // Эффект для сброса поискового запроса при перезагрузке
useEffect(() => {
  // Проверяем, есть ли параметр search в URL
  if (searchParams.has('search')) {
    // Создаём новый объект параметров без search
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    // Обновляем URL – это вызовет эффект URL→Redux и загрузит вакансии без поиска
    setSearchParams(newParams);
  }
}, []); // Только при монтировании

  // Эффект 1: URL -> Redux
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlCity = searchParams.get('city') || '';
    const urlSkills = searchParams.getAll('skill');
    const urlPage = parseInt(searchParams.get('page') || '0', 10);

    const newFilters: Partial<typeof filters> = {};
    if (urlSearch !== filters.search) newFilters.search = urlSearch;
    if (urlCity !== filters.area) newFilters.area = urlCity;
    if (JSON.stringify([...urlSkills].sort()) !== JSON.stringify([...filters.skills].sort())) {
      newFilters.skills = urlSkills;
    }
    if (!isNaN(urlPage) && urlPage !== filters.page) newFilters.page = urlPage;

    if (Object.keys(newFilters).length > 0) {
      isUpdatingFromUrl.current = true;
      dispatch(updateFilters(newFilters));
      if (newFilters.page !== undefined) {
        dispatch(setCurrentPage(newFilters.page));
      }

      // После обновления фильтров загружаем вакансии
      const searchParts = [];
      // Берём значения из newFilters, если они есть, иначе из текущих filters
      const newSearch = newFilters.search !== undefined ? newFilters.search : filters.search;
      const newArea = newFilters.area !== undefined ? newFilters.area : filters.area;
      const newSkills = newFilters.skills !== undefined ? newFilters.skills : filters.skills;
      const newPage = newFilters.page !== undefined ? newFilters.page : filters.page;

      if (newSearch?.trim()) {
        searchParts.push(newSearch.trim());
      }
      if (newSkills.length > 0) {
        searchParts.push(...newSkills);
      }
      const searchText = searchParts.length > 0 ? searchParts.join(' ') : undefined;

      dispatch(loadVacancies({
        text: searchText,
        area: newArea || undefined,
        page: newPage,
      }));

      setTimeout(() => {
        isUpdatingFromUrl.current = false;
      }, 0);
    }
  }, [searchParams]); // не включаем filters, чтобы избежать цикла

  // Эффект 2: Redux -> URL
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;

    const params = new URLSearchParams(searchParams);
    let changed = false;

    const updateParam = (key: string, value: string | null) => {
      const current = params.get(key);
      if (!value) {
        if (current !== null) {
          params.delete(key);
          changed = true;
        }
      } else {
        if (current !== value) {
          params.set(key, value);
          changed = true;
        }
      }
    };

    updateParam('search', filters.search || null);
    updateParam('city', filters.area || null);
    updateParam('page', filters.page > 0 ? String(filters.page) : null);

    const currentSkills = params.getAll('skill');
    const newSkills = filters.skills;
    if (JSON.stringify(currentSkills.sort()) !== JSON.stringify([...newSkills].sort())) {
      params.delete('skill');
      newSkills.forEach(skill => params.append('skill', skill));
      changed = true;
    }

    if (changed) {
      setSearchParams(params);
    }
  }, [filters, searchParams, setSearchParams]);

  return (
    <>
      <Header />
      <HeroSection />
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', paddingTop: '24px' }}>
        <div style={{ position: 'absolute', top: '24px', left: '220px', width: '317px' }}>
          <SkillsAndCityFilter />
        </div>
        <div style={{ position: 'absolute', top: '24px', left: '561px', width: '659px' }}>
          <VacanciesList />
        </div>
      </div>
    </>
  );
};

export default VacanciesPage;