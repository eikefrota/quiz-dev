const db = require('../db/db');
const Pergunta = require('../models/perguntaModel');

class PerguntasRepository {
    async getAll() {
        const result = await db.query('SELECT * FROM pergunta');
        return result.rows.map(row => new Pergunta(row));
    }

    async getById(id) {
        const result = await db.query('SELECT * FROM pergunta WHERE id = $1', [id]);
        return result.rows[0] ? new Pergunta(result.rows[0]) : null;
    }

    async create({ categoria, pergunta, resposta_correta, respostas_incorretas }) {
        // Garante que respostas_incorretas seja salvo como JSON string
        const result = await db.query(
            'INSERT INTO pergunta (categoria, pergunta, resposta_correta, respostas_incorretas) VALUES ($1, $2, $3, $4) RETURNING *',
            [categoria, pergunta, resposta_correta, JSON.stringify(respostas_incorretas)]
        );
        return new Pergunta(result.rows[0]);
    }

    async update(id, dados) {
        const perguntaAtual = await this.getById(id);
        if (!perguntaAtual) return null;
        const categoria = dados.categoria ?? perguntaAtual.categoria;
        const pergunta = dados.pergunta ?? perguntaAtual.pergunta;
        const resposta_correta = dados.resposta_correta ?? perguntaAtual.resposta_correta;
        const respostas_incorretas = dados.respostas_incorretas ?? perguntaAtual.respostas_incorretas;
        const result = await db.query(
            'UPDATE pergunta SET categoria=$1, pergunta=$2, resposta_correta=$3, respostas_incorretas=$4 WHERE id=$5 RETURNING *',
            [categoria, pergunta, resposta_correta, respostas_incorretas, id]
        );
        return new Pergunta(result.rows[0]);
    }

    async remove(id) {
        const result = await db.query('DELETE FROM pergunta WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] ? new Pergunta(result.rows[0]) : null;
    }
}

module.exports = new PerguntasRepository();