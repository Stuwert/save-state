import React, { useState } from "react";

const pickXOrY = (): string => {
  const randomValue = Math.random();
  if (randomValue > 0.5) {
    return "X";
  }

  return "O";
};

export default function HoverReveal({ children }: { children: string }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className={`gameTile pt-1 ${isHovered ? "activeTile" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isHovered ? pickXOrY() : children}
    </div>
  );
}
