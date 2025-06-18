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
         * /usuarios: 
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
         * /usuarios/{id}:
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
         * /usuarios:
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
        this.router.post('/', ValidateUsuario.validate, controller.create);  

        /**
         * @swagger
         * /usuarios/{id}:
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
        this.router.put('/:id', ValidateUsuario.validate, controller.update)

        /**
         * @swagger
         * /usuarios/{id}:
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
    }

    getRouter() {
        return this.router
    }
}


module.exports = new UsuarioRoutes().getRouter();
