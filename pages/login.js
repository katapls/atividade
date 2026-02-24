import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#4a0012', paddingHorizontal: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 42, color: '#fff', textAlign: 'center', marginBottom: 10, fontWeight: 'bold' }}>
        EVERSWEET
      </Text>
      
      <Text style={{ textAlign: 'center', color: '#fff', marginBottom: 40, fontSize: 16 }}>
        Faça login para continuar
      </Text>
      
      <Text style={{ color: '#fff', marginBottom: 5 }}>Email</Text>
      <TextInput 
        placeholder="Email" 
        placeholderTextColor="#ccc"
        style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: 12, marginBottom: 15, borderRadius: 8, fontSize: 16 }} 
      />
      
      <Text style={{ color: '#fff', marginBottom: 5 }}>Senha</Text>
      <TextInput 
        placeholder="*********" 
        placeholderTextColor="#ccc"
        style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: 12, marginBottom: 25, borderRadius: 8, fontSize: 16 }} 
        secureTextEntry={true} 
      />
      
      <TouchableOpacity style={{ backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, alignItems: 'center' }}>
        <Text style={{ color: '#4a0012', fontSize: 18, fontWeight: 'bold' }}>ENTRAR</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14 }}>
          Ainda não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}