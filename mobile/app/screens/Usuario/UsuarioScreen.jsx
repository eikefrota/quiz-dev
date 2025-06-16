import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import api from '../../api/api';
import { colors, fonts } from '../../constants/theme';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 36,
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