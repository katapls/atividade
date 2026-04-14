import { useState } from 'react';
import { Alert, StyleSheet, View as BaseView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function logar() {
    if (email === "" || senha === "") {
      Alert.alert("Erro", "Tem campos vazios");
      return;
    }
    try {
      const response = await axios.post("http://10.0.2.2:8000/api/Login", {
        email: email,
        senha: senha,
      });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user_id', String(response.data.user_id));
        Alert.alert("Sucesso", "Login realizado!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", "Token não recebido");
      }
    } catch (error) {
      Alert.alert("Erro", error.response?.data?.data || "Erro ao fazer login");
      console.error(error);
    }
  }

  return (
    <MyImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/hyper-realistic-strawberry-wallpaper-with-pink-anime-aesthetic_886588-33728.jpg?w=360' }}>
      <BaseView style={styles.overlay}>
        <MyTouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MyText style={styles.backText}>←</MyText>
        </MyTouchableOpacity>
        <Container>
          <MyText style={styles.title}>Login</MyText>
          <MyTextInput
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <MyTextInput
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <MyTouchableOpacity style={styles.btnPrimary} onPress={logar}>
            <MyText style={styles.btnText}>ENTRAR</MyText>
          </MyTouchableOpacity>
        </Container>
      </BaseView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  btnPrimary: { backgroundColor: '#f3b4c7', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(255,255,255,0.3)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  backText: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});