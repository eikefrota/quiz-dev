import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../constants/theme'; // Ajuste o caminho se necessário
import HomeScreen from '../screens/Home/HomeScreen.jsx';

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
        source={require('../assets/images/logo.png')} // ajuste o caminho conforme sua estrutura
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 40,
    color: colors.primary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '80%',
    marginTop: 30,
  },
  buttonText: {
    color: colors.purple,
    fontSize: 22,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
