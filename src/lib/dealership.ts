export const dealership = {
  name: "Ouroville Motors",
  phoneDisplay: "(34) 9 9829-0394",
  phoneDigits: "5534998290394",
  email: "contato@ourovillemotors.com.br",
  address: "Avenida João Pinheiro, 3488 - Uberlândia - MG",
  hours: "Segunda a sábado, das 08:00 às 18:00",
  mapsEmbed:
    "https://www.google.com/maps?q=Avenida%20Jo%C3%A3o%20Pinheiro%2C%203488%2C%20Uberl%C3%A2ndia%20-%20MG&output=embed",
  social: {
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ?? `Olá! Vim pelo site da ${dealership.name} e gostaria de mais informações.`,
  );
  return `https://wa.me/${dealership.phoneDigits}?text=${text}`;
}

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatKm(value: number) {
  return `${value.toLocaleString("pt-BR")} km`;
}
