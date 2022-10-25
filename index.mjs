import "zx/globals";

import { findLocation } from "./src/cities.mjs";

const CITIES = [
  { name: "Manchester,GB", days: 6 },
  { name: "Sheffield,GB", days: 3 },
  { name: "Leeds,GB", days: 2 },
  { name: "Blackpool,GB", days: 7 },
  { name: "London,GB", days: 5 },
  { name: "Marseille", days: 6 },
  { name: "Alençon", days: 3 * 7 },
  { name: "Lille", days: 4 * 30 },
  { name: "Ghent,BE", days: 2 },
  { name: "Antwerp,BE", days: 2 },
  { name: "Bruges,BE", days: 2 },
  { name: "Briançon", days: 3 * 7 },
  { name: "Lyon", days: 7 },
  { name: "Strasbourg", days: 3 * 7 },
  { name: "Valencia,ES", days: 7 },
  { name: "Javea,ES", days: 3 * 7 },
  { name: "Montpellier", days: 3 * 30 },
  { name: "Ajaccio", days: 5 },
  { name: "Bordeaux", days: 3 * 7 },
  { name: "Brighton,GB", days: 14 },
  { name: "Bristol,GB", days: 6 },
  { name: "Oxford,GB", days: 3 },
  { name: "Edinburgh,GB", days: 3 },
  { name: "Glasgow,GB", days: 3 },
  { name: "Paris", days: 2 * 12 + 7 },
  { name: "Souillac", days: 5 },
  { name: "Toulouse", days: 3 },
  { name: "Barcelona,ES", days: 2 },
  { name: "Caen", days: 6 },
];

const TRIPS = [
  ["Paris", "Marseille"],
  ["Paris", "Alençon"],

  ["Paris", "London"],
  ["London", "Manchester"],
  ["Manchester", "Sheffield"],
  ["Sheffield", "Leeds"],
  ["Leeds", "Blackpool"],
  ["Blackpool", "London"],

  ["Paris", "Lille"],
  ["Lille", "Bruges"],
  ["Bruges", "Ghent"],
  ["Ghent", "Antwerp"],
  ["Antwerp", "Lille"],

  ["Paris", "Briançon"],
  ["Briançon", "Lyon"],
  ["Lyon", "Paris"],

  ["Paris", "Strasbourg"],
  ["Strasbourg", "Baden-Baden"],
  ["Strasbourg", "Colmar"],

  ["Paris", "Barcelona"],
  ["Barcelona", "Valencia"],
  ["Valencia", "Montpellier"],
  ["Montpellier", "Paris"],
  ["Montpellier", "Marseille"],
  ["Montpellier", "Toulouse"],
  ["Toulouse", "Souillac"],
  ["Montpellier", "Bézier"],
  ["Bézier", "Sancerre"],
  ["Montpellier", "Montélimar"],
  ["Montpellier", "Perpignan"],
  ["Perpignan", "Latour-de-Carol"],
  ["Latour-de-Carol", "Toulouse"],
  ["Toulouse", "Saint-Gaudens"],

  ["Toulouse", "Bordeaux"],
  ["Bordeaux", "Paris"],

  ["Paris", "Tours"],
  ["Tours", "Caen"],
  ["Caen", "Paris"],

  ["Porthsmouth", "Brighton"],
  ["Brighton", "London"],
  ["London", "Penzance"],
  ["Penzance", "Falmouth"],
  ["Falmouth", "Newquay"],
  ["Newquay", "Bristol"],
  ["Bristol", "Oxford"],
  ["Oxford", "London"],
  ["London", "Edinburgh"],
  ["Edinburgh", "Glasgow"],
  ["Glasgow", "Fort William"],
  ["Glasgow", "London"],
];

const main = async () => {
  const citiesCoordinates = CITIES.map(({ name, days }) => {
    const [city, country] = name.split(",");

    const [lat, lng] = findLocation(city, country);

    return { lat, lng, days, city };
  });

  await fs.writeJSON("data.json", citiesCoordinates);
};

main();
