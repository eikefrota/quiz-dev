const OtpRepository = require('../repositories/otpRepository');
const usuarioRepository = require('../repositories/usuarioRepository');
const UsuarioRepository = require('../repositories/usuarioRepository');
const AuthService = require('./authService');

class OtpService {
    async solicitarOtp(email) {
        console.log('📧 Solicitando OTP para:', email);
        
        // Verifica se o usuário existe
        const usuarioExistente = await usuarioRepository.getByEmail(email);
            if (usuarioExistente) {
            throw { 
                status: 409, 
                message: 'Usuário já cadastrado. Faça login ou recupere sua senha.' 
            };
        }      
        
        // Gera código OTP (6 dígitos)
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('🔢 Código OTP gerado:', otpCode);

        // Salva OTP no banco com expiração (ex: 10 minutos)
        await OtpRepository.createOrUpdate(email, otpCode, 10);

        // TODO: Implementar envio de email aqui
        // await this.enviarEmailOtp(email, otpCode);
        
        console.log('📤 OTP gerado (implementar envio de email):', otpCode);
        
        return { 
            success: true, 
            message: 'OTP enviado com sucesso',
            otp: otpCode // Em desenvolvimento, pode retornar o código
        };
    }

    async verificarOtp(email, codigoOtp) {
        console.log('000000000000')
        const otpValido = await OtpRepository.findByEmail(email);

        if (!otpValido) {
            throw { status: 401, message: 'OTP inválido ou expirado' };
        }
        // Busca o usuário no banco
        const usuario = await UsuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }
        // Gera JWT
        const token = AuthService.generateToken({
            id: usuario.id,
            email: usuario.email,
            authMethod: 'otp'
        }, '30m');
        // Remove ou invalida OTP após uso
        await OtpRepository.deleteByEmail(email);
        return { message: 'OTP verificada com sucesso', token, usuario };
        }
    };


module.exports = new OtpService();