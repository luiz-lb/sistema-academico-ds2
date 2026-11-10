/*
 * VIEW DO ALUNO
 *
 * Cuida da página HTML (DOM): lê o formulário, mostra mensagens,
 * monta a tabela e mostra o JSON. Não valida nada.
 *
 * Na versão 1.1:
 * - as mensagens ganharam o tipo "informacao" (ex: "Carregando alunos...");
 * - o botão fica desabilitado enquanto espera a resposta da API;
 * - o botão "Limpar dados" saiu, porque não usamos mais o localStorage.
 */
const AlunoView = {

    // Guarda os elementos do HTML para não ficar buscando toda hora
    elementos: {},

    // Busca os elementos da página pelo id
    inicializar() {
        AlunoView.elementos.formulario = document.getElementById("form-aluno");
        AlunoView.elementos.ra = document.getElementById("ra");
        AlunoView.elementos.nome = document.getElementById("nome");
        AlunoView.elementos.email = document.getElementById("email");
        AlunoView.elementos.curso = document.getElementById("curso");
        AlunoView.elementos.turma = document.getElementById("turma");
        AlunoView.elementos.botaoSalvar = document.getElementById("botao-salvar");
        AlunoView.elementos.mensagem = document.getElementById("mensagem");
        AlunoView.elementos.corpoTabela = document.getElementById("corpo-tabela-alunos");
        AlunoView.elementos.totalAlunos = document.getElementById("total-alunos");
        AlunoView.elementos.saidaJson = document.getElementById("saida-json");
    },

    // Registra o evento submit e passa os dados digitados para o Controller
    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener("submit", function (evento) {
            // Sem isso o navegador recarrega a página ao enviar o formulário
            evento.preventDefault();

            const dados = AlunoView.lerDados();
            aoEnviar(dados);
        });
    },

    lerDados() {
        return {
            ra: AlunoView.elementos.ra.value,
            nome: AlunoView.elementos.nome.value,
            email: AlunoView.elementos.email.value,
            curso: AlunoView.elementos.curso.value,
            turma: AlunoView.elementos.turma.value
        };
    },

    // tipo pode ser "sucesso", "erro" ou "informacao" (cada um tem uma cor no CSS)
    exibirMensagem(mensagem, tipo) {
        AlunoView.elementos.mensagem.textContent = mensagem;
        AlunoView.elementos.mensagem.className = `mensagem ${tipo}`;
    },

    limparFormulario() {
        AlunoView.elementos.formulario.reset();
        AlunoView.elementos.ra.focus();
    },

    // Enquanto a requisição não volta, desabilita o botão
    // para o usuário não clicar várias vezes e cadastrar repetido
    alterarEstadoFormulario(processando) {
        AlunoView.elementos.botaoSalvar.disabled = processando;
        AlunoView.elementos.botaoSalvar.textContent = processando ? "Salvando..." : "Cadastrar aluno";
    },

    // Monta a tabela de novo com a lista recebida da API
    exibirLista(alunos) {
        const corpoTabela = AlunoView.elementos.corpoTabela;

        // Apaga as linhas antigas antes de montar de novo
        corpoTabela.textContent = "";

        AlunoView.elementos.totalAlunos.textContent = `Total: ${alunos.length}`;

        if (alunos.length === 0) {
            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            // colSpan = 7 faz a célula ocupar as 7 colunas da tabela
            celula.colSpan = 7;
            celula.textContent = "Nenhum aluno foi cadastrado.";

            linha.appendChild(celula);
            corpoTabela.appendChild(linha);
            return;
        }

        // Cria uma linha (tr) para cada aluno e uma célula (td) para cada valor
        alunos.forEach(function (aluno) {
            const linha = document.createElement("tr");

            const valores = [
                aluno.id,
                aluno.ra,
                aluno.nome,
                aluno.email,
                aluno.curso,
                aluno.turma,
                aluno.ativo ? "Ativo" : "Inativo"
            ];

            valores.forEach(function (valor) {
                const celula = document.createElement("td");
                // textContent coloca só texto (não interpreta HTML digitado pelo usuário)
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            corpoTabela.appendChild(linha);
        });
    },

    // Mostra a lista em JSON dentro do <pre>
    exibirJson(alunos) {
        AlunoView.elementos.saidaJson.textContent = JSON.stringify(alunos, null, 2);
    }
};
