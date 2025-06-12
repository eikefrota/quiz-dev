const eepository = require('../repositories/usuarioRepository');

class usuarioService {
    static async getAll() {
        const usuarios = await repository.findAll();
        return usuarios;
    }

    static async getById (id) {
        const usuarios = await repositoru.findById();
        return usuarios;
    }

    static async create (dados) {
        const novoUsuario = await repository.create(dados);
        return novoUsuario;
    }

    static async update (id, dados) {
        const usuarioAtualizado = await repository.update(id, dados);
        return usuarioAtualizado;
    }

    static async delete (id) {
        const usuarioDeletado = await repository.remove();
        return usuarioDeletado;
    }

}

module.exports = usuarioService;