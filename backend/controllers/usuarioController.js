const db = require('../db/db');
const usuarioService = require('../services/usuarioService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const emailService = require('../services/emailService');

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

            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao buscar usuario', error);
            res.status(404).json({ error: 'Erro ao buscar usuario '});
        }
    }

    async create(req, res) {
        try {
            const usuario = req.body;
            const usuarios = await usuarioService.create(usuario);
            const token = jwt.sign(
                { id: usuarios.id, email: usuarios.email, nome: usuarios.nome },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(201).json({message: 'Usuario criado com sucesso',token , usuario: usuarios});
        } catch (error) {
            if (error.message === 'Email já cadastrado') {
                return res.status(400).json({error: 'Email já cadastrado'});
            }
            console.error('Erro ao criar usuario', error);
            return res.status(400).json({error: 'Erro ao criar usuario'});
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const usuario  = req.body;
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
            console.error('Erro ao removerusuario: ', error);
            return res.status(400).json({error: 'Erro ao remover usuario'});
        }
    }

    async solicitarOtp(req, res) {
        const { email } = req.body;

        // Verifica se já existe usuário com o mesmo email
        const existing = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Salva ou atualiza o OTP no banco
        await db.query(
            `CREATE TABLE IF NOT EXISTS otps (
                email VARCHAR(100) PRIMARY KEY,
                otp VARCHAR(10) NOT NULL,
                criado_em TIMESTAMP DEFAULT NOW()
            )`
        );
        await db.query(
            `INSERT INTO otps (email, otp) VALUES ($1, $2)
             ON CONFLICT (email) DO UPDATE SET otp = $2, criado_em = NOW()`,
            [email, otp]
        );

        await emailService(email, otp);
        res.status(200).json({ message: 'OTP enviado para o e-mail.' });
    }

    async verificarOtp(req, res) {
        const { email, otp, nome, sobrenome, data_nascimento, password } = req.body;

        // Verifica se já existe usuário com o mesmo email
        const existing = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const result = await db.query('SELECT otp FROM otps WHERE email = $1', [email]);
        const otpEsperado = result.rows[0]?.otp;

        if (otpEsperado === otp) {
            await db.query('DELETE FROM otps WHERE email = $1', [email]);
            const usuario = await usuarioService.create({
                nome,
                sobrenome,
                data_nascimento,
                email,
                password,
                historico_pontuacoes: {}
            });
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, nome: usuario.nome },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(201).json({ message: 'Usuário criado com sucesso', token, usuario });
        } else {
            return res.status(400).json({ message: 'OTP inválido.' });
        }
    }
}

module.exports = new UsuarioController();