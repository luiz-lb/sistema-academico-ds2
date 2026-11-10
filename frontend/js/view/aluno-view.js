/*
 * VIEW DO ALUNO
 *
 * A View cuida da interação com o usuário.
 * Nesta versão a entrada é feita com prompt() e confirm()
 * e os resultados aparecem no console do navegador.
 *
 * A View não valida nada e não guarda os alunos,
 * isso é responsabilidade do Model.
 */
const AlunoView = {

    // Pede os dados do aluno e junta tudo em um objeto
    lerDados() {
        return {
            ra: prompt("Digite o RA do aluno:"),
            nome: prompt("Digite o nome do aluno:"),
            email: prompt("Digite o e-mail do aluno:"),
            curso: prompt("Digite o curso:"),
            turma: prompt("Digite a turma:")
        };
    },

    // Mostra o aluno que acabou de ser cadastrado
    exibirAluno(aluno) {
        console.log("Aluno cadastrado com sucesso.");
        console.table(aluno);
    },

    // Mostra a mensagem de erro que veio do Model
    exibirErro(mensagem) {
        console.error("Erro:", mensagem);
    },

    // confirm() devolve true no OK e false no Cancelar
    perguntarNovoCadastro() {
        return confirm("Deseja cadastrar outro aluno?");
    },

    // Mostra a quantidade de alunos e a tabela com todos eles
    exibirLista(alunos) {
        console.log("Quantidade de alunos cadastrados:", alunos.length);

        if (alunos.length === 0) {
            console.log("Nenhum aluno foi cadastrado.");
            return;
        }

        console.table(alunos);
    },

    // Mostra o texto gerado pelo JSON.stringify()
    exibirJson(textoJson) {
        console.log("Alunos em formato JSON:");
        console.log(textoJson);
    },

    // Mostra os dados depois de voltarem do JSON com JSON.parse()
    exibirDadosRecuperados(dados) {
        console.log("Dados reconstruídos com JSON.parse():");
        console.table(dados);
    }
};
