/*
 * CONTROLLER DO ALUNO
 *
 * O Controller faz a ligação entre a View e o Model:
 * 1. pede os dados para a View;
 * 2. manda os dados para o Model cadastrar;
 * 3. olha o resultado e manda a View mostrar o aluno ou o erro.
 *
 * Ele não valida campos e não usa prompt() ou console.log() direto.
 */
const AlunoController = {

    iniciar() {
        // Controla o while. Começa true para cadastrar pelo menos uma vez.
        let continuar = true;

        while (continuar) {
            const dados = AlunoView.lerDados();
            const resultado = AlunoModel.cadastrar(dados);

            if (resultado.sucesso) {
                AlunoView.exibirAluno(resultado.aluno);
            } else {
                AlunoView.exibirErro(resultado.mensagem);
            }

            // Se o usuário clicar em Cancelar, o laço termina
            continuar = AlunoView.perguntarNovoCadastro();
        }

        // Depois do while, mostra todos os alunos cadastrados
        const alunos = AlunoModel.listar();
        AlunoView.exibirLista(alunos);

        // Converte o array de objetos em texto JSON
        // (null = sem filtro, 2 = espaços de indentação)
        const textoJson = JSON.stringify(alunos, null, 2);
        AlunoView.exibirJson(textoJson);

        // Converte o texto JSON de volta em array de objetos
        const dadosRecuperados = JSON.parse(textoJson);
        AlunoView.exibirDadosRecuperados(dadosRecuperados);
    }
};

// Inicia o sistema
AlunoController.iniciar();
