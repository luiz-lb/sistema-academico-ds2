/*
 * MODEL DO ALUNO
 *
 * Na versão 0.3 o Model não guarda mais o array de alunos.
 * Quem guarda agora é o Service (no localStorage).
 *
 * O Model ficou só com as regras:
 * - arrumar os textos;
 * - validar os campos e o e-mail;
 * - verificar se o RA já existe;
 * - gerar o próximo id;
 * - criar o objeto aluno.
 *
 * Por isso alguns métodos recebem a lista de alunos como parâmetro.
 */
const AlunoModel = {

    // Tira os espaços do começo e do fim do texto.
    // Se o valor vier null ou undefined, devolve "".
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

    // Procura um aluno pelo RA dentro da lista recebida
    localizarPorRa(alunos, ra) {
        return alunos.find(aluno => aluno.ra === ra);
    },

    // Gera o próximo id: pega o maior id da lista e soma 1.
    // (antes era length + 1, mas isso pode repetir id se algum aluno for removido)
    gerarProximoId(alunos) {
        if (alunos.length === 0) {
            return 1;
        }

        const ids = alunos.map(aluno => aluno.id);
        const maiorId = Math.max(...ids);

        return maiorId + 1;
    },

    /*
     * Valida os dados e cria o objeto aluno.
     * Não salva nada, só devolve o resultado para o Service:
     * - deu erro:   { sucesso: false, mensagem: "..." }
     * - deu certo:  { sucesso: true, aluno: {...} }
     */
    criar(dados, alunos) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        if (ra === "" || nome === "" || email === "" || curso === "" || turma === "") {
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Informe um e-mail válido."
            };
        }

        if (AlunoModel.localizarPorRa(alunos, ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        const aluno = {
            id: AlunoModel.gerarProximoId(alunos),
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,
            ativo: true
        };

        return {
            sucesso: true,
            aluno: aluno
        };
    }
};
