import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
<<<<<<< HEAD:mobile/app/screens/LoginScreen.jsx
import api from '../api/api';
import { colors, fonts } from '../constants/theme';
=======
import api from '../../api/api';
import { colors, fonts } from '../../constants/theme';
import styles from './LoginScreenStyles'; // Importando os estilos
>>>>>>> 4a747b6abef2c01a9f44a9bb7056877afac03484:mobile/app/screens/Login/LoginScreen.jsx

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    try {
      if (!email || !senha) {
        alert('Preencha todos os campos');
        return;
      }
      if (email === 'eikefrota@gmail.com' && senha === '1234') {
        navigation.navigate('Inicio');
      } else {
        alert('Email ou senha incorretos.');
      }
      // Substitua com sua API real para login
      // await api.post('/login', { email, senha });

    } catch (error) {
      alert('Erro ao fazer login.');
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
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.link}>
          <Text style={styles.linkText}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>
      
      </View>
    </LinearGradient>
  );
}

