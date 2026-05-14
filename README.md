# React Candy-API

# 📌 SOBRE
Aplicativo mobile desenvolvido em React Native com o objetivo de consumir uma API REST para autenticação e gerenciamento de dados.

## 🎯 Objetivo (MVP)

* Realizar cadastro de usuários
* Autenticar usuário (login)
* Armazenar token localmente
* Consumir dados da API
* Permanência do token

## 🚀 Tecnologias utilizadas

* React Native
* JavaScript
* Css
* AsyncStorage

## 📲 Funcionalidades

* Tela de Login
* Tela de Cadastro
* Validação de usuário
* Consumo de API (GET, POST, PUT, DELETE)
* Persistência do Token com AsyncStorage


## ⚙️ Como executar o projeto

```bash
# Clonar repositório
git clone https://github.com/katapls/atividade.git

# Acessar pasta
cd atividade

# Instalar dependências
npm install @react-native-async-storage/async-storage@2.2.0 @react-navigation/native@7.2.0 @react-navigation/stack@7.8.7 axios@1.13.6 expo-font@14.0.11 expo-status-bar@3.0.9 expo@54.0.33 react-native-safe-area-context@5.6.2 react-native-screens@4.16.0 react-native@0.81.5 react@19.1.0


# Iniciar projeto
npx expo start -c
```

## 🔌 Integração com API

A aplicação consome uma API REST desenvolvida em Laravel.

👉 Endpoints utilizados:

* [POST /Cadastro Usuario][http://127.0.0.1:8000/api/Cadastro_usuario]
* [POST /Salva Doce][http://127.0.0.1:8000/api/Login]
* [GET /Exibir Doce ][http://127.0.0.1:8000/api/exibe_doce/11?token={token}]
* [POST /Salva Doce][http://127.0.0.1:8000/api/salva_doce?token={token}]
* [PUT /Atualiza Doce][http://127.0.0.1:8000/api/atualiza_doce/11?token={token}]
* [DELETE /Deleta Doce][http://127.0.0.1:8000/api/deleta_doce/11?token={token}]
* [GET /Todos Doces][http://127.0.0.1:8000/api/todos_doces]

📬 Documentação completa da API:
👉 [https://documenter.getpostman.com/view/51855037/2sBXirkURM]

## 📂 Estrutura do projeto

```
atividade/
 ├── .expo/
 ├── assets/
 ├── components/
 ├── pages/
 ├── src/
```

## 📄 Documentação completa

* 📘 Documentação: [https://drive.google.com/file/d/1xUXRyPjd9lmlEVtiH8T_wRGjt-9rtQy4/view]
* 📬 API (Postman): [https://documenter.getpostman.com/view/51855037/2sBXirkURM#58ece7f7-8a49-4a1d-82e1-0fe4dd0ce468]
* 💻 Prototipação (Figma): [https://www.figma.com/design/oGhwkE5qhO5RTTKAMcFXQH/Sem-t%C3%ADtulo?node-id=0-1&t=fGRCONJSKu78eXDJ-1]
* 📊 Jira: [https://dstatuibenso.atlassian.net/jira/software/projects/PC/boards/2?atlOrigin=eyJpIjoiM2Y3ZDM4NGYwZWExNDdmY2I5Nzg3NmYxYjJmYjVjZmYiLCJwIjoiaiJ9]
* 🚩 Caso De Teste: [https://trello.com/invite/b/68d3c7e37f0c4de478c6c8cf/ATTI04b52685a1f2e0512619eb551dd9d5c5C93E995B/caso-de-teste]

## 👨‍💻 Autor

Kauã S. Rodrigues   E   Kauan V. Bonome Da Silva
