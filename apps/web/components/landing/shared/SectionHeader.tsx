import React from "react";

export interface SectionHeaderProps {
  layout?: "center" | "split";
  theme?: "light" | "dark";
  eyebrow?: string;
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Standardized landing section header component supporting both centered
 * curriculum/pillars layout and split/horizontal laboratory layouts.
 */
export function SectionHeader({
  layout = "center",
  theme = "light",
  eyebrow,
  badge,
  title,
  description,
  action,
  className = "",
}: SectionHeaderProps) {
  if (layout === "split") {
    return (
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-100 ${className}`.trim()}
      >
        <div>
          {badge && (
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs sm:text-sm tracking-wide uppercase mb-1">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          )}

          {eyebrow && (
            <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest block mb-1">
              {eyebrow}
            </span>
          )}

          <h3 className="font-heading text-3xl sm:text-4xl font-black text-slate-900">
            {title}
          </h3>

          {description && (
            <p className="text-slate-600 text-sm sm:text-base font-medium mt-1 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-2 shrink-0">{action}</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-3 ${className}`.trim()}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/30">
          {badge.icon}
          <span>{badge.text}</span>
        </div>
      )}

      {eyebrow && (
        <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest block mb-1">
          {eyebrow}
        </span>
      )}

      <h2
        className={`font-heading text-3xl sm:text-4xl font-black leading-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`text-base sm:text-lg font-medium leading-relaxed ${
            theme === "dark" ? "text-blue-100" : "text-slate-600 mt-1"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
