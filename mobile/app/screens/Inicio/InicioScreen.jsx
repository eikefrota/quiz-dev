import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../api/api';
import { colors, fonts } from '../../constants/theme';

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
          source={require('../assets/images/user-icon.png')} 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B1FA2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginBottom: -20,
  },
  avatar: {
    width: 250,
    height: 250,
    tintColor: '#fff',
  },
  username: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 100,
  },
  button: {
      backgroundColor: colors.white,
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderRadius: 10,
      width: '75%',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
    },
    buttonText: {
      color: colors.purple,
      fontSize: 22,
      fontFamily: fonts.bold,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});