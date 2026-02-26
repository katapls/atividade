import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

export default function Cadastro({ navigation }) {
  return (
    <ImageBackground 
      source={{ uri: 'https://cdn.aptoide.com/imgs/5/4/8/548c0b0e293461210e95a98185cb9034_screen.jpg' }} 
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 32, color: '#ffffff', textAlign: 'center' }}>EVERSWEET</Text>
        <Text style={{ textAlign: 'center',color: '#fff', marginBottom: 30 }}>Cadastro</Text>
        
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
          <Text style={{ textAlign: 'center', color: '#ffffff' }}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}