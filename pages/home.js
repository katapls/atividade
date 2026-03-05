import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff5f5' }}>
      
      <View style={{ padding: 20 }}>

        {/* Botão do Drawer */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginBottom: 10 }}
        >
          <CustomText style={{ fontSize: 28, color: '#4a0012' }}>
            ☰
          </CustomText>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
          <CustomText style={{ fontSize: 36, color: '#4a0012' }}>
            EVERSWEET
          </CustomText>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          
          <TouchableOpacity 
            style={cardStyle('#4a0012')}
            onPress={() => navigation.navigate('Login')}
          >
            <CustomText style={textStyle}>Login</CustomText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={cardStyle('#6b1a2c')}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <CustomText style={textStyle}>Cadastro</CustomText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={cardStyle('#8f3b4c')}
            onPress={() => navigation.navigate('Doces')}
          >
            <CustomText style={textStyle}>Doces</CustomText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={cardStyle('#b35c6c')}
            onPress={() => navigation.navigate('Perfil')}
          >
            <CustomText style={textStyle}>Perfil</CustomText>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const cardStyle = (color) => ({
  width: '48%',
  height: 150,
  backgroundColor: color,
  borderRadius: 10,
  marginBottom: 15,
  justifyContent: 'center',
  alignItems: 'center'
});

const textStyle = {
  color: '#fff',
  fontSize: 20
};