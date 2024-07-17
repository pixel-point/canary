import React from "react";
import css from "./CircleOverlay.module.scss";

export interface Position {
  x: number;
  y: number;
}

interface CircleOverlayInterface {
  position: Position;
}

const CircleOverlay = (props: CircleOverlayInterface) => {
  // Array of circle data (size and opacity)
  const circles = [
    { size: 200, opacity: 0.015 },
    { size: 170, opacity: 0.016 },
    { size: 140, opacity: 0.017 },
    { size: 110, opacity: 0.018 },
    { size: 90, opacity: 0.019 },
    { size: 70, opacity: 0.02 },
    { size: 50, opacity: 0.021 },
  ];

  return (
    <>
      {circles.map((circle, index) => (
        <div
          key={index}
          className={css.circle}
          style={
            {
              "--size": `${circle.size}px`,
              "--opacity": circle.opacity,
              top: props.position.y,
              left: props.position.x,
            } as unknown as React.CSSProperties
          }
        />
      ))}
    </>
  );
};

export default CircleOverlay;
