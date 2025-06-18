const express = require('express');
const controller = require('../controllers/usuarioController');
const ValidateUsuario = require('../middleware/validateUsuario');

class UsuarioRoutes {
    constructor() {
        this.router = express.Router();
        this.registerRouter();
    }

    registerRouter() {
        /**
         * @swagger
         * /api/usuarios: 
         *   get:
         *     summary: Retorna todos os usuarios
         *     tags: [Usuarios]
         *     responses: 
         *       200:
         *         description: Lista de usuarios
         */
        this.router.get('/', controller.getAll);

        /**
         * @swagger
         * /api/usuarios/{id}:
         *   get: 
         *     summary: Retorna o usuario correspondente ao id
         *     tags: [Usuarios]
         *     parameters: 
         *       - in: path
         *         name: id
         *         required: true
         *         schema: 
         *           type: string
         *         description: id do usuario
         *     responses: 
         *       200:
         *         description: Usuario encontrado
         *       404: 
         *         description: Usuario não encontrado
         */
        this.router.get('/:id', controller.getById);

        /**
         * @swagger
         * /api/usuarios:
         *   post:
         *     summary: Adiciona um novo usuario 
         *     tags: [Usuarios]
         *     requestBody: 
         *       required: true
         *       content: 
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - nome
         *               - email
         *               - password
         *               - historico_pontuacoes
         *             properties:
         *               nome:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *               historico_pontuacoes:
         *                 type: object
         *     responses:
         *       201:
         *         description: Usuario criado com sucesso.    
         */
        this.router.post('/', ValidateUsuario.validateCreate, controller.create);  

        /**
         * @swagger
         * /api/usuarios/{id}:
         *   put:
         *     summary: Atualiza o usuario
         *     tags: [Usuarios]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               nome:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *               historico_pontuacoes:
         *                 type: object
         *     responses:
         *       200:
         *         description: Usuario atualizado com sucesso
         *       404:
         *         description: usuario não encontrado
         */
        this.router.put('/:id', ValidateUsuario.validateUpdate, controller.update)

        /**
         * @swagger
         * /api/usuarios/{id}:
         *   delete:
         *     summary: Remove o usuario
         *     tags: [Usuarios]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       204:
         *         description: Usuario removido com sucesso
         *       404:
         *         description: Usuario não encontrado
         */
        this.router.delete('/:id', controller.delete)

        this.router.post('/login', async (req, res) => {
            const { email, password } = req.body;
            const usuarios = await require('../repositories/usuarioRepository').getAll();
            const usuario = usuarios.find(u => u.email === email && u.password === password);
            if (usuario) {
                return res.status(200).json({ message: 'Login realizado com sucesso', usuario });
            } else {
                return res.status(401).json({ message: 'Email ou senha incorretos' });
            }
        });
    }

    getRouter() {
        return this.router
    }
}

module.exports = new UsuarioRoutes().getRouter();
