import { Position, PuzzleState, COLS, ROWS, DEFAULT_PUZZLE } from "./types";

/**
 * Breadth-First Search (BFS) to compute the shortest path distance.
 * Returns -1 if goal is unreachable.
 */
export function getShortestPath(
  start: Position,
  goal: Position,
  obstacles: Position[]
): number {
  const visited = new Set<string>();
  const queue = [{ x: start.x, y: start.y, dist: 0 }];
  visited.add(`${start.x},${start.y}`);

  const dirs = [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.x === goal.x && current.y === goal.y) return current.dist;

    for (const { dx, dy } of dirs) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      const key = `${nx},${ny}`;

      if (
        nx >= 0 &&
        nx < COLS &&
        ny >= 0 &&
        ny < ROWS &&
        !visited.has(key) &&
        !obstacles.some((o) => o.x === nx && o.y === ny)
      ) {
        visited.add(key);
        queue.push({ x: nx, y: ny, dist: current.dist + 1 });
      }
    }
  }

  return -1;
}

/**
 * Procedurally generates a solvable, challenging puzzle layout.
 * Ensures the shortest path is between 3 and 7 steps.
 */
export function generateRandomPuzzle(): PuzzleState {
  const start: Position = { x: 0, y: 0 };
  const candidateGoals: Position[] = [
    { x: 3, y: 0 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ];

  for (let attempt = 0; attempt < 150; attempt++) {
    const goal = candidateGoals[Math.floor(Math.random() * candidateGoals.length)]!;

    const availableCells: Position[] = [];
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        if ((x !== start.x || y !== start.y) && (x !== goal.x || y !== goal.y)) {
          availableCells.push({ x, y });
        }
      }
    }

    const numObstacles = Math.random() > 0.4 ? 3 : 2;
    const shuffled = [...availableCells].sort(() => Math.random() - 0.5);
    const obstacles = shuffled.slice(0, numObstacles);

    const pathDist = getShortestPath(start, goal, obstacles);
    if (pathDist >= 3 && pathDist <= 7) {
      return { startPos: start, goalPos: goal, obstacles };
    }
  }

  return DEFAULT_PUZZLE;
}
