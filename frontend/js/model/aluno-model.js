/*
 * MODEL DO ALUNO (FRONTEND)
 *
 * Na versão 1.1 quem cadastra, gera o id e confere RA repetido é o backend.
 * Aqui no frontend o Model só arruma os dados e faz uma validação inicial,
 * para avisar o usuário rápido sem precisar ir até o servidor.
 *
 * Essa validação NÃO substitui a do backend: o usuário pode desativar
 * o JavaScript ou mandar a requisição direto pelo Insomnia.
 */
const AlunoModel = {

    // Tira os espaços do começo e do fim e trata null/undefined
    normalizarTexto(valor) {
        if (valor === null || valor === undefined) {
            return "";
        }

        return String(valor).trim();
    },

    // Validação simples: o e-mail precisa ter "@" e "."
    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    /*
     * Arruma e valida os dados do formulário.
     * - deu erro:   { sucesso: false, mensagem: "..." }
     * - deu certo:  { sucesso: true, dados: {...} } (pronto para mandar para a API)
     */
    validar(dados) {
        const aluno = {
            ra: AlunoModel.normalizarTexto(dados.ra),
            nome: AlunoModel.normalizarTexto(dados.nome),
            // e-mail sempre em letras minúsculas
            email: AlunoModel.normalizarTexto(dados.email).toLowerCase(),
            curso: AlunoModel.normalizarTexto(dados.curso),
            turma: AlunoModel.normalizarTexto(dados.turma)
        };

        if (aluno.ra === "" || aluno.nome === "" || aluno.email === "" || aluno.curso === "" || aluno.turma === "") {
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        if (!AlunoModel.validarEmail(aluno.email)) {
            return {
                sucesso: false,
                mensagem: "Informe um e-mail válido."
            };
        }

        return {
            sucesso: true,
            dados: aluno
        };
    }
};
