import React from "react";

interface KiboLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function KiboLogo({ size = 40, className = "", ...props }: KiboLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Kibo Robot Mascot Logo"
      {...props}
    >
      {/* Antenna Pole & Glowing Orb */}
      <rect x="30" y="3" width="4" height="11" rx="2" fill="#94A3B8" />
      <circle cx="32" cy="5.5" r="5" fill="#FBBF24" />
      <circle cx="30.5" cy="4" r="1.5" fill="#FEF3C7" />

      {/* Head Outer Shell */}
      <rect
        x="8"
        y="13"
        width="48"
        height="43"
        rx="15"
        fill="#3B82F6"
      />

      {/* Tactile Bottom Shell Border / Shadow */}
      <path
        d="M8 43C8 49.6274 13.3726 55 20 55H44C50.6274 55 56 49.6274 56 43V45C56 51.6274 50.6274 57 44 57H20C13.3726 57 8 51.6274 8 45V43Z"
        fill="#1D4ED8"
      />

      {/* Left Ear Sensor */}
      <rect x="4" y="25" width="5" height="16" rx="2.5" fill="#60A5FA" />
      {/* Right Ear Sensor */}
      <rect x="55" y="25" width="5" height="16" rx="2.5" fill="#60A5FA" />

      {/* Visor Screen (Navy / Dark Slate) */}
      <rect
        x="13"
        y="18"
        width="38"
        height="29"
        rx="10"
        fill="#0F172A"
      />

      {/* Visor Glass Reflection */}
      <path
        d="M17 22C17 20.3431 18.3431 19 20 19H44C45.6569 19 47 20.3431 47 22V24H17V22Z"
        fill="white"
        fillOpacity="0.08"
      />

      {/* Left Eye (Cyan Glow + Reflection) */}
      <circle cx="23" cy="30" r="4.5" fill="#38BDF8" />
      <circle cx="21.5" cy="28.5" r="1.5" fill="white" />

      {/* Right Eye (Cyan Glow + Reflection) */}
      <circle cx="41" cy="30" r="4.5" fill="#38BDF8" />
      <circle cx="39.5" cy="28.5" r="1.5" fill="white" />

      {/* Cheeks / Blush */}
      <circle cx="18" cy="36" r="2" fill="#FB7185" fillOpacity="0.6" />
      <circle cx="46" cy="36" r="2" fill="#FB7185" fillOpacity="0.6" />

      {/* Friendly Smile */}
      <path
        d="M28 35.5C28 37.7 29.8 39.5 32 39.5C34.2 39.5 36 37.7 36 35.5"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
