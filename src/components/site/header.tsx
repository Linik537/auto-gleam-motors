import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/ouroville-logo.jpg.asset.json";
import { dealership } from "@/lib/dealership";
import { WhatsAppButton } from "./whatsapp-button";

const links = [
  { to: "/estoque", label: "Estoque" },
  { to: "/sobre", label: "Sobre" },
  { to: "/financie", label: "Financie" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo.url}
            alt={`Logo ${dealership.name}`}
            width={44}
            height={44}
            className="size-11 rounded-md object-cover"
          />
          <span className="hidden text-lg font-semibold tracking-wide text-foreground sm:block">
            Ouroville <span className="text-gradient-gold">Motors</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton className="hidden sm:inline-flex" />
          <WhatsAppButton className="sm:hidden" compact />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 md:hidden" aria-label="Navegação mobile">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
