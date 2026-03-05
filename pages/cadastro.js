import React from 'react';
import { View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

export default function Cadastro() {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={{ uri: 'https://cdn.aptoide.com/imgs/5/4/8/548c0b0e293461210e95a98185cb9034_screen.jpg' }} 
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 20 }}>

        {/* Botão Drawer */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginTop: 40, marginBottom: 20 }}
        >
          <CustomText style={{ fontSize: 28, color: '#ffffff' }}>
            ☰
          </CustomText>
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          
          <CustomText style={{ fontSize: 32, color: '#ffffff', textAlign: 'center' }}>
            EVERSWEET
          </CustomText>

          <CustomText style={{ textAlign: 'center', color: '#fff', marginBottom: 30 }}>
            Cadastro
          </CustomText>
          
          <TextInput 
            placeholder="Nome"
            placeholderTextColor="#666"
            style={inputStyle}
          />

          <TextInput 
            placeholder="Email"
            placeholderTextColor="#666"
            style={inputStyle}
          />

          <TextInput 
            placeholder="Senha"
            placeholderTextColor="#666"
            style={[inputStyle, { marginBottom: 20 }]}
            secureTextEntry
          />
          
          <TouchableOpacity style={buttonStyle}>
            <CustomText style={{ color: '#fff', textAlign: 'center' }}>
              Cadastrar
            </CustomText>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <CustomText style={{ textAlign: 'center', color: '#ffffff' }}>
              Voltar ao login
            </CustomText>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

const inputStyle = {
  backgroundColor: '#fff',
  padding: 12,
  marginBottom: 10,
  borderRadius: 8
};

const buttonStyle = {
  backgroundColor: '#4a0012',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10
};