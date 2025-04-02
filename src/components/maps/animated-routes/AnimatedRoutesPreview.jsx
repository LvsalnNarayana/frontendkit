import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { PathLayer } from "@deck.gl/layers";
import { ScenegraphLayer } from "@deck.gl/mesh-layers";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import TripBuilder from "./trip-builder";
// Environment variables with fallbacks
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || "";
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID || "";
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/google-3d/trips.json";
const MODEL_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/google-3d/truck.gltf";

const startAnimation = (map, overlay, data, options) => {
  const trips = data.map(
    (waypoints) => new TripBuilder({ waypoints, loop: true })
  );
  let timestamp = 0;
  let animation = null;

  console.log("Starting animation with trips:", trips);

  const onAnimationFrame = () => {
    timestamp += 0.02;

    const frame = trips.map((trip) => trip.getFrame(timestamp));

    // Set the camera to follow the first truck
    if (options.tracking) {
      map.moveCamera({
        center: { lat: frame[0].point[1], lng: frame[0].point[0] },
        heading: frame[0].heading,
        zoom: 21,
      });
    }

    const layers = [
      options.showPaths &&
        new PathLayer({
          id: "trip-lines",
          data: trips,
          getPath: (d) => d.keyframes.map((f) => f.point),
          getColor: (_) => [128 * Math.random(), 255 * Math.random(), 255],
          jointRounded: true,
          opacity: 0.5,
          getWidth: 0.5,
        }),
      new ScenegraphLayer({
        id: "truck",
        data: frame,
        scenegraph: MODEL_URL,
        sizeScale: 2,
        getPosition: (d) => d.point,
        getTranslation: [0, 0, 1],
        getOrientation: (d) => [0, 180 - d.heading, 90],
        _lighting: "pbr",
      }),
    ];
    overlay.setProps({ layers });

    animation = requestAnimationFrame(onAnimationFrame);
  };
  onAnimationFrame();

  return () => cancelAnimationFrame(animation);
};
const AnimatedRoutesPreview = ({
  options = { tracking: true, showPaths: true },
}) => {
  const containerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null); // Added for error display

  useEffect(() => {
    if (!containerRef.current) {
      console.error("Container ref is not yet available");
      setError("Map container not found");
      return;
    }
    const initializeMap = async () => {
      try {
        if (!GOOGLE_MAPS_API_KEY) {
          throw new Error("Google Maps API Key is missing");
        }

        console.log("Loading Google Maps API...");
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: "3.57",
        });
        const googlemaps = await loader.importLibrary("maps");

        if (!googlemaps || !googlemaps.Map) {
          throw new Error("Google Maps library failed to load");
        }

        console.log("Google Maps loaded successfully", googlemaps);

        const mapInstance = new googlemaps.Map(containerRef.current, {
          center: { lng: -95.36403, lat: 29.756433 },
          zoom: 19,
          heading: 0,
          tilt: 70,
          isFractionalZoomEnabled: true,
          mapId: GOOGLE_MAP_ID || undefined,
          mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "terrain"],
          },
          streetViewControl: false,
          disableDefaultUI: true,
        });

        console.log("Map instance created:", mapInstance);

        setMap(mapInstance);
      } catch (err) {
        console.error("Map initialization error:", err);
        setError(err.message || "Failed to initialize map");
      }
    };

    initializeMap();

    return () => {
      setMap(null);
      setError(null); // Clear error on cleanup
    };
  }, []); // Empty dependency array since options isn't used

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.error("Data fetching error:", err);
        setError(err.message || "Failed to fetch data");
        return [];
      }
    };
    if (map) {
      const overlay = new GoogleMapsOverlay({});
      overlay.setMap(map);
      console.log("Overlay set on map");
      fetchData().then((data) => {
        if (data.length > 0) {
          const stopAnimation = startAnimation(map, overlay, data, options);
          return stopAnimation;
        }
      });
    }
  }, [map, options]);
  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default AnimatedRoutesPreview;
