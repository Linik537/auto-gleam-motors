import { Link } from "@tanstack/react-router";
import { CalendarDays, Gauge } from "lucide-react";
import { carPath, carTitle, type Car } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/dealership";

export function CarCard({ car }: { car: Car }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border/70 bg-card shadow-card transition-colors hover:border-primary/60">
      <Link to={carPath(car)} className="block">
        <div className="relative aspect-4/3 overflow-hidden bg-secondary">
          {car.destaque && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground">
              {car.destaque}
            </span>
          )}
          <img
            src={car.fotos[0]}
            alt={`${carTitle(car)} ${car.cor} à venda na Ouroville Motors`}
            loading="lazy"
            width={1024}
            height={768}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3 p-4">
          <h3 className="text-lg font-semibold">
            {car.marca} <span className="text-gradient-gold">{car.modelo}</span>
          </h3>
          <p className="text-sm text-muted-foreground">{car.versao}</p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-primary" aria-hidden />
              {car.ano}/{car.anoModelo}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="size-3.5 text-primary" aria-hidden />
              {formatKm(car.km)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="rounded-full bg-gradient-gold px-4 py-2 text-sm font-bold text-primary-foreground">
              {formatPrice(car.preco)}
            </span>
            <span className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground group-hover:border-primary group-hover:text-primary">
              Ver mais
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
      <div className="aspect-4/3 animate-pulse bg-secondary" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-full animate-pulse rounded bg-secondary" />
        <div className="h-9 w-1/2 animate-pulse rounded-full bg-secondary" />
      </div>
    </div>
  );
}
