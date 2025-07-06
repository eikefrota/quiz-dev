import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import InicioScreen from '../screens/Inicio/InicioScreen';
import UsuarioScreen from '../screens/Usuario/UsuarioScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FFF',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: 'transparent', // transparente
          borderTopWidth: 0,              // sem borda superior
          elevation: 0,                   // sem sombra Android
          position: 'absolute',           // flutuante (opcional)
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Início') iconName = 'home';
          if (route.name === 'Usuário') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={InicioScreen} />
      <Tab.Screen name="Usuário" component={UsuarioScreen} />
    </Tab.Navigator>
  );
}