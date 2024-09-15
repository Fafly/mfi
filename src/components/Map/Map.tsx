import { IconCloudFilled } from '@tabler/icons-react';
import { Map, View } from 'ol';
import { Alert, Space } from '@mantine/core';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import { useGeographic } from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style } from 'ol/style';

import 'ol/ol.css';

import React, { useCallback, useEffect, useState } from 'react';
import {
  BREST_COORDINATE,
  CITY_ZOOM,
  DEFAULT_ZOOM,
  FRANCE_COORDINATE,
  PARIS_COORDINATE,
  TOULOUSE_COORDINATE,
} from '@/utils/const';
import { getWeatherData, isAnArrayContainsThisArrayNumber } from '@/utils/functions';
import { Center } from '@/utils/types';

const REGISTERED_COORDINATES = [
  BREST_COORDINATE,
  PARIS_COORDINATE,
  TOULOUSE_COORDINATE,
  FRANCE_COORDINATE,
];

type MapComponentProps = {
  center: Center;
};

const MarkerStyle = new Style({
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: 'rgba(252,196,25, 0.5)',
    }),
    stroke: new Stroke({
      width: 1,
      color: '#e67700',
    }),
  }),
});

function MapComponent({ center }: MapComponentProps) {
  useGeographic();
  const [searchesCities, setSearchesCities] = useState(REGISTERED_COORDINATES);

  const [map, setMap] = useState(
    new Map({
      target: undefined,
      layers: undefined,
      view: undefined,
      overlays: undefined,
    })
  );
  const [overlayPopup, setOverlayPopup] = useState(new Overlay({}));

  const moveOnACity = useCallback(
    (newCoordinates: number[], newZoom?: number) => {
      if (!isAnArrayContainsThisArrayNumber(searchesCities, newCoordinates)) {
        const newPoint = new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(newCoordinates),
              }),
            ],
          }),
          style: MarkerStyle,
        });
        setSearchesCities([...searchesCities, newCoordinates]);
        map.addLayer(newPoint);
      }
      map
        .getView()
        .animate({ zoom: newZoom ?? CITY_ZOOM }, { center: newCoordinates }, { duration: 2000 });
    },
    [map, searchesCities]
  );

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const brestPoint = new Feature({
      geometry: new Point(BREST_COORDINATE),
      name: 'Brest',
    });
    const toulousePoint = new Feature({
      geometry: new Point(TOULOUSE_COORDINATE),
      name: 'Toulouse',
    });
    const parisPoint = new Feature({
      geometry: new Point(PARIS_COORDINATE),
      name: 'Paris',
    });

    const vectorSource = new VectorSource({
      features: [brestPoint, toulousePoint, parisPoint],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: MarkerStyle,
    });

    const overlay = new Overlay({
      // @ts-expect-error this element already exist
      element: document.getElementById('popup'),
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    const map = new Map({
      target: 'map',
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: center.coordinates,
        zoom: center.zoom ?? DEFAULT_ZOOM,
      }),
      overlays: [overlay],
    });

    map.on('singleclick', (evt) => {
      const coordinate = evt.coordinate;

      getWeatherData(coordinate[1], coordinate[0]).then((data) => {
        const content = document.getElementById('popup-content');
        if (!content) {
          return;
        }
        content.innerHTML = `Demain: ${data.daily[1].temp.day}° C<br>Dans deux jours : ${data.daily[2].temp.day}° C<br>Dans 3 jours : ${data.daily[3].temp.day}° C`;
        overlay.setPosition([coordinate[0] + Math.round(coordinate[0] / 360) * 360, coordinate[1]]);
      });
    });

    setMap(map);
    setOverlayPopup(overlay);

    // @ts-expect-error null is for destruct map
    return () => map.setTarget(null);
  }, []);

  useEffect(() => {
    moveOnACity(center.coordinates, center.zoom);
  }, [center]);

  return (
    <>
      <div
        style={{ height: '600px', width: '600px', margin: 'auto' }}
        id="map"
        className="map-container"
      />
      <Space h="xl" />
      <Alert
        id="popup"
        className="ol-popup"
        variant="filled"
        // color="yellow"
        title="Température des trois prochains jours"
        icon={<IconCloudFilled />}
        w={300}
        withCloseButton
        onClose={() => {
          overlayPopup.setPosition(undefined);
        }}
      >
        <p id="popup-content" />
      </Alert>
    </>
  );
}

export default MapComponent;
