import corolla from "@/assets/car-corolla.jpg";
import civic from "@/assets/car-civic.jpg";
import compass from "@/assets/car-compass.jpg";
import hb20 from "@/assets/car-hb20.jpg";
import onix from "@/assets/car-onix.jpg";
import tcross from "@/assets/car-tcross.jpg";

export type Car = {
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  anoModelo: number;
  preco: number;
  km: number;
  combustivel: string;
  cambio: "Automático" | "Manual";
  cor: string;
  portas: number;
  fotos: string[];
  descricao: string;
  status: "disponivel" | "vendido";
  destaque?: string;
};

export const cars: Car[] = [
  {
    id: "1075",
    marca: "Toyota",
    modelo: "Corolla",
    versao: "Corolla XEI 2.0 16V Flex Aut.",
    ano: 2022,
    anoModelo: 2023,
    preco: 129900,
    km: 41200,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Prata",
    portas: 4,
    fotos: [corolla],
    descricao:
      "Sedã completo, revisões em dia, único dono e pneus novos. Central multimídia, câmera de ré, sensores de estacionamento e bancos em couro.",
    status: "disponivel",
    destaque: "Único dono",
  },
  {
    id: "1082",
    marca: "Honda",
    modelo: "Civic",
    versao: "Civic EXL 2.0 16V Flex Aut.",
    ano: 2021,
    anoModelo: 2021,
    preco: 118900,
    km: 58700,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Branco",
    portas: 4,
    fotos: [civic],
    descricao:
      "Impecável, com manutenção feita na concessionária. Teto solar, piloto automático e faróis full LED.",
    status: "disponivel",
    destaque: "Revisões na concessionária",
  },
  {
    id: "1090",
    marca: "Jeep",
    modelo: "Compass",
    versao: "Compass Longitude 1.3 Turbo Flex Aut.",
    ano: 2023,
    anoModelo: 2023,
    preco: 154900,
    km: 22400,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Preto",
    portas: 4,
    fotos: [compass],
    descricao:
      "SUV com garantia de fábrica, rodas de liga leve 18\", multimídia de 10,1\" e câmera 360°.",
    status: "disponivel",
    destaque: "Garantia de fábrica",
  },
  {
    id: "1101",
    marca: "Hyundai",
    modelo: "HB20",
    versao: "HB20 Comfort Plus 1.0 12V Flex",
    ano: 2020,
    anoModelo: 2021,
    preco: 62900,
    km: 74300,
    combustivel: "Flex",
    cambio: "Manual",
    cor: "Branco",
    portas: 4,
    fotos: [hb20],
    descricao:
      "Econômico e ideal para o dia a dia. Ar-condicionado, direção elétrica e vidros elétricos.",
    status: "disponivel",
    destaque: "Oportunidade",
  },
  {
    id: "1112",
    marca: "Chevrolet",
    modelo: "Onix",
    versao: "Onix LT 1.0 Turbo Flex Aut.",
    ano: 2022,
    anoModelo: 2022,
    preco: 79900,
    km: 38900,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Vermelho",
    portas: 4,
    fotos: [onix],
    descricao:
      "Hatch turbo, muito econômico, com central MyLink, Wi-Fi nativo e 6 airbags.",
    status: "disponivel",
  },
  {
    id: "1124",
    marca: "Volkswagen",
    modelo: "T-Cross",
    versao: "T-Cross Comfortline 200 TSI Aut.",
    ano: 2023,
    anoModelo: 2023,
    preco: 132900,
    km: 18500,
    combustivel: "Flex",
    cambio: "Automático",
    cor: "Cinza",
    portas: 4,
    fotos: [tcross],
    descricao:
      "SUV compacto praticamente novo, com painel digital, piloto automático e sensor de estacionamento.",
    status: "disponivel",
    destaque: "Seminovo",
  },
];

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function carPath(car: Car) {
  return `/carros/${slugify(car.marca)}/${slugify(car.modelo)}/${car.ano}/${car.id}`;
}

export function carTitle(car: Car) {
  return `${car.marca} ${car.modelo} ${car.ano}`;
}

/** Distância de Levenshtein para busca tolerante a erros de digitação. */
function levenshtein(a: string, b: string) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j]! + 1,
        cur[j - 1]! + 1,
        prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[n]!;
}

function similarity(a: string, b: string) {
  if (!a || !b) return 0;
  if (b.includes(a)) return 1;
  const dist = levenshtein(a, b);
  return 1 - dist / Math.max(a.length, b.length);
}

/** Pontua um carro contra o termo digitado (marca, modelo, versão, ano, cor). */
export function scoreCar(car: Car, query: string) {
  const terms = slugify(query).split("-").filter(Boolean);
  if (!terms.length) return 1;
  const fields = [
    slugify(car.marca),
    slugify(car.modelo),
    slugify(car.versao),
    String(car.ano),
    String(car.anoModelo),
    slugify(car.cor),
    slugify(car.combustivel),
    slugify(car.cambio),
  ];
  let total = 0;
  for (const term of terms) {
    let best = 0;
    for (const field of fields) {
      for (const word of field.split("-")) {
        best = Math.max(best, similarity(term, word));
      }
      best = Math.max(best, similarity(term, field));
    }
    total += best;
  }
  return total / terms.length;
}

export function searchCars(list: Car[], query: string) {
  if (!query.trim()) return list;
  return list
    .map((car) => ({ car, score: scoreCar(car, query) }))
    .filter((r) => r.score >= 0.6)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.car);
}

export const availableCars = () => cars.filter((c) => c.status === "disponivel");
