const repository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');

class usuarioService {
    static async getAll() {
        const usuarios = await repository.getAll();
        return usuarios;
    }

    static async getById (id) {
        const usuarios = await repository.getById(id);
        return usuarios;
    }

    static async create (dados) {
        dados.password = await bcrypt.hash(dados.password, 10);
        const novoUsuario = await repository.create(dados);
        return novoUsuario;
    }

    static async update (id, dados) {
        if (dados.senha) {
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }
        const usuarioAtualizado = await repository.update(id, dados);
        return usuarioAtualizado;
    }

    static async delete (id) {
        const usuarioDeletado = await repository.remove(id);
        return usuarioDeletado;
    }

}

module.exports = usuarioService