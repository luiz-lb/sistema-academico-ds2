/*
 * ROTAS
 *
 * Uma rota é o método HTTP + o caminho (ex: GET /api/alunos).
 * Aqui só decidimos qual função do Controller vai atender cada requisição,
 * as regras ficam no Model.
 */
import AlunoController from "../controller/aluno-controller.js";
import { enviarJson, enviarSemConteudo } from "../utils/http.js";

// Devolve true se encontrou a rota e false se não existe
export async function tratarRotas(req, res) {
    // req.url tem só o caminho (/api/alunos), o URL separa o pathname
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const caminho = url.pathname;
    const metodo = req.method;

    // O navegador manda um OPTIONS antes do POST por causa do CORS
    if (metodo === "OPTIONS") {
        enviarSemConteudo(res);
        return true;
    }

    // Rota para testar se o servidor está no ar
    if (metodo === "GET" && caminho === "/api/health") {
        enviarJson(res, 200, {
            status: "ok",
            mensagem: "Servidor funcionando."
        });
        return true;
    }

    // Mesmo caminho, métodos diferentes: GET lista e POST cadastra
    if (metodo === "GET" && caminho === "/api/alunos") {
        AlunoController.listar(req, res);
        return true;
    }

    if (metodo === "POST" && caminho === "/api/alunos") {
        await AlunoController.cadastrar(req, res);
        return true;
    }

    return false;
}
