# 🎬 CineFlix - Aplicação de Filmes

## Descrição

CineFlix é uma aplicação web interativa desenvolvida em React que consome a **API do The Movie DB**.  
Ela permite buscar filmes, visualizar detalhes, trailers e adicionar filmes aos favoritos, oferecendo uma boa experiência de usuário.

---

## Funcionalidades

- **Listagem de filmes populares** com paginação.
- **Busca de filmes** em tempo real.
- **Página de detalhes** com informações completas, trailer e genres.
- **Favoritos** salvos no **localStorage**.
- **Hover nos cards** com zoom e overlay mostrando nota e sinopse.
- **Layout moderno** usando Material-UI.

---

## Tecnologias Utilizadas

- **React + Vite**
- **Material-UI** para componentes e estilização
- **React Router DOM** para navegação entre páginas
- **Axios** para requisições HTTP
- **LocalStorage** para salvar favoritos
- **Vercel** para deploy da aplicação

---

## Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone <link-do-repositorio>
   ```

Entre na pasta do projeto:
cd cineflix

Instale as dependências:
npm install

Execute a aplicação:
npm run dev

Abra no navegador: http://localhost:5173

\*Links:

Repositório no GitHub: https://github.com/HelderSantos-15/Framework-web1-cineflix.git

Aplicação publicada (Vercel): https://framework-web1-cineflix.vercel.app/

Projeto no CodeSandbox: https://codesandbox.io/p/github/HelderSantos-15/Framework-web1-cineflix/main?import=true

\*Estrutura do Projeto

cineflix/
│
├─ public/
├─ src/
│ ├─ components/ # Cards, Header, Botões, etc.
│ ├─ pages/ # Home, Details, Favoritos
│ ├─ services/ # APIs com Axios
│ └─ App.jsx # Roteamento
│
├─ package.json
├─ vite.config.js
└─ README.md

Integrantes:

Helder Camillo Maximo Dos Santos

Matheus Rodrigues De Carvalho
