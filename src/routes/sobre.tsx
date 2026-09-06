import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { dealership } from "@/lib/dealership";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Ouroville Motors | Concessionária em Uberlândia - MG" },
      {
        name: "description",
        content:
          "Conheça a Ouroville Motors: história, valores, endereço na Avenida João Pinheiro 3488 em Uberlândia - MG, horários e contato.",
      },
      { property: "og:title", content: "Sobre a Ouroville Motors" },
      {
        property: "og:description",
        content: "Concessionária de seminovos com procedência em Uberlândia - MG.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  const [sending, setSending] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Sobre a <span className="text-gradient-gold">Ouroville Motors</span>
      </h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <p className="text-muted-foreground">
          A Ouroville Motors nasceu em Uberlândia com um propósito simples: vender carros em que
          nossa própria família andaria. Cada veículo do nosso estoque passa por avaliação de
          procedência, checagem de laudo cautelar e revisão mecânica antes de entrar na loja.
        </p>
        <p className="text-muted-foreground">
          Nossos valores são transparência, atendimento próximo e negócio justo. Aqui você conversa
          direto com quem decide, sabe exatamente o histórico do carro e sai da loja com toda a
          documentação encaminhada.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <MapPin className="size-6 text-primary" aria-hidden />
          <h2 className="mt-3 text-lg font-semibold">Endereço</h2>
          <p className="mt-2 text-sm text-muted-foreground">{dealership.address}</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <Clock className="size-6 text-primary" aria-hidden />
          <h2 className="mt-3 text-lg font-semibold">Horário</h2>
          <p className="mt-2 text-sm text-muted-foreground">{dealership.hours}</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <Phone className="size-6 text-primary" aria-hidden />
          <h2 className="mt-3 text-lg font-semibold">Contato</h2>
          <p className="mt-2 text-sm text-muted-foreground">{dealership.phoneDisplay}</p>
          <p className="text-sm text-muted-foreground">{dealership.email}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border/70">
          <iframe
            title="Mapa da localização da Ouroville Motors"
            src={dealership.mapsEmbed}
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <form
          className="rounded-xl border border-border/70 bg-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              setSending(false);
              (e.target as HTMLFormElement).reset();
              toast.success("Mensagem enviada! Entraremos em contato em breve.");
            }, 600);
          }}
        >
          <h2 className="text-xl font-semibold">Fale com a gente</h2>
          <div className="mt-4 space-y-4">
            <Field label="Nome" name="nome" required />
            <Field label="Telefone / WhatsApp" name="telefone" required type="tel" />
            <label className="block text-sm font-medium">
              Mensagem
              <textarea
                name="mensagem"
                rows={4}
                required
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 accent-[var(--gold)]" />
              Autorizo o uso dos meus dados para contato, conforme a Lei Geral de Proteção de Dados
              (LGPD).
            </label>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Enviar mensagem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
