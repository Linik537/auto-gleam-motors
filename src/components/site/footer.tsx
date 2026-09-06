import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { dealership } from "@/lib/dealership";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold">
            Ouroville <span className="text-gradient-gold">Motors</span>
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {dealership.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {dealership.phoneDisplay}
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {dealership.email}
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {dealership.hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">
                Início
              </Link>
            </li>
            <li>
              <Link to="/estoque" className="hover:text-primary">
                Estoque
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-primary">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/financie" className="hover:text-primary">
                Financie
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Redes sociais
          </h3>
          <div className="mt-4 flex gap-3">
            <a
              href={dealership.social.instagram}
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Instagram className="size-5" aria-hidden />
            </a>
            <a
              href={dealership.social.facebook}
              aria-label="Facebook"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Facebook className="size-5" aria-hidden />
            </a>
            <a
              href={dealership.social.youtube}
              aria-label="YouTube"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Youtube className="size-5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {dealership.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
