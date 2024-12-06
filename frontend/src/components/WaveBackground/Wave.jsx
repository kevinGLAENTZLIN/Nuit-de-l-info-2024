import React, { useEffect, useRef, useCallback, useMemo } from "react";
import WaveLine from "./WaveLine";

const WaveContainer = ({ baseColor = "#002b36", waveCount = 20 }) => {
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const waveTimesRef = useRef([]);

  useEffect(() => {
    waveTimesRef.current = Array(waveCount).fill(0);
  }, [waveCount]);

  const waveConfigs = useMemo(
    () =>
      Array.from({ length: waveCount }, (_, index) => {
        const progress = 2 / (waveCount - 1);
        const progressIndex = index / (waveCount - 1);
        return {
          amplitude: 2 + progress * 15,
          frequency: 0.015 + progress * 0.005,
          speed: 0.3 + progressIndex * 0.02,
          offset: (index * Math.PI) / 3,
        };
      }),
    [waveCount]
  );

  const handleMouseMove = useCallback((event) => {
    mouseRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const width = canvas.width;
      const totalHeight = canvas.height;
      const lineHeight = totalHeight / waveCount;

      ctx.clearRect(0, 0, width, totalHeight);

      waveConfigs.forEach((config, index) => {
        const yPosition = index * lineHeight;

        WaveLine({
          ctx,
          baseColor,
          ...config,
          time: waveTimesRef.current[index],
          mouseX: mouseRef.current.x,
          mouseY: mouseRef.current.y,
          yPosition,
          lineHeight,
          width,
        });

        waveTimesRef.current[index] += 0.05;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [baseColor, waveCount, waveConfigs]);

  return (
    <div
      ref={parentRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default WaveContainer;
