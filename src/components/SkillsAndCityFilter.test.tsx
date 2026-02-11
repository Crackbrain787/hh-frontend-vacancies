import { render, screen } from '@testing-library/react'
import SkillsAndCityFilter from './SkillsAndCityFilter'
import { describe, it, expect, vi } from 'vitest'


vi.mock('../hooks/useAppDispatch', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(() => ({
    filters: {
      search: '',
      area: '',
      skills: []
    }
  }))
}))

vi.mock('../store/slices/vacanciesSlice', () => ({
  updateFilters: vi.fn(),
  addSkill: vi.fn(),
  removeSkill: vi.fn(),
  setCurrentPage: vi.fn(),
  loadVacancies: vi.fn()
}))

describe('Тесты компонента с городом и скилами', () => {
  // Тест 1: Проверяем рендеринг
  it('Рендерится без ошибок', () => {
    expect(() => render(<SkillsAndCityFilter />)).not.toThrow()
  })

  
  it('Видим заголовок', () => {
    render(<SkillsAndCityFilter />)
    
    const title = screen.getByText('Ключевые навыки:')
    expect(title).toBeTruthy()
  })

  
  it('Видим инпут для навыков', () => {
    render(<SkillsAndCityFilter />)
    
    const input = screen.getByPlaceholderText('Добавить навык')
    expect(input).toBeTruthy()
    expect(input.getAttribute('type')).toBe('text')
  })

  
  it('Видим кнопку для добавления скилов', () => {
    render(<SkillsAndCityFilter />)
    
    const button = screen.getByText('+')
    expect(button).toBeTruthy()
  })

  
  it('Есть селектор городов', () => {
    render(<SkillsAndCityFilter />)
    
    
    expect(screen.getByText('Все города')).toBeTruthy()
    expect(screen.getByText('Москва')).toBeTruthy()
    expect(screen.getByText('Санкт-Петербург')).toBeTruthy()
  })

  
  it('Начальное состояние', () => {
    render(<SkillsAndCityFilter />)
    
    const inputElement = screen.getByPlaceholderText('Добавить навык') as HTMLInputElement
    expect(inputElement.value).toBe('')
  })
})