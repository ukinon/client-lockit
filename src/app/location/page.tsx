"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Position {
  lat: number;
  lng: number;
}

interface UpdateLocationProps {
  position: Position;
  heading: number;
}

const UpdateLocation: React.FC<UpdateLocationProps> = ({
  position,
  heading,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView([position.lat, position.lng], map.getZoom(), {
      animate: true,
    });

    const radians = (Math.PI / 180) * heading;
    const radius = 0.0005;
    const endLat = position.lat + radius * Math.cos(radians);
    const endLng = position.lng + radius * Math.sin(radians);

    const polyline = L.polyline(
      [
        [position.lat, position.lng],
        [endLat, endLng],
      ],
      { color: "blue", weight: 4 }
    ).addTo(map);

    const circleMarker = L.circleMarker([position.lat, position.lng], {
      radius: 5,
      fillColor: "#3388ff",
      color: "#3388ff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map);

    return () => {
      map.removeLayer(polyline);
      map.removeLayer(circleMarker); // Ensure to remove the CircleMarker on cleanup
    };
  }, [position, heading, map]);

  return null;
};

const Page: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    lat: 51.505,
    lng: -0.09,
  });
  const [heading, setHeading] = useState<number>(0);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setHeading(position.coords.heading || 0);
        },
        (error) => {
          console.error("Error obtaining location", error);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">LockIt Terdekat</h1>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={30}
        scrollWheelZoom={true}
        className="h-screen rounded-lg"
        style={{ height: "75dvh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleMarker
          center={[position.lat, position.lng]}
          radius={5}
          fillColor="blue"
          color="blue"
        />
        <UpdateLocation position={position} heading={heading} />
      </MapContainer>
    </div>
  );
};

export default Page;
