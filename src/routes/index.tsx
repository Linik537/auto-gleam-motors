import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, ShieldCheck, Star, Timer, Wrench } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero-showroom.jpg";
import { CarCard } from "@/components/site/car-card";
import { availableCars } from "@/lib/cars";
import { dealership } from "@/lib/dealership";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ouroville Motors | Carros seminovos em Uberlândia - MG" },
      {
        name: "description",
        content:
          "Concessionária de veículos seminovos e usados em Uberlândia - MG. Estoque revisado, procedência garantida e financiamento facilitado na Ouroville Motors.",
      },
      { property: "og:title", content: "Ouroville Motors | Carros seminovos em Uberlândia" },
      {
        property: "og:description",
        content: "Estoque revisado, procedência garantida e financiamento facilitado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const destaques = availableCars().slice(0, 3);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Showroom da Ouroville Motors com iluminação dourada"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/75" />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            Uberlândia · Minas Gerais
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            O seminovo certo, com a{" "}
            <span className="text-gradient-gold">procedência que você merece</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Veículos revisados, laudo cautelar aprovado e financiamento em minutos.{" "}
            {dealership.hours}.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/estoque", search: { q: term || undefined } });
            }}
            className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4">
              <Search className="size-4 text-primary" aria-hidden />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Ex: corolla 2022, civic branco..."
                aria-label="Buscar veículo por marca, modelo ou ano"
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-gradient-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold"
            >
              Buscar
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            Nossa busca entende até erros de digitação — tente "crorola".
          </p>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Timer, title: "+12 anos", text: "de mercado em Uberlândia" },
            { icon: ShieldCheck, title: "Laudo cautelar", text: "em todos os veículos" },
            { icon: Wrench, title: "Revisão completa", text: "antes da entrega" },
            { icon: Star, title: "+3.000 clientes", text: "atendidos com nota 4,9" },
          ].map((i) => (
            <div key={i.title} className="flex items-center gap-3">
              <i.icon className="size-8 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold">{i.title}</p>
                <p className="text-sm text-muted-foreground">{i.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold">
            Últimas <span className="text-gradient-gold">novidades</span>
          </h2>
          <Link to="/estoque" className="text-sm font-medium text-primary hover:underline">
            Ver todo estoque
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold">
            O que dizem nossos <span className="text-gradient-gold">clientes</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Marcos A.",
                text: "Comprei meu Corolla e fui muito bem atendido. Documentação resolvida em três dias.",
              },
              {
                name: "Juliana R.",
                text: "Loja séria, carro exatamente como no anúncio e financiamento aprovado no mesmo dia.",
              },
              {
                name: "Rafael S.",
                text: "Deram um valor justo no meu usado como entrada. Recomendo a Ouroville.",
              },
            ].map((d) => (
              <figure key={d.name} className="rounded-xl border border-border/70 bg-card p-6">
                <div className="flex gap-1 text-primary" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm text-muted-foreground">"{d.text}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">{d.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
