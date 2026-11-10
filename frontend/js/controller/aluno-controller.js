/*
 * CONTROLLER DO ALUNO
 *
 * Coordena a View e o Service.
 * Na versão 0.3 o Controller não chama mais o Model direto:
 * ele pede para o Service, e o Service usa o Model e o localStorage.
 */
const AlunoController = {

    // Prepara a página quando ela abre
    iniciar() {
        AlunoView.inicializar();

        // Quando o formulário for enviado, a View chama esta função com os dados
        AlunoView.configurarFormulario(function (dados) {
            AlunoController.cadastrar(dados);
        });

        AlunoView.configurarBotaoLimpar(function () {
            AlunoController.limparDados();
        });

        // Já mostra os alunos que estavam salvos no localStorage
        AlunoController.atualizarVisualizacao();
    },

    cadastrar(dados) {
        const resultado = AlunoService.cadastrar(dados);

        if (!resultado.sucesso) {
            AlunoView.exibirErro(resultado.mensagem);
            return;
        }

        AlunoView.exibirSucesso(`Aluno ${resultado.aluno.nome} cadastrado com sucesso.`);
        AlunoView.limparFormulario();
        AlunoController.atualizarVisualizacao();
    },

    // Apaga todos os alunos depois de confirmar com o usuário
    limparDados() {
        const alunos = AlunoService.listar();

        if (alunos.length === 0) {
            AlunoView.exibirErro("Não existem alunos para remover.");
            return;
        }

        // Se o usuário clicar em Cancelar, não faz nada
        if (!AlunoView.confirmarLimpeza()) {
            return;
        }

        AlunoService.limpar();
        AlunoView.exibirSucesso("Todos os alunos foram removidos.");
        AlunoController.atualizarVisualizacao();
    },

    // Atualiza a tabela e o JSON com a lista salva no localStorage
    atualizarVisualizacao() {
        const alunos = AlunoService.listar();

        AlunoView.exibirLista(alunos);

        const textoJson = JSON.stringify(alunos, null, 2);
        AlunoView.exibirJson(textoJson);
    }
};

// Inicia o sistema
AlunoController.iniciar();
