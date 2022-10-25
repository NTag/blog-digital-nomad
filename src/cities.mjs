import cities from "all-the-cities";
import levenshtein from "fast-levenshtein";

const MIN_POPULATION = 10_000;

export const findLocation = (city, countryCode = "FR") => {
  const smallerCities = cities.filter((c) => {
    if (countryCode && c.country !== countryCode) {
      return false;
    }

    return c.population > MIN_POPULATION;
  });
  const citiesWithScore = smallerCities.map((c) => {
    const score = levenshtein.get(c.name, city) - c.population / 5_000_000;
    return {
      name: c.name,
      country: c.country,
      score,
      coords: c.loc.coordinates,
    };
  });
  const sortedCities = citiesWithScore.sort((a, b) => a.score - b.score);

  const [location] = sortedCities;
  if (!location) {
    console.log("No location for", city, countryCode);
    throw new Error("No location found. Wrong country code?");
  }

  const [lng, lat] = location.coords;
  return [lat, lng];
};
