import {
  Code2,
  Repeat,
  GitBranch,
  Box,
  Bug,
  PieChart,
  Zap,
  Play,
  Gamepad2,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export interface ModuleCategoryTheme {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function getModuleCategoryTheme(category: string): ModuleCategoryTheme {
  switch (category) {
    case "logic":
      return {
        name: "Logika Urutan",
        icon: Code2,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      };
    case "loops":
      return {
        name: "Perulangan (Loop)",
        icon: Repeat,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      };
    case "conditionals":
      return {
        name: "Jika-Maka (If-Else)",
        icon: GitBranch,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
      };
    case "variables":
      return {
        name: "Variabel & Data",
        icon: Box,
        color: "text-teal-600",
        bgColor: "bg-teal-50",
        borderColor: "border-teal-200",
      };
    case "debugging":
      return {
        name: "Pemburu Bug",
        icon: Bug,
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
      };
    case "algorithms":
      return {
        name: "Algoritma Solusi",
        icon: PieChart,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
      };
    case "functions":
      return {
        name: "Fungsi Mandiri",
        icon: Zap,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
      };
    case "events":
      return {
        name: "Event & Aksi",
        icon: Play,
        color: "text-sky-600",
        bgColor: "bg-sky-50",
        borderColor: "border-sky-200",
      };
    case "game_design":
      return {
        name: "Arsitektur Game",
        icon: Gamepad2,
        color: "text-violet-600",
        bgColor: "bg-violet-50",
        borderColor: "border-violet-200",
      };
    default:
      return {
        name: "Modul Koding",
        icon: LayoutGrid,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      };
  }
}
