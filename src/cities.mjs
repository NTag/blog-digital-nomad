import cities from "all-the-cities";
import levenshtein from "fast-levenshtein";

const MIN_POPULATION = 10_000;

export const findLocation = (name, minPopulation = MIN_POPULATION) => {
  if (Array.isArray(name)) {
    return name;
  }

  const [city, countryCode = "FR"] = name.split(",");
  if (city === "Strasbourg") {
    return [48.5858496, 7.7322157];
  }

  const smallerCities = cities.filter((c) => {
    if (countryCode && c.country !== countryCode) {
      return false;
    }

    return c.population > minPopulation;
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
