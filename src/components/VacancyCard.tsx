import { Vacancy } from '../types/vacancy';
import { useNavigate } from 'react-router-dom';

interface VacancyCardProps {
  vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  const navigate = useNavigate();
  const formatSalary = () => {
    if (!vacancy.salary) return 'Зарплата не указана';
    
    const { from, to, currency, gross } = vacancy.salary;
    const grossText = gross ? 'до вычета налогов' : 'на руки';
    const currencySymbol = currency === 'RUR' ? '₽' : currency;
    
    if (from && to) {
      return `${from.toLocaleString()} - ${to.toLocaleString()} ${currencySymbol} ${grossText}`;
    } else if (from) {
      return `от ${from.toLocaleString()} ${currencySymbol} ${grossText}`;
    } else if (to) {
      return `до ${to.toLocaleString()} ${currencySymbol} ${grossText}`;
    }
    
    return 'Зарплата не указана';
  };

 
  const getWorkType = () => {
    if (!vacancy.schedule || !vacancy.schedule.name) return 'Не указано';
    
    const scheduleName = vacancy.schedule.name.toLowerCase();
    if (scheduleName.includes('удален')) return 'Можно удалённо';
    if (scheduleName.includes('гибрид')) return 'Гибрид';
    if (scheduleName.includes('офис')) return 'Офис';
    return 'Не указано';
  };

 
  const getExperience = () => {
    if (!vacancy.experience || !vacancy.experience.name) return 'Не указано';
    return vacancy.experience.name;
  };


  const getEmployerName = () => {
    if (!vacancy.employer || !vacancy.employer.name) return 'Не указано';
    return vacancy.employer.name;
  };


  const getAreaName = () => {
    if (!vacancy.area || !vacancy.area.name) return 'Не указано';
    return vacancy.area.name;
  };

 
  const handleViewVacancy = () => {
    navigate(`/vacancies/${vacancy.id}`);
  };

  const handleApply = () => {
    const url = vacancy.alternate_url || `https://hh.ru/vacancy/${vacancy.id}`;
    window.open(url, '_blank');
  };

  const workType = getWorkType();
  const experience = getExperience();
  const employerName = getEmployerName();
  const areaName = getAreaName();

  return (
    <div
      style={{
        width: '659px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '24px',
        boxSizing: 'border-box',
        marginBottom: '16px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >

      <div
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '24px',
          letterSpacing: '0%',
          color: '#364FC7',
          marginBottom: '12px',
        }}
      >
        {vacancy.name || 'Без названия'}
      </div>


      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '12px',
        }}
      >
       
        <div
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0%',
            color: '#0F0F10',
          }}
        >
          {formatSalary()}
        </div>

 
        <div
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '0%',
            color: 'rgba(15, 15, 16, 0.5)',
          }}
        >
          {experience}
        </div>
      </div>

    
      <div
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '24px',
          letterSpacing: '0%',
          color: 'rgba(15, 15, 16, 0.5)',
          marginBottom: '12px',
        }}
      >
        {employerName}
      </div>


      <div
        style={{
          display: 'inline-block',
          padding: '4px 8px',
          backgroundColor: '#4263EB',
          color: '#FFFFFF',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          borderRadius: '4px',
          marginBottom: '12px',
        }}
      >
        {workType}
      </div>

 
      <div
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0%',
          color: '#0F0F10',
          marginBottom: '24px',
        }}
      >
        {areaName}
      </div>


      <div
        style={{
          display: 'flex',
          gap: '12px',
          width: '315px',
        }}
      >

        <button
          onClick={handleViewVacancy}
          style={{
            width: '172px',
            height: '36px',
            backgroundColor: '#0F0F10',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '4px',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            cursor: 'pointer',
            padding: '1px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F0F10'}
        >
          Смотреть вакансию
        </button>


        <button
          onClick={handleApply}
          style={{
            width: '131px',
            height: '36px',
            backgroundColor: 'rgba(15, 15, 16, 0.1)',
            color: '#0F0F10',
            border: 'none',
            borderRadius: '4px',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            cursor: 'pointer',
            padding: '1px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 15, 16, 0.15)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 15, 16, 0.1)'}
        >
          Откликнуться
        </button>
      </div>
    </div>
  );
};

export default VacancyCard;
