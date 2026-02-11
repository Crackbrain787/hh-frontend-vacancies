import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import {
  updateFilters,
  addSkill,
  removeSkill,
  setCurrentPage,
} from '../store/slices/vacanciesSlice';
import { loadVacancies } from '../store/slices/vacanciesSlice';

interface SkillsAndCityFilterProps {
  onFilterChange?: () => void;
}

const SkillsAndCityFilter: React.FC<SkillsAndCityFilterProps> = ({
  onFilterChange,
}) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.vacancies);

  const [newSkill, setNewSkill] = useState('');

  const cities = [
    { value: '', label: 'Все города' },
    { value: '1', label: 'Москва' },
    { value: '2', label: 'Санкт-Петербург' },
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !filters.skills.includes(newSkill.trim())) {
      const updatedSkills = [...filters.skills, newSkill.trim()];
      dispatch(addSkill(newSkill.trim()));
      setNewSkill('');
      dispatch(setCurrentPage(0));
      dispatch(
        loadVacancies({
          text: filters.search || undefined,
          area: filters.area || undefined,
          skill_set: updatedSkills,
          page: 0,
        })
      );
      onFilterChange?.();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = filters.skills.filter((s) => s !== skill);
    dispatch(removeSkill(skill));
    dispatch(setCurrentPage(0));
    dispatch(
      loadVacancies({
        text: filters.search || undefined,
        area: filters.area || undefined,
        skill_set: updatedSkills,
        page: 0,
      })
    );
    onFilterChange?.();
  };

  const handleCityChange = (value: string) => {
    const area = value || '';
    dispatch(updateFilters({ area, page: 0 }));
    dispatch(setCurrentPage(0));
    dispatch(
      loadVacancies({
        text: filters.search || undefined,
        area: area || undefined,
        skill_set: filters.skills,
        page: 0,
      })
    );
    onFilterChange?.();
  };

  return (
    <div
      style={{
        width: '317px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        boxSizing: 'border-box',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
    
      <div>
        <div
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0F0F10',
            marginBottom: '12px',
          }}
        >
          Ключевые навыки:
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <input
            type="text"
            placeholder="Добавить навык"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              height: '36px',
              padding: '0 12px',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '14px',
              border: '1px solid rgba(15, 15, 16, 0.2)',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <button
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#4263EB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: newSkill.trim() ? 1 : 0.5,
            }}
          >
            +
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px',
            maxHeight: '120px',
            overflowY: 'auto',
          }}
        >
          {filters.skills.map((skill) => (
            <div
              key={skill}
              style={{
                backgroundColor: 'rgba(15, 15, 16, 0.1)',
                color: '#0F0F10',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '14px',
                padding: '6px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(15, 15, 16, 0.5)',
                  fontSize: '12px',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          height: '1px',
          backgroundColor: 'rgba(15, 15, 16, 0.1)',
          margin: '0 -24px',
        }}
      />

     
      <div
        style={{
          position: 'relative',
          width: '100%',
          marginTop: '12px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(15, 15, 16, 0.5)',
            fontSize: '16px',
            zIndex: 1,
          }}
        >
          <img src="./map-pin.png" />
        </div>
        <select
          value={filters.area}
          onChange={(e) => handleCityChange(e.target.value)}
          style={{
            width: '100%',
            height: '36px',
            padding: '0 12px 0 40px',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            border: '1px solid rgba(15, 15, 16, 0.2)',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            outline: 'none',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px',
            cursor: 'pointer',
          }}
        >
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SkillsAndCityFilter;