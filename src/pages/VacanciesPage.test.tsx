import { render, screen } from '@testing-library/react';
import VacanciesPage from './VacanciesPage';


vi.mock('../components/Header', () => ({
  default: () => <div>Header Component</div>
}));

vi.mock('../components/HeroSection', () => ({
  default: () => <div>Hero Section Component</div>
}));

vi.mock('../components/SkillsAndCityFilter', () => ({
  default: () => <div>Skills and City Filter Component</div>
}));

vi.mock('../components/VacanciesList', () => ({
  default: () => <div>Vacancies List Component</div>
}));

describe('VacanciesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерится без ошибок', () => {
    const { container } = render(<VacanciesPage />);
    expect(container).toBeDefined();
  });

  it('рендерит Header компонент', () => {
    render(<VacanciesPage />);
    expect(screen.getByText('Header Component')).toBeTruthy();
  });

  it('рендерит HeroSection компонент', () => {
    render(<VacanciesPage />);
    expect(screen.getByText('Hero Section Component')).toBeTruthy();
  });

  it('рендерит SkillsAndCityFilter компонент', () => {
    render(<VacanciesPage />);
    expect(screen.getByText('Skills and City Filter Component')).toBeTruthy();
  });

  it('рендерит VacanciesList компонент', () => {
    render(<VacanciesPage />);
    expect(screen.getByText('Vacancies List Component')).toBeTruthy();
  });

  it('рендерит все дочерние компоненты', () => {
    render(<VacanciesPage />);
    
  
    expect(screen.getByText('Header Component')).toBeTruthy();
    expect(screen.getByText('Hero Section Component')).toBeTruthy();
    expect(screen.getByText('Skills and City Filter Component')).toBeTruthy();
    expect(screen.getByText('Vacancies List Component')).toBeTruthy();
  });
});