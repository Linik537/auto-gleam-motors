import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, CreditCard, FileCheck2, Handshake, Phone } from "lucide-react";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { dealership } from "@/lib/dealership";

export const Route = createFileRoute("/financie")({
  head: () => ({
    meta: [
      { title: "Financiamento de veículos | Ouroville Motors Uberlândia" },
      {
        name: "description",
        content:
          "Entenda como funciona o financiamento de carros na Ouroville Motors: simulação rápida, aprovação com os principais bancos e entrada facilitada.",
      },
      { property: "og:title", content: "Financie seu carro | Ouroville Motors" },
      {
        property: "og:description",
        content: "Simule seu financiamento com a Ouroville Motors em Uberlândia - MG.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FinanciePage,
});

const steps = [
  {
    icon: CreditCard,
    title: "1. Escolha o carro",
    text: "Selecione o veículo no nosso estoque ou nos diga o que procura pelo WhatsApp.",
  },
  {
    icon: FileCheck2,
    title: "2. Envie seus dados",
    text: "Precisamos apenas de documento com foto, CPF e comprovante de renda e residência.",
  },
  {
    icon: BadgeCheck,
    title: "3. Aprovação",
    text: "Consultamos os principais bancos e retornamos com as melhores condições de parcela.",
  },
  {
    icon: Handshake,
    title: "4. Retire seu carro",
    text: "Assinatura digital, transferência feita por nós e o carro sai pronto da loja.",
  },
];

function FinanciePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Financie com a <span className="text-gradient-gold">Ouroville Motors</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Trabalhamos com os principais bancos do país para aprovar seu crédito com a menor taxa
        possível. Entrada a partir de 20%, parcelamento em até 60 meses e possibilidade de usar seu
        carro usado como parte do pagamento.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {steps.map((s) => (
          <div key={s.title} className="rounded-xl border border-border/70 bg-card p-6 shadow-card">
            <s.icon className="size-7 text-primary" aria-hidden />
            <h2 className="mt-4 text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-primary/40 bg-card p-8 text-center shadow-gold">
        <h2 className="text-2xl font-semibold">Quer simular agora?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Fale com nossa equipe e receba a simulação em poucos minutos. Atendemos {" "}
          {dealership.hours.toLowerCase()}.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton message="Olá! Gostaria de simular um financiamento na Ouroville Motors." />
          <a
            href={`tel:+${dealership.phoneDigits}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            <Phone className="size-4" aria-hidden /> Ligar agora
          </a>
        </div>
      </div>
    </div>
  );
}
