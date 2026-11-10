# Sistema Acadêmico DS II

Projeto integrador da disciplina Desenvolvimento para Servidores II.

- **Aluno:** Luiz Matheus Bezerra da Silva
- **Turma:** SI - 5º semestre

## Objetivo

Desenvolver gradualmente uma aplicação web para cadastro de alunos, disciplinas, usuários e lançamento de notas.

Nesta entrega (versão 1.2) o sistema cadastra e lista alunos. O frontend se comunica com uma API feita em Node.js com Express.

## Tecnologias

- HTML, CSS e JavaScript (frontend)
- Node.js e Express (backend)
- Insomnia (testes da API)
- Git e GitHub

Previstas para as próximas versões: MySQL e JWT.

## Estrutura

```
sistema-academico-ds2/
├── frontend/            interface (HTML, CSS e JavaScript)
│   ├── index.html
│   ├── css/estilo.css
│   └── js/
│       ├── model/       validação inicial dos dados
│       ├── service/     comunicação com a API (fetch)
│       ├── view/        manipulação da página (DOM)
│       └── controller/  coordena Model, Service e View
├── backend/             API (Node.js e Express)
│   ├── package.json
│   └── src/
│       ├── app.js       configuração do Express (CORS, JSON, rotas, erros)
│       ├── server.js    inicia o servidor
│       ├── routes/      rotas da API
│       ├── controller/  recebe a requisição e monta a resposta
│       └── model/       regras do cadastro e alunos em memória
├── database/            scripts do banco de dados (próximas versões)
└── docs/
    ├── evidencias/      prints dos testes
    └── insomnia/        coleção do Insomnia exportada
```

## Como executar

É preciso ter o Node.js instalado. O backend e o frontend rodam ao mesmo tempo, cada um no seu terminal.

### Backend

```
cd backend
npm install
npm run dev
```

O servidor fica disponível em `http://localhost:3000`.

### Frontend

Abrir o arquivo `frontend/index.html` com a extensão **Live Server** do VS Code (botão direito > Open with Live Server).

O frontend abre em `http://127.0.0.1:5500` e acessa a API em `http://localhost:3000`. Como são origens diferentes, o backend libera o acesso com CORS.

## Endpoints

| Método | Endpoint       | Finalidade                               |
|--------|----------------|------------------------------------------|
| GET    | /api/health    | Verificar se o servidor está funcionando |
| GET    | /api/alunos    | Listar os alunos cadastrados             |
| POST   | /api/alunos    | Cadastrar um aluno                       |

Exemplo de corpo para o cadastro (POST /api/alunos):

```json
{
  "ra": "2026001",
  "nome": "Luiz Matheus",
  "email": "luiz@email.com",
  "curso": "SI",
  "turma": "5 SI"
}
```

Respostas esperadas:

| Teste                         | Status          |
|-------------------------------|-----------------|
| GET /api/health               | 200 OK          |
| GET /api/alunos               | 200 OK          |
| POST /api/alunos (cadastro)   | 201 Created     |
| POST com campo vazio/e-mail inválido | 400 Bad Request |
| POST com RA duplicado         | 409 Conflict    |

Os alunos ficam em memória no servidor, então são apagados quando o backend é reiniciado.

## Testes no Insomnia

A coleção está em `docs/insomnia/sistema-academico-ds2.json`. Para usar: no Insomnia, **Import** e selecionar o arquivo. Ela tem a variável `base_url` (`http://localhost:3000`) e as requisições:

- 01 - Sistema: Verificar servidor
- 02 - Alunos: Listar alunos, Cadastrar aluno e Cadastrar RA duplicado

## Evidências

As capturas de tela estão na pasta [`docs/evidencias`](docs/evidencias).

## Versões

| Versão | O que foi feito |
|--------|-----------------|
| 0.1 | Cadastro com MVC e JSON usando prompt() e console |
| 0.2 | Interface com formulário, tabela, DOM e eventos |
| 0.3 | Persistência no localStorage e camada Service |
| 1.0 | Primeira API com o módulo http do Node.js |
| 1.1 | Frontend integrado com a API usando fetch() |
| 1.2 | API migrada para Express |
