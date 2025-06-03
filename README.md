# Análise Lotofácil

Aplicação web para registro e análise de resultados da Lotofácil.

## Estrutura do Projeto

### Layout

- **Menu Lateral (15% da tela)**
  - Fundo azul petróleo (#1B365C)
  - Texto em branco
  - Opções:
    - Registrar Resultado
    - Análise de Resultados
  - Inicialmente nenhuma opção selecionada

- **Barra Superior (100% x 15%)**
  - Fundo azul petróleo (#1B365C)
  - Texto em branco
  - Título da aplicação
  - Ocupa 100% da largura e 15% da altura

- **Área de Conteúdo (85% x 85%)**
  - Região principal para exibição das funcionalidades
  - 85% da largura da tela
  - 85% da altura da tela
  - Posicionada abaixo da barra superior
  - Estado inicial: mensagem de boas-vindas solicitando seleção de uma opção do menu
  - Conteúdo das funcionalidades exibido apenas após seleção no menu

### Funcionalidades

1. **Registrar Resultado**
   - Cadastro manual de resultados dos sorteios:
     - Número do concurso
     - Data do sorteio
     - 15 números sorteados
     - Rateio do prêmio por faixa (11 a 15 pontos)
       - Número de ganhadores
       - Valor do prêmio
   - Importação automática de resultados:
     - Botão "Importar Concurso"
     - Modal para informar o número do concurso:
       - Centralizado na tela
       - Overlay escuro bloqueando a tela anterior
       - Fechamento ao clicar fora ou no botão "Cancelar"
       - Suporte a tecla Enter para submissão
       - Estados visuais para carregamento e erro
       - Feedback visual durante interações
     - Busca automática dos dados na API
     - Importação de todos os dados do concurso
   - Filtros por período
   - Visualização em grid com colunas:
     - Concurso
     - Data do Sorteio
     - Números Sorteados (separados por traço)
     - Rateio do Prêmio (por faixa de acertos)

2. **Análise de Resultados**
   - Análise dos últimos 12 meses de resultados
   - Opções de análise:
     - Números que mais saíram
     - Números que menos saíram
     - Análise de números individuais
     - Análise de combinações
   - Configuração da quantidade de resultados a exibir

## Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- React

## Cores do Projeto

- **Azul Petróleo Principal**: #1B365C
- **Azul Secundário (Hover)**: #2C4C7C
- **Texto**: #FFFFFF (branco)
- **Fundo**: #F9FAFB (cinza claro)

## Estrutura de Componentes

- `Sidebar`: Menu lateral
- `TopBar`: Barra superior
- `TelaRegistro`: Tela de registro de resultados
  - `RegistroResultado`: Formulário de registro manual
  - `ImportarConcursoModal`: Modal de importação de concurso
    - Bloqueio de scroll da página
    - Overlay com opacidade
    - Interações intuitivas (clique fora para fechar)
    - Estados de carregamento e erro
    - Acessibilidade aprimorada
- `TelaAnalise`: Tela de análise de resultados

## Serviços

- `lotofacilService`: 
  - Integração com API externa
  - Busca de resultados por número do concurso
  - Busca do último resultado disponível
  - Formatação de dados para o formato da aplicação

## Interações e UX

- **Modais**:
  - Centralização automática
  - Bloqueio de interação com a tela de fundo
  - Overlay com opacidade para foco
  - Fechamento por clique fora ou botão
  - Feedback visual em todas as ações
  - Estados de carregamento claros
  - Suporte a navegação por teclado
  - Acessibilidade ARIA

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse a aplicação em `http://localhost:3000`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
