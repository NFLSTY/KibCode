import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "tactile-btn inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:transform-none";

    const sizeStyles = {
      sm: "min-h-[44px] px-4 py-2 text-sm gap-1.5",
      md: "min-h-[48px] px-6 py-2.5 text-base gap-2",
      lg: "min-h-[56px] px-8 py-3.5 text-lg gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[0_4px_0_#1D4ED8] active:shadow-[0_1px_0_#1D4ED8] active:translate-y-[3px]",
      secondary:
        "bg-[#FBBF24] hover:bg-[#F59E0B] text-[#795900] shadow-[0_4px_0_#D97706] active:shadow-[0_1px_0_#D97706] active:translate-y-[3px]",
      accent:
        "bg-[#FB7185] hover:bg-[#F43F5E] text-white shadow-[0_4px_0_#E11D48] active:shadow-[0_1px_0_#E11D48] active:translate-y-[3px]",
      success:
        "bg-[#34D399] hover:bg-[#10B981] text-white shadow-[0_4px_0_#059669] active:shadow-[0_1px_0_#059669] active:translate-y-[3px]",
      outline:
        "bg-white hover:bg-slate-50 text-[#1E293B] border-2 border-slate-200 shadow-[0_4px_0_#CBD5E1] active:shadow-[0_1px_0_#CBD5E1] active:translate-y-[3px]",
      ghost:
        "bg-transparent hover:bg-black/5 text-[#1E293B] shadow-none active:translate-y-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
