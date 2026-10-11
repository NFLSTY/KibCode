import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "success";
}

export function ProgressBar({
  value,
  label,
  showPercent = true,
  className,
  variant = "primary",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const variantColors = {
    primary: "bg-[#3B82F6]",
    secondary: "bg-[#FBBF24]",
    success: "bg-[#34D399]",
  };

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-sm font-bold">
          {label && <span className="text-slate-700">{label}</span>}
          {showPercent && (
            <span className="text-[#3B82F6] font-extrabold">{clampedValue}%</span>
          )}
        </div>
      )}
      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out shadow-sm",
            variantColors[variant]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
