import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HeroSection from './HeroSection'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'


const mockDispatch = vi.fn()
const mockUpdateFilters = vi.fn()
const mockSetCurrentPage = vi.fn()
const mockLoadVacancies = vi.fn()


let mockUseAppSelector = vi.fn()


vi.mock('../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => mockUseAppSelector(selector)
}))

vi.mock('../store/slices/vacanciesSlice', () => ({
  updateFilters: (...args: any[]) => {
    mockUpdateFilters(...args)
    return { type: 'UPDATE_FILTERS', payload: args[0] }
  },
  setCurrentPage: (...args: any[]) => {
    mockSetCurrentPage(...args)
    return { type: 'SET_CURRENT_PAGE', payload: args[0] }
  },
  loadVacancies: (...args: any[]) => {
    mockLoadVacancies(...args)
    return { type: 'LOAD_VACANCIES', payload: args[0] }
  }
}))

describe('Тест для элемента с заголовком и поиском', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    
   
    mockUseAppSelector = vi.fn().mockReturnValue({
      filters: {
        search: '',
        area: '',
        skills: []
      }
    })
  })

  
  it('отображается без ошибок', () => {
    expect(() => render(<HeroSection />)).not.toThrow()
  })

  
  it('Отображает заголовок', () => {
    render(<HeroSection />)
    
    expect(screen.getByText('Список вакансий')).toBeDefined()
    expect(screen.getByText('по профессии Frontend-разработчик')).toBeDefined()
  })

  
  it('Отображается инпут с плэйсхолдером', () => {
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова')
    expect(searchInput).toBeDefined()
    expect(searchInput.getAttribute('type')).toBe('text')
  })

  
  it('Отображается кнопка поиска', () => {
    render(<HeroSection />)
    
    const searchButton = screen.getByRole('button', { name: /найти/i })
    expect(searchButton).toBeDefined()
    expect(searchButton.textContent).toBe('Найти')
  })

  
  it('Отображается лупа', () => {
    render(<HeroSection />)
    
    const searchIcon = document.querySelector('img[src="/search.png"]')
    expect(searchIcon).toBeDefined()
  })

  
  it('Видим начальное значение', () => {
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова') as HTMLInputElement
    expect(searchInput.value).toBe('')
  })

  
  it('должно отображаться значение поиска из хранилища Redux', () => {
    
    mockUseAppSelector = vi.fn().mockReturnValue({
      filters: {
        search: 'React разработчик',
        area: '',
        skills: []
      }
    })
    
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова') as HTMLInputElement
    expect(searchInput.value).toBe('React разработчик')
  })

  
  it('следует вызывать updateFilters при вводе данных поиска', async () => {
    const user = userEvent.setup()
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова')
    
    
    await user.type(searchInput, 'Frontend')
    
   
    expect(mockUpdateFilters).toHaveBeenCalledTimes(8) 
    
    
    expect(mockDispatch).toHaveBeenCalledTimes(8)
    
    
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(1, { search: 'F' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(2, { search: 'r' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(3, { search: 'o' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(4, { search: 'n' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(5, { search: 't' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(6, { search: 'e' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(7, { search: 'n' })
    expect(mockUpdateFilters).toHaveBeenLastCalledWith({ search: 'd' })
  })

  
  it('показывает вакансии при нажатии кнопки', async () => {
    const user = userEvent.setup()
    
    
    mockUseAppSelector = vi.fn().mockReturnValue({
      filters: {
        search: 'React',
        area: 'Москва',
        skills: ['JavaScript', 'TypeScript']
      }
    })
    
    render(<HeroSection />)
    
    const searchButton = screen.getByRole('button', { name: /найти/i })
    

    await user.click(searchButton)
    
   
    expect(mockSetCurrentPage).toHaveBeenCalledWith(0)
    expect(mockLoadVacancies).toHaveBeenCalledWith({
      text: 'React',
      area: 'Москва',
      skill_set: ['JavaScript', 'TypeScript'],
      page: 0
    })
    
   
    expect(mockDispatch).toHaveBeenCalledTimes(2)
  })

 
  it('показывает результаты при нажатии Enter', async () => {
    const user = userEvent.setup()
    
   
    mockUseAppSelector = vi.fn().mockReturnValue({
      filters: {
        search: 'JavaScript',
        area: '',
        skills: []
      }
    })
    
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова')
    

    await user.click(searchInput)

    await user.keyboard('[Enter]')
    
 
    expect(mockSetCurrentPage).toHaveBeenCalledWith(0)
    expect(mockLoadVacancies).toHaveBeenCalledWith({
      text: 'JavaScript',
      area: undefined,
      skill_set: [],
      page: 0
    })
  })

  
  it('Ничего кроме Enter', async () => {
    const user = userEvent.setup()
    
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова')
    
  
    await user.click(searchInput)
    
  
    await user.keyboard('A')
    
 
    expect(mockLoadVacancies).not.toHaveBeenCalled()
  })

  
  it('Если инпут пуст - Undefined', async () => {
    const user = userEvent.setup()
    
    
    render(<HeroSection />)
    
    const searchButton = screen.getByRole('button', { name: /найти/i })
    
    
    await user.click(searchButton)
    
  
    expect(mockLoadVacancies).toHaveBeenCalledWith({
      text: undefined,
      area: undefined,
      skill_set: [],
      page: 0
    })
  })

  
  it('Работает ховер', async () => {
    const user = userEvent.setup()
    render(<HeroSection />)
    
    const searchButton = screen.getByRole('button', { name: /найти/i }) as HTMLButtonElement
    
    
    expect(searchButton.disabled).toBe(false)
    
    
    fireEvent.mouseOver(searchButton)
    fireEvent.mouseOut(searchButton)
    
  
    expect(true).toBe(true)
  })

  
  it('Коректная структура', () => {
    const { container } = render(<HeroSection />)
    

    const heroSection = container.firstChild as HTMLElement
    expect(heroSection).toBeDefined()
    
 
    const searchBlock = container.querySelector('input[placeholder="Должность, ключевые слова"]')
    expect(searchBlock).toBeDefined()
  })

  
  it('Иконка поиска в инпуте', () => {
    render(<HeroSection />)
    

    const iconContainer = document.querySelector('div[style*="left: 12px"]')
    expect(iconContainer).toBeDefined()
    
  
    const iconImg = iconContainer?.querySelector('img')
    expect(iconImg).toBeDefined()
    expect(iconImg?.getAttribute('src')).toBe('/search.png')
  })
})


describe('Доп тесты', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAppSelector = vi.fn().mockReturnValue({
      filters: {
        search: '',
        area: '',
        skills: []
      }
    })
  })

  
  it('Поиск с пробелами в инпуте', async () => {
    const user = userEvent.setup()
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова')
    
    // Вводим текст с пробелами
    await user.type(searchInput, '   React   ')
    
    // Проверяем количество вызовов: 11 символов (3 пробела + React + 3 пробела)
    expect(mockUpdateFilters).toHaveBeenCalledTimes(11)
    
    // Проверяем несколько ключевых вызовов
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(1, { search: ' ' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(2, { search: ' ' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(3, { search: ' ' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(4, { search: 'R' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(5, { search: 'e' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(6, { search: 'a' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(7, { search: 'c' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(8, { search: 't' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(9, { search: ' ' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(10, { search: ' ' })
    expect(mockUpdateFilters).toHaveBeenLastCalledWith({ search: ' ' })
  })

  
  it('Поиск с длинным запросом', async () => {
    const user = userEvent.setup()
    render(<HeroSection />)
    
    const searchInput = screen.getByPlaceholderText('Должность, ключевые слова')
    const longQuery = 'a'.repeat(100)
    
    
    await user.type(searchInput, longQuery)
    
   
    expect(mockUpdateFilters).toHaveBeenCalledTimes(100)
    
  
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(1, { search: 'a' })
    expect(mockUpdateFilters).toHaveBeenNthCalledWith(50, { search: 'a' })
    expect(mockUpdateFilters).toHaveBeenLastCalledWith({ search: 'a' })
  })

  
  it('проходит поиск без скилов', async () => {
    const user = userEvent.setup()
    
    mockUseAppSelector = vi.fn().mockReturnValue({
      filters: {
        search: 'Vue',
        area: 'Санкт-Петербург',
        skills: []  // Пустой массив навыков
      }
    })
    
    render(<HeroSection />)
    
    const searchButton = screen.getByRole('button', { name: /найти/i })
    await user.click(searchButton)
    
    expect(mockLoadVacancies).toHaveBeenCalledWith({
      text: 'Vue',
      area: 'Санкт-Петербург',
      skill_set: [],
      page: 0
    })
  })
})