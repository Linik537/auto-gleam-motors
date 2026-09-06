import { MessageCircle } from "lucide-react";
import { dealership, whatsappLink } from "@/lib/dealership";
import { cn } from "@/lib/utils";

export function WhatsAppButton({
  message,
  className,
  compact = false,
}: {
  message?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp com a ${dealership.name} pelo número ${dealership.phoneDisplay}`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden />
      {!compact && <span>{dealership.phoneDisplay}</span>}
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-gradient-gold shadow-gold transition-transform hover:scale-105"
    >
      <MessageCircle className="size-7 text-primary-foreground" aria-hidden />
    </a>
  );
}
