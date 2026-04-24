# Saving4You | Frontend

Interface web da plataforma Saving4You, desenvolvida para gestão financeira com foco em experiência premium, performance e organização por domínio.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Biome](https://img.shields.io/badge/Biome-2.4-60A5FA)](https://biomejs.dev/)

## Visão do projeto

Este frontend foi projetado para consumir uma API em Java com autenticação baseada em sessão/cookies, oferecendo:

- fluxo de login e logout
- roteamento protegido por perfil de acesso
- dashboards com operações CRUD
- feedback visual e UX consistente
- código tipado e organizado por contexto de negócio

## Tecnologias e bibliotecas

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- TanStack Query (cache, fetch, invalidação)
- TanStack Table (tabelas de dados)
- React Hook Form + Zod (formulários e validação)
- Axios
- Lucide React
- Biome (lint + formatação)

## Arquitetura (feature-first)

Estrutura simplificada:

```text
src/
	api/         -> cliente HTTP e configuração base
	components/  -> componentes de UI reutilizáveis
	features/    -> regras e fluxos por domínio
	pages/       -> composição de telas
	routes/      -> proteção e fluxo de navegação
	types/       -> contratos de tipo
	utils/       -> funções utilitárias
```

Benefícios dessa abordagem:

- alta coesão por funcionalidade
- melhor escalabilidade para novos módulos
- manutenção simplificada
- menor acoplamento entre telas

## Funcionalidades implementadas

- autenticação com login e logout
- verificação de sessão via endpoint de usuário autenticado
- roteamento por role (USER, ADMIN, SUPER_ADMIN)
- dashboard de administração
- dashboard de usuários
- cadastro, edição e remoção de usuários
- cadastro de administradores com regra de permissão
- página de perfil do usuário com resumo completo da conta
- toasts de feedback para ações de sucesso/erro

## Experiência visual

- identidade dark com gradientes e profundidade
- tipografia consistente com tokens de tema
- componentes reutilizáveis com variações de estado
- layout responsivo para desktop e mobile

## Pré-requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Configuração local

1. Instale dependências:

```bash
npm install
```

2. Crie o arquivo de ambiente local:

```bash
cp .env.example .env
```

3. Configure a URL da API no arquivo .env:

```env
VITE_API_URL=http://localhost:8080
```

## Scripts

```bash
npm run dev     # desenvolvimento
npm run lint    # análise estática (Biome)
npm run build   # build de produção (TypeScript + Vite)
npm run preview # preview local do build
```

## Qualidade do código

Status atual:

- lint: ok
- build: ok

Observação de performance:

- o Vite sinaliza chunk principal acima de 500 KB
- recomenda-se code splitting por rota como próxima otimização

## Rotas principais

- /login
- /dashboard/admins
- /dashboard/users
- /user

## Variáveis de ambiente

| Variável | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| VITE_API_URL | Sim | URL base da API backend | http://localhost:8080 |

## Roadmap técnico

- code splitting e lazy loading por rota
- testes de unidade e integração
- pipeline CI (lint, build, test)
- telemetria de erros e monitoramento
- refinamento de acessibilidade

## Aprendizados desta implementação

- integração real entre frontend moderno e backend Java
- estratégia de cache e invalidação com TanStack Query
- modelagem de tipos para evitar erros em runtime
- componentização orientada a design system
- organização de código para crescimento de produto

## Autor

Desenvolvido por Rodrigo Nascimento.

Se este projeto te ajudou ou te inspirou, fique à vontade para dar uma estrela no repositório.
