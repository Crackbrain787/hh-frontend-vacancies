import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { loadVacancy } from '../store/slices/vacanciesSlice';
import { useEffect } from 'react';
import { Vacancy } from '../types/vacancy';
import Header from '../components/Header';

const VacancyPage = () => {
  const { id } = useParams(); 
  const dispatch = useAppDispatch();
  
  const { 
    currentVacancy, 
    vacancyLoading, 
    vacancyError 
  } = useAppSelector((state) => state.vacancies);


  useEffect(() => {
    if (id) {
      dispatch(loadVacancy(id));
    }
  }, [dispatch, id]);


  const formatSalary = (vacancy: Vacancy) => {
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

  const htmlToText = (html: string): string => {
  if (!html) return '';
  

  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  

  return tempElement.textContent || tempElement.innerText || '';
};


  if (vacancyLoading) {
    return (
      <>
        <Header />
        <div style={{
          marginTop: '60px',
          padding: '24px',
          backgroundColor: '#F6F6F7',
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div>Загрузка вакансии...</div>
        </div>
      </>
    );
  }


  if (vacancyError) {
    return (
      <>
        <Header />
        <div style={{
          marginTop: '60px',
          padding: '24px',
          backgroundColor: '#F6F6F7',
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ color: 'red' }}>Ошибка: {vacancyError}</div>
        </div>
      </>
    );
  }


  if (!currentVacancy) {
    return (
      <>
        <Header />
        <div style={{
          marginTop: '60px',
          padding: '24px',
          backgroundColor: '#F6F6F7',
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div>Вакансия не найдена</div>
        </div>
      </>
    );
  }


  const vacancy = currentVacancy;

  return (
    <>
      <Header />
      <div style={{
        marginTop: '60px',
        padding: '24px',
        backgroundColor: '#F6F6F7',
        minHeight: 'calc(100vh - 60px)'
      }}>
    
        <div style={{
          maxWidth: '658px',
          margin: '0 auto',
        }}>
          
          <div style={{
            width: '658px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            

            <div style={{
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#364FC7',
              marginBottom: '12px',
            }}>
              {vacancy.name}
            </div>


            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px',
            }}>
              <div style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                color: '#0F0F10',
              }}>
                {formatSalary(vacancy)}
              </div>
              <div style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(15, 15, 16, 0.5)',
              }}>
                {vacancy.experience?.name || 'Не указано'}
              </div>
            </div>


            <div style={{
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: 'rgba(15, 15, 16, 0.5)',
              marginBottom: '12px',
            }}>
              {vacancy.employer?.name || 'Не указано'}
            </div>

            <div style={{
              display: 'inline-block',
              padding: '4px 8px',
              backgroundColor: '#4263EB',
              color: '#FFFFFF',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              borderRadius: '4px',
              marginBottom: '12px',
            }}>
              {vacancy.schedule?.name || 'Не указано'}
            </div>


            <div style={{
              fontFamily: '"Open Sans", sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              color: '#0F0F10',
              marginBottom: '24px',
            }}>
              {vacancy.area?.name || 'Не указано'}
            </div>

          
            <button
              onClick={() => window.open(vacancy.alternate_url, '_blank')}
              style={{
                width: '190px',
                height: '36px',
                backgroundColor: '#0F0F10',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F0F10'}
            >
              Откликнуться на hh.ru
            </button>
          </div>


          <div style={{
            width: '658px',
            minHeight: '492px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            
      
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                color: '#0F0F10',
                marginBottom: '12px',
              }}>
                Компания
              </div>
              <div style={{
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#0F0F10',
                lineHeight: '1.5',
              }}>
                {vacancy.employer?.name || 'Не указано'}
              </div>
            </div>


<div>
  <div style={{
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    color: '#0F0F10',
    marginBottom: '12px',
  }}>
    О проекте
  </div>
  <div style={{
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    color: '#0F0F10',
    lineHeight: '1.5',
  }}>
   
    {vacancy.description && (
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          maxHeight: '300px', 
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid rgba(15, 15, 16, 0.1)'
        }}>
          {htmlToText(vacancy.description)}
        </div>
      </div>
    )}
    

    {vacancy.snippet?.requirement && (
      <div style={{ marginBottom: '12px' }}>
        <strong>Требования:</strong> {vacancy.snippet.requirement}
      </div>
    )}
    {vacancy.snippet?.responsibility && (
      <div style={{ marginBottom: '12px' }}>
        <strong>Обязанности:</strong> {vacancy.snippet.responsibility}
      </div>
    )}
    
 
    {!vacancy.description && 
     !vacancy.snippet?.requirement && 
     !vacancy.snippet?.responsibility && (
      <div style={{ color: 'rgba(15, 15, 16, 0.5)' }}>
        Подробное описание вакансии не предоставлено
      </div>
    )}
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VacancyPage;