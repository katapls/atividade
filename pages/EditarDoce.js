import { useState, useEffect } from 'react';
import { Alert, StyleSheet, View as BaseView, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../componentes/Text';
import MyTextInput from '../componentes/TextInput';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import MyImageBackground from '../componentes/ImageBackground';

const API_URL = 'http://10.0.2.2:8000';

export default function EditarDoce({ navigation, route }) {
  const { doce } = route.params;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Nome: '', Sabor: '', Preco: '', Quantidade: '',
    Alergicos: '', Ingredientes: '', Descricao: '',
  });

  useEffect(() => {
    if (doce) {
      setForm({
        Nome:doce.Nome|| '',
        Sabor:doce.Sabor|| '',
        Preco:String(doce.Preco|| ''),
        Quantidade:String(doce.Quantidade || ''),
        Alergicos:doce.Alergicos|| '',
        Ingredientes:doce.Ingredientes || '',
        Descricao:doce.Descricao|| '',
      });
    }
  }, []);

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
      await axios.put(`${API_URL}/api/atualiza_doce/${doce.id}`, { ...form, token }, {
        headers: { 'Content-Type': 'application/json' },
      });
      Alert.alert('Sucesso!', 'Doce atualizado com sucesso.', [
        { text: 'OK', onPress: () => navigation.navigate('Home', { reload: true }) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const Field = ({ label, field, keyboard, multiline }) => (
    <BaseView style={styles.fieldGroup}>
      <MyText style={styles.label}>{label}</MyText>
      <MyTextInput
        value={form[field]}
        onChangeText={v => handleChange(field, v)}
        keyboardType={keyboard || 'default'}
        multiline={multiline}
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholderTextColor="#aaa"
      />
    </BaseView>
  );

  return (
    <MyImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/f4/a9/20/f4a920df89961e1c6c2ad5f8e3f3d133.jpg' }}
      style={styles.background}
    >
      <BaseView style={styles.overlay}>

        <BaseView style={styles.header}>
          <MyTouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <MyText style={styles.backText}>←</MyText>
          </MyTouchableOpacity>
          <MyText style={styles.title}>Editar Doce</MyText>
          <BaseView style={{ width: 40 }} />
        </BaseView>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Field label="Nome"field="Nome" />
          <Field label="Sabor"field="Sabor" />
          <Field label="Preço (R$)"field="Preco"        keyboard="numeric" />
          <Field label="Quantidade"field="Quantidade"   keyboard="numeric" />
          <Field label="Alérgicos"field="Alergicos" />
          <Field label="Ingredientes"field="Ingredientes" />
          <Field label="Descrição"field="Descricao"    multiline />

          <MyTouchableOpacity
            style={[styles.btnSalvar, loading && { opacity: 0.6 }]}
            onPress={Salvar}
            disabled={loading}
          >
            <MyText style={styles.btnText}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </MyText>
          </MyTouchableOpacity>
        </ScrollView>

      </BaseView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%' },
  overlay:    { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 16,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  backText: { color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: -2 },
  title:    { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', flex: 1 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 4 },

  fieldGroup: { marginBottom: 14 },
  label:      { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600', marginBottom: 5 },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#222',
  },
  inputMultiline: {
    height: 120,
    textAlignVertical: 'top',
  },

  btnSalvar: {
    backgroundColor: '#f3b4c7',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
  },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});