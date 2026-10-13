"use client";

import { useState, useRef, useEffect } from "react";
import {
  CommandBlock,
  CommandType,
  Position,
  PuzzleState,
  RunStatus,
  COLS,
  ROWS,
  DEFAULT_PUZZLE,
} from "./types";
import { AVAILABLE_COMMANDS } from "./constants";
import { generateRandomPuzzle } from "./mazeUtils";

export function useMazeRunner() {
  const [puzzle, setPuzzle] = useState<PuzzleState>(DEFAULT_PUZZLE);
  const [codeQueue, setCodeQueue] = useState<CommandBlock[]>([]);
  const [kiboPos, setKiboPos] = useState<Position>(DEFAULT_PUZZLE.startPos);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runStatus, setRunStatus] = useState<RunStatus>("idle");

  const abortRunRef = useRef<boolean>(false);

  // Generate a random puzzle on initial client mount
  useEffect(() => {
    const fresh = generateRandomPuzzle();
    setPuzzle(fresh);
    setKiboPos(fresh.startPos);
  }, []);

  const isObstacle = (x: number, y: number): boolean => {
    return puzzle.obstacles.some((obs) => obs.x === x && obs.y === y);
  };

  const handleRandomize = () => {
    abortRunRef.current = true;
    setIsRunning(false);
    const nextPuzzle = generateRandomPuzzle();
    setPuzzle(nextPuzzle);
    setKiboPos(nextPuzzle.startPos);
    setCodeQueue([]);
    setCurrentStepIndex(null);
    setRunStatus("idle");
  };

  const addCommand = (cmdType: CommandType) => {
    if (isRunning || codeQueue.length >= 8) return;

    const template = AVAILABLE_COMMANDS.find((c) => c.type === cmdType);
    if (!template) return;

    const newBlock: CommandBlock = {
      id: `${cmdType}-${Date.now()}-${Math.random()}`,
      type: cmdType,
      label: template.label,
      icon: template.icon,
      bg: template.bg,
      border: template.border,
    };

    setCodeQueue((prev) => [...prev, newBlock]);
    if (runStatus !== "idle") {
      setRunStatus("idle");
      setKiboPos(puzzle.startPos);
      setCurrentStepIndex(null);
    }
  };

  const removeCommand = (index: number) => {
    if (isRunning) return;
    setCodeQueue((prev) => prev.filter((_, i) => i !== index));
    if (runStatus !== "idle") {
      setRunStatus("idle");
      setKiboPos(puzzle.startPos);
      setCurrentStepIndex(null);
    }
  };

  const handleClearAll = () => {
    abortRunRef.current = true;
    setIsRunning(false);
    setCodeQueue([]);
    setKiboPos(puzzle.startPos);
    setCurrentStepIndex(null);
    setRunStatus("idle");
  };

  const handleResetKibo = () => {
    abortRunRef.current = true;
    setIsRunning(false);
    setKiboPos(puzzle.startPos);
    setCurrentStepIndex(null);
    setRunStatus("idle");
  };

  const handleRunCode = async () => {
    if (codeQueue.length === 0 || isRunning) return;

    abortRunRef.current = false;
    setIsRunning(true);
    setRunStatus("running");
    setKiboPos(puzzle.startPos);
    setCurrentStepIndex(null);

    let curX = puzzle.startPos.x;
    let curY = puzzle.startPos.y;

    for (let i = 0; i < codeQueue.length; i++) {
      if (abortRunRef.current) break;

      setCurrentStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 700));

      if (abortRunRef.current) break;

      const stepBlock = codeQueue[i];
      if (!stepBlock) continue;
      const cmd = stepBlock.type;
      let nextX = curX;
      let nextY = curY;

      if (cmd === "RIGHT") nextX += 1;
      else if (cmd === "DOWN") nextY += 1;
      else if (cmd === "UP") nextY -= 1;
      else if (cmd === "LEFT") nextX -= 1;
      else if (cmd === "JUMP_RIGHT") nextX += 2;
      else if (cmd === "JUMP_DOWN") nextY += 2;
      else if (cmd === "JUMP_UP") nextY -= 2;
      else if (cmd === "JUMP_LEFT") nextX -= 2;

      // Boundary check
      if (nextX < 0 || nextX >= COLS || nextY < 0 || nextY >= ROWS) {
        setRunStatus("out_of_bounds");
        setIsRunning(false);
        return;
      }

      // Obstacle collision check
      if (isObstacle(nextX, nextY)) {
        setKiboPos({ x: nextX, y: nextY });
        setRunStatus("hit_obstacle");
        setIsRunning(false);
        return;
      }

      // Move Kibo
      curX = nextX;
      curY = nextY;
      setKiboPos({ x: curX, y: curY });

      // Goal star reached
      if (curX === puzzle.goalPos.x && curY === puzzle.goalPos.y) {
        setRunStatus("success");
        setIsRunning(false);
        return;
      }
    }

    if (!abortRunRef.current) {
      setRunStatus("incomplete");
      setIsRunning(false);
    }
  };

  return {
    puzzle,
    kiboPos,
    codeQueue,
    currentStepIndex,
    isRunning,
    runStatus,
    isObstacle,
    addCommand,
    removeCommand,
    handleClearAll,
    handleResetKibo,
    handleRunCode,
    handleRandomize,
  };
}
