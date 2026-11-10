/*
 * SERVICE DO ALUNO
 *
 * Camada nova da versão 0.3. Ela cuida de onde os dados ficam guardados.
 * Por enquanto os alunos ficam no localStorage do navegador,
 * então não somem quando a página é atualizada.
 *
 * Mais para frente, quando tiver o backend, é só trocar o localStorage
 * por requisições para a API aqui dentro, sem mexer no Controller.
 *
 * Fluxo: Controller -> Service -> Model -> Service -> localStorage
 */
const AlunoService = {

    // Nome da chave onde a lista fica salva no localStorage
    CHAVE_STORAGE: "sistema-academico-ds2:alunos",

    // Busca a lista salva.
    // O localStorage só guarda texto, então precisa do JSON.parse() para virar array.
    listar() {
        const textoJson = localStorage.getItem(AlunoService.CHAVE_STORAGE);

        // Ainda não tem nada salvo
        if (textoJson === null) {
            return [];
        }

        try {
            const dados = JSON.parse(textoJson);

            // Se o que estiver salvo não for um array, ignora
            if (!Array.isArray(dados)) {
                return [];
            }

            return dados;
        } catch (erro) {
            // Se o texto salvo estiver corrompido, apaga e começa do zero
            localStorage.removeItem(AlunoService.CHAVE_STORAGE);
            return [];
        }
    },

    // Salva a lista inteira (JSON.stringify() transforma o array em texto)
    salvar(alunos) {
        const textoJson = JSON.stringify(alunos);
        localStorage.setItem(AlunoService.CHAVE_STORAGE, textoJson);
    },

    // Cadastra um aluno:
    // 1. pega a lista salva;
    // 2. pede para o Model validar e criar o aluno;
    // 3. se deu certo, coloca na lista e salva de novo.
    cadastrar(dados) {
        const alunos = AlunoService.listar();
        const resultado = AlunoModel.criar(dados, alunos);

        if (!resultado.sucesso) {
            return resultado;
        }

        alunos.push(resultado.aluno);
        AlunoService.salvar(alunos);

        return resultado;
    },

    // Apaga todos os alunos do localStorage
    limpar() {
        localStorage.removeItem(AlunoService.CHAVE_STORAGE);
    }
};
