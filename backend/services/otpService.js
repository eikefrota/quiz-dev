const jwt = require('jsonwebtoken');
const OtpRepository = require('../repositories/otpRepository');
const UsuarioRepository = require('../repositories/usuarioRepository');
const AuthService = require('./authService');

class OtpService {
    cosntructor() {
        this.otpRepository = new OtpRepository();
        this.usuarioRepository = new UsuarioRepository();
        this.authService = new AuthService();
    }

    async verificarOtp(email, codigoOtp) {
        const otpValido = await OtpRepository.verificarCodigo(email, codigoOtp);
        if (!otpValido) {
            throw { status: 401, message: 'OTP inválido ou expirado' };
        }
        // Busca o usuário no banco
        const usuario = await UsuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }
        // Gera JWT
        const token = AuthService.genereteToken({
            id: usuario.id,
            email: usuario.email,
            authMethod: 'otp'
        }, '30m');
        // Remove ou invalida OTP após uso
        await OtpRepository.excluirOtp(email);
        return { message: 'OTP verificada com sucesso', token, usuario };
        }
    };


module.exports = OtpService;