import React from "react";

export type CommandType =
  | "RIGHT"
  | "DOWN"
  | "UP"
  | "LEFT"
  | "JUMP_RIGHT"
  | "JUMP_DOWN"
  | "JUMP_UP"
  | "JUMP_LEFT";

export interface Position {
  x: number;
  y: number;
}

export interface CommandBlock {
  id: string;
  type: CommandType;
  label: string;
  icon: React.ReactNode;
  bg: string;
  border: string;
}

export interface CommandConfig {
  type: CommandType;
  category: "move" | "jump";
  label: string;
  desc: string;
  icon: React.ReactNode;
  bg: string;
  border: string;
  badge: string;
}

export interface PuzzleState {
  startPos: Position;
  goalPos: Position;
  obstacles: Position[];
}

export type RunStatus =
  | "idle"
  | "running"
  | "success"
  | "hit_obstacle"
  | "out_of_bounds"
  | "incomplete";

export const COLS = 4;
export const ROWS = 3;

export const DEFAULT_PUZZLE: PuzzleState = {
  startPos: { x: 0, y: 0 },
  goalPos: { x: 3, y: 1 },
  obstacles: [
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 2 },
  ],
};
