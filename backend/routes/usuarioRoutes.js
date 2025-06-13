const express = require('express');
const controller = require('../controllers/usuarioController');
const ValidateUsuario = require('../middleware/validadeUsuario');

class UsuarioRoutes {
    constructor() {
       this.router = express.Router();
       this.registerRouter();
    }

    registerRouter() {
        this.router.get('/', controller.getAll);
    }
}