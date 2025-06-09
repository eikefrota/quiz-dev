# 📱 QuizDev

![Mockup](https://github.com/eikefrota/quiz-dev/blob/develop/assets/mockup.png)

**QuizDev** é um aplicativo de quizzes interativo, desenvolvido como projeto prático do curso Técnico de Desenvolvimento de Sistemas do **SENAC CE**.  
Criado com foco no aprendizado e aplicação dos conceitos de **React Native**, o app estimula o conhecimento através da gamificação com uma experiência leve, dinâmica e divertida.

---

## 🎯 Objetivo

Aplicar na prática os conhecimentos adquiridos em sala de aula, especialmente sobre **React Native**, desenvolvendo um app mobile que promova o aprendizado por meio de quizzes temáticos.

---

## 🚀 Funcionalidades

- ✅ **Quizzes com múltiplos temas**  
  Perguntas sobre temas variados para testar seus conhecimentos.

- ❓ **Perguntas de múltipla escolha**  
  Cada tema contém perguntas com 4 alternativas, sendo apenas 1 correta.

- ⚡ **Feedback imediato**  
  O usuário recebe um retorno visual indicando se acertou ou errou.

- 🧠 **Pontuação automática**  
  O app calcula a pontuação com base nas respostas corretas.

---

## 🖼️ Demonstrações do App

![Funcionalidades](https://github.com/eikefrota/quiz-dev/blob/develop/assets/funcionalidades.png)

![Fluxo de Telas](https://github.com/eikefrota/quiz-dev/blob/develop/assets/telas.png)

---

## 🛠️ Tecnologias Utilizadas

### 🧩 Frontend
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Context API](https://reactjs.org/docs/context.html)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)

### 🔐 Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JWT (JSON Web Token)](https://jwt.io/) — Autenticação

### 💾 Banco de Dados
- [MongoDB](https://www.mongodb.com/)

---

## 📦 Como executar o projeto

### 🔹 1. Clonar o repositório

```bash
git clone https://github.com/eikefrota/quiz-dev.git
```
### 🔹 2. Rodar o Frontend (App Mobile)

```bash
cd quizdev/mobile
npm install
npx expo start
```
Obs: Certifique-se de ter o Expo CLI instalado globalmente
```bash
npm install -g expo-cli
```
Você pode escanear o QR Code com o aplicativo Expo Go no seu celular para testar o app.

### 🔹 3. Rodar o Backend (API)

```bash
cd quizdev/backend
npm install
npm start
```

Obs: Lembre-se de configurar um arquivo .env com suas variáveis de ambiente, como:
```bash
MONGO_URI=mongodb://localhost:27017/quizdev
JWT_SECRET=sua_chave_secreta
PORT=5000
```

## 📄 Licença
Este projeto foi desenvolvido para fins educacionais.
Sinta-se à vontade para usar, adaptar e contribuir com melhorias!
