import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  children: ReactNode;
  className?: string;
  message?: string;
  showIcon?: boolean;
  ariaLabel?: string;
};

export function WhatsAppLink({
  children,
  className = "",
  message,
  showIcon = false,
  ariaLabel,
}: WhatsAppLinkProps) {
  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {showIcon ? <MessageCircle className="size-4" aria-hidden="true" /> : null}
      {children}
    </a>
  );
}
