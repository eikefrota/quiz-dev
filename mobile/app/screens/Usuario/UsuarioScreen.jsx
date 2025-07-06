import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './UsuarioScreenStyles';
import { colors } from '../../constants/theme';

export default function UsuarioScreen() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({
    nome: '',
    sobrenome: '',
    data_nascimento: '',
    email: '',
    pontuacao: 0,
  });

  useEffect(() => {
    const carregarUsuario = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('usuario');
      if (usuarioSalvo) {
        const user = JSON.parse(usuarioSalvo);
        // Agora puxando os campos diretamente do banco de dados
        setUsuario({
          nome: user.nome || '',
          sobrenome: user.sobrenome || '',
          data_nascimento: user.data_nascimento || '',
          email: user.email || '',
          pontuacao: user.historico_pontuacoes?.total || 0,
        });
      }
    };
    carregarUsuario();
  }, []);

  return (
    <LinearGradient
      colors={['#510870', '#a228b0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image
          source={require('../../assets/images/user-icon.png')}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            marginBottom: 24,
            borderWidth: 3,
            borderColor: colors.white,
            backgroundColor: '#fff',
          }}
        />
        <Text style={styles.title}>{usuario.nome} {usuario.sobrenome}</Text>
        <View style={{ width: '100%', marginBottom: 18 }}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <Text style={styles.infoValue}>{usuario.nome}</Text>
        </View>
        <View style={{ width: '100%', marginBottom: 18 }}>
          <Text style={styles.infoLabel}>Sobrenome:</Text>
          <Text style={styles.infoValue}>{usuario.sobrenome}</Text>
        </View>
        <View style={{ width: '100%', marginBottom: 18 }}>
          <Text style={styles.infoLabel}>Data de Nascimento:</Text>
          <Text style={styles.infoValue}>{usuario.data_nascimento || 'Não informado'}</Text>
        </View>
        <View style={{ width: '100%', marginBottom: 18 }}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{usuario.email}</Text>
        </View>
        <View style={{ width: '100%', marginBottom: 32 }}>
          <Text style={styles.infoLabel}>Pontuação:</Text>
          <Text style={styles.infoValue}>{usuario.pontuacao}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Editar')}
        >
          <Text style={styles.buttonText}>Editar informações</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}