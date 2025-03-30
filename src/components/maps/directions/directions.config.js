/**
 * Configures rendering options for the Google Maps DirectionsRenderer.
 * This function returns an object that customizes how directions are displayed on the map,
 * including route appearance, interactivity, and UI elements. It accepts parameters to override
 * default settings for flexibility.
 *
 * Note: To style alternate routes in a different color (e.g., light blue), additional logic is
 * required in the DirectionsRenderer setup (outside this function) as this config applies
 * a single polyline style to all routes. See DirectionsContextProvider for implementation.
 *
 * @param {google.maps.Map} map - The Google Maps instance to render directions on.
 * @param {Object} [options] - Optional configuration overrides.
 * @param {boolean} [options.draggableRoutes=true] - Enables/disables route dragging.
 * @param {boolean} [options.draggableMarkers=true] - Enables/disables marker dragging.
 * @param {string} [options.strokeColor="#1a73e8"] - Color of the primary route polyline.
 * @param {number} [options.strokeWeight=6] - Thickness of the route polyline.
 * @param {string} [options.markerIconUrl="/location.png"] - URL for the custom marker icon.
 * @param {number} [options.markerIconWidth=40] - Width of the marker icon in pixels.
 * @param {number} [options.markerIconHeight=40] - Height of the marker icon in pixels.
 * @param {boolean} [options.suppressMarkers=false] - Hides default markers if true.
 * @param {boolean} [options.showAlternateRoutes=true] - Shows alternate routes in the panel if true.
 * @returns {google.maps.DirectionsRendererOptions} - Options for the DirectionsRenderer.
 */
export const rendererOptions = (
  map,
  {
    draggableRoutes = true,
    draggableMarkers = true,
    strokeColor = "#1a73e8", // Primary route color
    strokeWeight = 6,
    markerIconUrl = "/location.png",
    markerIconWidth = 40,
    markerIconHeight = 40,
    suppressMarkers = false,
    showAlternateRoutes = true,
  } = {}
) => {
  console.log(draggableRoutes);
  
  return {
    /**
     * Enables route dragging functionality.
     * When true, users can modify the route by dragging it, allowing for custom path adjustments.
     * Controlled by the draggableRoutes parameter.
     */
    draggable: draggableRoutes,

    /**
     * Controls visibility of route alternatives in the directions panel.
     * When false, alternate routes are hidden; when true, they are shown if provided by DirectionsService.
     * Controlled by the showAlternateRoutes parameter (inverted logic: true means show, false means hide).
     */
    hideRouteList: showAlternateRoutes,

    /**
     * Defines a popup info window for route details.
     * This creates a small window that appears when interacting with the route, displaying custom content.
     */
    infoWindow: new window.google.maps.InfoWindow({
      content: "Route Information",
      maxWidth: 200,
    }),

    /**
     * Associates the renderer with a specific map instance.
     * This ensures the directions are drawn on the provided map object.
     */
    map,

    /**
     * Customizes the appearance and behavior of markers on the route.
     * These settings apply to start, end, and waypoint markers (if any), with draggable behavior
     * controlled by the draggableMarkers parameter.
     */
    markerOptions: {
      draggable: draggableMarkers,
      title: "Custom Marker",
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: markerIconUrl,
        scaledSize: new window.google.maps.Size(markerIconWidth, markerIconHeight),
      },
    },

    /**
     * Specifies the DOM element for displaying step-by-step directions.
     * Links the renderer to an HTML element with id "directions-panel" to show detailed instructions.
     */
    panel: document.getElementById("directions-panel"),

    /**
     * Configures the visual style of the route polyline.
     * This applies to the primary route; alternate routes require custom rendering logic elsewhere
     * (e.g., in DirectionsContextProvider) to use a light blue color (e.g., "#ADD8E6").
     */
    polylineOptions: {
      strokeColor, // Primary route color
      strokeWeight,
      strokeOpacity: 1,
      clickable: true,
      visible:true,
      zIndex: 1000,
      icons: [
        {
          icon: {
            path: window.google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            strokeColor,
            scale: 2,
          },
          offset: "100%",
        },
      ],
    },

    /**
     * Controls map viewport behavior when rendering directions.
     * When false, the map automatically zooms and pans to fit the entire route.
     */
    preserveViewport: false,

    /**
     * Selects the default route from available alternatives.
     * Index 0 ensures the first route option is displayed initially.
     */
    routeIndex: 0,

    /**
     * Enables or disables the bicycling layer.
     * When false, bike route overlays are shown if requested, enhancing route context.
     */
    suppressBicyclingLayer: false,

    /**
     * Controls visibility of info windows.
     * When false, info windows (e.g., on route clicks) are allowed to appear.
     */
    suppressInfoWindows: false,

    /**
     * Determines if default markers are displayed.
     * When true, suppresses start/end markers; controlled by the suppressMarkers parameter.
     */
    suppressMarkers: suppressMarkers,

    /**
     * Controls rendering of the route polyline.
     * When false, the route line is drawn on the map as specified by polylineOptions.
     */
    suppressPolylines: false,
  };
};