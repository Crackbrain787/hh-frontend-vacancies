import { render, screen } from '@testing-library/react'
import Header from './Header'
import { describe, it, expect } from 'vitest'

describe('Компонент заголовка', () => {
  it('должны отображаться основные элементы навигации', () => {
    render(<Header />)
    
    
    const pageContent = document.body.textContent
    

    expect(pageContent).toContain('.FrontEnd')
    expect(pageContent).toContain('Вакансии FE')
    expect(pageContent).toContain('Обо мне')
    
  
    const images = document.querySelectorAll('img')
    expect(images.length).toBe(1)
  })
  
  it('индикатор - синяя точка', () => {
    render(<Header />)
    
    
    const vacanciesElement = screen.getByText('Вакансии FE')
    const parent = vacanciesElement.parentElement
    
   
    expect(parent?.children.length).toBeGreaterThan(1)
  })
})