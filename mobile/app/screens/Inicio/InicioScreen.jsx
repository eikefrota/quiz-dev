import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './InicioScreenStyles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const carregarUsuario = async () => {
      const usuarioSalvo = await AsyncStorage.getItem('usuario');
      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        setUsername(usuario.nome);
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
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/user-icon.png')}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.username}>{username}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Temas')}
      >
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Usuario')}
      >
        <Text style={styles.buttonText}>EDITAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}


