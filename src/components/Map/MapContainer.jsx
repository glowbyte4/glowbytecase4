import React from "react";
import { FeatureGroup, LayersControl, Map, TileLayer } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";

import * as buildings from "../../data/csvjson.json";
import { getRandomInt } from "../../utils";
import { getMap } from "../../api/mapApi";
import { useQuery } from "react-query";

const MapContainer = ({ points, center }) => {
  const { isLoading, error, data } = useQuery("fetchMapData", getMap);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error" + error.message;
  }

  console.log(data);

  return (
    <Map center={center} zoom={12}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
      />
      <LayersControl>
        <LayersControl.Overlay name="Плотность" checked>
          <FeatureGroup color="purple">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={points}
              longitudeExtractor={(point) => point.center_lng}
              latitudeExtractor={(point) => point.center_lat}
              intensityExtractor={() => getRandomInt(1, 30)}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Конкуренты">
          <FeatureGroup color="purple">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={buildings.default}
              longitudeExtractor={(point) => point.center_lng}
              latitudeExtractor={(point) => point.center_lat}
              intensityExtractor={() => 1}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  );
};

export default MapContainer;
