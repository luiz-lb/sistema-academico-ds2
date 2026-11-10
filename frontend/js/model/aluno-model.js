/*
 * MODEL DO ALUNO
 *
 * Aqui ficam os dados dos alunos e as regras do cadastro
 * (campos obrigatórios, e-mail válido e RA sem repetir).
 *
 * O Model não usa prompt(), console.log() nem mexe no HTML.
 * Quem conversa com o usuário é a View.
 */
const AlunoModel = {

    // Lista dos alunos cadastrados.
    // Fica só na memória do navegador: se atualizar a página, os dados somem.
    alunos: [],

    // Tira os espaços do começo e do fim do texto.
    // Se o valor vier null (ex: clicar em Cancelar no prompt), devolve "".
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

    // Procura um aluno pelo RA.
    // Se encontrar devolve o aluno, se não encontrar devolve undefined.
    localizarPorRa(ra) {
        return AlunoModel.alunos.find(aluno => aluno.ra === ra);
    },

    /*
     * Cadastra um aluno.
     *
     * Recebe um objeto com ra, nome, email, curso e turma.
     * Sempre devolve um objeto com o resultado:
     * - deu erro:   { sucesso: false, mensagem: "..." }
     * - deu certo:  { sucesso: true, aluno: {...} }
     */
    cadastrar(dados) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        // Se qualquer campo estiver vazio, o cadastro é recusado
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

        // Não deixa cadastrar dois alunos com o mesmo RA
        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        const aluno = {
            // Por enquanto o id é a quantidade de alunos + 1
            id: AlunoModel.alunos.length + 1,
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,
            // Todo aluno novo começa ativo
            ativo: true
        };

        AlunoModel.alunos.push(aluno);

        return {
            sucesso: true,
            aluno: aluno
        };
    },

    // Devolve uma cópia da lista (o spread ... cria um array novo)
    listar() {
        return [...AlunoModel.alunos];
    }
};
