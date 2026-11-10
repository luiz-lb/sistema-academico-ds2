/*
 * CONTROLLER DO ALUNO
 *
 * Coordena o Model (validação inicial), o Service (API) e a View (tela).
 *
 * Fluxo do cadastro na versão 1.1:
 * View lê o formulário -> Model valida -> Service manda POST para a API
 * -> Service busca a lista atualizada (GET) -> View mostra a tabela.
 *
 * As funções são async porque o Service espera a resposta do servidor.
 */
const AlunoController = {

    // Prepara a página e já busca os alunos que estão no servidor
    async iniciar() {
        AlunoView.inicializar();

        AlunoView.configurarFormulario(function (dados) {
            AlunoController.cadastrar(dados);
        });

        AlunoView.exibirMensagem("Carregando alunos...", "informacao");

        try {
            await AlunoController.atualizarVisualizacao();
            AlunoView.exibirMensagem("Dados carregados com sucesso.", "sucesso");
        } catch (erro) {
            // Ex: backend desligado
            AlunoView.exibirMensagem(erro.message, "erro");
        }
    },

    async cadastrar(dados) {
        // Primeiro valida aqui no frontend, se tiver erro nem chama a API
        const validacao = AlunoModel.validar(dados);

        if (!validacao.sucesso) {
            AlunoView.exibirMensagem(validacao.mensagem, "erro");
            return;
        }

        AlunoView.alterarEstadoFormulario(true);
        AlunoView.exibirMensagem("Enviando dados para o servidor...", "informacao");

        try {
            const resultado = await AlunoService.cadastrar(validacao.dados);

            // Busca a lista de novo no servidor para a tabela ficar igual ao backend
            await AlunoController.atualizarVisualizacao();

            AlunoView.limparFormulario();
            AlunoView.exibirMensagem(resultado.mensagem, "sucesso");
        } catch (erro) {
            // Erros que vieram da API (ex: RA duplicado) ou falha de conexão
            AlunoView.exibirMensagem(erro.message, "erro");
        } finally {
            // finally roda sempre, dando certo ou errado: libera o botão
            AlunoView.alterarEstadoFormulario(false);
        }
    },

    // Busca os alunos na API e atualiza a tabela e o JSON
    async atualizarVisualizacao() {
        const alunos = await AlunoService.listar();

        AlunoView.exibirLista(alunos);
        AlunoView.exibirJson(alunos);
    }
};

// Inicia o sistema
AlunoController.iniciar();
