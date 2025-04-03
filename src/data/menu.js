import AdvancedMarker from "../pages/maps/AdvancedMarker";
import BasicMap from "../pages/maps/BasicMap";
import BasicMarker from "../pages/maps/BasicMarker";
import GpxVisualization from "../pages/maps/GpxVisualization";
import HeatMaps from "../pages/maps/HeatMaps";
import Directions from "../pages/maps/Directions";
import LexicalEditor from "../pages/text-editors/LexicalEditor";
import LineChart from "../pages/charts/LineChart";
import BarChart from "../pages/charts/BarChart";
import PieChart from "../pages/charts/PieChart";
import AreaChart from "../pages/charts/AreaChart";
import ScatterChart from "../pages/charts/ScatterChart";
import CandleChart from "../pages/charts/CandleChart";
import RadarChart from "../pages/charts/RadarChart";
import GaugeChart from "../pages/charts/GaugeChart";
import BoxPlot from "../pages/charts/BoxPlot";
import HeatMap from "../pages/charts/HeatMap";
import BasicForms from "../pages/forms/BasicForms";
import FormValidations from "../pages/forms/FormValidations";
import FormInputTypes from "../pages/forms/FormInputTypes";
import BasicDnD from "../pages/drag-and-drop/BasicDnD";
import DnDWithHandle from "../pages/drag-and-drop/DnDWithHandle";
import DnDMultiDrop from "../pages/drag-and-drop/DnDMultiDrop";
import DnDSortableList from "../pages/drag-and-drop/DnDSortableList";
import BasicFlow from "../pages/flow/BasicFlow";
import SpreadSheets from "../pages/spread-sheets/SpreadSheets";
import VideoPlayer from "../pages/VideoPlayer/VideoPlayer";
import PdfCreator from "../pages/pdf/PdfCreator";
import GanttChart from "../pages/GanttChart/GanttChart";
import SimpleTable from "../pages/tables/SimpleTable";
import HeaderGrouping from "../pages/tables/HeaderGrouping";
import ColumnFilters from "../pages/tables/ColumnFilters";
import ColumnOrdering from "../pages/tables/ColumnOrdering";
import ColumnPinning from "../pages/tables/ColumnPinning";
import StickyColumn from "../pages/tables/StickyColumn";
import ColumnVisibility from "../pages/tables/ColumnVisibility";
import ColumnFiltering from "../pages/tables/ColumnFiltering";
import GlobalFiltering from "../pages/tables/GlobalFiltering";
import ExpandingSubComponents from "../pages/tables/ExpandingSubComponents";
import EditableData from "../pages/tables/EditableData";
import Pagination from "../pages/tables/Pagination";
import RowDnD from "../pages/tables/RowDnD";
import Sorting from "../pages/tables/Sorting";
import VirtualizedColumns from "../pages/tables/VirtualizedColumns";
import InfiniteScroll from "../pages/tables/InfiniteScroll";
import BasicTimeLine from "../pages/timelinme/BasicTimeLine";
import CodeEditor from "../pages/code-editor/CodeEditor";
import ShapeFile from "../pages/maps/ShapeFile";
import AnimatedRoutes from "../pages/maps/AnimatedRoutes";
import BasicCanvas from "../pages/canvas/BasicCanvas";
import CanvasSprite from "../pages/canvas/CanvasSprite";

const menu = [
  {
    name: "Maps",
    route: "maps",
    children: [
      {
        name: "Basic Map",
        route: "basic-map",
        children: [],
        component: BasicMap,
      },
      {
        name: "Basic Marker",
        route: "basic-marker",
        children: [],
        component: BasicMarker,
      },
      {
        name: "Advanced Marker",
        route: "advanced-marker",
        children: [],
        component: AdvancedMarker,
      },
      { name: "Cluster Markers", route: "cluster-markers", children: [] },
      {
        name: "GPX",
        route: "gpx-visualization",
        children: [],
        component: GpxVisualization,
      },
      {
        name: "Heat Maps",
        route: "heat-maps",
        children: [],
        component: HeatMaps,
      },
      {
        name: "Directions",
        route: "directions",
        children: [],
        component: Directions,
      },
      {
        name: "Shape Files",
        route: "shape-files",
        children: [],
        component: ShapeFile,
      },
      {
        name: "Animated Routes",
        route: "animated-routes",
        children: [],
        component: AnimatedRoutes,
      },
    ],
  },
  {
    name: "Rich Text",
    route: "rich-text",
    children: [
      {
        name: "Lexical Editor",
        route: "lexical",
        children: [],
        component: LexicalEditor,
      },
      {
        name: "Simple Mention",
        route: "simple-mention",
        children: [],
      },
    ],
  },
  {
    name: "Tables",
    route: "tables",
    children: [
      {
        name: "Simple Table",
        route: "simple-table",
        children: [],
        component: SimpleTable,
      },
      {
        name: "Header Grouping",
        route: "header-grouping",
        children: [],
        component: HeaderGrouping,
      },
      {
        name: "Column Filters",
        route: "column-filters",
        children: [],
        component: ColumnFilters,
      },
      {
        name: "Column Ordering",
        route: "column-order",
        children: [],
        component: ColumnOrdering,
      },
      {
        name: "Column Pinning",
        route: "column-pinning",
        children: [],
        component: ColumnPinning,
      },
      {
        name: "Sticky Column",
        route: "sticky-column",
        children: [],
        component: StickyColumn,
      },
      {
        name: "Global Filtering",
        route: "global-filtering",
        children: [],
        component: GlobalFiltering,
      },
      {
        name: "Expanding & Sub Components",
        route: "expansion-components",
        children: [],
        component: ExpandingSubComponents,
      },
      {
        name: "Editable Data",
        route: "editable-data",
        children: [],
        component: EditableData,
      },
      {
        name: "Pagination",
        route: "pagination",
        children: [],
        component: Pagination,
      },
      {
        name: "Row Pinning",
        route: "row-pinning",
        children: [],
        component: Pagination,
      },
      {
        name: "Row Selection",
        route: "row-selection",
        children: [],
        component: Pagination,
      },
      {
        name: "Row DnD",
        route: "row-dnd",
        children: [],
        component: RowDnD,
      },
      {
        name: "Sorting",
        route: "sorting",
        children: [],
        component: Sorting,
      },
      {
        name: "Virtualized Columns",
        route: "virtualized-columns",
        children: [],
        component: VirtualizedColumns,
      },
      {
        name: "Virtualized Rows",
        route: "virtualized-rows",
        children: [],
        component: VirtualizedColumns,
      },
      {
        name: "Infinite Scroll",
        route: "infinite-scroll",
        children: [],
        component: InfiniteScroll,
      },
    ],
  },
  {
    name: "Flow",
    route: "flow",
    children: [
      {
        name: "Basic Flow",
        route: "basic-flow",
        children: [],
        component: BasicFlow,
      },
      {
        name: "Resizable Nodes",
        route: "resizable-nodes",
        children: [],
      },
      {
        name: "Proximity Connect",
        route: "resizable-nodes",
        children: [],
      },
      {
        name: "Drag and Drop",
        route: "drag-and-drop",
        children: [],
      },
      {
        name: "Complex Examples",
        route: "complex-examples",
        children: [],
      },
    ],
  },
  {
    name: "Charts",
    route: "charts",
    children: [
      {
        name: "Line Chart",
        route: "line-chart",
        children: [],
        component: LineChart,
      },
      {
        name: "Bar Chart",
        route: "bar-chart",
        children: [],
        component: BarChart,
      },
      {
        name: "Pie Chart",
        route: "pie-chart",
        children: [],
        component: PieChart,
      },
      {
        name: "Area Chart",
        route: "area-chart",
        children: [],
        component: AreaChart,
      },
      {
        name: "Scatter Chart",
        route: "scatter-chart",
        children: [],
        component: ScatterChart,
      },
      {
        name: "Candle Chart",
        route: "candle-chart",
        children: [],
        component: CandleChart,
      },
      {
        name: "Radar Chart",
        route: "radar-chart",
        children: [],
        component: RadarChart,
      },
      {
        name: "Gauge Chart",
        route: "gauge-chart",
        children: [],
        component: GaugeChart,
      },
      {
        name: "Box Plot Chart",
        route: "box-plot-chart",
        children: [],
        component: BoxPlot,
      },
      {
        name: "Heat Map Chart",
        route: "heat-map-chart",
        children: [],
        component: HeatMap,
      },
      // {
      //   name: "3D Charts",
      //   route: "3d-charts",
      //   children: [
      //     {
      //       name: "3D Line Chart",
      //       route: "3d-line-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Bar Chart",
      //       route: "3d-bar-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Pie Chart",
      //       route: "3d-pie-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Scatter Chart",
      //       route: "3d-scatter-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Surface Chart",
      //       route: "3d-surface-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Radar Chart",
      //       route: "3d-radar-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Heat Map Chart",
      //       route: "3d-heat-map-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Candlestick Chart",
      //       route: "3d-candlestick-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Box Plot Chart",
      //       route: "3d-box-plot-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Bubble Chart",
      //       route: "3d-bubble-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Column Chart",
      //       route: "3d-column-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Donut Chart",
      //       route: "3d-donut-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Funnel Chart",
      //       route: "3d-funnel-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Pyramid Chart",
      //       route: "3d-pyramid-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Treemap Chart",
      //       route: "3d-treemap-chart",
      //       children: [],
      //     },
      //     {
      //       name: "3D Waterfall Chart",
      //       route: "3d-waterfall-chart",
      //       children: [],
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "Forms",
    route: "forms",
    children: [
      {
        name: "Basic Form",
        route: "basic-form",
        children: [],
        component: BasicForms,
      },
      {
        name: "Form Validation",
        route: "form-validation",
        children: [],
        component: FormValidations,
      },
      {
        name: "Form Layouts",
        route: "form-layouts",
        children: [],
        component: FormValidations,
      },
      {
        name: "Form Input Types",
        route: "form-input-types",
        children: [],
        component: FormInputTypes,
      },
    ],
  },
  {
    name: "Drag and Drop",
    route: "drang-and-drop",
    children: [
      {
        name: "Basic Drag and Drop",
        route: "basic-dnd",
        children: [],
        component: BasicDnD,
      },
      {
        name: "Drag and Drop with Handle",
        route: "drag-and-drop-with-handle",
        children: [],
        component: DnDWithHandle,
      },
      {
        name: "Multi Dropzone",
        route: "multi-drop",
        children: [],
        component: DnDMultiDrop,
      },
      {
        name: "Drag and Drop Lists",
        route: "drag-and-drop-lists",
        children: [],
        component: DnDSortableList,
      },
    ],
  },
  {
    name: "HTML Canvas5",
    route: "html-canvas",
    children: [
      {
        name: "Basic Canvas",
        route: "basic-canvas",
        children: [],
        component: BasicCanvas,
      },
      {
        name: "Canvas Sprite",
        route: "canvas-sprite",
        children: [],
        component: CanvasSprite,
      },
      {
        name: "Canvas with Shapes",
        route: "canvas-with-shapes",
        children: [],
      },
      {
        name: "Canvas with Images",
        route: "canvas-with-images",
        children: [],
      },
      {
        name: "Canvas with Text",
        route: "canvas-with-text",
        children: [],
      },
      {
        name: "Canvas with Animation",
        route: "canvas-with-animation",
        children: [],
      },
      {
        name: "Canvas with Events",
        route: "canvas-with-events",
        children: [],
      },
      {
        name: "Canvas with Drag and Drop",
        route: "canvas-with-drag-and-drop",
        children: [],
      },
      {
        name: "Canvas with Multiple Canvases",
        route: "canvas-with-multiple-canvases",
        children: [],
      },
      {
        name: "Canvas with Responsive Design",
        route: "canvas-with-responsive-design",
        children: [],
      },
    ],
  },
  {
    name: "Timelines",
    route: "timelines",
    children: [
      {
        name: "Basic Timeline",
        route: "basic-timeline",
        children: [],
        component: BasicTimeLine,
      },
      {
        name: "Timeline with Icons",
        route: "timeline-with-icons",
        children: [],
      },
      {
        name: "Timeline with Images",
        route: "timeline-with-images",
        children: [],
      },
    ],
  },
  {
    name: "Tree Charts",
    route: "tree-charts",
    children: [
      {
        name: "Basic Tree Chart",
        route: "basic-tree-chart",
        children: [],
      },
      {
        name: "Tree Chart with Icons",
        route: "tree-chart-with-icons",
        children: [],
      },
      {
        name: "Tree Chart with Images",
        route: "tree-chart-with-images",
        children: [],
      },
      {
        name: "Tree Chart with Links",
        route: "tree-chart-with-links",
        children: [],
      },
      {
        name: "Tree Chart with Multiple Roots",
        route: "tree-chart-with-multiple-roots",
        children: [],
      },
      {
        name: "Tree Chart with Rich Text",
        route: "tree-chart-with-rich-text",
        children: [],
      },
      {
        name: "Tree Chart with Search",
        route: "tree-chart-with-search",
        children: [],
      },
      {
        name: "Tree Chart with Virtualization",
        route: "tree-chart-with-virtualization",
        children: [],
      },
    ],
  },
  {
    name: "Code Editor",
    route: "code-editor",
    children: [],
    component: CodeEditor,
  },
  {
    name: "Spread Sheets",
    route: "spread-sheets",
    children: [],
    component: SpreadSheets,
  },
  {
    name: "Gantt Charts",
    route: "gantt-charts",
    children: [],
    component: GanttChart,
  },
  {
    name: "Infinite Scroll Grids",
    route: "infinite-scroll-grids",
    children: [],
  },
  {
    name: "Video Player",
    route: "video-player",
    children: [],
    component: VideoPlayer,
  },
  {
    name: "Live Cursor",
    route: "live-cursor",
    children: [],
  },
  {
    name: "Live Location",
    route: "live-location",
    children: [],
  },
  {
    name: "PDF Creator",
    route: "pdf-creator",
    children: [],
    component: PdfCreator,
  },
  {
    name: "WebGL Editors",
    route: "webgl-editors",
    children: [
      { name: "Image Editor", route: "image-editor", children: [] },
      { name: "Video Editor", route: "video-editor", children: [] },
    ],
  },
  {
    name: "File Editors",
    route: "file-editors",
    children: [
      { name: "Text File Editor", route: "text-file-editor", children: [] },
      { name: "Markdown Editor", route: "markdown-editor", children: [] },
    ],
  },
  {
    name: "Audio Visualizers",
    route: "audio-visualizers",
    children: [
      {
        name: "Waveform Visualizer",
        route: "waveform-visualizer",
        children: [],
      },
      {
        name: "Frequency Visualizer",
        route: "frequency-visualizer",
        children: [],
      },
    ],
  },
  {
    name: "Virtual Reality",
    route: "virtual-reality",
    children: [
      { name: "VR Scene", route: "vr-scene", children: [] },
      { name: "VR Data Viz", route: "vr-data-viz", children: [] },
    ],
  },
  {
    name: "Game Engines",
    route: "game-engines",
    children: [
      { name: "2D Game", route: "2d-game", children: [] },
      { name: "3D Game", route: "3d-game", children: [] },
    ],
  },
  {
    name: "Diagramming Tools",
    route: "diagramming-tools",
    children: [
      { name: "UML Diagram", route: "uml-diagram", children: [] },
      { name: "Network Diagram", route: "network-diagram", children: [] },
    ],
  },
  {
    name: "Dashboard Widgets",
    route: "dashboard-widgets",
    children: [
      { name: "Weather Widget", route: "weather-widget", children: [] },
      { name: "Stats Widget", route: "stats-widget", children: [] },
    ],
  },
  {
    name: "Particle Systems",
    route: "particle-systems",
    children: [
      { name: "Fireworks Effect", route: "fireworks-effect", children: [] },
      { name: "Starfield Effect", route: "starfield-effect", children: [] },
    ],
  },
];

export default menu;
