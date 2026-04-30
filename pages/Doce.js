import { useState } from 'react';
import { Alert, StyleSheet, View as BaseView, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';
import Container from '../componentes/Container';

const API_URL = 'http://10.0.2.2:8000';

export default function CadastrarDoce({ navigation }) {
  const [form, setForm] = useState({
    Nome:         '',
    Sabor:        '',
    Preco:        '',
    Quantidade:   '',
    Alergicos:    '',
    Ingredientes: '',
    Descricao:    '',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function Salvar() {
    const camposVazios = Object.entries(form).filter(([_, v]) => !v.trim());
    if (camposVazios.length > 0) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(`${API_URL}/api/salva_doce`, {
        ...form,
        token: token,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      Alert.alert('Sucesso!', 'Doce cadastrado com sucesso.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      if (error.response?.status === 422) {
        const erros = error.response.data.errors;
        const msgs = Object.values(erros).flat().join('\n');
        Alert.alert('Erro de validação', msgs);
      } else {
        Alert.alert('Erro', JSON.stringify(error.response?.data) || error.message || 'Sem resposta do servidor');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <MyImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/f4/a9/20/f4a920df89961e1c6c2ad5f8e3f3d133.jpg' }}
      style={styles.background}
    >
      <BaseView style={styles.overlay}>
        <BaseView style={styles.header}>
          <MyTouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MyText style={styles.backText}>←</MyText>
          </MyTouchableOpacity>
          <MyText style={styles.title}>Cadastrar Doce</MyText>
          <BaseView style={{ width: 40 }} />
        </BaseView>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <BaseView style={styles.formContainer}>
            <MyTextInput 
              placeholder="Nome"
              value={form.Nome} 
              onChangeText={v => handleChange('Nome', v)} 
              style={styles.input}
            />

            <MyTextInput 
              placeholder="Sabor"
              value={form.Sabor} 
              onChangeText={v => handleChange('Sabor', v)} 
              style={styles.input}
            />

            <MyTextInput 
              placeholder="Preço (R$)"
              value={form.Preco} 
              onChangeText={v => handleChange('Preco', v)}
              keyboardType="numeric" 
              style={styles.input}
            />

            <MyTextInput 
              placeholder="Quantidade"
              value={form.Quantidade} 
              onChangeText={v => handleChange('Quantidade', v)}
              keyboardType="numeric" 
              style={styles.input}
            />

            <MyTextInput 
              placeholder="Alérgicos (ex: Lactose)"
              value={form.Alergicos} 
              onChangeText={v => handleChange('Alergicos', v)} 
              style={styles.input}
            />

            <MyTextInput 
              placeholder="Ingredientes (separados por vírgula)"
              value={form.Ingredientes} 
              onChangeText={v => handleChange('Ingredientes', v)} 
              style={styles.input}
            />

            <MyTextInput 
              placeholder="Descrição"
              value={form.Descricao} 
              onChangeText={v => handleChange('Descricao', v)}
              multiline 
              numberOfLines={3} 
              style={[styles.input, styles.textArea]}
            />

            <MyTouchableOpacity
              style={[styles.btnSuccess, loading && styles.btnDisabled]}
              onPress={Salvar}
              disabled={loading}>
              <MyText style={styles.btnText}>
                {loading ? 'Salvando...' : 'Salvar Doce'}
              </MyText>
            </MyTouchableOpacity>
          </BaseView>
        </ScrollView>
      </BaseView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)' 
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingTop: 55, 
    paddingBottom: 16,
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white', 
    flex: 1 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    width: '100%',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  btnSuccess: {
    backgroundColor: '#f3b4c7', 
    paddingVertical: 15,
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10,
    width: '100%',
  },
  btnDisabled: { 
    opacity: 0.6 
  },
  btnText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.3)', 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  backText: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold',
    marginTop: -2,
    textAlign: 'center'
  },
});