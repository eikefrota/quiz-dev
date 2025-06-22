require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const usuarioRoutes = require('./routes/usuarioRoutes');
const perguntasRoutes = require('./routes/perguntasRoutes');
const dbInit = require('./db/dbInit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig'); // <- import Swagger config



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000
        this.configureMiddleware()
        this.routes()
        this.initDb()
    }
    

    configureMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        }

    routes() {
        this.app.use('/api/usuarios', usuarioRoutes);
        this.app.use('/api/perguntas', perguntasRoutes);

            this.app.get('/', (req, res) => {   
            res.send('A api usuarios está funcionando')
        });

        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            return res.status(500).json({error: 'Erro interno do servidor'})
        });

    
    }

    async initDb() {
        try{
            console.log("iniciando banco de dados");
            await dbInit();
            console.log('Tabela criada com sucesso.');
        } catch (error) {
            console.error('Erro ao criar a tabela', error);
        }
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`servidor rodando na porta ${this.port}`)
            console.log(`Documentação Swagger em http://localhost:${this.port}/api-docs`);
        });
    }
}
module.exports = Server;
