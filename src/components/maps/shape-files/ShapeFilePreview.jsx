import React, { useEffect, useState } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { load } from "@loaders.gl/core";
import { ShapefileLoader } from "@loaders.gl/shapefile";

const ShapeRenderer = ({ features }) => {
  const map = useMap();
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    if (!map || !features.length) return;

    const polygons = [];

    features.forEach((feature) => {
      const { geometry, properties } = feature;
      if (!geometry || !geometry.coordinates) return;

      // Common event handler for tooltip
      const handleMouseOver = (e) => {
        const content = `<div style="font-size:14px;"><b>${
          properties.name || "Region"
        }</b></div>`;
        if (!infoWindow) {
          const iw = new window.google.maps.InfoWindow({
            content,
            position: e.latLng,
          });
          iw.open({ map });
          setInfoWindow(iw);
        } else {
          infoWindow.setContent(content);
          infoWindow.setPosition(e.latLng);
          infoWindow.open({ map });
        }
      };

      const handleMouseOut = () => {
        if (infoWindow) infoWindow.close();
      };

      // Handle Polygon
      if (geometry.type === "Polygon") {
        const paths = geometry.coordinates.map((ring) =>
          ring.map(([lng, lat]) => ({ lat, lng }))
        );

        const polygon = new window.google.maps.Polygon({
          paths,
          map,
          strokeColor: "#ff0000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#ff9999",
          fillOpacity: 0.35,
        });

        polygon.addListener("mouseover", handleMouseOver);
        polygon.addListener("mouseout", handleMouseOut);

        polygons.push(polygon);
      }

      // Handle MultiPolygon
      if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach((polygonRings) => {
          const paths = polygonRings.map((ring) =>
            ring.map(([lng, lat]) => ({ lat, lng }))
          );

          const polygon = new window.google.maps.Polygon({
            paths,
            map,
            strokeColor: "#336699",
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: "#ff9999",
            fillOpacity: 0.6,
          });

          polygon.addListener("mouseover", handleMouseOver);
          polygon.addListener("mouseout", handleMouseOut);

          polygons.push(polygon);
        });
      }
    });

    // Fit bounds to visible polygons
    const bounds = new window.google.maps.LatLngBounds();
    polygons.forEach((poly) => {
      const path = poly.getPath();
      for (let i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }

    return () => {
      polygons.forEach((poly) => poly.setMap(null));
      if (infoWindow) infoWindow.close();
    };
  }, [map, features, infoWindow]);

  return null;
};

const ShapeFilePreview = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const loadShapefile = async () => {
      try {
        const geojson = await load(
          "/world-administrative-boundaries/world-administrative-boundaries.shp", // ZIP file that includes .shp, .shx, .dbf
          ShapefileLoader,
          {
            shapefile: {
              workerUrl: false,
            },
          }
        );

        console.log("✅ Shapefile features loaded:", geojson.data);
        setFeatures(geojson.data || []);
      } catch (err) {
        console.error("❌ Failed to load shapefile:", err);
      }
    };

    loadShapefile();
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        disableDefaultUI
        style={{ width: "100%", height: "100vh" }}
        minZoom={2}
        maxZoom={20}
        defaultCenter={{ lat: 0, lng: 0 }}
      >
        <ShapeRenderer features={features} />
      </Map>
    </APIProvider>
  );
};

export default ShapeFilePreview;
