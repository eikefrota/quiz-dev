import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../api/api';
import { colors } from '../../constants/theme';
import styles from './CadastroScreenStyles';
import LoadingModal from '../Loading/LoadingModal';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastrar = async () => {
    try {
      if (!nome || !sobrenome || !email || !senha) {
        Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
        return;
      }
      setLoading(true);
      const response = await api.post('/usuarios', {
        nome,
        sobrenome,
        data_nascimento: dataNascimento,
        email,
        password: senha,
      });
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
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
      {/* Seta fixa no canto superior esquerdo */}
      <View style={{ position: 'absolute', top: 60, left: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
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
          placeholder="Sobrenome"
          value={sobrenome}
          onChangeText={setSobrenome}
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TextInput
          placeholder="Data de Nascimento (AAAA-MM-DD)"
          value={dataNascimento}
          onChangeText={setDataNascimento}
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
        <TouchableOpacity style={styles.button} onPress={cadastrar} disabled={loading}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
          <Text style={styles.linkText}>Já possui conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}