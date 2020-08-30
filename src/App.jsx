import React, { useCallback, useState } from "react";

import "antd/dist/antd.css";

import Filters from "./components/Filters/Filters";
import {
  generateRandomPoints,
  getRandomFloat,
  MAX_LAT,
  MAX_LNG,
  MIN_LAT,
  MIN_LNG,
} from "./utils";
import MapContainer from "./components/Map/MapContainer";
import "./App.css";

export default function App() {
  const moscow = [55.75396, 37.620393];
  const [center, setCenter] = useState(moscow);
  const [points, setPoints] = useState(generateRandomPoints());

  const onFiltersChange = useCallback(() => {
    setPoints(generateRandomPoints());
    setCenter([
      getRandomFloat(MIN_LAT, MAX_LAT),
      getRandomFloat(MIN_LNG, MAX_LNG),
    ]);
  }, []);

  return (
    <>
      <Filters onFiltersChange={onFiltersChange} />
      <MapContainer points={points} center={center} />
    </>
  );
}
