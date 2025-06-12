const db = require('./db/db');
const Usuario = require('../models/usuarioModel');

class UsuarioRepository {

    async findAll() {
        const result = await db.query(`SELEC * FROM usuarios`);
        return result.rows.map(row => new Usuario(row));
    }
    async findById(id) {
        const result = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
        return result.rows[0] ? new Usuario (result.rows[0]) : null;
    }

    async create({ nome, email, password, historicoPontuacoes }) {
        const result = await db.query(
            'INSERT INTO usuarios (nome, email, password, historicoPontuacoes) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, email, password, historicoPontuacoes]);
        return new Usuario(result.rows[0]);
    }
    async update(id, {nome, email, password, historicoPontuacoes}) {
        const result = await db.query(
            'UPDATE usuarios SET nome=$2, email=$2, password=$3, historicoPontuacoes=$4 WHERE id=$1 RETURNING *',
            [nome, email, password, historicoPontuacoes, id]);
        return new Usuario(result.rows[0])
    }

    async remove (id) {
        const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] ? new Usuario(result.rows[0]) : null;
    }
}

module.exports = new UsuarioRepository()