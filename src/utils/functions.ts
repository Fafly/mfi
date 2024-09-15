import { API_KEY } from '@/utils/const';

/**
 * Function to know if an array of array number contains a specific number array
 * @param arrayContains the array of array number
 * @param arrayToTest the specific number array
 * @return boolean
 */
export function isAnArrayContainsThisArrayNumber(
  arrayContains: number[][],
  arrayToTest: number[]
): boolean {
  const arrayToTestSum = arrayToTest.reduce((acc, val) => acc + val);
  return arrayContains.some((currentArray) => {
    const currentArraySum = currentArray.reduce((acc, val) => acc + val);
    return currentArraySum === arrayToTestSum;
  });
}

/**
 * Get weather data from Open Weather map API.
 * The units are in metrics, lang is french
 * This call exclude current, minutely and hourly data.
 * @param lat latitude of search point
 * @param lon longitude of search point
 */
export async function getWeatherData(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&lang=fr&appid=${API_KEY}`
  );
  return await response.json();
}
