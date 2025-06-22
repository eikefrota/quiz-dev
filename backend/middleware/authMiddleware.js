const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || '7670783fa7ecc5d27f3629cb644d294f3ca7cce8cff5a49fcdd08d2d06281570f09de329a2d5b6e0105c500a0e145fb6a188a53f99a69114ae82bb6c44117053';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;