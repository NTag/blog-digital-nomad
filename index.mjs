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
  { name: "Antwerp,BE", days: 4 },
  { name: "Bruges,BE", days: 2 },
  { name: "Briançon", days: 3 * 7 * 2 },
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
  { name: "Madrid,ES", days: 2 },
  { name: "Porto,PT", days: 7 },
  { name: "Lisbon,PT", days: 14 },
  { name: "Faro,PT", days: 2 },
  { name: "Dusseldorf,DE", days: 2 },
  { name: "Hamburg,DE", days: 3 },
  { name: "Copenhagen,DK", days: 4 },
  { name: "Stockholm,SE", days: 7 },
  { name: "Narvik,NO", days: 1 },
  { name: "Leknes,NO", days: 14 },
  { name: "Trondheim,NO", days: 1 },
  { name: "Oslo,NO", days: 2 },
  { name: "Bergen,NO", days: 1 },
  { name: "Berlin,DE", days: 3 + 7 },
  { name: "Vienna,AT", days: 3 },
];

const TRIPS_TRAIN = [
  ["Paris", "Marseille"],
  ["Paris", "Alençon"],

  ["Paris", "London,GB"],
  ["London,GB", "Manchester,GB"],
  ["Manchester,GB", "Sheffield,GB"],
  ["Sheffield,GB", "Leeds,GB"],
  ["Leeds,GB", "Blackpool,GB"],
  ["Blackpool,GB", "London,GB"],

  ["Paris", "Lille"],
  ["Lille", "Bruges,BE"],
  ["Bruges,BE", "Ghent,BE"],
  ["Ghent,BE", "Antwerp,BE"],
  ["Antwerp,BE", "Lille"],

  ["Paris", "Briançon"],
  ["Briançon", "Lyon"],
  ["Lyon", "Paris"],

  ["Paris", "Strasbourg"],
  ["Strasbourg", "Baden-Baden,DE"],
  ["Strasbourg", "Colmar"],

  ["Paris", "Barcelona,ES"],
  ["Barcelona,ES", "Valencia,ES"],
  ["Valencia,ES", "Montpellier"],
  ["Montpellier", "Paris"],
  ["Montpellier", "Marseille"],
  ["Montpellier", "Toulouse"],
  ["Toulouse", "Souillac"],
  ["Souillac", "Paris"],
  ["Montpellier", "Bézier"],
  ["Bézier", [45.125436, 2.9779866]],
  [[45.125436, 2.9779866], "Clermont-Ferrand"],
  ["Clermont-Ferrand", "Sancerre"],
  ["Paris", "Sancerre"],
  ["Montpellier", "Montélimar"],
  ["Montpellier", "Perpignan"],
  ["Perpignan", [42.5917652, 2.3681923]],
  [
    [42.5917652, 2.3681923],
    [42.4593287, 1.9027648],
  ],
  [[42.4593287, 1.9027648], "Toulouse"],
  ["Toulouse", "Saint-Gaudens"],

  ["Toulouse", "Bordeaux"],
  ["Bordeaux", "Paris"],

  ["Paris", "Tours"],
  ["Tours", "Caen"],
  ["Caen", "Paris"],

  ["Porthsmouth,GB", "Brighton,GB"],
  ["Brighton,GB", "London,GB"],
  ["London,GB", [50.1216615, -5.5333812]],
  [
    [50.1216615, -5.5333812],
    [50.1507111, -5.0558902],
  ],
  [[50.1507111, -5.0558902], "Newquay,GB"],
  ["Newquay,GB", "Bristol,GB"],
  ["Bristol,GB", "Oxford,GB"],
  ["Oxford,GB", "London,GB"],
  ["London,GB", "Edinburgh,GB"],
  ["Edinburgh,GB", "Glasgow,GB"],
  ["Glasgow,GB", "Fort William,GB"],
  ["Glasgow,GB", "London,GB"],

  ["Paris", "Barcelona,ES"],
  ["Barcelona,ES", "Madrid,ES"],
  ["Madrid,ES", "Vigo,ES"],
  ["Vigo,ES", "Porto,PT"],
  ["Porto,PT", "Lisbon,PT"],
  ["Lisbon,PT", "Faro,PT"],
  ["Lisbon,PT", "Badajoz,ES"],
  ["Badajoz,ES", "Madrid,ES"],
  ["Madrid,ES", "Barcelona,ES"],
  ["Barcelona,ES", "Paris"],
  ["Paris", "Tours,FR"],

  ["Paris", "Dusseldorf,DE"],
  ["Dusseldorf,DE", "Hamburg,DE"],
  ["Hamburg,DE", "Copenhagen,DK"],
  ["Copenhagen,DK", "Stockholm,SE"],
  ["Stockholm,SE", "Narvik,NO"],
  ["Bodø,NO", "Trondheim,NO"],
  ["Trondheim,NO", "Oslo,NO"],
  ["Oslo,NO", "Bergen,NO"],
  ["Oslo,NO", "Stockholm,SE"],

  ["Hamburg,DE", "Berlin,DE"],

  ["Berlin,DE", "Vienna,AT"],

  ["Vienna,AT", "Paris"],

  ["Berlin,DE", "Leipzig,DE"],

  ["Paris", "Antwerp,BE"],
  ["Antwerp,BE", "Amsterdam,NL"],
  ["Amsterdam,NL", "Berlin,DE"],
];

const TRIPS_BOAT = [
  ["Portsmouth,GB", "Ouiestham,FR"],
  ["Marseille", "Ajaccio"],
];

const processCities = async () => {
  const citiesCoordinates = CITIES.map(({ name, days }) => {
    const [lat, lng] = findLocation(name);

    return { lat, lng, days, city: name };
  });

  await fs.writeJSON("cities.json", citiesCoordinates);
};

const getTrainTripFeatures = async ({
  originLat,
  originLng,
  destinationLat,
  destinationLng,
  tries = 0,
}) => {
  if (tries > 3) {
    throw new Error("Too many tries");
  }

  try {
    const featureRaw = await fetch(
      `https://trainmap.ntag.fr/api/route?dep=${originLng},${originLat}&arr=${destinationLng},${destinationLat}`
    );
    const feature = await featureRaw.json();
    return feature;
  } catch (e) {
    return getTrainTripFeatures({
      originLat: originLat + Math.random() / 50,
      originLng: originLng + Math.random() / 50,
      destinationLat: destinationLat + Math.random() / 50,
      destinationLng: destinationLng + Math.random() / 50,
      tries: tries + 1,
    });
  }
};

const processTrips = async () => {
  const features = [];
  for (const trip of TRIPS_TRAIN) {
    const [from, to] = trip;
    const [originLat, originLng] = findLocation(from);
    const [destinationLat, destinationLng] = findLocation(to);

    try {
      console.log(from, to);
      const feature = await getTrainTripFeatures({
        originLat,
        originLng,
        destinationLat,
        destinationLng,
      });
      feature.properties = {
        trip: `${from} → ${to}`,
      };
      features.push(feature);
    } catch (e) {
      console.log("Failing trip for:", from, to);
      console.error(e);
    }
  }

  for (const trip of TRIPS_BOAT) {
    const [from, to] = trip;
    const [originLat, originLng] = findLocation(from);
    const [destinationLat, destinationLng] = findLocation(to);

    const feature = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [originLng, originLat],
          [destinationLng, destinationLat],
        ],
      },
      properties: {
        trip: `${from} → ${to}`,
      },
    };

    features.push(feature);
  }

  await fs.writeJSON("trips.json", {
    type: "FeatureCollection",
    features: features,
  });
};

const main = async () => {
  await processCities();
  await processTrips();
};

main();
