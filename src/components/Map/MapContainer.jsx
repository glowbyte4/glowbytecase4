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
import { greenIcon, orangeIcon, violetIcon } from "../../data/markers";

const MapContainer = ({
  center,
  position,
  mapRef,
  handleClick,
  enemies,
  buildings,
  schools,
  ratings,
  rentInfo,
}) => {
  const userMarker = position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;

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
        <LayersControl.Overlay name="Рекомендации">
          <FeatureGroup color="green">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={ratings.map((item) => ({
                center_lng: item.center[1],
                center_lat: item.center[0],
                weight: item.weight,
              }))}
              longitudeExtractor={(point) => point.center_lng}
              latitudeExtractor={(point) => point.center_lat}
              intensityExtractor={(point) => point.weight}
              radius={200}
              blur={250}
              max={7}
              maxZoom={18}
              gradient={{ 0.4: "#c030c6", 0.8: "#3839a5", 1.0: "#59fac6" }}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Плотность">
          <FeatureGroup color="purple">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={Object.values(buildings).map((building) => ({
                center_lng: building.center_lng,
                center_lat: building.center_lat,
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
                icon={violetIcon}
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
        <LayersControl.Overlay name="Школы">
          <FeatureGroup color="purple">
            {schools.map((school) => (
              <Marker
                position={[school["lattitude"], school["longitude"]]}
                key={school["adress"]}
                icon={orangeIcon}
              >
                <Popup>
                  <div>
                    <p>Название: {school["name"]}</p>
                    <p>Адрес: {school["adress"]}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Объявления">
          <FeatureGroup color="purple">
            {rentInfo.map((rent) => (
              <Marker
                position={[rent["lat"], rent["long"]]}
                key={rent["id"]}
                icon={greenIcon}
              >
                <Popup>
                  <div>
                    <p>Адрес: {rent["adr"]}</p>
                    <p>Метро: {rent["metro"]}</p>
                    <p>Цена: {rent["price"]}</p>
                    <p>Площадь: {rent["square"]}</p>
                    <p>Ссылка: {rent["link"]}</p>
                    <p>Телефон: {rent["phones"]}</p>
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
