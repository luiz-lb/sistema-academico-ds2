/*
 * SERVIDOR
 *
 * Só liga o servidor. Toda a configuração (CORS, JSON, rotas e erros)
 * ficou no app.js. Separar os dois ajuda a testar o app sem ligar o servidor.
 */
import app from "./app.js";

// Usa a porta do ambiente (para o deploy) ou a 3000 no computador
const PORTA = Number(process.env.PORT) || 3000;

// 0.0.0.0 aceita conexões de fora também (vai ser útil no deploy)
const HOST = "0.0.0.0";

app.listen(PORTA, HOST, () => {
    console.log(`Servidor Express disponível em http://localhost:${PORTA}`);
});
