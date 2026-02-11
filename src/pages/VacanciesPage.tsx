import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { updateFilters, setCurrentPage } from '../store/slices/vacanciesSlice';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SkillsAndCityFilter from '../components/SkillsAndCityFilter';
import VacanciesList from '../components/VacanciesList';

const VacanciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.vacancies.filters);

  
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlCity = searchParams.get('city') || '';
    const urlSkills = searchParams.getAll('skill');
    const urlPage = parseInt(searchParams.get('page') || '0', 10);

    const newFilters: Partial<typeof filters> = {};

    if (urlSearch !== filters.search) newFilters.search = urlSearch;
    if (urlCity !== filters.area) newFilters.area = urlCity;
    if (urlSkills.length) newFilters.skills = urlSkills;
    if (!isNaN(urlPage) && urlPage !== filters.page) {
      newFilters.page = urlPage;
    }

    if (Object.keys(newFilters).length > 0) {
      dispatch(updateFilters(newFilters));
      if (newFilters.page !== undefined) {
        dispatch(setCurrentPage(newFilters.page));
      }
    }
  }, []); // eslint-disable-line

 
  const syncUrlWithFilters = useCallback(() => {
    setSearchParams((prev) => {
      prev.delete('search');
      prev.delete('city');
      prev.delete('page');
      prev.delete('skill');

      if (filters.search) prev.set('search', filters.search);
      if (filters.area) prev.set('city', filters.area);
      if (filters.page > 0) prev.set('page', String(filters.page));
      filters.skills.forEach((skill) => prev.append('skill', skill));

      return prev;
    });
  }, [filters, setSearchParams]);

  return (
    <>
      <Header />
      <HeroSection onSearchSubmit={syncUrlWithFilters} />
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', paddingTop: '24px' }}>
        <div style={{ position: 'absolute', top: '24px', left: '220px', width: '317px' }}>
          <SkillsAndCityFilter onFilterChange={syncUrlWithFilters} />
        </div>
        <div style={{ position: 'absolute', top: '24px', left: '561px', width: '659px' }}>
          <VacanciesList onPageChange={syncUrlWithFilters} />
        </div>
      </div>
    </>
  );
};

export default VacanciesPage;