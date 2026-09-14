import { ClipboardCheck, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

const benefits = [
  { icon: HeartHandshake, title: "Atención personalizada", text: "Escuchamos lo que buscas y resolvemos tus dudas desde el inicio." },
  { icon: ClipboardCheck, title: "Valoración profesional", text: "Cada recomendación parte de una valoración previa y responsable." },
  { icon: Sparkles, title: "Tratamientos adaptados", text: "Las opciones se ajustan a tus necesidades y objetivos personales." },
  { icon: ShieldCheck, title: "Acompañamiento durante el proceso", text: "Te orientamos para que te sientas cómoda en cada paso." },
];

export function BenefitsSection() {
  return (
    <section className="bg-[var(--color-coffee)] py-12 text-[var(--color-warm-white)] sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-[18px] sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--color-nude)]">Nuestra forma de atenderte</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em]">Cuidado que se siente cercano</h2>
          </div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="border-t border-white/20 pt-4">
                  <Icon className="size-5 text-[var(--color-nude)]" aria-hidden="true" />
                  <h3 className="mt-3 text-[0.98rem] font-bold">{benefit.title}</h3>
                  <p className="mt-1.5 text-[0.9rem] leading-5 text-white/70">{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
