import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "neutral";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-blue-100 text-blue-700 border border-blue-200",
    secondary: "bg-amber-100 text-amber-800 border border-amber-200",
    accent: "bg-rose-100 text-rose-700 border border-rose-200",
    success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-bold gap-1",
    md: "px-3.5 py-1 text-sm font-bold gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-bold select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
}
