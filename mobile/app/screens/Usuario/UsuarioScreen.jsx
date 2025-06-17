import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import api from '../../api/api';
import { colors, fonts } from '../../constants/theme';
import styles from './UsuarioScreenStyles'; // Importando os estilos

export default function UsuarioScreen() {
  const navigation = useNavigation();
  // Substitua pelos dados reais do usuário logado
  const [nome, setNome] = useState('Eike');
  const [email, setEmail] = useState('eikefrota@gmail.com');
  const [senha, setSenha] = useState('');

  const salvar = async () => {
    try {
      if (!nome || !email) {
        Alert.alert('Atenção', 'Nome e email são obrigatórios.');
        return;
      }
      // Exemplo de chamada à API (ajuste endpoint conforme necessário)
      await api.put('/usuarios/1', { nome, email, senha: senha || undefined });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
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
        <Text style={styles.title}>Editar Perfil</Text>
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
          placeholder="Nova senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.button} onPress={salvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

