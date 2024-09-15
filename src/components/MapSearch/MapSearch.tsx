import React, { useCallback, useState } from 'react';
import { Button, Flex, Space, TextInput } from '@mantine/core';
import citiesData from '@/assets/cities.json';
import Map from '@/components/Map/Map';
import {
  BREST_COORDINATE,
  CITY_ZOOM,
  DEFAULT_ZOOM,
  FRANCE_COORDINATE,
  PARIS_COORDINATE,
  TOULOUSE_COORDINATE,
} from '@/utils/const';
import { Center } from '@/utils/types';
import classes from './MapSearch.module.css';

/**
 * Format data to match with data in cities.json and make it easier to search the file.
 * @param text
 * @return formatted string
 */
function formatSearchValue(text: string): string {
  // replace ' by a space
  const formattedValue = text.toLowerCase().replace(/'/gi, ' ');
  // remove accents
  return formattedValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function MapSearch() {
  const [searchValue, setSearchValue] = useState('');
  const [center, setCenter] = useState<Center>({
    coordinates: FRANCE_COORDINATE,
    zoom: undefined,
  });
  const [errorInput, setErrorInput] = useState<string | undefined>();

  const searchCity = useCallback(() => {
    const city = citiesData.cities.find(
      (cityData) => cityData.label === formatSearchValue(searchValue)
    );
    if (!city) {
      setErrorInput(
        'Votre cité est introuvable. Pour rajouter votre ville vous pouvez nous contacter ici: city.weather.forecast@mfi.com'
      );
      return;
    }
    setErrorInput(undefined);
    const lon = parseFloat(city.longitude);
    const lat = parseFloat(city.latitude);
    setCenter({
      coordinates: [lon, lat],
      zoom: CITY_ZOOM,
    });
  }, [searchValue, setCenter, setErrorInput, citiesData]);

  return (
    <>
      <Flex className={classes.containerForm} gap="xs">
        <TextInput
          className={classes.input}
          label="Rechercher votre ville"
          error={errorInput}
          onBlur={searchCity}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <Button onClick={searchCity}>Rechercher</Button>
      </Flex>
      <Space h="md" />
      <Flex justify="space-evenly" wrap="wrap" gap="xs">
        <Button
          onClick={() => {
            setCenter({
              coordinates: PARIS_COORDINATE,
              zoom: CITY_ZOOM,
            });
          }}
        >
          Paris
        </Button>
        <Button
          onClick={() => {
            setCenter({
              coordinates: BREST_COORDINATE,
              zoom: CITY_ZOOM,
            });
          }}
        >
          Brest
        </Button>
        <Button
          onClick={() => {
            setCenter({
              coordinates: TOULOUSE_COORDINATE,
              zoom: CITY_ZOOM,
            });
          }}
        >
          Toulouse
        </Button>
        <Button
          onClick={() => {
            setCenter({
              coordinates: FRANCE_COORDINATE,
              zoom: DEFAULT_ZOOM,
            });
          }}
        >
          France
        </Button>
      </Flex>
      <Space h="md" />
      <Map center={center} />
    </>
  );
}

export default MapSearch;
