/*
 * SERVICE DO ALUNO
 *
 * Na versão 1.1 o Service deixou de usar o localStorage
 * e passou a conversar com a API do backend usando fetch().
 * O Controller continua chamando listar() e cadastrar() do mesmo jeito,
 * só mudou o que acontece aqui dentro (essa foi a ideia de criar o Service).
 *
 * fetch() é assíncrono: a resposta demora um pouco para chegar,
 * por isso as funções são async e usam await para esperar.
 */
const AlunoService = {

    // Endereço da API de alunos (backend rodando com npm run dev)
    URL_API: "http://localhost:3000/api/alunos",

    // Converte a resposta da API em objeto e verifica se deu erro
    async processarResposta(resposta) {
        let resultado;

        try {
            resultado = await resposta.json();
        } catch (erro) {
            throw new Error("O servidor retornou uma resposta inválida.");
        }

        // resposta.ok é true para status de 200 a 299.
        // Se for 400, 409 etc., usa a mensagem que a API mandou.
        if (!resposta.ok) {
            throw new Error(resultado.mensagem || "Não foi possível concluir a operação.");
        }

        return resultado;
    },

    // Faz a requisição e trata o caso do servidor estar desligado
    async requisitar(opcoes = {}) {
        let resposta;

        try {
            resposta = await fetch(AlunoService.URL_API, opcoes);
        } catch (erro) {
            // fetch só cai aqui quando nem conseguiu falar com o servidor
            // (backend desligado, endereço errado, bloqueio de CORS...)
            throw new Error("Não foi possível conectar ao servidor.");
        }

        return AlunoService.processarResposta(resposta);
    },

    // GET /api/alunos
    async listar() {
        const resultado = await AlunoService.requisitar({
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        // A API devolve { total, dados }, aqui só interessa o array
        return resultado.dados;
    },

    // POST /api/alunos
    async cadastrar(aluno) {
        return AlunoService.requisitar({
            method: "POST",
            headers: {
                "Accept": "application/json",
                // avisa o servidor que o corpo está em JSON
                "Content-Type": "application/json"
            },
            // o corpo da requisição precisa ir como texto JSON
            body: JSON.stringify(aluno)
        });
    }
};
