import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './pages/splash';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Doce from './pages/Doce';
import EditarDoce from './pages/EditarDoce';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'BebasNeue': require('./src/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Doce" component={Doce} />
        <Stack.Screen name="EditarDoce" component={EditarDoce} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}