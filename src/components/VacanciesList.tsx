import { Center, Loader, Text, Box, Button, Group } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { setCurrentPage, loadVacancies } from '../store/slices/vacanciesSlice';
import { useEffect } from 'react';
import VacancyCard from './VacancyCard';

const VacanciesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    vacancies,
    loading,
    error,
    totalPages,
    currentPage,
    filters
  } = useAppSelector((state) => state.vacancies);

  useEffect(() => {
    const searchParts = [];
    if (filters.search?.trim()) {
      searchParts.push(filters.search.trim());
    }
    if (filters.skills.length > 0) {
      searchParts.push(...filters.skills);
    }
    const searchText = searchParts.length > 0 ? searchParts.join(' ') : undefined;

    dispatch(loadVacancies({
      text: searchText,
      area: filters.area || undefined,
      page: currentPage,
    }));
  }, [dispatch, currentPage, filters.search, filters.area, filters.skills]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page - 1));
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (loading) {
    return (
      <Center style={{ height: '200px' }}>
        <Loader color="#4263EB" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: '200px' }}>
        <Text c="red">Ошибка: {error}</Text>
      </Center>
    );
  }

  return (
    <Box>
      {vacancies.length === 0 ? (
        <Center style={{ height: '200px' }}>
          <Text>Вакансии не найдены. Попробуйте изменить параметры поиска.</Text>
        </Center>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>

          {totalPages > 1 && (
            <Center mt={32}>
              <Group gap="10px">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handlePageChange(currentPage)}
                  disabled={currentPage === 0}
                >
                  &lt;
                </Button>
                {getVisiblePages().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage + 1 === page ? 'filled' : 'outline'}
                    size="xs"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => handlePageChange(currentPage + 2)}
                  disabled={currentPage === totalPages - 1}
                >
                  &gt;
                </Button>
              </Group>
            </Center>
          )}
        </>
      )}
    </Box>
  );
};

export default VacanciesList;