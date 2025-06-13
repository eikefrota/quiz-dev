import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../api/api';
import { colors, fonts } from '../constants/theme';

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = async () => {
    try {
      if (!nome || !email || !senha) {
        alert('Preencha todos os campos');
        return;
      }
      await api.post('/usuarios', { nome, email, senha });
      navigation.replace('Login');
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <LinearGradient
      colors={['#510870', '#a228b0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.inner}>
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
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.button} onPress={cadastrar}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
          <Text style={styles.linkText}>Já possui conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center',     // centraliza horizontalmente
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 40,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white,
    marginBottom: 20,
    fontSize: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    color: colors.white,
    fontFamily: fonts.regular,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
    minWidth: 220,
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.purple,
    fontSize: 18,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: colors.white,
    fontWeight: '600',
  },
});
