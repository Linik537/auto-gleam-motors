# Ouroville Motors — roadmap

## Concluído
- Design system dark + ouro (src/styles.css)
- Header fixo com WhatsApp + menu mobile, footer, botão flutuante
- Home: hero com busca fuzzy, provas sociais, destaques, depoimentos
- Estoque com busca + filtros (marca, câmbio, combustível, ano, preço)
- Página individual do carro: /carros/$marca/$modelo/$ano/$id (SEO + WhatsApp)
- Sobre (mapa, horários, formulário LGPD) e Financie
- Favicon e SEO por página

## Pendente (depende da conexão com o Supabase do cliente)
- [ ] Tabelas `carros` e `leads` + índices trigram (pg_trgm) para busca fuzzy
- [ ] RLS: leitura pública só de carros "disponivel"; escrita e leads só admin
- [ ] Tabela `user_roles` + função `has_role`
- [ ] Storage bucket de fotos dos carros
- [ ] Autenticação e painel /admin (CRUD de carros, upload de fotos, leads)
- [ ] Trocar dados de exemplo (src/lib/cars.ts) pelas consultas ao banco
- [ ] Formulário de contato gravando na tabela `leads`
