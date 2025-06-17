import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../api/api';
import { colors, fonts } from '../../constants/theme';
import styles from './InicioScreenStyles'; // Importando os estilos

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#510870', '#a228b0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.avatarContainer}>
        {/* Ícone de usuário genérico */}
        <Image
          source={require('../../assets/images/user-icon.png')} 
          style={styles.avatar}
        />
      </View>

      <Text style={styles.username}>Eike</Text>
      
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

