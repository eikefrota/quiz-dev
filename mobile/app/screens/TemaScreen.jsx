import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../constants/theme';

export default function TemaScreen() {
  const navigation = useNavigation();

  const temas = [
    { nome: 'Gerais', emoji: '🌍', tela: 'QuizGerais' },
    { nome: 'Futebol', emoji: '⚽', tela: 'QuizFutebol' },
    { nome: 'Filmes', emoji: '📺', tela: 'QuizFilmes' },
    { nome: 'Séries', emoji: '🎬', tela: 'QuizSeries' },
    { nome: 'Música', emoji: '🎵', tela: 'QuizMusica' },
    { nome: 'História', emoji: '📜', tela: 'QuizHistoria' },
    { nome: 'Geografia', emoji: '🗺️', tela: 'QuizGeografia' },
    { nome: 'Matemática', emoji: '➗', tela: 'QuizMatematica' },
    { nome: 'Ciência', emoji: '🔬', tela: 'QuizCiencia' },
    { nome: 'Animes', emoji: '🎌', tela: 'QuizAnimes' },
    { nome: 'Jogos', emoji: '🎮', tela: 'QuizJogos' },
    { nome: 'Esportes', emoji: '🏅', tela: 'QuizEsportes' },
  ];

  return (
    <LinearGradient
      colors={['#510870', '#a228b0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Escolha o tema:</Text>
        <View style={styles.temasContainer}>
          {temas.map((tema) => (
            <TouchableOpacity
              key={tema.nome}
              style={styles.temaButton}
              // onPress={() => navigation.navigate(tema.tela)}
              activeOpacity={0.8}
            >
              <Text style={styles.emoji}>{tema.emoji}</Text>
              <Text style={styles.temaText}>{tema.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center',     // centraliza horizontalmente
  },
  title: {
    marginTop: 80,
    fontSize: 34,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  temasContainer: {
    width: '100%',
    alignItems: 'center',
  },
  temaButton: {
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 11,
    paddingVertical: 22,
    paddingHorizontal: 30,
    marginBottom: 28,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  emoji: {
    fontSize: 38,
    marginBottom: 8, // espaço entre emoji e texto
    marginRight: 0,  // remove margem lateral
    textAlign: 'center',
  },
  temaText: {
    fontSize: 22,
    color: colors.purple,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});