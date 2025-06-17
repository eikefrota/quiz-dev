const db = require('../db/db');
const Usuario = require('../models/usuarioModel');

class UsuarioRepository {

    async getAll() {
        const result = await db.query(`SELECT * FROM usuario`);
        return result.rows.map(row => new Usuario(row));
    }
    async getById(id) {
        const result = await db.query(`SELECT * FROM usuario WHERE id = $1`, [id]);
        return result.rows[0] ? new Usuario (result.rows[0]) : null;
    }
    async create({ nome, email, password, historico_pontuacoes }) {
        const result = await db.query(
            'INSERT INTO usuario (nome, email, password, historico_pontuacoes) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, email, password, historico_pontuacoes]);
        return new Usuario(result.rows[0]);
    }
    async update(id, {nome, email, password, historico_pontuacoes}) {
        const result = await db.query(
            'UPDATE usuario SET nome=$1, email=$2, password=$3, historico_pontuacoes=$4 WHERE id=$5 RETURNING *',
            [nome, email, password, historico_pontuacoes, id]);
        return new Usuario(result.rows[0])
    }

    async remove (id) {
        const result = await db.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] ? new Usuario(result.rows[0]) : null;
    }
}

module.exports = new UsuarioRepository()