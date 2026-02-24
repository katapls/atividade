import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

export default function Cadastro({ navigation }) {
  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400' }} 
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 32, color: '#4a0012', textAlign: 'center' }}>EVERSWEET</Text>
        <Text style={{ textAlign: 'center', marginBottom: 30 }}>Cadastro</Text>
        
        <TextInput 
          placeholder="Nome" 
          style={{ backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5 }} 
        />
        <TextInput 
          placeholder="Email" 
          style={{ backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5 }} 
        />
        <TextInput 
          placeholder="Senha" 
          style={{ backgroundColor: '#fff', padding: 10, marginBottom: 20, borderRadius: 5 }} 
          secureTextEntry={true} 
        />
        
        <TouchableOpacity style={{ backgroundColor: '#4a0012', padding: 15, borderRadius: 5, marginBottom: 10 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Cadastrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ textAlign: 'center', color: '#4a0012' }}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}