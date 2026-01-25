# TGT Guia de Negócios (MVP)

Plataforma completa para conectar clientes a prestadores de serviços locais. 
Permite que empresas criem perfis profissionais, gerenciem serviços e recebam orçamentos, enquanto clientes podem buscar, avaliar e agendar serviços de forma simples e direta.

![Status](https://img.shields.io/badge/Status-Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Funcionalidades

### 👤 Para Clientes
- **Busca Inteligente:** Encontre prestadores de serviços por categoria ou nome.
- **Perfil do Usuário:** Gerencie seus dados (CPF, Endereço), histórico de pedidos e preferências.
- **Agendamentos:** Solicite orçamentos e acompanhe o status (Pendente, Confirmado, Concluído).
- **Chat em Tempo Real:** Converse diretamente com as empresas.
- **Sistema de Avaliação:** Classifique serviços com notas e comentários.
- **Favoritos:** Salve empresas para acesso rápido.

### 🏢 Para Empresas
- **Perfil Profissional:** Página pública customizável com Logo, Capa, Portfólio e Mapa.
- **Gestão de Serviços:** Cadastro detalhado de serviços com preços e duração.
- **Dashboard Administrativo:** Painel para aceitar/recusar orçamentos e visualizar métricas.
- **Interação:** Responda a avaliações e mensagens de clientes.

## 🛠️ Tecnologias e Qualidade de Código

### Stack Principal
- **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) + Framer Motion
- **Backend:** [Supabase](https://supabase.com/) (Auth, Postgres, Realtime, Storage)

### Padrões de Qualidade
Este projeto segue rigorosos padrões de qualidade de código:
- **Linting:** ESLint configurado para evitar erros comuns e garantir consistência.
- **Type Safety:** Tipagem estrita para reduzir bugs em tempo de execução.
- **Clean Code:** Estrutura modular de componentes, hooks customizados e contextos.

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- Conta no Supabase

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Matheuscfs/tgt-contratto-mvp.git
    cd tgt-guia-de-negocios
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração do Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com suas credenciais:
    ```env
    VITE_SUPABASE_URL=sua_url_supabase
    VITE_SUPABASE_ANON_KEY=sua_chave_anonima
    ```

4.  **Execute o projeto:**
    ```bash
    npm run dev
    ```

## 🗄️ Estrutura do Banco de Dados

O backend no Supabase utiliza as seguintes tabelas principais:
- `profiles`: Usuários do sistema (discriminados por `user_type`).
- `companies`: Perfis públicos de empresas (vinculados a `profiles`).
- `services`: Catálogo de serviços de cada empresa.
- `bookings`: Solicitações de serviço e agendamentos.
- `reviews`: Avaliações e comentários.
- `messages`: Mensagens trocadas no chat.
- `favorites`: Relação de empresas favoritas dos usuários.

## 🚀 Deploy

O projeto está configurado para deploy automático na **Vercel**.
Basta conectar o repositório GitHub à Vercel e configurar as variáveis de ambiente.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMatheuscfs%2Ftgt-contratto-mvp)

## 📜 Licença

Desenvolvido para o TGT. Todos os direitos reservados.
