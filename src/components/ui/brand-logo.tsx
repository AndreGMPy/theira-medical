"use client";

import Image from "next/image";
import { useState } from "react";

type BrandLogoProps = {
  className?: string;
  preload?: boolean;
};

const logoSources = [
  "/Gallery/reales/logo-theira-transparente.png",
  "/Gallery/logo-theira-transparente.png",
  "/Gallery/logo-theira-circular-fondo-claro.png",
];

export function BrandLogo({ className = "", preload = false }: BrandLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return (
      <div
        className={`grid place-items-center rounded-full border border-[var(--color-beige)] bg-[var(--color-warm-white)] font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--color-coffee)] ${className}`}
        aria-label="Theira Medical"
      >
        T
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 ${className}`}>
      <Image
        src={logoSources[sourceIndex]}
        alt="Logo de Theira Medical"
        fill
        preload={preload}
        sizes="(max-width: 768px) 64px, 88px"
        className="object-contain"
        onError={() => {
          if (sourceIndex < logoSources.length - 1) {
            setSourceIndex((current) => current + 1);
            return;
          }

          setHasFailed(true);
        }}
      />
    </div>
  );
}
