import * as stations from "../data/moscow_metro";
import * as enemies from "../data/enemies";
import * as builds from "../data/build2.json";
import * as rent_info from "../data/rent_list.json";
import * as rating from "../data/corr_ratings250meters.json";
import * as school from "../data/moscow_school.json";

import { flatten, uniqBy } from "lodash";

export function getBuildings() {
  return builds.default;
}

export function getStations() {
  return uniqBy(
    flatten(stations.default.lines.map((line) => line.stations)),
    "name"
  ).sort((a, b) => (a.name > b.name ? 1 : -1));
}

export function getEnemies() {
  return enemies.default;
}

export function getSchools() {
  return school.default;
}

export function getRatings() {
  return rating.default;
}

export function getRentInfo() {
  return rent_info.default;
}
