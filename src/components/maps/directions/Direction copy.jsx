import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState, useCallback } from "react";
import { rendererOptions } from "./directions.config";

// Animation utility function (outside component)
const animateMarker = (
  map,
  marker,
  path,
  steps,
  setCurrentStepIndex,
  currentStepRef
) => {
  let pathIndex = 0;
  let progress = 0;
  const speed = 0.005; // Adjust speed here
  let currentHeading = 0;
  let animationId = null;
  let isDragging = false;

  // Dragging listeners
  const dragStartListener = map.addListener("dragstart", () => {
    isDragging = true;
    if (animationId) cancelAnimationFrame(animationId);
  });

  const dragEndListener = map.addListener("dragend", () => {
    isDragging = false;
    if (!animationId && pathIndex < path.length - 1) {
      animationId = requestAnimationFrame(animate);
    }
  });

  const animate = (timestamp) => {
    if (isDragging) return;

    const deltaTime = timestamp - (animate.lastTimestamp || timestamp);
    animate.lastTimestamp = timestamp;

    if (pathIndex < path.length - 1) {
      progress += speed * deltaTime;

      if (progress >= 1) {
        progress = 0;
        pathIndex++;
        if (pathIndex >= steps[currentStepRef.current]) {
          currentStepRef.current++;
          setCurrentStepIndex(currentStepRef.current);
        }
      }

      if (pathIndex < path.length - 1) {
        const start = path[pathIndex];
        const end = path[pathIndex + 1];
        const lat = start.lat() + (end.lat() - start.lat()) * progress;
        const lng = start.lng() + (end.lng() - start.lng()) * progress;
        const interpolatedPos = new window.google.maps.LatLng(lat, lng);

        const newHeading = window.google.maps.geometry.spherical.computeHeading(
          start,
          end
        );
        const headingDiff = ((newHeading - currentHeading + 540) % 360) - 180;
        currentHeading = (currentHeading + headingDiff * 0.1) % 360;

        marker.setPosition(interpolatedPos); // Update existing marker position
        // Throttle map updates (only update every 100ms)
        const now = Date.now();
        if (!animate.lastUpdate || now - animate.lastUpdate > 100) {
          map.panTo(interpolatedPos);
          if (Math.abs(headingDiff) > 1) map.setHeading(currentHeading);
          if (map.getTilt() !== 45) map.setTilt(45);
          animate.lastUpdate = now;
        }
      }
    } else {
      map.setTilt(0);
      return;
    }

    animationId = requestAnimationFrame(animate);
  };

  // Initialize timestamp for delta calculation
  animate.lastTimestamp = 0;
  animate.lastUpdate = 0;

  // Start animation
  animationId = requestAnimationFrame(animate);

  // Cleanup function
  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    window.google.maps.event.removeListener(dragStartListener);
    window.google.maps.event.removeListener(dragEndListener);
  };
};

const Direction = ({ mapId }) => {
  const map = useMap(mapId);
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  const [marker, setMarker] = useState(null); // Single marker instance
  const [path, setPath] = useState([]);
  const currentStepRef = useRef(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const animationCleanupRef = useRef(null);

  // Initialize the marker once when the map is available
  useEffect(() => {
    if (!map || marker) return; // Only create marker if it doesn’t exist

    const initialMarker = new window.google.maps.Marker({
      position: null, // Position will be set later
      map,
      title: "Moving Marker",
      icon: {
        url: "/location.png",
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });
    setMarker(initialMarker);

    return () => {
      initialMarker.setMap(null); // Cleanup marker on unmount
    };
  }, [map]);

  const startAnimation = useCallback(() => {
    if (!leg || !leg.steps || !map || !marker) return;

    const newPath = [];
    const steps = leg.steps.reduce((acc, step, index) => {
      acc[index] = (index === 0 ? 0 : acc[index - 1]) + step.path.length;
      return acc;
    }, {});
    leg.steps.forEach((step) => newPath.push(...step.path));
    const densePath = [];
    for (let i = 0; i < newPath.length - 1; i++) {
      const start = newPath[i];
      const end = newPath[i + 1];
      const stepsBetween = 1; // Number of intermediate points
      for (let j = 0; j <= stepsBetween; j++) {
        const t = j / stepsBetween;
        const lat = start.lat() + (end.lat() - start.lat()) * t;
        const lng = start.lng() + (end.lng() - start.lng()) * t;
        densePath.push(new window.google.maps.LatLng(lat, lng));
      }
    }
    console.log(densePath);

    setPath(densePath);

    // Set initial position instead of creating a new marker
    marker.setPosition(densePath[0]);
    marker.setMap(map); // Ensure marker is visible on the map

    // Clean up previous animation
    if (animationCleanupRef.current) animationCleanupRef.current();

    // Start new animation with the existing marker
    animationCleanupRef.current = animateMarker(
      map,
      marker, // Reuse the existing marker
      densePath,
      steps,
      setCurrentStepIndex,
      currentStepRef
    );
  }, [leg, map, marker]);

  // Initialize DirectionsService and DirectionsRenderer
  useEffect(() => {
    if (!routesLibrary || !map) return;

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer(rendererOptions(map));

    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    service
      .route({
        origin: { lat: 43.6475, lng: -79.381 }, // "100 Front St, Toronto"
        destination: { lat: 43.6568, lng: -79.4094 }, // "500 College St, Toronto"
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        if (response && response.routes && response.routes.length > 0) {
          renderer.setDirections(response);
          renderer.setRouteIndex(0);
          setRoutes(response.routes);
        }
      })
      .catch((error) => console.error("Error fetching directions:", error));

    const listener = renderer.addListener("directions_changed", () => {
      const result = renderer.getDirections();
      if (result) setRoutes(result.routes);
    });

    return () => {
      window.google.maps.event.removeListener(listener);
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  // Start animation when leg changes
  useEffect(() => {
    if (!map || !leg || !marker) return;

    startAnimation();

    return () => {
      if (animationCleanupRef.current) animationCleanupRef.current();
      // No need to remove marker here since it persists
    };
  }, [leg, map, startAnimation, marker]);

  // Update route index
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return null;
};

export default Direction;
