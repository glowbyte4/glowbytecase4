import React from "react";
import {
  FeatureGroup,
  LayersControl,
  Map,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";

import { getEnemies, getMap } from "../../api/mapApi";
import { useQuery } from "react-query";

const MapContainer = ({ center, position, mapRef, handleClick }) => {
  const { isLoading, error, data } = useQuery("fetchMapData", getMap);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error" + error.message;
  }

  const userMarker = position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;

  const enemies = getEnemies();

  return (
    <Map
      center={center}
      zoom={15}
      ref={mapRef}
      onClick={handleClick}
      doubleClickZoom={false}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
      />
      {userMarker}
      <LayersControl>
        <LayersControl.Overlay name="Плотность">
          <FeatureGroup color="purple">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={Object.values(data.data).map((building) => ({
                center_lng: building.center[0],
                center_lat: building.center[1],
              }))}
              longitudeExtractor={(point) => point.center_lng}
              latitudeExtractor={(point) => point.center_lat}
              intensityExtractor={() => 1}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Конкуренты">
          <FeatureGroup color="purple">
            {enemies.map((enemy) => (
              <Marker
                position={[
                  enemy["geometry.location.lat"],
                  enemy["geometry.location.lng"],
                ]}
                key={enemy["place_id"]}
              >
                <Popup>
                  <div>
                    <p>Название: {enemy["retailer"]}</p>
                    <p>Адрес: {enemy["formatted_address"]}</p>
                    <p>Рейтинг: {enemy["rating"]}</p>
                    {enemy["price_level"] && (
                      <p>Уровень цен: {enemy["price_level"]}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  );
};

export default MapContainer;
