import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../api/api';
import styles from './CadastroScreenStyles'; // Importando os estilos
import { colors, fonts } from '../../constants/theme';

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cadastrar = async () => {
    try {
      if (!nome || !email || !password) {
        alert('Preencha todos os campos');
        return;
      }
      await api.post('/usuarios', { nome, email, password });
      alert('Usuário cadastrado com sucesso!');
      navigation.replace('Login');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === 'Email já cadastrado'
      ) {
        alert('Já existe um usuário cadastrado com esse email.');
      } else {
        alert('Erro ao cadastrar usuário.');
      }
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
          value={password}
          onChangeText={setPassword}
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


