import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CTAButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  href?: string;
  variant?: "primary" | "secondary" | "blue";
  size?: "default" | "lg" | "full";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Standardized CTA Button matching the vibrant 3D aesthetic of "Beranda".
 * Can be used as a link (when href is provided) or a button/form-submit.
 * Features tactile 3D depth, smooth hover animations, and icon bouncing.
 */
export const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      href,
      variant = "primary",
      size = "default",
      icon,
      children,
      className = "",
      disabled,
      type = "button",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group inline-flex items-center justify-center font-heading transition-all duration-300 rounded-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none select-none";

    const sizeStyles = {
      default: "text-sm sm:text-base font-black px-6 py-3 min-h-[48px] gap-2",
      lg: "text-lg sm:text-xl font-black px-8 sm:px-9 py-3.5 min-h-[52px] gap-3",
      full: "w-full text-base sm:text-lg font-black px-6 py-3.5 min-h-[50px] gap-2.5 sm:gap-3",
    }[size];

    const variantStyles = {
      primary:
        "bg-amber-400 hover:bg-amber-500 hover:-translate-y-1 text-amber-950 shadow-[0_5px_0_#D97706] hover:shadow-[0_8px_0_#D97706] active:translate-y-1 active:shadow-[0_2px_0_#D97706] disabled:shadow-[0_3px_0_#D97706]",
      secondary:
        "bg-white hover:bg-blue-50/80 hover:-translate-y-1 text-blue-600 font-bold border-2 border-blue-200 hover:border-blue-400 shadow-[0_4px_0_#BFDBFE] hover:shadow-[0_7px_0_#93C5FD] active:translate-y-1 active:shadow-[0_1px_0_#BFDBFE] disabled:shadow-[0_2px_0_#BFDBFE]",
      blue:
        "bg-blue-500 hover:bg-blue-600 hover:-translate-y-1 text-white shadow-[0_5px_0_#1D4ED8] hover:shadow-[0_8px_0_#1D4ED8] active:translate-y-1 active:shadow-[0_2px_0_#1D4ED8] disabled:shadow-[0_3px_0_#1D4ED8]",
    }[variant];

    const combinedClasses = cn(
      baseStyles,
      sizeStyles,
      variantStyles,
      className
    );

    const content = (
      <>
        {icon && (
          <span className="shrink-0 transition-transform duration-300 group-hover-slow-bounce flex items-center justify-center">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </>
    );

    if (href) {
      const isHash = href.startsWith("#");
      if (isHash) {
        return (
          <a
            href={href}
            onClick={onClick}
            className={combinedClasses}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          href={href}
          onClick={onClick}
          className={combinedClasses}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";