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
      <View>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Temas')}
      >
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}


