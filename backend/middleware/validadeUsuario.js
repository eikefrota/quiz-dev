class ValidateUsuario {
    static validate (req, res, next) {
        const { nome, email, password } = req.body;

        if (!nome || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        
        next();
    }
}

module.exports = ValidateUsuario;