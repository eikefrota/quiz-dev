const usuarioService = require('../services/usuarioService');

class UsuarioController {
    async getAll(req, res) {
        try {
            const usuarios = await usuarioService.getAll();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuarios', error);
            res.status(404).json({error: 'Erro ao buscar usuario '});
        }
    }

    async getById (req, res) {
        try {
            const { id } = req.params;
            const usuarios = await usuarioService.getById(id);

            if (!usuarios) {
                return res.status(404).json({ error: 'Usuario não encontrado' });
            }

            res.staus(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuario', error);
            res.status(404).json({ error: 'Erro ao buscar usuario '});
        }
    }

    async create(req, res) {
        try {
            const usuario = req.body;
            const usuarios = await usuarioService.create(usuario);
            return res.status(201).json({message: 'Usuario criado com sucesso', usuario: usuarios});
        } catch (error) {
            console.error('Erro ao criar usuario', error);
            return res.status(400).json({error: 'Erro ao criar usuario'});
        }
    }

    async update(req, res) {
        try {
            
            const { id } = req.params;
            const { usuario } = req.body;
            const usuarioAtualizado = await usuarioService.update(id, usuario);

            if (!usuarioAtualizado) {
                return res.status(404).json({ error: 'Usuario não encontrado' });
            }
            return res.status(200).json({message: 'Usuario atualizado com sucesso', usuario: usuarioAtualizado })
        } catch (error) {
            console.error('Erro ao atualizar usuario', error);
            return res.status(400).json({error: 'Erro ao atualizar usuario'});
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const usuarioDeletado = await usuarioService.delete(id);

            if (!usuarioDeletado) {
                return res.status(404).json({message: 'Usuario não encontrado para a remoção.'})
            } 

            return res.status(200).json({ message: 'Usuario deletado com sucesso', usuario: usuarioDeletado });
    } catch (error) {
        console.erro('Erro ao removerusuario: ', error);
        return res.status(400).json({error: 'Erro ao remover usuario'});
    }
 }
}

module.exports = new UsuarioController();