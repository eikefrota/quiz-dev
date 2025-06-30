const PerguntasService = require('../services/perguntasService');

class PerguntaController {
    constructor() {
        this.perguntasService = new PerguntasService(); // Adicione esta linha
    }

    getPerguntas = async (req, res, next) => {
        try {
            const { amount = 20, category = 18 } = req.query;
            const perguntas = await this.perguntasService.getPerguntas(amount, category);
            res.json(perguntas);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PerguntaController(); 