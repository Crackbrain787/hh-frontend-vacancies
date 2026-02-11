import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VacanciesList from './VacanciesList'
import { describe, it, expect, vi, beforeEach } from 'vitest'


const mockUseAppSelector = vi.hoisted(() => vi.fn())
const mockDispatch = vi.hoisted(() => vi.fn())
const mockSetCurrentPage = vi.hoisted(() => vi.fn())
const mockLoadVacancies = vi.hoisted(() => vi.fn())


vi.mock('@mantine/core', () => ({
  Center: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Loader: () => <div data-testid="loader">Loading...</div>,
  Text: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, onClick, disabled }: { 
    children: React.ReactNode; 
    onClick?: () => void; 
    disabled?: boolean 
  }) => (
    <button onClick={onClick} disabled={disabled} data-testid="button">
      {children}
    </button>
  ),
  Group: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))


vi.mock('./VacancyCard', () => ({
  default: () => <div data-testid="vacancy-card">Vacancy Card</div>
}))


vi.mock('../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: mockUseAppSelector
}))

vi.mock('../store/slices/vacanciesSlice', () => ({
  setCurrentPage: mockSetCurrentPage,
  loadVacancies: mockLoadVacancies
}))

describe('VacanciesList Component', () => {
  
  const defaultState = {
    vacancies: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 0,
    filters: {
      search: '',
      area: '',
      skills: []
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  
    mockUseAppSelector.mockReturnValue(defaultState)
  })

  
  it('Рендерится без ошибок', () => {
    expect(() => render(<VacanciesList />)).not.toThrow()
  })

  
  it('показывает лоадер', () => {
    mockUseAppSelector.mockReturnValue({
      ...defaultState,
      loading: true
    })
    
    render(<VacanciesList />)
    
    expect(screen.getByTestId('loader')).toBeTruthy()
  })

  
  it('должно отображаться сообщение об ошибке при возникновении ошибки', () => {
    const errorMessage = 'Ошибка сети'
    
    mockUseAppSelector.mockReturnValue({
      ...defaultState,
      error: errorMessage
    })
    
    render(<VacanciesList />)
    
    expect(screen.getByText(`Ошибка при загрузке вакансий: ${errorMessage}`)).toBeTruthy()
  })

  
  it('должно отображаться сообщение, когда вакансии не найдены', () => {
    render(<VacanciesList />)
    
    expect(screen.getByText('Вакансии не найдены. Попробуйте изменить параметры поиска.')).toBeTruthy()
  })

  
  it('Отображается список вакансий', () => {
    mockUseAppSelector.mockReturnValue({
      ...defaultState,
      vacancies: [
        { id: '1', name: 'Frontend Developer' },
        { id: '2', name: 'React Developer' }
      ]
    })
    
    render(<VacanciesList />)
    
    const vacancyCards = screen.getAllByTestId('vacancy-card')
    expect(vacancyCards).toHaveLength(2)
  })


  it('отображается пагинация при наличии нескольких страниц', () => {
    mockUseAppSelector.mockReturnValue({
      ...defaultState,
      vacancies: [{ id: '1', name: 'Frontend Developer' }],
      totalPages: 5,
      currentPage: 2
    })
    
    render(<VacanciesList />)
    
    const buttons = screen.getAllByTestId('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  
  it('когда одна страница, пагинации нет', () => {
    mockUseAppSelector.mockReturnValue({
      ...defaultState,
      vacancies: [{ id: '1', name: 'Frontend Developer' }],
      totalPages: 1,
      currentPage: 0
    })
    
    render(<VacanciesList />)
    
    const buttons = screen.queryAllByTestId('button')
    expect(buttons).toHaveLength(0)
  })
})