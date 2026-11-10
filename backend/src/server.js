/*
 * SERVIDOR
 *
 * Cria o servidor com o módulo http que já vem no Node.js
 * (não precisa instalar nada) e manda cada requisição para as rotas.
 */
import http from "node:http";
import { tratarRotas } from "./routes/aluno-routes.js";
import { enviarJson } from "./utils/http.js";

// Usa a porta do ambiente (para o deploy) ou a 3000 no computador
const PORTA = Number(process.env.PORT) || 3000;

// 0.0.0.0 aceita conexões de fora também (vai ser útil no deploy)
const HOST = "0.0.0.0";

// Esta função roda a cada requisição que chega (req = pedido, res = resposta)
const servidor = http.createServer(async (req, res) => {
    try {
        const rotaEncontrada = await tratarRotas(req, res);

        // Nenhuma rota correspondeu: 404 Not Found
        if (!rotaEncontrada) {
            enviarJson(res, 404, {
                sucesso: false,
                mensagem: "Rota não encontrada."
            });
        }
    } catch (erro) {
        // Erro inesperado: mostra no terminal e responde 500 sem detalhes
        console.error("Erro interno do servidor:", erro);

        enviarJson(res, 500, {
            sucesso: false,
            mensagem: "Erro interno do servidor."
        });
    }
});

// Liga o servidor e fica esperando requisições
servidor.listen(PORTA, HOST, () => {
    console.log(`Servidor disponível em http://localhost:${PORTA}`);
});
