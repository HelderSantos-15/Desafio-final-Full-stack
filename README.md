# 📚 Desafio Final – Frameworks Web II

## Aplicação Full Stack com React + Spring Boot

Este projeto foi desenvolvido para o **Trabalho Prático de Frameworks Web II – Unilavras**, unindo Frontend em **React** com Backend em **Spring Boot**, incluindo autenticação com JWT, persistência em banco Aiven, e deploy completo na nuvem.

---

## 👨‍💻 Integrantes do Grupo

* **Helder Camillo Máximo Dos Santos**
  

---

## 🚀 Descrição do Projeto

A aplicação consiste em um sistema de **catálogo**, onde o usuário pode:

* Criar uma conta (registro)
* Fazer login com autenticação JWT
* Navegar pela Home
* Visualizar detalhes
* Favoritar itens
* Acessar página de detalhes local
* Permanecer logado enquanto estiver navegando
* Deslogar quando quiser

O projeto utiliza o fluxo completo **Frontend → API → Banco de Dados**, incluindo proteção de rotas, headers JWT e consumo da API hospedada.

---

# 🏗️ Tecnologias Utilizadas

## 🖥️ **Frontend**

* React.js
* React Router DOM
* Axios
* TailwindCSS / CSS
* LocalStorage para persistência do login
* Vercel (deploy)

## 🛠️ **Backend**

* Java 25
* Spring Boot
* Spring Data JPA
* Spring Security + JWT
* Banco de Dados PostgreSQL no Aiven
* Swagger (Documentação da API)
* Render (deploy backend)

---

# 🔗 Links Importantes

### 🌐 **Repositório GitHub**

📎 [https://github.com/HelderSantos-15/Desafio-final-Full-stack.git](https://github.com/HelderSantos-15/Desafio-final-Full-stack.git)

### 🎨 **Frontend Deploy (Vercel)**

🖥️ [https://desafio-final-full-stack.vercel.app/](https://desafio-final-full-stack.vercel.app/)

### ⚙️ **Backend Deploy (Render)**

🔧 [https://desafio-final-full-stack-1.onrender.com](https://desafio-final-full-stack-1.onrender.com)


---

# 📌 Como Rodar o Projeto Localmente

---

# 🖥️ FRONTEND

### **1. Clonar o repositório**

```bash
git clone https://github.com/HelderSantos-15/Desafio-final-Full-stack.git
```

### **2. Entrar na pasta do frontend**

```bash
cd frontend
```

### **3. Instalar dependências**

```bash
npm install
```

### **4. Rodar o projeto**

```bash
npm run dev
```

### ✔️ O frontend ficará disponível em:

[http://localhost:5173](http://localhost:5173)
*(ou porta semelhante)*

---

# ⚙️ BACKEND

### **1. Entrar na pasta `/api`**

```bash
cd api
```

### **2. Instalar dependências (Maven)**

```bash
mvn clean install
```

### **3. Executar o servidor**

```bash
mvn spring-boot:run
```

### ✔️ API disponível em:

[http://localhost:8080](http://localhost:8080)

---

# 🗄️ Banco de Dados (Aiven)

A aplicação usa:
SQL
* Banco: **Mysql Workbench 8.0**
* Hospedagem: **Aiven**
* Conexão através de variáveis no `application.properties`:

```
spring.datasource.url=jdbc:postgresql://<host>:<port>/<db>
spring.datasource.username=<user>
spring.datasource.password=<password>
spring.jpa.hibernate.ddl-auto=update
```

---

# 🔐  O backend implementa:

* `/auth/register` → Cria usuário
* `/auth/login` →  faz login
* Rotas protegidas → Requer Senha

O frontend salva a senha no `localStorage` e envia automaticamente com **Axios**.

---

# 🛡️ Proteção de Rotas no Frontend

As rotas só são acessadas se houver um usuário logado:

```jsx
function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("usuarioLogado");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
```

Essa lógica permite:

* Manter usuário logado enquanto navega
* Impedir acesso direto sem login
* Evitar retornar para login ao voltar da página de detalhes


---

# 📑 Funcionalidades Implementadas

### ✔️ CRUD completo

### ✔️ Frontend consumindo API real

### ✔️ Deploy no Vercel + Render

### ✔️ Relacionamentos no banco

### ✔️ Rotas protegidas

### ✔️ Persistência do login

### ✔️ Favoritos

### ✔️ Página de detalhes

---

# 🏆 Conclusão

Este projeto demonstra o ciclo completo de uma aplicação full stack moderna, integrando tecnologias atuais e hospedagem na nuvem, consolidando os conteúdos das disciplinas de **Frameworks Web I e II**.

---
