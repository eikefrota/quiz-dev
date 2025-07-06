import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import styles from './QuizScreenStyles';
import api from '../../api/api';

function embaralhar(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoria } = route.params || {};
  const [perguntas, setPerguntas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [indice, setIndice] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [alternativas, setAlternativas] = useState([]);
  const [tempo, setTempo] = useState(8);
  const [acertos, setAcertos] = useState(0);

  const timerRef = useRef(null);
  const delayRef = useRef(null);
  const tempoAnimado = useRef(new Animated.Value(1)).current; // 1 = 100%

  useEffect(() => {
    async function carregarPerguntas() {
      setCarregando(true);
      try {
        const res = await api.get(`/perguntas/categoria?categoria=${encodeURIComponent(categoria)}`);
        // Seleciona até 10 perguntas aleatórias e sem repetição
        const todas = res.data;
        const embaralhadas = embaralhar(todas);
        const selecionadas = embaralhadas.slice(0, 10);
        setPerguntas(selecionadas);
        setIndice(0);
      } catch (e) {
        setPerguntas([]);
      }
      setCarregando(false);
    }
    carregarPerguntas();
  }, [categoria]);

  // Embaralha alternativas só quando a pergunta muda
  useEffect(() => {
    if (perguntas.length > 0 && perguntas[indice]) {
      const perguntaAtual = perguntas[indice];
      const alternativasOriginais = [
        { texto: perguntaAtual.resposta_correta, correta: true },
        ...perguntaAtual.respostas_incorretas.map(texto => ({
          texto,
          correta: false,
        })),
      ];
      const alternativasEmbaralhadas = embaralhar(alternativasOriginais);
      const letras = ['A', 'B', 'C', 'D'];
      const alternativasComLetras = alternativasEmbaralhadas.map((alt, idx) => ({
        ...alt,
        key: letras[idx],
      }));
      setAlternativas(alternativasComLetras);
      setRespostaSelecionada(null);
      setTempo(8);

      // Barra animada: reset e inicia animação
      tempoAnimado.setValue(1);
      Animated.timing(tempoAnimado, {
        toValue: 0,
        duration: 8000,
        useNativeDriver: false,
      }).start();
    }
  }, [perguntas, indice]);

  // Timer de 8 segundos
  useEffect(() => {
    if (respostaSelecionada || perguntas.length === 0) return;

    timerRef.current = setInterval(() => {
      setTempo((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          avancarPergunta();
          return 8;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [respostaSelecionada, perguntas, indice]);

  // Delay de 1,5 segundos após resposta
  useEffect(() => {
    if (respostaSelecionada) {
      clearInterval(timerRef.current);
      Animated.timing(tempoAnimado).stop(); // para a animação
      delayRef.current = setTimeout(() => {
        avancarPergunta();
      }, 1500);
    }
    return () => clearTimeout(delayRef.current);
  }, [respostaSelecionada]);

  function avancarPergunta() {
    setRespostaSelecionada(null);
    setTempo(8);
    tempoAnimado.setValue(1);
    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
    } else {
      // Vai para a tela de resultado
      navigation.replace('QuizResultado', {
        total: perguntas.length,
        acertos,
        categoria,
      });
    }
  }

  if (carregando) {
    return (
      <LinearGradient colors={['#510870', '#a228b0']} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  if (!perguntas.length) {
    return (
      <LinearGradient colors={['#510870', '#a228b0']} style={styles.container}>
        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
          Nenhuma pergunta encontrada para este tema.
        </Text>
      </LinearGradient>
    );
  }

  const perguntaAtual = perguntas[indice];
  const alternativaCorreta = alternativas.find(a => a.correta)?.key;

  return (
    <LinearGradient colors={['#510870', '#a228b0']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.cardPergunta}>
        <Text style={styles.pergunta}>{perguntaAtual.pergunta}</Text>
      </View>

      <View style={styles.alternativasContainer}>
        {alternativas.map((alt) => {
          let borderColor = 'transparent';
          let backgroundColor = '#fff';
          if (respostaSelecionada) {
            if (alt.key === alternativaCorreta) {
              borderColor = '#00FF00';
              backgroundColor = '#f7fff7';
            }
            if (alt.key === respostaSelecionada && alt.key !== alternativaCorreta) {
              borderColor = '#FF3B3B';
              backgroundColor = '#fff7f7';
            }
          }
          return (
            <TouchableOpacity
              key={alt.key}
              style={[styles.alternativa, { borderColor, backgroundColor }]}
              activeOpacity={0.85}
              disabled={!!respostaSelecionada}
              onPress={() => {
                setRespostaSelecionada(alt.key);
                if (alt.correta) setAcertos((prev) => prev + 1);
              }}
            >
              <Text style={styles.letra}>{alt.key}</Text>
              <Text style={styles.textoAlternativa}>{alt.texto}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Barra de tempo animada */}
      <View style={styles.tempoBarraContainer}>
        <Animated.View
          style={[
            styles.tempoBarra,
            {
              width: tempoAnimado.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </LinearGradient>
  );
}

