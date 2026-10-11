import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "accent" | "highlight";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      "bg-white border-2 border-slate-100 shadow-[0_8px_20px_-4px_rgba(30,41,59,0.06)]",
    elevated:
      "bg-white border-2 border-blue-100 shadow-[0_12px_28px_-6px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-transform",
    accent:
      "bg-white border-2 border-rose-100 shadow-[0_12px_28px_-6px_rgba(251,113,133,0.12)]",
    highlight:
      "bg-white border-2 border-amber-200 shadow-[0_12px_28px_-6px_rgba(251,191,36,0.15)]",
  };

  return (
    <div
      className={cn("rounded-3xl p-6 relative overflow-hidden", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
