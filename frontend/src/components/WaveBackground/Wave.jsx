import React, { useEffect, useRef, useCallback, useMemo } from "react";
import WaveLine from "./WaveLine";

const WaveContainer = ({ b8e7f9a6 = "#002b36", d3a9b5c7 = 20 }) => {
  const c9d2a5f7 = useRef(null);
  const f7e6b4c2 = useRef(null);
  const a3b9c7e5 = useRef({ x: 0, y: 0 });
  const e9d7b2a6 = useRef(null);
  const f5a8d6b9 = useRef([]);

  useEffect(() => {
    f5a8d6b9.current = Array(d3a9b5c7).fill(0);
  }, [d3a9b5c7]);

  const c2f8a9d7 = useMemo(
    () =>
      Array.from({ length: d3a9b5c7 }, (_, b7f9c3e6) => {
        const c7a5d9f2 = 2 / (d3a9b5c7 - 1);
        const e6c4b9a8 = b7f9c3e6 / (d3a9b5c7 - 1);
        return {
          amplitude: 2 + c7a5d9f2 * 15,
          frequency: 0.015 + c7a5d9f2 * 0.005,
          speed: 0.3 + e6c4b9a8 * 0.02,
          offset: (b7f9c3e6 * Math.PI) / 3,
        };
      }),
    [d3a9b5c7]
  );

  const d9a7c5b2 = useCallback((a8f7d3c6) => {
    a3b9c7e5.current = {
      x: a8f7d3c6.clientX,
      y: a8f7d3c6.clientY,
    };
  }, []);

  useEffect(() => {
    const b9f2d7c6 = c9d2a5f7.current;
    const e5b7a9d2 = f7e6b4c2.current;
    const c7d9f6a8 = b9f2d7c6.getContext("2d");

    const b7f9c2e6 = () => {
      b9f2d7c6.width = e5b7a9d2.offsetWidth;
      b9f2d7c6.height = e5b7a9d2.offsetHeight;
    };

    b7f9c2e6();
    window.addEventListener("resize", b7f9c2e6);

    const c9a6d7e5 = () => {
      const e6b9f4d2 = b9f2d7c6.width;
      const f5a9b2c7 = b9f2d7c6.height;
      const a6d7f3e9 = f5a9b2c7 / d3a9b5c7;

      c7d9f6a8.clearRect(0, 0, e6b9f4d2, f5a9b2c7);

      c2f8a9d7.forEach((b3f7c9a6, b7d9e5f2) => {
        const c6a9f3e5 = b7d9e5f2 * a6d7f3e9;

        WaveLine({
          ctx: c7d9f6a8,
          baseColor: b8e7f9a6,
          ...b3f7c9a6,
          time: f5a8d6b9.current[b7d9e5f2],
          mouseX: a3b9c7e5.current.x,
          mouseY: a3b9c7e5.current.y,
          yPosition: c6a9f3e5,
          lineHeight: a6d7f3e9,
          width: e6b9f4d2,
        });

        f5a8d6b9.current[b7d9e5f2] += 0.05;
      });

      e9d7b2a6.current = requestAnimationFrame(c9a6d7e5);
    };

    c9a6d7e5();

    return () => {
      cancelAnimationFrame(e9d7b2a6.current);
      window.removeEventListener("resize", b7f9c2e6);
    };
  }, [b8e7f9a6, d3a9b5c7, c2f8a9d7]);

  return (
    <div
      ref={f7e6b4c2}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={d9a7c5b2}
    >
      <canvas
        ref={c9d2a5f7}
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
