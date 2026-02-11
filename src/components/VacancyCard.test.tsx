import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VacancyCard from './VacancyCard'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Vacancy } from '../types/vacancy'


const mockWindowOpen = vi.fn()
window.open = mockWindowOpen


const defaultVacancy: Vacancy = {
  id: '123',
  name: 'Frontend разработчик',
  salary: {
    from: 100000,
    to: 200000,
    currency: 'RUR',
    gross: true
  },
  schedule: {
    id: 'remote',
    name: 'Удаленная работа'
  },
  experience: {
    id: 'between1And3',
    name: 'От 1 года до 3 лет'
  },
  employer: {
    id: '456',
    name: 'Технологии будущего',
    logo_urls: null
  },
  area: {
    id: '1',
    name: 'Москва'
  },
  alternate_url: 'https://hh.ru/vacancy/123'
}

describe('Компонент карточки вакансии', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

 
  it('Рендерится без ошибок', () => {
    expect(() => render(<VacancyCard vacancy={defaultVacancy} />)).not.toThrow()
  })

  
  it('Показывает название вакансии', () => {
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    expect(screen.getByText('Frontend разработчик')).toBeTruthy()
  })

  it('Показывает размер ЗП', () => {
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    
    const salaryPattern = /100[\s,]?000 - 200[\s,]?000 ₽ до вычета налогов/
    const salaryElement = screen.getByText(salaryPattern)
    expect(salaryElement).toBeTruthy()
  })

  
  it('Размер ЗП от...', () => {
    const vacancy = {
      ...defaultVacancy,
      salary: {
        from: 150000,
        to: null,
        currency: 'RUR',
        gross: false
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    
    const salaryElement = screen.getByText(/от 150[\s,]?000 ₽ на руки/)
    expect(salaryElement).toBeTruthy()
  })

  
  it('Размер ЗП до...', () => {
    const vacancy = {
      ...defaultVacancy,
      salary: {
        from: null,
        to: 250000,
        currency: 'USD',
        gross: true
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    const salaryElement = screen.getByText(/до 250[\s,]?000 USD до вычета налогов/)
    expect(salaryElement).toBeTruthy()
  })


  it('ЗП не указана', () => {
    const vacancy = {
      ...defaultVacancy,
      salary: null
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    expect(screen.getByText('Зарплата не указана')).toBeTruthy()
  })

  
  it('Возможна удалёнка', () => {
    const vacancy = {
      ...defaultVacancy,
      schedule: {
        id: 'remote',
        name: 'Удаленная работа'
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    expect(screen.getByText('Можно удалённо')).toBeTruthy()
  })

 
  it('Работа по гибриду', () => {
    const vacancy = {
      ...defaultVacancy,
      schedule: {
        id: 'hybrid',
        name: 'Гибридный график'
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    expect(screen.getByText('Гибрид')).toBeTruthy()
  })

  
  it('Работа в офисе', () => {
    const vacancy = {
      ...defaultVacancy,
      schedule: {
        id: 'office',
        name: 'Работа в офисе'
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    expect(screen.getByText('Офис')).toBeTruthy()
  })

  
  it('Показывает необходимый опыт', () => {
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    expect(screen.getByText('От 1 года до 3 лет')).toBeTruthy()
  })

  
  it('Видим название работодателя', () => {
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    expect(screen.getByText('Технологии будущего')).toBeTruthy()
  })

  
  it('Видим название города', () => {
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    expect(screen.getByText('Москва')).toBeTruthy()
  })


  it('Рендерятся 2 кнопки в карточке', () => {
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    expect(screen.getByText('Смотреть вакансию')).toBeTruthy()
    expect(screen.getByText('Откликнуться')).toBeTruthy()
  })

  
  it('Клик по кнопке закидывает на hh', async () => {
    const user = userEvent.setup()
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    const viewButton = screen.getByText('Смотреть вакансию')
    await user.click(viewButton)
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://hh.ru/vacancy/123', '_blank')
  })


  it('Отправляет на страницу вакансии', async () => {
    const user = userEvent.setup()
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    const applyButton = screen.getByText('Откликнуться')
    await user.click(applyButton)
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://hh.ru/vacancy/123', '_blank')
  })

  
  it('следует создать URL-адрес из идентификатора вакансии, если отсутствует alternate_url', async () => {
    const user = userEvent.setup()
    const vacancyWithoutUrl = {
      ...defaultVacancy,
      alternate_url: undefined
    }
    
    render(<VacancyCard vacancy={vacancyWithoutUrl} />)
    
    const viewButton = screen.getByText('Смотреть вакансию')
    await user.click(viewButton)
    
    expect(mockWindowOpen).toHaveBeenCalledWith('https://hh.ru/vacancy/123', '_blank')
  })

  
  it('работает ховер', () => {
    render(<VacancyCard vacancy={defaultVacancy} />)
    
    const viewButton = screen.getByText('Смотреть вакансию')
    const applyButton = screen.getByText('Откликнуться')
    

    fireEvent.mouseOver(viewButton)
    fireEvent.mouseOver(applyButton)
    

    expect(viewButton).toBeTruthy()
    expect(applyButton).toBeTruthy()
  })


  it('нормальная структура карточки', () => {
    const { container } = render(<VacancyCard vacancy={defaultVacancy} />)
    
    const card = container.firstChild as HTMLElement
    expect(card).toBeTruthy()
    
    
    expect(screen.getByText('Frontend разработчик')).toBeTruthy()
    expect(screen.getByText('Технологии будущего')).toBeTruthy()
    expect(screen.getByText('Можно удалённо')).toBeTruthy()
    expect(screen.getByText('Москва')).toBeTruthy()
  })

  
  it('компонент не падает и отображает название', () => {
    const vacancyWithMissingData = {
      id: '123',
      name: 'Разработчик',
      salary: null,
      schedule: null,
      experience: null,
      employer: null,
      area: null,
      alternate_url: undefined
    } as any
    
    render(<VacancyCard vacancy={vacancyWithMissingData} />)
    
    
    expect(screen.getByText('Разработчик')).toBeTruthy()
    expect(screen.getByText('Зарплата не указана')).toBeTruthy()
  })

 
  it('Работаем с разными валютами', () => {
    const vacancy = {
      ...defaultVacancy,
      salary: {
        from: 5000,
        to: 7000,
        currency: 'USD',
        gross: false
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    const salaryElement = screen.getByText(/5[\s,]?000 - 7[\s,]?000 USD на руки/)
    expect(salaryElement).toBeTruthy()
  })
})


describe('Тесты Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })


  const edgeCaseVacancy = {
    id: '123',
    name: 'Frontend разработчик',
    salary: {
      from: 100000,
      to: 200000,
      currency: 'RUR',
      gross: true
    },
    schedule: {
      id: 'remote',
      name: 'Удаленная работа'
    },
    experience: {
      id: 'between1And3',
      name: 'От 1 года до 3 лет'
    },
    employer: {
      id: '456',
      name: 'Технологии будущего',
      logo_urls: null
    },
    area: {
      id: '1',
      name: 'Москва'
    },
    alternate_url: 'https://hh.ru/vacancy/123'
  }


  it('Длинное название', () => {
    const vacancy = {
      ...edgeCaseVacancy,
      name: 'Очень длинное название вакансии которое может занимать несколько строк и должно корректно отображаться в интерфейсе'
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    expect(screen.getByText(vacancy.name)).toBeTruthy()
  })

  
  it('Расписание работы не указано', () => {
    const vacancy = {
      ...edgeCaseVacancy,
      schedule: null
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    expect(screen.getByText('Не указано')).toBeTruthy()
  })

  
  it('не распознанный тип графика', () => {
    const vacancy = {
      ...edgeCaseVacancy,
      schedule: {
        id: 'other',
        name: 'Другой график'
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    expect(screen.getByText('Не указано')).toBeTruthy()
  })

  
  it('Отображение оооочень большой ЗП', () => {
    const vacancy = {
      ...edgeCaseVacancy,
      salary: {
        from: 1000000,
        to: 2000000,
        currency: 'RUR',
        gross: true
      }
    }
    
    render(<VacancyCard vacancy={vacancy} />)
    
    const salaryElement = screen.getByText(/1[\s,]?000[\s,]?000 - 2[\s,]?000[\s,]?000 ₽ до вычета налогов/)
    expect(salaryElement).toBeTruthy()
  })

 
  it('Кнопка показана с маленьким значением', () => {
    const minimalVacancy = {
      id: '123',
      name: 'Вакансия'
    } as any
    
    render(<VacancyCard vacancy={minimalVacancy} />)
    
    expect(screen.getByText('Смотреть вакансию')).toBeTruthy()
    expect(screen.getByText('Откликнуться')).toBeTruthy()
  })
})