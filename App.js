import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Home from './pages/home';
import Login from './pages/login';
import Cadastro from './pages/cadastro';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Kidmania: require('./assets/fonts/Kidmania Trial Regular.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4a0012' },
          headerTintColor: '#fff',
          drawerActiveBackgroundColor: '#4a0012',
          drawerActiveTintColor: '#fff',
        }}
      >
        <Drawer.Screen
          name="Início"
          component={StackRoutes}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}