import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD:mobile/app/screens/HomeScreen.jsx
import { colors, fonts } from '../constants/theme'; // Ajuste o caminho se necessário
import HomeScreen from '../screens/Home/HomeScreen.jsx';
=======
import { colors, fonts } from '../../constants/theme';
import styles from './HomeScreenStyles'; // Importando os estilos
>>>>>>> 4a747b6abef2c01a9f44a9bb7056877afac03484:mobile/app/screens/Home/HomeScreen.jsx

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#510870', '#a228b0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: 500, height: 500 }}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.buttonText}>CADASTRO</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

