"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
  sizes: string;
  preload?: boolean;
};

export function ImageWithFallback({
  src,
  alt,
  label,
  className = "",
  sizes,
  preload = false,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative grid h-full w-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,var(--color-nude),transparent_35%),linear-gradient(145deg,var(--color-beige),var(--color-warm-white))] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="relative flex flex-col items-center gap-3 text-center text-[var(--color-coffee)]">
          <ImageIcon className="size-6 stroke-[1.25] text-[var(--color-terracotta)]" aria-hidden="true" />
          <span className="max-w-40 font-[family-name:var(--font-heading)] text-xl italic">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      preload={preload}
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
