import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import CadastroScreen from '../screens/Cadastro/CadastroScreen';
import TemaScreen from '../screens/Temas/TemaScreen';
import InicioScreen from '../screens/Inicio/InicioScreen';
import UsuarioScreen from '../screens/Usuario/UsuarioScreen';
import QuizFutebol from '../components/pergunta';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Futebol" component={futebolScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Usuario" component={UsuarioScreen} />
        <Stack.Screen name="Temas" component={TemaScreen} />
        <Stack.Screen name="QuizFutebol" component={QuizFutebol} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
