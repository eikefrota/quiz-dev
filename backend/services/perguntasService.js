const axios = require('axios');

class PerguntasService {
    constructor(baseUrl = 'https://opentdb.com/api.php') {
        this.baseUrl = baseUrl;
    }

    async getPerguntas(amount = 20, category = 18, type = 'multiple') {
        const response = await axios.get(`${this.baseUrl}?amount=${amount}&category=${category}&type=${type}`);
    return response.data.results;
    }
}

module.exports = PerguntasService;