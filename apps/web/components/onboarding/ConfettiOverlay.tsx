"use client";

import React, { useMemo } from "react";

interface ConfettiPiece {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  color: string;
  shape: "circle" | "rect" | "star";
  rotation: number;
}

const COLORS = [
  "#FBBF24", // Amber
  "#3B82F6", // Blue
  "#FB7185", // Pink
  "#34D399", // Emerald
  "#A855F7", // Purple
  "#F97316", // Orange
  "#06B6D4", // Cyan
];

export function ConfettiOverlay() {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 36 }).map((_, index) => {
      const left = `${Math.floor((index * 100) / 36 + (Math.sin(index) * 5))}%`;
      const delay = `${(index % 6) * 0.25}s`;
      const duration = `${2.5 + (index % 5) * 0.4}s`;
      const size = 8 + (index % 4) * 3;
      const color = COLORS[index % COLORS.length]!;
      const shapes: ("circle" | "rect" | "star")[] = ["circle", "rect", "rect", "star"];
      const shape = shapes[index % shapes.length]!;
      const rotation = (index * 45) % 360;

      return {
        id: index,
        left,
        delay,
        duration,
        size,
        color,
        shape,
        rotation,
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(720deg) scale(1);
            opacity: 0;
          }
        }
      `}</style>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: piece.left,
            width: `${piece.size}px`,
            height: piece.shape === "rect" ? `${piece.size * 1.5}px` : `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius:
              piece.shape === "circle" ? "50%" : piece.shape === "star" ? "2px" : "3px",
            animation: `confettiFall ${piece.duration} ease-in-out infinite`,
            animationDelay: piece.delay,
            transform: `rotate(${piece.rotation}deg)`,
            boxShadow: `0 0 6px ${piece.color}88`,
          }}
        />
      ))}
    </div>
  );
}
