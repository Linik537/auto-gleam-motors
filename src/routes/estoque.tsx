import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { CarCard } from "@/components/site/car-card";
import { availableCars, searchCars } from "@/lib/cars";
import { formatPrice } from "@/lib/dealership";

const searchSchema = z.object({
  q: z.string().optional(),
});

export const Route = createFileRoute("/estoque")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Estoque de carros seminovos | Ouroville Motors Uberlândia" },
      {
        name: "description",
        content:
          "Confira o estoque de veículos seminovos e usados da Ouroville Motors em Uberlândia - MG. Filtre por marca, ano, preço, câmbio e combustível.",
      },
      { property: "og:title", content: "Estoque de carros | Ouroville Motors" },
      {
        property: "og:description",
        content: "Veículos revisados e com procedência em Uberlândia - MG.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EstoquePage,
});

function EstoquePage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/estoque" });
  const [term, setTerm] = useState(q ?? "");
  const [marca, setMarca] = useState("todas");
  const [cambio, setCambio] = useState("todos");
  const [combustivel, setCombustivel] = useState("todos");
  const [anoMin, setAnoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const all = availableCars();
  const marcas = useMemo(() => [...new Set(all.map((c) => c.marca))].sort(), [all]);

  const results = useMemo(() => {
    let list = searchCars(all, q ?? "");
    if (marca !== "todas") list = list.filter((c) => c.marca === marca);
    if (cambio !== "todos") list = list.filter((c) => c.cambio === cambio);
    if (combustivel !== "todos") list = list.filter((c) => c.combustivel === combustivel);
    if (anoMin) list = list.filter((c) => c.ano >= Number(anoMin));
    if (precoMax) list = list.filter((c) => c.preco <= Number(precoMax));
    return list;
  }, [all, q, marca, cambio, combustivel, anoMin, precoMax]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Nosso <span className="text-gradient-gold">estoque</span>
      </h1>

      <div className="mt-6 rounded-xl border border-border/70 bg-card/60 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { q: term || undefined } });
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
            <Search className="size-4 text-primary" aria-hidden />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Pesquisar por marca, modelo ou ano..."
              aria-label="Pesquisar veículos"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold"
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filtrar
          </button>
        </form>

        {showFilters && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Select label="Marca" value={marca} onChange={setMarca} options={["todas", ...marcas]} />
            <Select
              label="Câmbio"
              value={cambio}
              onChange={setCambio}
              options={["todos", "Automático", "Manual"]}
            />
            <Select
              label="Combustível"
              value={combustivel}
              onChange={setCombustivel}
              options={["todos", "Flex", "Gasolina", "Diesel", "Elétrico"]}
            />
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Ano mínimo
              <input
                type="number"
                value={anoMin}
                onChange={(e) => setAnoMin(e.target.value)}
                placeholder="2018"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Preço até (R$)
              <input
                type="number"
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                placeholder="150000"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        <strong className="text-foreground">{results.length}</strong> veículos encontrados
        {precoMax ? ` até ${formatPrice(Number(precoMax))}` : ""}
      </p>

      {results.length === 0 ? (
        <p className="mt-10 rounded-xl border border-border/70 bg-card/60 p-10 text-center text-muted-foreground">
          Nenhum veículo encontrado com esses filtros. Fale com a gente no WhatsApp que buscamos o
          carro certo para você.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
