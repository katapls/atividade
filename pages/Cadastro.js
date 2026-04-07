import { useState } from 'react';
import { Alert, StyleSheet, View as BaseView } from 'react-native';
import axios from 'axios';                         
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");


  function mascaraTelefone(valor) {
  return valor
    .replace(/\D/g, '')                        
    .replace(/^(\d{2})(\d)/, '($1) $2')        
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')     
    .slice(0, 15);                             
  }


  async function cadastrar() {
    if (nome === "" || email === "" || senha === "" || telefone === "" || empresa === "") {
      Alert.alert("Erro", "Favor preencher todos os campos");
      return;                                       
    }

    const values = {
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone,
      empresa: empresa
    };

    try {
      const response = await axios.post("http://10.0.2.2:8000/api/Cadastro_usuario",values);
      console.log(response.data.usuario);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("Login");

    } catch (error) {
      Alert.alert("Erro","Erro ao cadastrar");
    }
  }                                                 

  return (                                         
    <MyImageBackground source={{ uri: 'https://i.pinimg.com/736x/f4/a9/20/f4a920df89961e1c6c2ad5f8e3f3d133.jpg' }}>
      <BaseView style={styles.overlay}>
        <MyTouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MyText style={styles.backText}>←</MyText>
        </MyTouchableOpacity>
        <Container>
          <MyText style={styles.title}>Criar Conta</MyText>
          <MyTextInput
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
          />
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
          <MyTextInput
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={(text) => setTelefone(mascaraTelefone(text))}
            maxLength={15}
          />
          <MyTextInput
            placeholder="Empresa"
            value={empresa}
            onChangeText={setEmpresa}
          />
          <MyTouchableOpacity style={styles.btnSuccess} onPress={cadastrar}>
            <MyText style={styles.btnText}>CADASTRAR</MyText>
          </MyTouchableOpacity>
        </Container>
      </BaseView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  btnSuccess: { backgroundColor: '#a87d74', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(255,255,255,0.3)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  backText: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});