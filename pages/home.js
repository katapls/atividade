import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

export default function Home({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff5f5' }}>
      <View style={{ padding: 20 }}>
        

        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 30 }}>
          <Text style={{ fontSize: 36, color: '#4a0012', fontWeight: 'bold' }}>EVERSWEET</Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          
          <TouchableOpacity 
            style={{ 
              width: '48%', 
              height: 150, 
              backgroundColor: '#4a0012', 
              borderRadius: 10, 
              marginBottom: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ 
              width: '48%', 
              height: 150, 
              backgroundColor: '#6b1a2c', 
              borderRadius: 10, 
              marginBottom: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Cadastro</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ 
              width: '48%', 
              height: 150, 
              backgroundColor: '#8f3b4c', 
              borderRadius: 10, 
              marginBottom: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Doces</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ 
              width: '48%', 
              height: 150, 
              backgroundColor: '#b35c6c', 
              borderRadius: 10, 
              marginBottom: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}