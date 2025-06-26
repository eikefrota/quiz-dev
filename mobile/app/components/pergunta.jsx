import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function QuizFutebol() {
  const [tema, setTema] = useState(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!tema && (
        <>
          <Button title="Iniciar" onPress={() => setTema('futebol')} />
        </>
      )}
      {tema === 'futebol' && <PerguntaFutebol />}
    </View>
  );
}

const PerguntaFutebol = () => {
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState(false);

  const pergunta = "Quem venceu o campeonato cearense de 2015?";
  const opcoes = [
    "ceara",
    "uniclinique",
    "fortaleza",
    "ferroviario"
  ];
  const resposta = "fortaleza";

  const verificarResposta = (opcao) => {
    setRespostaSelecionada(opcao);
    setRespostaCorreta(opcao === resposta);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pergunta}>{pergunta}</Text>
      {opcoes.map((opcao, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.botao,
            respostaSelecionada === opcao && (respostaCorreta ? styles.correta : styles.errada)
          ]}
          onPress={() => verificarResposta(opcao)}
          disabled={respostaSelecionada !== null}
        >
          <Text style={styles.textoBotao}>{opcao}</Text>
        </TouchableOpacity>
      ))}
      {respostaSelecionada && (
        <Text style={styles.resultado}>
          {respostaCorreta ? "Resposta correta!" : "Resposta incorreta."}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  pergunta: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
  botao: {
    backgroundColor: '#eee',
    padding: 15,
    marginVertical: 5,
    borderRadius:50,
  },

  textoBotao: { fontSize: 16 },
  correta: { backgroundColor: '#4CAF50' },
  errada: { backgroundColor: '#F44336' },
  resultado: { marginTop: 20, fontSize: 28, fontWeight: 'bold' }
});
