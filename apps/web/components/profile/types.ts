export interface BadgeData {
  id: string;
  name: string;
  description: string;
  criteria: string;
  icon: string;
  category: "coding" | "math" | "streak" | "adventure";
  unlocked: boolean;
  unlockedAt?: string;
  accentColor: "amber" | "blue" | "rose" | "purple" | "emerald";
}

export interface AvatarOption {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  bgGradient: string;
  borderColor: string;
}
