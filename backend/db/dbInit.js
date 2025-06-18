const db = require('./db');

const createTableUsuario = async () => {
    const checkTableUsuarioQUery = `SELECT to_regclass('public.usuario')`;

    try {
        const result = await db.query(checkTableUsuarioQUery);

        if (result.rows[0].to_regclass === null) {
            const createQueryUsuario = `
            CREATE TABLE usuario (
            id SERIAL PRIMARY KEY NOT NULL,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            historico_pontuacoes JSONB
            );`

            await db.query(createQueryUsuario);
            console.log("Tabela Usuário criada com sucessso!")
        } else {
            console.log("Tabela Usuário já existe!")
        };
    } catch (error){
        console.log("Erro ao criar a tebela Usuário!", error.message);
    }
};

module.exports = createTableUsuario;