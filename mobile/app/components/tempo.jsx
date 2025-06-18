import React, { useState, useEffect } from 'react'; 
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import TimeComponent from './components/TimeComponent'; 

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TimeComponent />
    </SafeAreaView>
  );
};

const TimeComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId); 
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {time.toLocaleTimeString()} {/* Exibe a hora */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default TimeComponent;
