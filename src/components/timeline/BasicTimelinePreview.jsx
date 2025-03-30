import React, { useEffect, useRef } from "react";
import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data";
// import "vis-timeline/styles/vis-timeline-graph2d.min.css";

const BasicTimelinePreview = () => {
  const timelineRef = useRef(null);
  useEffect(() => {
    if (timelineRef.current && !timelineRef.current.timelineInstance) {
      const items = new DataSet([
        { id: 1, content: "Event 1", start: "2025-03-20" },
        { id: 2, content: "Event 2", start: "2025-03-21" },
        { id: 3, content: "Event 3", start: "2025-03-22" },
      ]);

      const timeline = new Timeline(timelineRef.current, items, {
        min: new Date("2025-03-15"), // Minimum time range
        max: new Date("2025-04-01"), // Maximum time range
        zoomMin: 86400000, // Minimum zoom level (1 day in milliseconds)
        zoomMax: 2592000000, // Maximum zoom level (30 days in milliseconds)
        editable: false, // Disable editing
        selectable: false, // Disable selection
        multiselect: false, // Disable multiselect
        showCurrentTime: false, // Hide current time indicator
        start: new Date("2025-03-20"), // Initial start date
        end: new Date("2025-03-22"), // Initial end date
        

      });

      timelineRef.current.timelineInstance = timeline; // Prevents duplicate initialization
    }
  }, []);

  return (
    <div>
      <div ref={timelineRef} style={{ height: "300px" }}></div>
    </div>
  );
};

export default BasicTimelinePreview;
