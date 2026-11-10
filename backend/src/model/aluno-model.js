/*
 * MODEL DO ALUNO (BACKEND)
 *
 * Mesmas regras do Model do frontend, agora rodando no servidor:
 * - campos obrigatórios;
 * - e-mail válido;
 * - RA sem repetir;
 * - criar o aluno e listar os alunos.
 *
 * A diferença é que aqui o Model também devolve o status HTTP
 * de cada situação, para o Controller usar na resposta.
 */

/*
 * Lista dos alunos em memória (dentro do servidor).
 * Quando o servidor for desligado os alunos somem.
 * Mais para frente isso vai virar uma tabela no MySQL.
 */
const alunos = [];

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

    localizarPorRa(ra) {
        return alunos.find(aluno => aluno.ra === ra);
    },

    // Maior id da lista + 1 (o banco de dados vai fazer isso sozinho no futuro)
    gerarProximoId() {
        if (alunos.length === 0) {
            return 1;
        }

        const ids = alunos.map(aluno => aluno.id);
        return Math.max(...ids) + 1;
    },

    /*
     * Cadastra um aluno e devolve o resultado com o status HTTP:
     * - 400 Bad Request: campo vazio ou e-mail inválido
     * - 409 Conflict: RA já cadastrado
     * - 201 Created: aluno criado
     */
    cadastrar(dados) {
        // O ?. evita erro se "dados" vier undefined
        const ra = AlunoModel.normalizarTexto(dados?.ra);
        const nome = AlunoModel.normalizarTexto(dados?.nome);
        const email = AlunoModel.normalizarTexto(dados?.email);
        const curso = AlunoModel.normalizarTexto(dados?.curso);
        const turma = AlunoModel.normalizarTexto(dados?.turma);

        if (ra === "" || nome === "" || email === "" || curso === "" || turma === "") {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um e-mail válido."
            };
        }

        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                status: 409,
                mensagem: "Já existe um aluno com esse RA."
            };
        }

        const aluno = {
            id: AlunoModel.gerarProximoId(),
            ra,
            nome,
            email,
            curso,
            turma,
            ativo: true
        };

        alunos.push(aluno);

        return {
            sucesso: true,
            status: 201,
            aluno
        };
    },

    // Devolve uma cópia da lista para ninguém mexer no array original
    listar() {
        return [...alunos];
    }
};

// export default: permite importar no Controller com "import AlunoModel from ..."
export default AlunoModel;
