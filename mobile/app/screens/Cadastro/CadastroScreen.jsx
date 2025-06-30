import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../api/api';
import styles from './CadastroScreenStyles';
import { colors } from '../../constants/theme';
import LoadingModal from '../Loading/LoadingModal'; // Adicione este import

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = cadastro, 2 = otp
  const [loading, setLoading] = useState(false);

  const solicitarOtp = async () => {
    if (!nome || !email || !password) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    try {
      setLoading(true);
      await api.post('/usuarios/solicitar-otp', { email });
      setStep(2);
      Alert.alert('Verifique seu email', 'Enviamos um código de confirmação para seu email.');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao solicitar OTP.');
    } finally {
      setLoading(false);
    }
  };

  const verificarOtp = async () => {
    if (!otp) {
      Alert.alert('Digite o código recebido no email');
      return;
    }
    try {
      setLoading(true);
      await api.post('/usuarios/verificar-otp', { nome, email, password, otp });
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'OTP inválido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#510870', '#a228b0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <LoadingModal visible={loading} />
      <View style={styles.inner}>
        {step === 1 ? (
          <>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholderTextColor={colors.textLight}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              placeholderTextColor={colors.textLight}
            />
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor={colors.textLight}
            />
            <TouchableOpacity style={styles.button} onPress={solicitarOtp}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
              <Text style={styles.linkText}>Já possui conta? Faça login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Confirme seu Email</Text>
            <Text style={{ color: colors.white, marginBottom: 20, textAlign: 'center' }}>
              Digite o código enviado para {email}
            </Text>
            <TextInput
              placeholder="Código de confirmação"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor={colors.textLight}
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={verificarOtp}>
              <Text style={styles.buttonText}>Verificar Código</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.link}>
              <Text style={styles.linkText}>Não recebi o código, reenviar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </LinearGradient>
  );
}


