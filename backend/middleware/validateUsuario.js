class ValidateUsuario {
    static validateCreate (req, res, next) {
        const { nome, email, password } = req.body;

        if (!nome || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        
        next();
    }

    static validateUpdate (req, res, next) {
        // Permite atualizar qualquer campo, mas pelo menos um deve ser enviado
        const { nome, email, password, historico_pontuacoes } = req.body;

        if (!nome && !email && !password && !historico_pontuacoes) {
            return res.status(400).json({ message: "Envie pelo menos um campo para atualizar" });
        }
        
        next();
    }
}

module.exports = ValidateUsuario;