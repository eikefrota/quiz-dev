import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import TemaScreen from '../screens/TemaScreen';
import InicioScreen from '../screens/InicioScreen';
import UsuarioScreen from '../screens/UsuarioScreen';
import SuccessScreen from '../screens/SuccessScreen';
import ErrorScreen from '../screens/ErrorScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Usuario" component={UsuarioScreen} />
        <Stack.Screen name="Temas" component={TemaScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
