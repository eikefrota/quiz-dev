const express = require('express');
const perguntasController = require('../controllers/perguntasController');

class PerguntasRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        /**
         * @swagger
         * /api/perguntas:
         *   get:
         *     summary: Retorna todas as perguntas
         *     tags: [Perguntas]
         *     responses: 
         *       200:
         *         description: Lista as perguntas
         */
        this.router.get('/', perguntasController.getPerguntas);
    }
}

module.exports = new PerguntasRoutes().router;