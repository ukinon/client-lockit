"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  iconSize: [25, 41],
});

const markerIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=30568&format=png&color=000000",
  iconRetinaUrl:
    "https://img.icons8.com/?size=100&id=30568&format=png&color=000000",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  iconSize: [41, 41],
});

interface Position {
  lat: number;
  lng: number;
}

function LocationMarker() {
  const [position, setPosition] = useState<Position | null>(null);
  const [bbox, setBbox] = useState<string[]>([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), {
        duration: 1,
      });
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <>
      <Marker position={position} icon={customIcon}>
        <Popup>You are here</Popup>
      </Marker>

      <RecenterButton initialPosition={position} />
    </>
  );
}

function RecenterButton({ initialPosition }: { initialPosition: Position }) {
  const map = useMap();

  const handleRecenter = () => {
    map.setView(initialPosition, 25);
  };

  return (
    <button
      onClick={handleRecenter}
      className="absolute z-1000 bottom-10 right-3 bg-orange-400 text-white p-2 rounded-md shadow-md"
      style={{ zIndex: 1000 }}
    >
      Lokasimu
    </button>
  );
}

const MapComponent: React.FC = () => {
  const initialPosition: Position = { lat: 51.505, lng: -0.09 };

  return (
    <MapContainer
      center={initialPosition}
      zoom={25}
      scrollWheelZoom={true}
      style={{ height: "70dvh", width: "100%" }}
      className="rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <Marker
        position={[initialPosition.lat, initialPosition.lng]}
        icon={markerIcon}
      >
        <Popup>
          <div className="flex flex-col">
            <p>Cluster A</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${initialPosition.lat},${initialPosition.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500"
            >
              Navigasi
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
