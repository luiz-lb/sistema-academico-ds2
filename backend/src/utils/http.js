/*
 * FUNÇÕES DE APOIO PARA HTTP
 *
 * O módulo node:http é bem "cru", então aqui ficam as funções
 * que se repetem em todo lugar: responder em JSON, responder vazio
 * e ler o JSON que chega no corpo da requisição.
 */

/*
 * Cabeçalhos de CORS.
 * O frontend roda no Live Server (http://127.0.0.1:5500) e o backend
 * em http://localhost:3000. Como a porta é diferente, o navegador
 * considera outra origem e bloqueia a requisição se o servidor
 * não liberar com esses cabeçalhos.
 */
const cabecalhosCors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

// Envia uma resposta em JSON com o status informado (200, 201, 400...)
export function enviarJson(res, status, dados) {
    const textoJson = JSON.stringify(dados, null, 2);

    // writeHead define o status e os cabeçalhos da resposta
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        ...cabecalhosCors
    });

    // end envia o conteúdo e finaliza a resposta
    res.end(textoJson);
}

// Responde 204 (sem conteúdo). Usado no OPTIONS que o navegador manda antes do POST.
export function enviarSemConteudo(res) {
    res.writeHead(204, cabecalhosCors);
    res.end();
}

/*
 * Lê o corpo da requisição e converte o JSON em objeto.
 *
 * O corpo chega em partes (chunks), então vamos juntando no evento "data"
 * e só convertemos no evento "end", quando chegou tudo.
 * Como isso demora, a função devolve uma Promise (usada com await no Controller).
 */
export function lerCorpoJson(req) {
    return new Promise((resolve, reject) => {
        let corpo = "";

        req.on("data", parte => {
            corpo += parte;
        });

        req.on("end", () => {
            // Sem corpo: considera um objeto vazio
            if (corpo.trim() === "") {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(corpo));
            } catch (erro) {
                // JSON mal formatado
                reject(erro);
            }
        });

        req.on("error", erro => {
            reject(erro);
        });
    });
}
