/*
 * APLICAÇÃO EXPRESS
 *
 * Aqui fica a configuração da API: middlewares, rotas e tratamento de erros.
 * Quem liga o servidor é o server.js (ele só importa este app e dá o listen).
 *
 * Middleware = função que roda no meio do caminho, entre a requisição
 * chegar e a resposta sair. A ordem do app.use() importa.
 */
import express from "express";
import cors from "cors";
import alunoRoutes from "./routes/aluno-routes.js";

const app = express();

// 1) CORS: libera o frontend (Live Server, outra origem) a chamar a API.
// Substitui os cabeçalhos que eram escritos na mão no utils/http.js.
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        // Authorization vai ser usado no futuro para o token JWT
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// 2) Lê o corpo em JSON e coloca o objeto pronto em req.body
// (substitui a função lerCorpoJson() da versão 1.0)
app.use(express.json());

// Rota para testar se o servidor está no ar
app.get("/api/health", (req, res) => {
    return res.status(200).json({
        status: "ok",
        mensagem: "Servidor Express funcionando."
    });
});

// 3) Rotas de alunos. Tudo que está no router ganha o prefixo /api/alunos
app.use("/api/alunos", alunoRoutes);

// 4) Se chegou aqui, nenhuma rota acima respondeu: 404
app.use((req, res) => {
    return res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada."
    });
});

// 5) Tratamento de erros. O Express reconhece que é de erro porque tem 4 parâmetros.
app.use((erro, req, res, next) => {
    // express.json() gera esse tipo de erro quando o JSON está mal formatado
    if (erro.type === "entity.parse.failed") {
        return res.status(400).json({
            sucesso: false,
            mensagem: "O corpo da requisição contém um JSON inválido."
        });
    }

    // Qualquer outro erro: mostra no terminal e responde 500 sem detalhes
    console.error("Erro interno do servidor:", erro);

    return res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno do servidor."
    });
});

// O server.js importa este app para ligar o servidor
export default app;
