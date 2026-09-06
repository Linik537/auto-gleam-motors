import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Fuel, Gauge, Palette, Settings2, DoorOpen } from "lucide-react";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { cars, carTitle, type Car } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/dealership";

export const Route = createFileRoute("/carros/$marca/$modelo/$ano/$id")({
  loader: ({ params }) => {
    const car = cars.find((c) => c.id === params.id && c.status === "disponivel");
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Veículo indisponível | Ouroville Motors" }, { name: "robots", content: "noindex" }],
      };
    }
    const { car } = loaderData;
    const title = `${carTitle(car)} ${car.cor} por ${formatPrice(car.preco)} | Ouroville Motors`;
    const description = `${car.versao} ${car.ano}/${car.anoModelo}, ${formatKm(car.km)}, câmbio ${car.cambio.toLowerCase()}, ${car.combustivel}. À venda na Ouroville Motors, Uberlândia - MG.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CarNotFound,
  errorComponent: CarNotFound,
  component: CarPage,
});

function CarNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Veículo indisponível</h1>
      <p className="mt-3 text-muted-foreground">
        Este carro pode já ter sido vendido. Veja outras opções no nosso estoque.
      </p>
      <Link
        to="/estoque"
        className="mt-6 inline-block rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold"
      >
        Ver estoque
      </Link>
    </div>
  );
}

function CarPage() {
  const { car } = Route.useLoaderData();
  const specs: { icon: typeof Gauge; label: string; value: string }[] = [
    { icon: CalendarDays, label: "Ano", value: `${car.ano}/${car.anoModelo}` },
    { icon: Gauge, label: "Quilometragem", value: formatKm(car.km) },
    { icon: Settings2, label: "Câmbio", value: car.cambio },
    { icon: Fuel, label: "Combustível", value: car.combustivel },
    { icon: Palette, label: "Cor", value: car.cor },
    { icon: DoorOpen, label: "Portas", value: String(car.portas) },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-xs text-muted-foreground" aria-label="Você está aqui">
        <Link to="/estoque" className="hover:text-primary">
          Estoque
        </Link>{" "}
        / {carTitle(car)}
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Gallery car={car} />

        <aside className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              {car.marca} <span className="text-gradient-gold">{car.modelo}</span> {car.ano}
            </h1>
            <p className="mt-2 text-muted-foreground">{car.versao}</p>
          </div>

          <p className="inline-block rounded-full bg-gradient-gold px-6 py-3 text-2xl font-bold text-primary-foreground shadow-gold">
            {formatPrice(car.preco)}
          </p>

          <dl className="grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-lg border border-border/70 bg-card p-3">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <s.icon className="size-3.5 text-primary" aria-hidden />
                  {s.label}
                </dt>
                <dd className="mt-1 text-sm font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>

          <WhatsAppButton
            className="w-full justify-center py-3 text-base"
            message={`Olá! Tenho interesse no ${carTitle(car)} (${car.versao}) anunciado por ${formatPrice(car.preco)} no site da Ouroville Motors.`}
          />
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Descrição</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">{car.descricao}</p>
      </section>
    </div>
  );
}

function Gallery({ car }: { car: Car }) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-border/70 bg-secondary">
        <img
          src={car.fotos[0]}
          alt={`${carTitle(car)} ${car.cor} - foto principal`}
          width={1024}
          height={768}
          className="aspect-4/3 w-full object-cover"
        />
      </div>
      {car.fotos.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {car.fotos.slice(1).map((foto, i) => (
            <img
              key={foto}
              src={foto}
              alt={`${carTitle(car)} - foto ${i + 2}`}
              loading="lazy"
              width={256}
              height={192}
              className="aspect-4/3 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
