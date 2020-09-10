import axios from "axios";
import * as stations from "../data/moscow_metro";
import { flatten, uniqBy } from "lodash";

export function getBuildings() {
  return axios.get("http://127.0.0.1:5000/get_buildings");
}

export function getStations() {
  return uniqBy(
    flatten(stations.default.lines.map((line) => line.stations)),
    "name"
  ).sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function getEnemies() {
  return axios.get("http://127.0.0.1:5000/get_competitors");
}

export function getSchools() {
  return axios.get("http://127.0.0.1:5000/get_schools");
}

export function getRatings() {
  return axios.get("http://127.0.0.1:5000/get_ratings");
}