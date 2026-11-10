# Backend

API do Sistema Acadêmico feita com Node.js e Express.

## Executar

```
npm install
npm run dev
```

- `npm run dev`: inicia com `node --watch`, reinicia sozinho quando um arquivo é salvo.
- `npm start`: inicia normalmente (vai ser usado no deploy).

O servidor sobe em `http://localhost:3000` (ou na porta da variável `PORT`).

## Organização

- `src/app.js`: configura o Express (CORS, leitura do JSON, rotas, 404 e erros).
- `src/server.js`: só liga o servidor com `app.listen()`.
- `src/routes/aluno-routes.js`: define as rotas de `/api/alunos`.
- `src/controller/aluno-controller.js`: recebe a requisição, chama o Model e responde em JSON.
- `src/model/aluno-model.js`: regras do cadastro e lista de alunos em memória.
