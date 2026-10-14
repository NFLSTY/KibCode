import type {
  RegisterStudentDTO,
  LoginStudentDTO,
  AuthResponseDTO,
  RefreshTokenDTO,
  LogoutDTO,
  StudentDTO,
  UpdateOnboardingDTO,
  GameDTO,
  SaveProgressDTO,
  GameProgressDTO,
  GameCategory,
} from "@kibcode/types";

const TOKEN_KEY = "kibcode_token";
const REFRESH_TOKEN_KEY = "kibcode_refresh_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setStoredRefreshToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

class ApiError extends Error {
  statusCode?: number;
  issues?: Array<{ path: string; message: string }>;

  constructor(message: string, statusCode?: number, issues?: Array<{ path: string; message: string }>) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.issues = issues;
  }
}

async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      data.message || `Request failed with status ${res.status}`,
      res.status,
      data.issues
    );
  }

  return data as T;
}

export const api = {
  auth: {
    register: (data: RegisterStudentDTO) =>
      fetcher<AuthResponseDTO>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: LoginStudentDTO) =>
      fetcher<AuthResponseDTO>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    refresh: (data: RefreshTokenDTO) =>
      fetcher<AuthResponseDTO>("/api/auth/refresh", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    logout: (data?: LogoutDTO) =>
      fetcher<{ success: boolean; message: string }>("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify(data || {}),
      }),
  },
  students: {
    getMe: () => fetcher<{ student: StudentDTO }>("/api/students/me"),
    updateOnboarding: (data: UpdateOnboardingDTO) =>
      fetcher<{ message: string; student: StudentDTO }>("/api/students/onboarding", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },
  games: {
    getAll: (category?: GameCategory) => {
      const query = category ? `?category=${category}` : "";
      return fetcher<{ games: GameDTO[] }>(`/api/games${query}`);
    },
    getById: (id: string) => fetcher<{ game: GameDTO }>(`/api/games/${id}`),
    generate: (data: { topic: string; category?: GameCategory; grade?: number; difficulty?: number }) =>
      fetcher<{ game: GameDTO }>("/api/games/generate", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getHint: (data: { question: string; storyPrompt?: string; codeSnippet?: string; grade?: number }) =>
      fetcher<{ hint: string }>("/api/games/hint", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getReview: (data: {
      gameTitle: string;
      score: number;
      correctAnswers: number;
      totalQuestions: number;
      durationSeconds: number;
      grade?: number;
    }) =>
      fetcher<{ message: string; tip: string }>("/api/games/review", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  progress: {
    save: (data: SaveProgressDTO) =>
      fetcher<{ progress: GameProgressDTO }>("/api/progress", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getByStudent: (studentId: string) =>
      fetcher<{ progress: GameProgressDTO[] }>(`/api/progress/student/${studentId}`),
    getSummary: (studentId: string) =>
      fetcher<{
        summary: {
          studentId: string;
          totalScore: number;
          completedGamesCount: number;
          totalTimeSpentSeconds: number;
        };
      }>(`/api/progress/student/${studentId}/summary`),
  },
};
