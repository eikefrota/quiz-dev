import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import CadastroScreen from '../screens/Cadastro/CadastroScreen';
import TabNavigator from './TabNavigator';
import TemaScreen from '../screens/Temas/TemaScreen';
import EditarScreen from '../screens/Editar/EditarScreen';  

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Temas" component={TemaScreen} />
        <Stack.Screen name="Editar" component={EditarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}