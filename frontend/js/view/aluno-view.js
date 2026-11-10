/*
 * VIEW DO ALUNO
 *
 * Desde a versão 0.2 a View trabalha com a página HTML (DOM):
 * lê o formulário, mostra mensagens, monta a tabela e mostra o JSON.
 * Na versão 0.3 ganhou o botão "Limpar dados".
 *
 * Continua sem validar nada, quem valida é o Model.
 */
const AlunoView = {

    // Guarda os elementos do HTML para não ficar buscando toda hora
    elementos: {},

    // Busca os elementos da página pelo id.
    // Só pode rodar depois que o HTML carregou (por isso o defer no index).
    inicializar() {
        AlunoView.elementos.formulario = document.getElementById("form-aluno");
        AlunoView.elementos.ra = document.getElementById("ra");
        AlunoView.elementos.nome = document.getElementById("nome");
        AlunoView.elementos.email = document.getElementById("email");
        AlunoView.elementos.curso = document.getElementById("curso");
        AlunoView.elementos.turma = document.getElementById("turma");
        AlunoView.elementos.mensagem = document.getElementById("mensagem");
        AlunoView.elementos.corpoTabela = document.getElementById("corpo-tabela-alunos");
        AlunoView.elementos.totalAlunos = document.getElementById("total-alunos");
        AlunoView.elementos.saidaJson = document.getElementById("saida-json");
        AlunoView.elementos.botaoLimpar = document.getElementById("btn-limpar-dados");
    },

    // Registra o evento submit do formulário.
    // aoEnviar é a função que o Controller passa para receber os dados.
    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener("submit", function (evento) {
            // Sem isso o navegador recarrega a página ao enviar o formulário
            evento.preventDefault();

            const dados = AlunoView.lerDados();
            aoEnviar(dados);
        });
    },

    // Registra o clique do botão "Limpar dados"
    configurarBotaoLimpar(aoLimpar) {
        AlunoView.elementos.botaoLimpar.addEventListener("click", function () {
            aoLimpar();
        });
    },

    // Pergunta antes de apagar tudo (OK = true, Cancelar = false)
    confirmarLimpeza() {
        return confirm("Deseja remover todos os alunos cadastrados?");
    },

    // Pega o que foi digitado em cada campo
    lerDados() {
        return {
            ra: AlunoView.elementos.ra.value,
            nome: AlunoView.elementos.nome.value,
            email: AlunoView.elementos.email.value,
            curso: AlunoView.elementos.curso.value,
            turma: AlunoView.elementos.turma.value
        };
    },

    // A classe "sucesso" ou "erro" muda a cor da mensagem (ver estilo.css)
    exibirSucesso(mensagem) {
        AlunoView.elementos.mensagem.textContent = mensagem;
        AlunoView.elementos.mensagem.className = "mensagem sucesso";
    },

    exibirErro(mensagem) {
        AlunoView.elementos.mensagem.textContent = mensagem;
        AlunoView.elementos.mensagem.className = "mensagem erro";
    },

    // Limpa os campos e volta o cursor para o RA
    limparFormulario() {
        AlunoView.elementos.formulario.reset();
        AlunoView.elementos.ra.focus();
    },

    // Monta a tabela de novo com a lista recebida
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

    // Mostra o texto JSON dentro do <pre>
    exibirJson(textoJson) {
        AlunoView.elementos.saidaJson.textContent = textoJson;
    }
};
