type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--color-coffee)]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-[0.98rem] leading-6 text-[var(--color-muted)] sm:text-[1.02rem]">{description}</p>
      ) : null}
    </div>
  );
}
