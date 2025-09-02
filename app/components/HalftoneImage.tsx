"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@nextui-org/react";
import {
  TbUpload,
  TbDownload,
  TbGridDots,
  TbArrowsMaximize,
} from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";

interface HalftoneImageProps {
  imageSrc?: string;
  size?: number;
  dotSize?: number;
  spacing?: number;
  radialDotSize?: number;
  radialSpacing?: number;
  gridDotSize?: number;
  gridSpacing?: number;
  fullWidthGridDotSize?: number;
  fullWidthGridSpacing?: number;
  downloadSize?: number;
  halftoneSize?: number;
}

export default function HalftoneImage({
  imageSrc,
  size = 800,
  dotSize = 20, // Default for backward compatibility
  spacing = 80, // Default for backward compatibility
  radialDotSize,
  radialSpacing,
  gridDotSize,
  gridSpacing,
  fullWidthGridDotSize,
  fullWidthGridSpacing,
  downloadSize = 2048,
  halftoneSize = 1440,
}: HalftoneImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [levels, setLevels] = useState(1.2); // 0.1 to 2.0 range for contrast adjustment
  const [gamma, setGamma] = useState(0.2); // 0.1 to 3.0 range for gamma adjustment
  const [isDragging, setIsDragging] = useState(false);
  const [isRounded, setIsRounded] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isBlackBackground, setIsBlackBackground] = useState(false);

  // Use specific values for each mode, fallback to general props, then defaults
  const currentDotSize = isRounded
    ? (radialDotSize ?? dotSize)
    : isFullWidth
      ? (fullWidthGridDotSize ?? gridDotSize ?? dotSize)
      : (gridDotSize ?? dotSize);
  const currentSpacing = isRounded
    ? (radialSpacing ?? spacing)
    : isFullWidth
      ? (fullWidthGridSpacing ?? gridSpacing ?? spacing)
      : (gridSpacing ?? spacing);

  const getColorForRow = (row: number, totalRows: number) => {
    // Top 4 rows: green
    if (row < 4) {
      return { color: "#D0E321", stroke: 0, strokeColor: "#3b82f6" };
    }
    // Next row: green with 1px blue stroke
    else if (row === 4) {
      return { color: "#D0E321", stroke: 1.5, strokeColor: "#0191C0" };
    }
    // Next row: green with 2px blue stroke
    else if (row === 5) {
      return { color: "#D0E321", stroke: 2.5, strokeColor: "#0191C0" };
    }
    // Next row: green with 3px blue stroke
    else if (row === 6) {
      return { color: "#D0E321", stroke: 4, strokeColor: "#0191C0" };
    }
    // Next 3 rows: blue
    else if (row >= 7 && row <= 9) {
      return { color: "#0191C0", stroke: 0, strokeColor: "#FF00A4" };
    }
    // Next row: blue with 1px pink stroke
    else if (row === 10) {
      return { color: "#0191C0", stroke: 1.5, strokeColor: "#FF00A4" };
    }
    // Next row: blue with 2px pink stroke
    else if (row === 11) {
      return { color: "#0191C0", stroke: 2.5, strokeColor: "#FF00A4" };
    }
    // Next row: blue with 3px pink stroke
    else if (row === 12) {
      return { color: "#0191C0", stroke: 4, strokeColor: "#FF00A4" };
    }
    // Rest of rows: pink
    else {
      return { color: "#FF00A4", stroke: 0, strokeColor: "#FF00A4" };
    }
  };

  const getColorForRadialRing = (ringIndex: number) => {
    // Ring 0 is outermost, higher numbers go inward
    // Follow exact same pattern as grid rows, but starting from outside
    if (ringIndex < 4) {
      // First 4 rings: green
      return { color: "#D0E321", stroke: 0, strokeColor: "#0191C0" };
    } else if (ringIndex === 4) {
      // Ring 4: green with small blue stroke
      return { color: "#D0E321", stroke: 2, strokeColor: "#0191C0" };
    } else if (ringIndex === 5) {
      // Ring 5: green with medium blue stroke
      return { color: "#D0E321", stroke: 3.5, strokeColor: "#0191C0" };
    } else if (ringIndex === 6) {
      // Ring 6: green with large blue stroke
      return { color: "#D0E321", stroke: 5, strokeColor: "#0191C0" };
    } else if (ringIndex >= 7 && ringIndex <= 9) {
      // Rings 7-9: blue
      return { color: "#0191C0", stroke: 0, strokeColor: "#FF00A4" };
    } else if (ringIndex === 10) {
      // Ring 10: blue with small pink stroke
      return { color: "#0191C0", stroke: 2, strokeColor: "#FF00A4" };
    } else if (ringIndex === 11) {
      // Ring 11: blue with medium pink stroke
      return { color: "#0191C0", stroke: 3.5, strokeColor: "#FF00A4" };
    } else if (ringIndex === 12) {
      // Ring 12: blue with large pink stroke
      return { color: "#0191C0", stroke: 5, strokeColor: "#FF00A4" };
    } else {
      // All remaining inner rings: pink
      return { color: "#FF00A4", stroke: 0, strokeColor: "#FF00A4" };
    }
  };

  const getLuminosity = (r: number, g: number, b: number) => {
    // Convert RGB to luminosity using standard weights
    const luminosity = 0.299 * r + 0.587 * g + 0.114 * b;

    // If black background is selected, invert the luminosity
    if (isBlackBackground) {
      return 255 - luminosity;
    }

    return luminosity;
  };

  const drawHalftone = useCallback(
    (image: HTMLImageElement) => {
      if (!canvasRef.current || !hiddenCanvasRef.current) return;

      const canvas = canvasRef.current;
      const hiddenCanvas = hiddenCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const hiddenCtx = hiddenCanvas.getContext("2d");

      if (!ctx || !hiddenCtx) return;

      // Set canvas dimensions - use downloadSize for actual rendering
      canvas.width = downloadSize;
      canvas.height = downloadSize;
      hiddenCanvas.width = downloadSize;
      hiddenCanvas.height = downloadSize;

      // Fill background with selected color
      ctx.fillStyle = isBlackBackground ? "#000000" : "#F9F9F9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clear hidden canvas
      hiddenCtx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);

      // Draw image to hidden canvas, cropping to square from center
      const imageAspect = image.width / image.height;
      let sourceX, sourceY, sourceSize;

      if (imageAspect > 1) {
        // Image is wider than tall - crop from center horizontally
        sourceSize = image.height; // Use height as the square crop size
        sourceX = (image.width - sourceSize) / 2; // Center horizontally
        sourceY = 0;
      } else {
        // Image is taller than wide - crop from center vertically
        sourceSize = image.width; // Use width as the square crop size
        sourceX = 0;
        sourceY = (image.height - sourceSize) / 2; // Center vertically
      }

      // Draw the square crop to fill the entire hidden canvas
      hiddenCtx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize, // Source crop (square from center)
        0,
        0,
        downloadSize,
        downloadSize, // Destination (fill entire hidden canvas)
      );

      // Get image data
      const imageData = hiddenCtx.getImageData(
        0,
        0,
        hiddenCanvas.width,
        hiddenCanvas.height,
      );
      const data = imageData.data;

      if (isRounded) {
        // Rounded mode: full canvas, radial pattern
        const centerX = downloadSize / 2;
        const centerY = downloadSize / 2;
        const maxRadius = downloadSize / 2;

        // Calculate number of rings based on spacing
        const rings = Math.floor(maxRadius / currentSpacing);
        const dotsPerRing = [1]; // Center dot

        // Calculate dots per ring (roughly uniform distribution)
        for (let ring = 1; ring <= rings; ring++) {
          const circumference = 2 * Math.PI * ring * currentSpacing;
          const dotsInRing = Math.max(
            1,
            Math.floor(circumference / currentSpacing),
          );
          dotsPerRing.push(dotsInRing);
        }

        // Draw center dot
        const imageX = Math.floor(
          (centerX / downloadSize) * hiddenCanvas.width,
        );
        const imageY = Math.floor(
          (centerY / downloadSize) * hiddenCanvas.height,
        );
        const pixelIndex = (imageY * hiddenCanvas.width + imageX) * 4;

        const r = data[pixelIndex] || 0;
        const g = data[pixelIndex + 1] || 0;
        const b = data[pixelIndex + 2] || 0;

        const luminosity = getLuminosity(r, g, b);
        const adjustedLuminosity = Math.min(
          255,
          Math.max(0, luminosity * levels),
        );
        const gammaAdjustedLuminosity =
          Math.pow(adjustedLuminosity / 255, 1 / gamma) * 255;
        const normalizedLuminosity = gammaAdjustedLuminosity / 255;
        const dotRadius =
          (1 - normalizedLuminosity) * (currentDotSize / 2) * 0.65;

        if (dotRadius > 0.5) {
          // Center dot gets the highest ring index (innermost)
          const ringIndex = rings + 1; // Higher than any actual ring
          const { color, stroke, strokeColor } =
            getColorForRadialRing(ringIndex);

          if (stroke > 0) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = strokeColor;
            ctx.fill();

            const innerRadius = Math.max(0.5, dotRadius - stroke);
            ctx.beginPath();
            ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(centerX, centerY, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
          }
        }

        // Draw dots in rings
        for (let ring = 1; ring <= rings; ring++) {
          const ringRadius = ring * currentSpacing;
          const dotsInRing = dotsPerRing[ring];

          for (let dot = 0; dot < dotsInRing; dot++) {
            const angle = (dot / dotsInRing) * 2 * Math.PI;
            const x = centerX + Math.cos(angle) * ringRadius;
            const y = centerY + Math.sin(angle) * ringRadius;

            // Skip if outside canvas
            if (x < 0 || x >= downloadSize || y < 0 || y >= downloadSize)
              continue;

            // Get pixel data from corresponding position in image
            const imageX = Math.floor((x / downloadSize) * hiddenCanvas.width);
            const imageY = Math.floor((y / downloadSize) * hiddenCanvas.height);
            const pixelIndex = (imageY * hiddenCanvas.width + imageX) * 4;

            const r = data[pixelIndex] || 0;
            const g = data[pixelIndex + 1] || 0;
            const b = data[pixelIndex + 2] || 0;

            const luminosity = getLuminosity(r, g, b);
            const adjustedLuminosity = Math.min(
              255,
              Math.max(0, luminosity * levels),
            );
            const gammaAdjustedLuminosity =
              Math.pow(adjustedLuminosity / 255, 1 / gamma) * 255;
            const normalizedLuminosity = gammaAdjustedLuminosity / 255;
            const dotRadius =
              (1 - normalizedLuminosity) * (currentDotSize / 2) * 0.65;

            if (dotRadius > 0.5) {
              // Map ring number to ring index (ring 'rings' = outermost = index 0)
              const ringIndex = rings - ring;
              const { color, stroke, strokeColor } =
                getColorForRadialRing(ringIndex);

              if (stroke > 0) {
                ctx.beginPath();
                ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                ctx.fillStyle = strokeColor;
                ctx.fill();

                const innerRadius = Math.max(0.5, dotRadius - stroke);
                ctx.beginPath();
                ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
              } else {
                ctx.beginPath();
                ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
              }
            }
          }
        }
      } else {
        // Original grid mode
        if (isFullWidth) {
          // Full-width grid mode - use entire canvas
          const cols = Math.floor(downloadSize / currentSpacing);
          const rows = Math.floor(downloadSize / currentSpacing);

          // Debug logging
          console.log(
            `Full-width mode - Spacing: ${currentSpacing}, Cols: ${cols}, Rows: ${rows}, Total dots: ${
              cols * rows
            }`,
          );

          // Calculate offset to center the grid within the canvas
          const totalGridWidth = (cols - 1) * currentSpacing;
          const totalGridHeight = (rows - 1) * currentSpacing;
          const gridOffsetX = (downloadSize - totalGridWidth) / 2;
          const gridOffsetY = (downloadSize - totalGridHeight) / 2;

          // Draw halftone dots across the entire canvas
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * currentSpacing + gridOffsetX;
              const y = row * currentSpacing + gridOffsetY;

              // Get pixel data from corresponding position in image
              const imageX = Math.floor((col / cols) * hiddenCanvas.width);
              const imageY = Math.floor((row / rows) * hiddenCanvas.height);
              const pixelIndex = (imageY * hiddenCanvas.width + imageX) * 4;

              const r = data[pixelIndex] || 0;
              const g = data[pixelIndex + 1] || 0;
              const b = data[pixelIndex + 2] || 0;

              // Calculate luminosity and dot size with levels and gamma adjustment
              const luminosity = getLuminosity(r, g, b);
              const adjustedLuminosity = Math.min(
                255,
                Math.max(0, luminosity * levels),
              );
              const gammaAdjustedLuminosity =
                Math.pow(adjustedLuminosity / 255, 1 / gamma) * 255;
              const normalizedLuminosity = gammaAdjustedLuminosity / 255;
              const dotRadius =
                (1 - normalizedLuminosity) * (currentDotSize / 2) * 0.65;

              if (dotRadius > 0.5) {
                const { color, stroke, strokeColor } = getColorForRow(
                  row,
                  rows,
                );

                if (stroke > 0) {
                  // Draw stroke color as outer circle
                  ctx.beginPath();
                  ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                  ctx.fillStyle = strokeColor;
                  ctx.fill();

                  // Draw main color as inner circle
                  const innerRadius = Math.max(0.5, dotRadius - stroke);
                  ctx.beginPath();
                  ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
                  ctx.fillStyle = color;
                  ctx.fill();
                } else {
                  // No stroke, just draw the main dot
                  ctx.beginPath();
                  ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                  ctx.fillStyle = color;
                  ctx.fill();
                }
              }
            }
          }
        } else {
          // Bordered grid mode - use halftone area bounds (centered within canvas)
          const halftoneX = (downloadSize - halftoneSize) / 2;
          const halftoneY = (downloadSize - halftoneSize) / 2;

          // Calculate grid dimensions for the halftone area only
          const cols = Math.floor(halftoneSize / currentSpacing);
          const rows = Math.floor(halftoneSize / currentSpacing);

          // Debug logging
          console.log(
            `Bordered mode - Spacing: ${currentSpacing}, Cols: ${cols}, Rows: ${rows}, Total dots: ${
              cols * rows
            }`,
          );

          // Calculate offset to center the grid within the halftone area
          const totalGridWidth = (cols - 1) * currentSpacing;
          const totalGridHeight = (rows - 1) * currentSpacing;
          const gridOffsetX = halftoneX + (halftoneSize - totalGridWidth) / 2;
          const gridOffsetY = halftoneY + (halftoneSize - totalGridHeight) / 2;

          // Draw halftone dots only within the halftone area
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * currentSpacing + gridOffsetX;
              const y = row * currentSpacing + gridOffsetY;

              // Get pixel data from corresponding position in image
              const imageX = Math.floor((col / cols) * hiddenCanvas.width);
              const imageY = Math.floor((row / rows) * hiddenCanvas.height);
              const pixelIndex = (imageY * hiddenCanvas.width + imageX) * 4;

              const r = data[pixelIndex] || 0;
              const g = data[pixelIndex + 1] || 0;
              const b = data[pixelIndex + 2] || 0;

              // Calculate luminosity and dot size with levels and gamma adjustment
              const luminosity = getLuminosity(r, g, b);
              const adjustedLuminosity = Math.min(
                255,
                Math.max(0, luminosity * levels),
              );
              const gammaAdjustedLuminosity =
                Math.pow(adjustedLuminosity / 255, 1 / gamma) * 255;
              const normalizedLuminosity = gammaAdjustedLuminosity / 255;
              const dotRadius =
                (1 - normalizedLuminosity) * (currentDotSize / 2) * 0.65;

              if (dotRadius > 0.5) {
                const { color, stroke, strokeColor } = getColorForRow(
                  row,
                  rows,
                );

                if (stroke > 0) {
                  // Draw stroke color as outer circle
                  ctx.beginPath();
                  ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                  ctx.fillStyle = strokeColor;
                  ctx.fill();

                  // Draw main color as inner circle
                  const innerRadius = Math.max(0.5, dotRadius - stroke);
                  ctx.beginPath();
                  ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
                  ctx.fillStyle = color;
                  ctx.fill();
                } else {
                  // No stroke, just draw the main dot
                  ctx.beginPath();
                  ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                  ctx.fillStyle = color;
                  ctx.fill();
                }
              }
            }
          }
        }
      }
    },
    [
      downloadSize,
      isBlackBackground,
      isRounded,
      isFullWidth,
      radialDotSize,
      dotSize,
      fullWidthGridDotSize,
      gridDotSize,
      radialSpacing,
      spacing,
      fullWidthGridSpacing,
      gridSpacing,
      levels,
      gamma,
      getLuminosity,
      halftoneSize,
    ],
  );

  const handleImageLoad = useCallback(
    (imageSrc: string) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        drawHalftone(image);
      };
      image.src = imageSrc;
    },
    [drawHalftone],
  );

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const imageDataUrl = canvas.toDataURL("image/jpeg", 1.0);

    // Detect if user is on mobile/iOS
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isMobile) {
      // Mobile/iOS: Open in new tab with download button
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Halftone Artwork</title>
              <style>
                body { margin: 0; padding: 20px; background: #f0f0f0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                img { max-width: 100%; max-height: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                .download-btn { font-family: 'Inconsolata', monospace; position: fixed; top: 20px; right: 20px; background: #FF00A4; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; cursor: pointer; }
              </style>
            </head>
            <body>
              <img src="${imageDataUrl}" alt="Halftone Artwork" />
              <button class="download-btn" onclick="
                const link = document.createElement('a');
                link.download = 'halftone-artwork.jpg';
                link.href = '${imageDataUrl}';
                link.click();
              ">Download</button>
            </body>
          </html>
        `);
        newWindow.document.close();
      } else {
        // Fallback: direct download
        const link = document.createElement("a");
        link.download = "halftone-artwork.jpg";
        link.href = imageDataUrl;
        link.click();
      }
    } else {
      // Desktop: Direct download (works better)
      const link = document.createElement("a");
      link.download = "halftone-artwork.jpg";
      link.href = imageDataUrl;
      link.click();
    }
  };

  const updateLevelsAndGamma = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Convert canvas coordinates to levels and gamma
    const newLevels = Math.min(
      2.0,
      Math.max(0.1, (x / rect.width) * 1.9 + 0.1),
    );
    const newGamma = Math.min(
      3.0,
      Math.max(0.1, 3.0 - (y / rect.height) * 2.9),
    ); // Inverted Y

    setLevels(Number(newLevels.toFixed(1)));
    setGamma(Number(newGamma.toFixed(1)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!currentImage) return;
    setIsDragging(true);
    updateLevelsAndGamma(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !currentImage) return;
    updateLevelsAndGamma(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!currentImage) return;
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    updateLevelsAndGamma(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !currentImage) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateLevelsAndGamma(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  useEffect(() => {
    if (currentImage) {
      handleImageLoad(currentImage);
    }
  }, [
    currentImage,
    size,
    dotSize,
    spacing,
    levels,
    gamma,
    downloadSize,
    halftoneSize,
    isRounded,
    isFullWidth,
    radialDotSize,
    radialSpacing,
    gridDotSize,
    gridSpacing,
    isBlackBackground,
    handleImageLoad,
  ]);

  // Global mouse event listeners for dragging outside canvas
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && currentImage) {
        updateLevelsAndGamma(e.clientX, e.clientY);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, currentImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCurrentImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    const input = document.getElementById("imageUpload") as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  return (
    <div className="w-full">
      {!currentImage ? (
        <div
          className={`w-full aspect-square flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
            isDragOver
              ? "bg-blue-50 border-blue-400 border-solid"
              : "bg-black/5 border-black/20"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const result = event.target?.result as string;
                setCurrentImage(result);
              };
              reader.readAsDataURL(file);
            }
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center gap-4 cursor-pointer"
          >
            <TbUpload size={48} className="text-black opacity-50" />
            <div className="text-center">
              <p className="text-sm font-bold">Upload an image</p>
              <p className="text-sm text-black/40 mt-2">
                Drop your image here or click to browse
              </p>
            </div>
            <Button
              variant="flat"
              color="default"
              onClick={(e) => {
                e.preventDefault();
                handleButtonClick();
              }}
            >
              Choose Image
            </Button>
          </label>
        </div>
      ) : (
        <>
          <div className="bg-black/5 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="imageUpload"
              />
              <Button
                variant="flat"
                color="default"
                className="min-w-0 w-10 h-10 p-0 flex items-center justify-center"
                startContent={<TbUpload size={18} />}
                onClick={handleButtonClick}
              ></Button>
              <Button
                variant="flat"
                color="default"
                className="min-w-0 w-10 h-10 p-0 flex items-center justify-center"
                startContent={
                  isRounded ? (
                    <TbGridDots size={18} />
                  ) : (
                    <BiLoaderCircle size={18} />
                  )
                }
                onClick={() => setIsRounded(!isRounded)}
              ></Button>
              {!isRounded && (
                <Button
                  variant="flat"
                  color="default"
                  className="min-w-0 w-10 h-10 p-0 flex items-center justify-center"
                  onClick={() => setIsFullWidth(!isFullWidth)}
                >
                  <TbArrowsMaximize size={16} />
                </Button>
              )}
              <Button
                variant="flat"
                color="default"
                className="min-w-0 w-10 h-10 p-0 flex items-center justify-center"
                onClick={() => setIsBlackBackground(!isBlackBackground)}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: isBlackBackground ? "#000000" : "#ffffff",
                  }}
                ></div>
              </Button>
              <Button
                variant="flat"
                color="default"
                className="gap-1 px-0"
                onClick={handleDownload}
                startContent={<TbDownload size={18} />}
              >
                Save
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-black bg-black/5 px-3 py-2 rounded-xl h-[40px]">
              <div className="w-12 text-center leading-3">
                <div>
                  <span>L</span>
                  {levels.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 mt-1">
                  {[0, 1, 2].map((dotIndex) => {
                    const levelRange = 2.0 - 0.1; // 1.9
                    const dotRange = levelRange / 3; // 0.633 per dot
                    const currentValue = levels - 0.1; // Normalize to 0-1.9
                    const activeDots = Math.min(
                      2,
                      Math.floor(currentValue / dotRange),
                    );
                    const isActive = currentValue > 0 && dotIndex <= activeDots;
                    const isCurrentDot = dotIndex === activeDots;
                    const progressInCurrentDot = isCurrentDot
                      ? Math.min(
                          1,
                          (currentValue - activeDots * dotRange) / dotRange,
                        )
                      : 0;
                    const strokeWidth = isActive
                      ? currentValue === 0
                        ? 0
                        : isCurrentDot
                          ? Math.max(
                              0.5,
                              Math.min(2.5, progressInCurrentDot * 1.5 + 0.5),
                            )
                          : 2.5
                      : 0;

                    return (
                      <div
                        key={dotIndex}
                        className="relative w-3 h-3 rounded-full transition-all duration-200 flex items-center justify-center"
                        style={{
                          backgroundColor: isActive ? "#000" : "#0191C0",
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full transition-all duration-200"
                          style={{
                            backgroundColor:
                              strokeWidth > 0 ? "#0191C0" : "transparent",
                            transform: `scale(${
                              strokeWidth > 0
                                ? Math.max(0.001, 1 - strokeWidth * 0.48)
                                : 1
                            })`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-12 text-center leading-3">
                <div>
                  <span>G</span>
                  {gamma.toFixed(1)}
                </div>
                <div className="flex justify-center gap-1 mt-1">
                  {[0, 1, 2].map((dotIndex) => {
                    const gammaRange = 3.0 - 0.1; // 2.9
                    const dotRange = gammaRange / 3; // 0.966 per dot
                    const currentValue = gamma - 0.1; // Normalize to 0-2.9
                    const activeDots = Math.min(
                      2,
                      Math.floor(currentValue / dotRange),
                    );
                    const isActive = currentValue > 0 && dotIndex <= activeDots;
                    const isCurrentDot = dotIndex === activeDots;
                    const progressInCurrentDot = isCurrentDot
                      ? Math.min(
                          1,
                          (currentValue - activeDots * dotRange) / dotRange,
                        )
                      : 0;
                    const strokeWidth = isActive
                      ? currentValue === 0
                        ? 0
                        : isCurrentDot
                          ? Math.max(
                              0.5,
                              Math.min(2.5, progressInCurrentDot * 1.5 + 0.5),
                            )
                          : 2.5
                      : 0;

                    return (
                      <div
                        key={dotIndex}
                        className="relative w-3 h-3 rounded-full transition-all duration-200 flex items-center justify-center"
                        style={{
                          backgroundColor: isActive ? "#ff00a4" : "#cfe321",
                        }}
                      >
                        <div
                          className="w-full h-full rounded-full transition-all duration-200"
                          style={{
                            backgroundColor:
                              strokeWidth > 0 ? "#cfe321" : "transparent",
                            transform: `scale(${
                              strokeWidth > 0
                                ? Math.max(0.001, 1 - strokeWidth * 0.48)
                                : 1
                            })`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-xl overflow-hidden relative"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const result = event.target?.result as string;
                  setCurrentImage(result);
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            <canvas
              ref={canvasRef}
              className={`w-full h-auto aspect-square block transition-opacity cursor-grab active:cursor-grabbing  ${
                isDragOver ? "opacity-50 " : "opacity-100"
              }`}
              width={downloadSize}
              height={downloadSize}
              style={{
                backgroundColor: "#FFFFFF",
                maxWidth: `${size}px`,
                maxHeight: `${size}px`,
                width: "100%",
                height: "auto",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
            {isDragOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 rounded-xl">
                <div className="bg-white/90 rounded-lg p-4 text-center">
                  <TbUpload size={32} className="mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium text-blue-600">
                    Drop image to replace
                  </p>
                </div>
              </div>
            )}
          </div>
          <canvas
            ref={hiddenCanvasRef}
            className="hidden"
            width={downloadSize}
            height={downloadSize}
          />
        </>
      )}
    </div>
  );
}
