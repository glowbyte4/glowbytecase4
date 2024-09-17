import React, { useCallback, useRef, useState, useEffect } from "react";

import "antd/dist/antd.css";

import Filters from "./components/Filters/Filters";
import MapContainer from "./components/Map/MapContainer";
import "./App.css";
import {
  getStations,
  getEnemies,
  getBuildings,
  getSchools,
  getRatings,
  getRentInfo,
} from "./api/mapApi";
import Tour from "reactour";

const steps = [
  {
    selector: ".leaflet-control-layers.leaflet-control",
    content: "This is my first Step",
  },
];

export default function App() {
  const moscow = [55.75396, 37.620393];
  const [center, setCenter] = useState(moscow);
  const [position, setPosition] = useState();
  const [enemies, setEnemies] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [schools, setSchools] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [rentInfo, setRentInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRentInfo();
      console.log(Object.values(data));
      setRentInfo(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRatings();
      setRatings(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSchools();
      setSchools(Object.values(data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getEnemies();
      setEnemies(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBuildings();
      setBuildings(data);
    };
    fetchData();
  }, []);

  const mapRef = useRef();

  const handleClick = useCallback((event) => {
    const map = mapRef.current;
    if (map != null) {
      setPosition(event.latlng);
      setCenter(event.latlng);
    }
  }, []);

  const stations = getStations();

  const onFiltersChange = useCallback(
    (values) => {
      const { station } = values;
      if (station) {
        const stationData = stations.find((s) => station === s.id);
        if (!stationData) {
          return;
        }
        setCenter([stationData.lat, stationData.lng]);
        setPosition(undefined);
      }
    },
    [stations]
  );

  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsTourOpen(true), 3000);
  }, []);

  return (
    <>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
      <Filters onFiltersChange={onFiltersChange} stations={stations} />
      <MapContainer
        position={position}
        mapRef={mapRef}
        handleClick={handleClick}
        center={center}
        enemies={enemies}
        buildings={buildings}
        schools={schools}
        ratings={ratings}
        rentInfo={rentInfo}
      />
    </>
  );
}
