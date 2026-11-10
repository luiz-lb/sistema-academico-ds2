/*
 * CONTROLLER DO ALUNO (BACKEND)
 *
 * Recebe a requisição que a rota encaminhou, chama o Model
 * e monta a resposta em JSON.
 * Fluxo: rota -> Controller -> Model -> Controller -> resposta JSON
 */
import AlunoModel from "../model/aluno-model.js";
import { enviarJson, lerCorpoJson } from "../utils/http.js";

const AlunoController = {

    // GET /api/alunos
    listar(req, res) {
        const alunos = AlunoModel.listar();

        // 200 = OK
        enviarJson(res, 200, {
            total: alunos.length,
            dados: alunos
        });
    },

    // POST /api/alunos
    // É async porque precisa esperar (await) o corpo da requisição chegar
    async cadastrar(req, res) {
        try {
            const dados = await lerCorpoJson(req);
            const resultado = AlunoModel.cadastrar(dados);

            // Erro de validação: usa o status que o Model definiu (400 ou 409)
            if (!resultado.sucesso) {
                enviarJson(res, resultado.status, {
                    sucesso: false,
                    mensagem: resultado.mensagem
                });
                return;
            }

            // 201 = Created (aluno criado)
            enviarJson(res, resultado.status, {
                sucesso: true,
                mensagem: "Aluno cadastrado com sucesso.",
                dados: resultado.aluno
            });
        } catch (erro) {
            // Cai aqui quando o JSON enviado está mal formatado
            enviarJson(res, 400, {
                sucesso: false,
                mensagem: "O corpo da requisição contém um JSON inválido."
            });
        }
    }
};

export default AlunoController;
