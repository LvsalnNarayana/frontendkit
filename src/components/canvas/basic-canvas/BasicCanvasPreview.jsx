import React, { useRef, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

const CanvasSection = ({
  title,
  explanation,
  drawFunction,
  width = 600,
  height = 400,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Adjust for device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`; // CSS size
    canvas.style.height = `${height}px`; // CSS size
    ctx.scale(dpr, dpr); // Scale context for DPR

    ctx.clearRect(0, 0, width, height);
    drawFunction(ctx);
  }, [drawFunction, width, height]);

  return (
    <Stack spacing={2} sx={{ marginBottom: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {explanation}
      </Typography>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black" }}
        width={width} // Initial attribute (overridden)
        height={height} // Initial attribute (overridden)
      />
    </Stack>
  );
};

const BasicCanvasPreview = () => {
  return (
    <Stack
      height={"100%"}
      sx={{ overflow: "auto", padding: 4, maxWidth: 800, margin: "0 auto" }}
    >
      {/* Rectangles */}
      <CanvasSection
        title="Drawing Rectangles"
        explanation="`fillRect(x, y, width, height)` fills a rectangle with `fillStyle`, `strokeRect(x, y, width, height)` outlines with `strokeStyle` and `lineWidth`, and `clearRect(x, y, width, height)` clears an area. Lines are offset by 0.5px for sharpness."
        drawFunction={(ctx) => {
          ctx.fillStyle = "lightblue";
          ctx.fillRect(50, 20, 200, 120);
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.strokeRect(270, 20, 200, 120); // Offset for sharp lines
          ctx.clearRect(80, 50, 40, 20);
        }}
      />

      {/* Paths */}
      <CanvasSection
        title="Paths and Lines"
        explanation="`beginPath()` starts a path, `moveTo(x, y)` sets the start, `lineTo(x, y)` draws lines, `stroke()` outlines with `strokeStyle`, and `fill()` fills with `fillStyle`. `closePath()` closes the path. Coordinates are offset by 0.5px for crisp lines."
        drawFunction={(ctx) => {
          ctx.beginPath();
          ctx.moveTo(50.5, 20.5);
          ctx.lineTo(150.5, 120.5);
          ctx.lineTo(50.5, 120.5);
          ctx.strokeStyle = "green";
          ctx.stroke();
          ctx.closePath();

          ctx.beginPath();
          ctx.moveTo(170.5, 20.5);
          ctx.lineTo(270.5, 120.5);
          ctx.lineTo(170.5, 120.5);
          ctx.fillStyle = "lightgreen";
          ctx.fill();
        }}
      />

      {/* Arcs and Circles */}
      <CanvasSection
        title="Arcs and Circles"
        explanation="`arc(x, y, radius, startAngle, endAngle, counterclockwise)` draws arcs/circles. `fillStyle` fills, and `strokeStyle` with `lineWidth` outlines. Center points are offset by 0.5px for sharp edges."
        drawFunction={(ctx) => {
          ctx.beginPath();
          ctx.arc(100.5, 100.5, 50, 0, Math.PI * 2);
          ctx.fillStyle = "red";
          ctx.fill();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(250.5, 100.5, 50, 0, Math.PI, true);
          ctx.fillStyle = "yellow";
          ctx.fill();
        }}
      />

      {/* Curves */}
      <CanvasSection
        title="Quadratic and Bezier Curves"
        explanation="`quadraticCurveTo(cp1x, cp1y, x, y)` draws a quadratic curve, and `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` draws a cubic Bezier curve. All coordinates are offset by 0.5px for sharp lines."
        drawFunction={(ctx) => {
          ctx.beginPath();
          ctx.moveTo(50.5, 50.5);
          ctx.quadraticCurveTo(100.5, 150.5, 150.5, 50.5);
          ctx.strokeStyle = "purple";
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(200.5, 50.5);
          ctx.bezierCurveTo(220.5, 100.5, 260.5, 100.5, 280.5, 50.5);
          ctx.strokeStyle = "orange";
          ctx.stroke();
        }}
      />

      {/* Text */}
      <CanvasSection
        title="Text"
        explanation="`fillText(text, x, y, maxWidth)` draws filled text with `fillStyle`, `font`, and `textAlign`. `strokeText(text, x, y, maxWidth)` outlines text with `strokeStyle` and `lineWidth`. Coordinates are offset for clarity."
        drawFunction={(ctx) => {
          ctx.font = "20px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillText("Hello Canvas!", 200.5, 80.5);

          ctx.font = "16px Georgia";
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 1;
          ctx.textAlign = "left";
          ctx.strokeText("Outlined Text", 50.5, 140.5);
        }}
      />
    </Stack>
  );
};

export default BasicCanvasPreview;
