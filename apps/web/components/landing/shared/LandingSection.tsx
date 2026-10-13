import React from "react";

export interface LandingSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Standardized landing page section container ensuring uniform
 * max-width, horizontal padding, and scroll-margin-top for navbar clearance.
 */
export function LandingSection({
  id,
  children,
  className = "",
  ...props
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10 ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
}
