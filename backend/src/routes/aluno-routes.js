/*
 * ROTAS DE ALUNOS
 *
 * Com o Express não precisa mais ficar comparando método e caminho com if.
 * O express.Router() é um "mini módulo" de rotas.
 *
 * No app.js o router foi registrado em "/api/alunos", então:
 * router.get("/")  -> GET  /api/alunos
 * router.post("/") -> POST /api/alunos
 */
import express from "express";
import AlunoController from "../controller/aluno-controller.js";

const router = express.Router();

// Lista os alunos
router.get("/", AlunoController.listar);

// Cadastra um aluno
router.post("/", AlunoController.cadastrar);

export default router;
