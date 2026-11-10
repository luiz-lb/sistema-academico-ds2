/*
 * CONTROLLER DO ALUNO (BACKEND)
 *
 * Recebe a requisição que o Router encaminhou, chama o Model
 * e devolve a resposta em JSON.
 *
 * Com o Express ficou mais simples:
 * - o JSON do corpo já chega pronto em req.body (não precisa mais do lerCorpoJson);
 * - a resposta é res.status(...).json(...) (não precisa mais do enviarJson).
 */
import AlunoModel from "../model/aluno-model.js";

const AlunoController = {

    // GET /api/alunos
    listar(req, res) {
        const alunos = AlunoModel.listar();

        return res.status(200).json({
            total: alunos.length,
            dados: alunos
        });
    },

    // POST /api/alunos
    cadastrar(req, res) {
        const dados = req.body;
        const resultado = AlunoModel.cadastrar(dados);

        // Erro de validação: usa o status que o Model definiu (400 ou 409)
        if (!resultado.sucesso) {
            return res.status(resultado.status).json({
                sucesso: false,
                mensagem: resultado.mensagem
            });
        }

        // 201 = Created (aluno criado)
        return res.status(201).json({
            sucesso: true,
            mensagem: "Aluno cadastrado com sucesso.",
            dados: resultado.aluno
        });
    }
};

export default AlunoController;
