import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pergunta from '../components/pergunta';

export default function QuizFutebolScreen() {
  return (
    <View style={styles.container}>
      <Pergunta />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }
});