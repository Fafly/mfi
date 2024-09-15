import { Container } from '@mantine/core';
import SearchCity from '@/components/MapSearch/MapSearch';
import { Welcome } from '@/components/Welcome/Welcome';

export function HomePage() {
  return (
    <Container>
      <Welcome />
      <SearchCity />
    </Container>
  );
}
