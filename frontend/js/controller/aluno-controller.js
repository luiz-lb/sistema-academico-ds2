/*
 * CONTROLLER DO ALUNO
 *
 * Na versão 0.2 não existe mais o while com prompt().
 * Agora a página fica esperando o usuário enviar o formulário (evento submit)
 * e o Controller só reage a esse evento.
 */
const AlunoController = {

    // Prepara a página quando ela abre
    iniciar() {
        AlunoView.inicializar();

        // Quando o formulário for enviado, a View chama esta função com os dados
        AlunoView.configurarFormulario(function (dados) {
            AlunoController.cadastrar(dados);
        });

        // Mostra a tabela vazia e o JSON "[]" logo no início
        AlunoController.atualizarVisualizacao();
    },

    // Manda os dados para o Model e decide o que a View vai mostrar
    cadastrar(dados) {
        const resultado = AlunoModel.cadastrar(dados);

        if (!resultado.sucesso) {
            AlunoView.exibirErro(resultado.mensagem);
            return;
        }

        AlunoView.exibirSucesso(`Aluno ${resultado.aluno.nome} cadastrado com sucesso.`);
        AlunoView.limparFormulario();
        AlunoController.atualizarVisualizacao();
    },

    // Atualiza a tabela e o JSON com a lista atual do Model
    atualizarVisualizacao() {
        const alunos = AlunoModel.listar();

        AlunoView.exibirLista(alunos);

        const textoJson = JSON.stringify(alunos, null, 2);
        AlunoView.exibirJson(textoJson);
    }
};

// Inicia o sistema
AlunoController.iniciar();
