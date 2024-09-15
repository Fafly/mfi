import { Space, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'black', to: 'yellow' }}
        >
          MFI
        </Text>{' '}
        CITY WEATHER FORECAST
      </Title>
      <Text c="dimmed" ta="justify" size="lg" maw={580} mx="auto" mt="xl">
        MFI city weather forecast est une application permettant de savoir la température des 3
        prochains jours d'une ville française.
        <br />
        Cliquez sur la carte pour afficher les températures des 3 prochains jours.
      </Text>
      <Space h="xl" />
    </>
  );
}
