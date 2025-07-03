const db = require('../db/db');
const Usuario = require('../models/usuarioModel');

class UsuarioRepository {

    async getAll() {
        const result = await db.query(`SELECT * FROM usuario`);
        return result.rows.map(row => new Usuario(row));
    }
    async getById(id) {
        const result = await db.query(`SELECT * FROM usuario WHERE id = $1`, [id]);
        return result.rows[0] ? new Usuario(result.rows[0]) : null;
    }
    async create({ nome, email, password, historico_pontuacoes }) {
        // Verifica se já existe usuário com o mesmo email
        const existing = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            throw new Error('Email já cadastrado');
        }
        // Define valor padrão se não enviado
        if (historico_pontuacoes === undefined) {
            historico_pontuacoes = {};
        }
        const result = await db.query(
            'INSERT INTO usuario (nome, sobrenome, data_nascimento, email, password, historico_pontuacoes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nome, email, password, historico_pontuacoes]
        );
        return new Usuario(result.rows[0]);
    }
    async update(id, dados) {
        // Busca o usuário atual
        const usuarioAtual = await this.getById(id);
        if (!usuarioAtual) return null;

        // Usa os dados enviados ou mantém os antigos
        const nome = dados.nome ?? usuarioAtual.nome;
        const sobrenome = dados.sobrenome ?? usuarioAtual.sobrenome;
        const data_nascimento = dados.data_nascimento ?? usuarioAtual.data_nascimento;
        const email = dados.email ?? usuarioAtual.email;
        const password = dados.password ?? usuarioAtual.password;
        const historico_pontuacoes = dados.historico_pontuacoes ?? usuarioAtual.historico_pontuacoes;

        const result = await db.query(
            'UPDATE usuario SET nome=$1, sobrenome=$2, data_nascimento=$3 email=$4, password=$5, historico_pontuacoes=$6 WHERE id=$7 RETURNING *',
            [nome, sobrenome, data_nascimento, email, password, historico_pontuacoes, id]
        );
        return new Usuario(result.rows[0]);
    }

    async remove(id) {
        const result = await db.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] ? new Usuario(result.rows[0]) : null;
    }
}

module.exports = new UsuarioRepository();