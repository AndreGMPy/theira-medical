import { WhatsAppLink } from "@/components/ui/whatsapp-link";

export function WhatsAppFloatingButton() {
  return (
    <WhatsAppLink
      className="group fixed bottom-[calc(18px+env(safe-area-inset-bottom))] right-[calc(18px+env(safe-area-inset-right))] z-30 inline-flex size-[50px] items-center justify-center rounded-full bg-[var(--color-coffee)] text-white shadow-[0_12px_24px_rgba(58,45,42,0.18)] transition-transform hover:-translate-y-1 hover:bg-[var(--color-terracotta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-terracotta)] sm:bottom-6 sm:right-6 sm:size-[52px]"
      showIcon
      ariaLabel="Abrir WhatsApp para agendar una valoración"
    >
      <span className="sr-only">Escribir por WhatsApp</span>
      <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap rounded-full bg-[var(--color-coffee)] px-3 py-2 text-xs font-bold text-white sm:group-hover:block">WhatsApp</span>
    </WhatsAppLink>
  );
}
