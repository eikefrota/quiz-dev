import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../api/api';
import { colors, fonts } from '../../constants/theme';
import styles from './LoginScreenStyles'; // Importando os estilos
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../Loading/LoadingModal'; // Adicione este import

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Novo estado

  const login = async () => {
    try {
      if (!email || !password) {
        alert('Preencha todos os campos');
        return;
      }
      setLoading(true); // Inicia o loading
      const response = await api.post('/usuarios/login', { email, password });
      if (response.status === 200) {
        // Salva o usuário retornado no AsyncStorage
        await AsyncStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        // Salva o token JWT também!
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Inicio');
      }
    } catch (error) {
      alert('Email ou senha incorretos.');
    } finally {
      setLoading(false); // Finaliza o loading
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
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.link}>
          <Text style={styles.linkText}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

