import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { updateFilters, setCurrentPage } from '../store/slices/vacanciesSlice';

const HeroSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.vacancies.filters);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== filters.search) {
      inputRef.current.value = filters.search;
    }
  }, [filters.search]);

  const handleSearchSubmit = () => {
    const searchValue = inputRef.current?.value || '';
    dispatch(updateFilters({ search: searchValue }));
    dispatch(setCurrentPage(0));
    // loadVacancies вызовется автоматически в VacanciesList
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div
      style={{
        height: '114px',
        borderBottom: '1px solid rgba(15, 15, 16, 0.2)',
        backgroundColor: 'transparent',
        position: 'relative',
        boxSizing: 'border-box',
        marginTop: '60px',
      }}
    >
      {/* заголовки */}
      <div
        style={{
          position: 'absolute',
          left: '220px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '366px',
          height: '66px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 700,
            fontSize: '26px',
            lineHeight: '135%',
            color: '#0F0F10',
            margin: 0,
            padding: 0,
          }}
        >
          Список вакансий
        </div>
        <div
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '135%',
            color: '#0F0F10',
            margin: '4px 0 0 0',
            padding: 0,
          }}
        >
          по профессии Frontend-разработчик
        </div>
      </div>

      {/* поисковая строка */}
      <div
        style={{
          position: 'absolute',
          left: '712px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '508px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '403px',
            height: '42px',
            position: 'relative',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Должность, ключевые слова"
            defaultValue={filters.search}
            onKeyPress={handleKeyPress}
            style={{
              width: '100%',
              height: '100%',
              padding: '0 16px 0 40px',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '14px',
              border: '1px solid rgba(15, 15, 16, 0.2)',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(15, 15, 16, 0.5)',
            }}
          >
            <img src="./search.png" alt="search" />
          </div>
        </div>
        <button
          onClick={handleSearchSubmit}
          style={{
            width: '93px',
            height: '42px',
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            backgroundColor: '#4263EB',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#364FC7')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4263EB')}
        >
          Найти
        </button>
      </div>
    </div>
  );
};

export default HeroSection;