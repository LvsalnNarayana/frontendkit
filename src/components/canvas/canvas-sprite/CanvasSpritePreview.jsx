import React, { useRef, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

// Define actions and their frame counts (adjust based on your actual PNG files)
const actions = [
  { name: "Dying", frameCount: 14 },
  { name: "Falling Down", frameCount: 5 },
  { name: "Hurt", frameCount: 11 },
  { name: "Idle", frameCount: 17 },
  { name: "Idle Blinking", frameCount: 17 },
  { name: "Jump Loop", frameCount: 5 },
  { name: "Jump Start", frameCount: 5 },
  { name: "Kicking", frameCount: 11 },
  { name: "Run Slashing", frameCount: 11 },
  { name: "Run Throwing", frameCount: 11 },
  { name: "Running", frameCount: 11 },
  { name: "Slashing", frameCount: 11 },
  { name: "Slashing in The Air", frameCount: 11 },
  { name: "Sliding", frameCount: 5 },
  { name: "Throwing", frameCount: 11 },
  { name: "Throwing in The Air", frameCount: 11 },
  { name: "Walking", frameCount: 23 },
];

const CanvasSpritePreview = () => {
  const canvasRefs = useRef(actions.map(() => React.createRef()));

  useEffect(() => {
    actions.forEach((action, index) => {
      const canvas = canvasRefs.current[index].current;
      const ctx = canvas.getContext("2d");
      const frameWidth = 300; // Logical width (adjust to your sprite size)
      const frameHeight = 300; // Logical height (adjust to your sprite size)
      let currentFrame = 0;
      let frameImages = [];

      // Adjust for device pixel ratio (DPR) for HD
      const dpr = window.devicePixelRatio || 1;
      canvas.width = frameWidth * dpr;
      canvas.height = frameHeight * dpr;
      canvas.style.width = `${frameWidth}px`; // CSS size remains logical
      canvas.style.height = `${frameHeight}px`;
      ctx.scale(dpr, dpr); // Scale context for HD rendering

      // Load sprite images for this action
      const loadImages = () => {
        frameImages = Array.from({ length: action.frameCount }, (_, i) => {
          const img = new Image();
          img.src = `/sprite/Goblin/PNG/PNG Sequences/${action.name}/0_Goblin_${action.name}_${String(i + 1).padStart(3, "0")}.png`;
          console.log(`Loading: ${img.src}`); // Debug path
          img.onerror = () => console.error(`Failed to load image: ${img.src}`);
          return img;
        });

        // Wait for all images to load or fail before animating
        Promise.all(
          frameImages.map(
            (img) =>
              new Promise((resolve) => {
                if (img.complete) resolve();
                else {
                  img.onload = resolve;
                  img.onerror = resolve; // Resolve even on error to proceed
                }
              })
          )
        ).then(() => animate());
      };

      const animate = () => {
        ctx.clearRect(0, 0, frameWidth, frameHeight); // Clear logical size

        // Draw the current frame if loaded and not broken
        const currentImage = frameImages[currentFrame];
        if (currentImage.complete && currentImage.naturalWidth !== 0) {
          ctx.drawImage(currentImage, 0, 0, frameWidth, frameHeight);
        } else {
          console.warn(`Frame ${currentFrame} not loaded for ${action.name}`);
          ctx.fillStyle = "gray";
          ctx.fillRect(0, 0, frameWidth, frameHeight); // Fallback gray square
          ctx.fillStyle = "white";
          ctx.font = "16px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Image Missing", frameWidth / 2, frameHeight / 2);
        }

        // Increment frame and loop
        currentFrame = (currentFrame + 1) % action.frameCount;

        // Request next frame
        setTimeout(animate, 100); // 100ms per frame (10 FPS)
      };

      // Start loading images
      loadImages();
    });
  }, []); // Empty dependency array: runs once on mount

  return (
    <Stack
      height="100%"
      sx={{ overflowY: "auto", padding: 4, maxWidth: 1200, margin: "0 auto" }}
    >
      <Stack spacing={4}>
        {actions.map((action, index) => (
          <Stack key={action.name} spacing={2}>
            <Typography variant="h6" component="h2" gutterBottom>
              {action.name}
            </Typography>
            <canvas
              ref={canvasRefs.current[index]}
              style={{ border: "1px solid black" }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default CanvasSpritePreview;
