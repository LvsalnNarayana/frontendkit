import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { rendererOptions } from "./directions.config";

/**
 * Animates a marker along a path on the map with smooth interpolation and heading adjustments.
 * @param {google.maps.Map} map - The map instance.
 * @param {google.maps.Marker} marker - The marker to animate.
 * @param {google.maps.LatLng[]} path - The path to animate along.
 * @param {Object} steps - Step indices for path segments.
 * @param {Function} setCurrentStepIndex - Updates the current step index.
 * @param {Object} currentStepRef - Reference to the current step index.
 * @param {Object} isPausedRef - Reference to pause state.
 * @returns {Function} Cleanup function to stop animation.
 */
const animateMarker = (
  map,
  marker,
  path,
  steps,
  setCurrentStepIndex,
  currentStepRef,
  isPausedRef
) => {
  let pathIndex = 0;
  let progress = 0;
  const speed = 0.005; // Animation speed (adjustable)
  let currentHeading = 0;
  let animationId = null;
  let isDragging = false;

  const dragStartListener = map.addListener("dragstart", () => {
    isDragging = true;
    if (animationId) cancelAnimationFrame(animationId);
  });

  const dragEndListener = map.addListener("dragend", () => {
    isDragging = false;
    if (!isPausedRef.current && !animationId && pathIndex < path.length - 1) {
      animationId = requestAnimationFrame(animate);
    }
  });

  const animate = (timestamp) => {
    if (isDragging || isPausedRef.current) return;

    const deltaTime = timestamp - (animate.lastTimestamp || timestamp);
    animate.lastTimestamp = timestamp;

    if (pathIndex < path.length - 1) {
      progress += speed * deltaTime;

      if (progress >= 1) {
        progress = 0;
        pathIndex++;
        if (pathIndex >= steps[currentStepRef.current]) {
          currentStepRef.current++;
          setCurrentStepIndex(currentStepRef.current); // Update state
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

        marker.setPosition(interpolatedPos);

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

  animate.lastTimestamp = 0;
  animate.lastUpdate = 0;
  animationId = requestAnimationFrame(animate);

  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    window.google.maps.event.removeListener(dragStartListener);
    window.google.maps.event.removeListener(dragEndListener);
  };
};

const DirectionsContext = createContext("directions");

const DirectionsContextProvider = ({ children, mapId }) => {
  // Map and library hooks
  const map = useMap(mapId);
  const routesLibrary = useMapsLibrary("routes");

  // Map view state
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default center (India)
  const [zoom, setZoom] = useState(5); // Default zoom level

  // Directions service and renderer
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Route and marker state
  const [startingPoint, setStartingPoint] = useState(null); // Starting location
  const [destinationPoint, setDestinationPoint] = useState(null); // Destination location
  const [startingMarker, setStartingMarker] = useState(null); // Starting point marker
  const [destinationMarker, setDestinationMarker] = useState(null); // Destination point marker
  const [movingMarker, setMovingMarker] = useState(null); // Animated marker along route

  // Route data
  const [routes, setRoutes] = useState(null); // All available routes
  const [routeIndex, setRouteIndex] = useState(0); // Currently active route index
  const [path, setPath] = useState([]); // Dense path for animation
  const [alternatePolylines, setAlternatePolylines] = useState([]); // Polylines for all routes
  const [startAddress, setStartAddress] = useState(""); // Starting address text
  const [destinationAddress, setDestinationAddress] = useState(""); // Destination address text
  const [directions, setDirections] = useState([]); // Step-by-step directions
  const [distance, setDistance] = useState(null); // Total distance
  const [duration, setDuration] = useState(null); // Total duration

  // Animation state
  const [animationState, setAnimationState] = useState("stopped"); // "stopped", "running", "paused"
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Current step in animation
  const animationCleanupRef = useRef(null); // Cleanup function for animation
  const isPausedRef = useRef(false); // Pause state ref
  const currentStepRef = useRef(0); // Current step ref for animation
  const [speed, setSpeed] = useState(0.05); // Animation speed (not yet dynamic in animateMarker)

  // Configuration state
  const [draggableRoutes, setDraggableRoutes] = useState(true); // Allow route dragging
  const [draggableMarkers, setDraggableMarkers] = useState(true); // Allow marker dragging
  const [showAlternateRoutes, setShowAlternateRoutes] = useState(true); // Show alternate routes
  const [routeColor, setRouteColor] = useState("#1a73e8"); // Primary route color

  const leg = routes?.[routeIndex]?.legs[0]; // Current route leg

  // Initialize moving marker
  useEffect(() => {
    if (!map || movingMarker) return;

    const newMarker = new window.google.maps.Marker({
      position: null,
      map,
      title: "Moving Marker",
      icon: {
        url: "/location.png",
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });
    setMovingMarker(newMarker);

    return () => newMarker.setMap(null);
  }, [map, movingMarker]);

  // Initialize DirectionsService and DirectionsRenderer
  useEffect(() => {
    if (!routesLibrary || !map) return;

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer(
      rendererOptions(map, {
        draggableRoutes,
        draggableMarkers,
        strokeColor: routeColor,
        suppressMarkers: true, // Always suppress renderer markers (using custom ones)
        showAlternateRoutes,
      })
    );

    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    const listener = renderer.addListener("directions_changed", () => {
      const result = renderer.getDirections();
      if (result) setRoutes(result.routes);
    });
    return () => {
      window.google.maps.event.removeListener(listener);
      renderer.setMap(null);
    };
  }, [
    routesLibrary,
    map,
    draggableRoutes,
    draggableMarkers,
    routeColor,
    showAlternateRoutes,
  ]);

  // Fetch directions and render routes
  // Helper function to fetch directions with explicit points
  const fetchDirectionsWithNewPoint = useCallback(
    (start, dest) => {
      console.log("fetchDirectionsWithNewPoint:", { start, dest });
      if (!directionsService || !start || !dest) return;

      const startLat = start.geometry.location.lat();
      const startLng = start.geometry.location.lng();
      const destLat = dest.geometry.location.lat();
      const destLng = dest.geometry.location.lng();
      console.log({ startLat, startLng, destLat, destLng });

      // Clear existing polylines
      alternatePolylines.forEach((polyline) => polyline.setMap(null));
      setAlternatePolylines([]);

      directionsService
        .route({
          origin: { lat: startLat, lng: startLng },
          destination: { lat: destLat, lng: destLng },
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: showAlternateRoutes,
        })
        .then((response) => {
          if (response && response.routes.length > 0) {
            directionsRenderer.setOptions({
              map,
              draggable: draggableRoutes,
              polylineOptions: {
                strokeColor: routeColor,
                strokeWeight: 6,
                strokeOpacity: 1,
                draggable: draggableRoutes,
              },
              suppressPolylines: false,
            });
            directionsRenderer.setDirections(response);

            setRoutes(response.routes);
            setRouteIndex(0);
            setDistance(response.routes[0].legs[0].distance.text);
            setDuration(response.routes[0].legs[0].duration.text);
            setStartAddress(response.routes[0].legs[0].start_address);
            setDestinationAddress(response.routes[0].legs[0].end_address);
            setDirections(response.routes[0].legs[0].steps);
            console.log("check");

            const dragListener = directionsRenderer.addListener(
              "directions_changed",
              () => {
                const newDirections = directionsRenderer.getDirections();
                if (newDirections && newDirections.routes.length > 0) {
                  const newRoute = newDirections.routes[0];
                  setRoutes(newDirections.routes);
                  setDistance(newRoute.legs[0].distance.text);
                  setDuration(newRoute.legs[0].duration.text);
                  setStartAddress(newRoute.legs[0].start_address);
                  setDestinationAddress(newRoute.legs[0].end_address);
                  setDirections(newRoute.legs[0].steps);

                  const newStart = newRoute.legs[0].start_location;
                  const newEnd = newRoute.legs[0].end_location;
                  setStartingPoint({ geometry: { location: newStart } });
                  setDestinationPoint({ geometry: { location: newEnd } });
                  if (startingMarker) startingMarker.setPosition(newStart);
                  if (destinationMarker) destinationMarker.setPosition(newEnd);
                }
              }
            );

            setAlternatePolylines([]);
            return () => window.google.maps.event.removeListener(dragListener);
          }
        })
        .catch((error) => console.error("Error fetching directions:", error));
    },
    [
      directionsService,
      showAlternateRoutes,
      directionsRenderer,
      map,
      routeColor,
      alternatePolylines,
      startingMarker,
      destinationMarker,
    ]
  );

  // Update fetchDirections to use the helper
  const fetchDirections = useCallback(() => {
    console.log("check-2");
    console.log(startingPoint);
    console.log(destinationPoint);
    fetchDirectionsWithNewPoint(startingPoint, destinationPoint);
  }, [startingPoint, destinationPoint, fetchDirectionsWithNewPoint]);

  // Set starting place and marker
  const setStartingPlace = useCallback(
    (place) => {
      if (!map) return;

      if (place) {
        setStartingPoint(place);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Adjust map view
        if (place && destinationPoint) {
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(place.geometry.location);
          bounds.extend(destinationPoint.geometry.location);
          const midLat =
            (place.geometry.location.lat() +
              destinationPoint.geometry.location.lat()) /
            2;
          const midLng =
            (place.geometry.location.lng() +
              destinationPoint.geometry.location.lng()) /
            2;
          map.fitBounds(bounds);
          map.setCenter({ lat: midLat, lng: midLng });
        } else {
          map.setCenter({ lat, lng });
          map.setZoom(15);
        }

        // Set draggable starting marker
        if (draggableMarkers) {
          if (startingMarker) startingMarker.setMap(null);
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: "Starting Point",
            draggable: true,
            icon: {
              url: "/location.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });
          setStartingMarker(marker);

          // Listener to update position and fetch directions on drag end
          const geocoder = new window.google.maps.Geocoder();
          const dragListener = marker.addListener("dragend", () => {
            const newPos = marker.getPosition();
            geocoder.geocode({ location: newPos }, (results, status) => {
              if (status === "OK" && results[0]) {
                console.log("New Location:", results[0]);
                setStartingPoint(results[0]); // Update startingPoint with full place details
                if (destinationPoint)
                  fetchDirectionsWithNewPoint(results[0], destinationPoint);
              } else {
                console.error("Geocode failed:", status);
              }
            });
          });

          return () => window.google.maps.event.removeListener(dragListener);
        }
      }
    },
    [
      map,
      destinationPoint,
      draggableMarkers,
      startingMarker,
      fetchDirectionsWithNewPoint,
    ]
  );
  // Set destination place and marker
  const setDestinationPlace = useCallback(
    (place) => {
      if (!map) return;

      // If place is provided (initial set), update state and fetch directions
      if (place) {
        setDestinationPoint(place);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Adjust map view
        if (startingPoint && place) {
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(startingPoint.geometry.location);
          bounds.extend(place.geometry.location);
          const midLat =
            (startingPoint.geometry.location.lat() +
              place.geometry.location.lat()) /
            2;
          const midLng =
            (startingPoint.geometry.location.lng() +
              place.geometry.location.lng()) /
            2;
          map.fitBounds(bounds);
          map.setCenter({ lat: midLat, lng: midLng });
        } else {
          map.setCenter({ lat, lng });
          map.setZoom(15);
        }

        // Set draggable destination marker
        if (draggableMarkers) {
          if (destinationMarker) destinationMarker.setMap(null);
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: "Destination Point",
            draggable: true,
            icon: {
              url: "/location.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });
          setDestinationMarker(marker);

          // Listener to update position and fetch directions on drag end
          const geocoder = new window.google.maps.Geocoder();
          const dragListener = marker.addListener("dragend", () => {
            const newPos = marker.getPosition();
            console.log({ lat: newPos.lat(), lng: newPos.lng() });
            geocoder.geocode({ location: newPos }, (results, status) => {
              if (status === "OK" && results[0]) {
                console.log("New Location:", results[0]);
                setDestinationPoint(results[0]); // Update state
                if (startingPoint) {
                  console.log("yoo");
                  // Pass the new destination directly to fetchDirections
                  fetchDirectionsWithNewPoint(startingPoint, results[0]);
                }
              } else {
                console.error("Geocode failed:", status);
              }
            });
          });

          return () => window.google.maps.event.removeListener(dragListener);
        }
      }
    },
    [
      map,
      startingPoint,
      draggableMarkers,
      destinationMarker,
      fetchDirectionsWithNewPoint,
    ]
  );

  // Start animation along the current route
  const startAnimation = useCallback(() => {
    if (
      !leg ||
      !leg.steps ||
      !map ||
      !movingMarker ||
      animationState === "running"
    )
      return;

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
      const stepsBetween = 1;
      for (let j = 0; j <= stepsBetween; j++) {
        const t = j / stepsBetween;
        const lat = start.lat() + (end.lat() - start.lat()) * t;
        const lng = start.lng() + (end.lng() - start.lng()) * t;
        densePath.push(new window.google.maps.LatLng(lat, lng));
      }
    }

    setPath(densePath);
    movingMarker.setPosition(densePath[0]);

    if (animationCleanupRef.current) animationCleanupRef.current();
    animationCleanupRef.current = animateMarker(
      map,
      movingMarker,
      densePath,
      steps,
      setCurrentStepIndex,
      currentStepRef,
      isPausedRef
    );
    setAnimationState("running");
  }, [leg, map, movingMarker, animationState]);

  // Pause the current animation
  const pauseAnimation = useCallback(() => {
    if (animationState === "running") {
      isPausedRef.current = true;
      setAnimationState("paused");
    }
  }, [animationState]);

  // Resume paused animation
  const resumeAnimation = useCallback(() => {
    if (animationState !== "paused" || path.length === 0) return;

    isPausedRef.current = false;
    if (animationCleanupRef.current) animationCleanupRef.current();
    animationCleanupRef.current = animateMarker(
      map,
      movingMarker,
      path,
      leg.steps.reduce((acc, step, index) => {
        acc[index] = (index === 0 ? 0 : acc[index - 1]) + step.path.length;
        return acc;
      }, {}),
      setCurrentStepIndex,
      currentStepRef,
      isPausedRef
    );
    setAnimationState("running");
  }, [animationState, path, leg, map, movingMarker]);

  // Stop animation and reset state
  const stopAnimation = useCallback(() => {
    if (animationCleanupRef.current) {
      animationCleanupRef.current();
      animationCleanupRef.current = null;
      setAnimationState("stopped");
      isPausedRef.current = false;
      setCurrentStepIndex(0);
      currentStepRef.current = 0;
      movingMarker.setPosition(null);
    }
  }, [movingMarker]);

  // Set active route and update polyline styles
  const setActiveRoute = useCallback(
    (index) => {
      if (!routes || index < 0 || index >= routes.length) return;

      setRouteIndex(index);
      directionsRenderer.setRouteIndex(index);
      setDistance(routes[index].legs[0].distance.text);
      setDuration(routes[index].legs[0].duration.text);
      setStartAddress(routes[index].legs[0].start_address);
      setDestinationAddress(routes[index].legs[0].end_address);
      setDirections(routes[index].legs[0].steps);

      alternatePolylines.forEach((polyline, i) => {
        if (i === index) {
          polyline.setOptions({
            strokeColor: routeColor,
            strokeWeight: 6,
            strokeOpacity: 1,
            zIndex: 1000,
            icons: [
              {
                icon: {
                  path: window.google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                  strokeColor: routeColor,
                  scale: 2,
                },
                offset: "100%",
              },
            ],
          });
        } else {
          polyline.setOptions({
            strokeColor: "#ADD8E6",
            strokeWeight: 4,
            strokeOpacity: 0.7,
            zIndex: 500,
            icons: [],
          });
        }
      });
    },
    [routes, directionsRenderer, alternatePolylines, routeColor]
  );

  // Clear all directions and reset state
  const clearDirections = useCallback(() => {
    stopAnimation();
    if (directionsRenderer) directionsRenderer.setDirections(null);
    setRoutes(null);
    setRouteIndex(0);
    setStartingPoint(null);
    setDestinationPoint(null);
    setDistance(null);
    setDuration(null);
    setStartAddress("");
    setDestinationAddress("");
    setDirections([]);
    if (startingMarker) startingMarker.setMap(null);
    if (destinationMarker) destinationMarker.setMap(null);
    if (movingMarker) movingMarker.setPosition(null);
    setPath([]);
    alternatePolylines.forEach((polyline) => polyline.setMap(null));
    setAlternatePolylines([]);
  }, [
    directionsRenderer,
    movingMarker,
    startingMarker,
    destinationMarker,
    stopAnimation,
    alternatePolylines,
  ]);

  // Additional method: Reset animation to start
  const resetAnimation = useCallback(() => {
    stopAnimation();
    setPath([]);
    setCurrentStepIndex(0);
    currentStepRef.current = 0;
    if (leg) startAnimation();
  }, [stopAnimation, startAnimation, leg]);

  // Additional method: Update animation speed (not yet implemented in animateMarker)
  const updateSpeed = useCallback((newSpeed) => {
    setSpeed(newSpeed);
    // Note: animateMarker uses a hardcoded speed; refactor it to use this state if needed
  }, []);

  // Auto-start animation when leg changes
  useEffect(() => {
    if (!map || !leg || !movingMarker || animationState !== "stopped") return;
    startAnimation();
  }, [leg, map, movingMarker, animationState, startAnimation]);

  // Context value
  const value = useMemo(
    () => ({
      mapId,
      center,
      setCenter,
      directions,
      setDirections,
      startAddress,
      setStartAddress,
      destinationAddress,
      setDestinationAddress,
      setStartingPlace,
      setDestinationPlace,
      startingMarker,
      destinationMarker,
      setDestinationMarker,
      setStartingMarker,
      zoom,
      setZoom,
      startingPoint,
      setStartingPoint,
      destinationPoint,
      setDestinationPoint,
      fetchDirections,
      routes,
      routeIndex,
      setActiveRoute,
      distance,
      duration,
      draggableRoutes,
      setDraggableRoutes,
      draggableMarkers,
      setDraggableMarkers,
      showAlternateRoutes,
      setShowAlternateRoutes,
      routeColor,
      setRouteColor,
      startAnimation,
      pauseAnimation,
      resumeAnimation,
      stopAnimation,
      resetAnimation,
      updateSpeed,
      clearDirections,
      animationState,
      currentStepIndex,
      speed,
      directionsRenderer,
      map,
    }),
    [
      mapId,
      center,
      directions,
      startAddress,
      destinationAddress,
      setStartingPlace,
      setDestinationPlace,
      startingMarker,
      destinationMarker,
      zoom,
      startingPoint,
      destinationPoint,
      fetchDirections,
      routes,
      routeIndex,
      setActiveRoute,
      distance,
      duration,
      draggableRoutes,
      draggableMarkers,
      showAlternateRoutes,
      routeColor,
      startAnimation,
      pauseAnimation,
      resumeAnimation,
      stopAnimation,
      resetAnimation,
      updateSpeed,
      clearDirections,
      animationState,
      currentStepIndex,
      speed,
      directionsRenderer,
      map,
    ]
  );

  return (
    <DirectionsContext.Provider value={value}>
      {children}
    </DirectionsContext.Provider>
  );
};

export { DirectionsContextProvider, DirectionsContext };
