import Image from "next/image";

export function DoctorSection() {
  return (
    <section id="doctora" className="scroll-mt-24 bg-[var(--color-warm-white)] py-12 sm:py-14 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-[18px] sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="relative mx-auto w-full max-w-[370px]">
          <div className="absolute -left-5 top-10 h-48 w-48 rounded-full bg-[var(--color-beige)]" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[var(--color-beige)]">
            <Image src="/Gallery/reales/doctora-jenifer-retrato-bienvenida.png" alt="Dra. Jenifer Gordillo Salazar" fill sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover object-center" />
          </div>
        </div>
        <div>
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta)]">Sobre la doctora</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--color-coffee)]">Dra. Jenifer Gordillo Salazar</h2>
          <p className="mt-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--color-terracotta)]">Medicina Estética · Regenerativa · Antienvejecimiento</p>
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-[var(--color-muted)]">Médica con formación en Medicina Estética, Antienvejecimiento y Regenerativa, enfocada en el cuidado integral de la salud, la belleza y el bienestar. Mi objetivo es ofrecer una atención personalizada, basada en la valoración médica y en protocolos diseñados de acuerdo con las necesidades y objetivos de cada paciente.</p>
          <div className="mt-7 border-l-2 border-[var(--color-nude)] pl-5 text-[0.92rem] leading-6 text-[var(--color-coffee)]">Atención personalizada, valoración médica y protocolos diseñados de acuerdo con tus necesidades y objetivos.</div>
        </div>
      </div>
    </section>
  );
}
