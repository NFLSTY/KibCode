import React from "react";
import Link from "next/link";

export interface LandingButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  size?: "default" | "lg" | "full";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Standardized landing CTA button matching the vibrant 3D aesthetic of "Beranda".
 * Includes tactile active press depth and smooth hover animations.
 */
export function LandingButton({
  href,
  variant = "primary",
  size = "default",
  icon,
  children,
  className = "",
  onClick,
}: LandingButtonProps) {
  const isHash = href.startsWith("#");

  const baseStyles =
    "group inline-flex items-center justify-center font-heading transition-all duration-300 rounded-full cursor-pointer";

  const sizeStyles = {
    default: "text-sm sm:text-base font-black px-6 py-3 min-h-[48px] gap-2",
    lg: "text-lg sm:text-xl font-black px-8 sm:px-9 py-3.5 min-h-[52px] gap-3",
    full: "w-full text-sm sm:text-base font-black px-6 py-3.5 min-h-[52px] gap-2.5 sm:gap-3",
  }[size];

  const variantStyles = {
    primary:
      "bg-amber-400 hover:bg-amber-500 hover:-translate-y-1 text-amber-950 shadow-[0_5px_0_#D97706] hover:shadow-[0_8px_0_#D97706] active:translate-y-1 active:shadow-[0_2px_0_#D97706]",
    secondary:
      "bg-white hover:bg-blue-50/80 hover:-translate-y-1 text-blue-600 font-bold border-2 border-blue-200 hover:border-blue-400 shadow-[0_4px_0_#BFDBFE] hover:shadow-[0_7px_0_#93C5FD] active:translate-y-1 active:shadow-[0_1px_0_#BFDBFE]",
  }[variant];

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

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  if (isHash) {
    return (
      <a href={href} onClick={onClick} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={combinedClasses}>
      {content}
    </Link>
  );
}
