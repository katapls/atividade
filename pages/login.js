import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#4a0012', paddingHorizontal: 20, paddingTop: 60 }}>

      {/* Botão Drawer */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{ position: 'absolute', top: 60, left: 20 }}
      >
        <CustomText style={{ fontSize: 28, color: '#fff' }}>
          ☰
        </CustomText>
      </TouchableOpacity>

      <CustomText style={{ fontSize: 42, color: '#fff', textAlign: 'center', marginBottom: 10 }}>
        EVERSWEET
      </CustomText>
      
      <CustomText style={{ textAlign: 'center', color: '#fff', marginBottom: 40, fontSize: 16 }}>
        Faça login para continuar
      </CustomText>
      
      <CustomText style={{ color: '#fff', marginBottom: 5 }}>
        Email
      </CustomText>

      <TextInput 
        placeholder="Email" 
        placeholderTextColor="#ccc"
        style={inputStyle}
      />
      
      <CustomText style={{ color: '#fff', marginBottom: 5 }}>
        Senha
      </CustomText>

      <TextInput 
        placeholder="*********" 
        placeholderTextColor="#ccc"
        style={[inputStyle, { marginBottom: 25 }]}
        secureTextEntry
      />
      
      <TouchableOpacity style={buttonStyle}>
        <CustomText style={{ color: '#4a0012', fontSize: 18 }}>
          ENTRAR
        </CustomText>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <CustomText style={{ textAlign: 'center', color: '#fff', fontSize: 14 }}>
          Ainda não tem conta? Cadastre-se
        </CustomText>
      </TouchableOpacity>

    </View>
  );
}

const inputStyle = {
  backgroundColor: 'rgba(255,255,255,0.9)',
  padding: 12,
  marginBottom: 15,
  borderRadius: 8,
  fontSize: 16
};

const buttonStyle = {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  marginBottom: 15,
  alignItems: 'center'
};