export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

export const MAX_LAT = 55.9,
  MIN_LAT = 55.57,
  MAX_LNG = 37.97,
  MIN_LNG = 37.37;

export const generateRandomPoints = () => {
  const number = getRandomInt(200, 500);
  let newPoints = [];
  for (let i = 0; i < number; i++) {
    const lat = getRandomFloat(MIN_LAT, MAX_LAT);
    const lng = getRandomFloat(MIN_LNG, MAX_LNG);
    newPoints.push({ center_lat: lat, center_lng: lng, id: i });
  }

  return newPoints;
};
