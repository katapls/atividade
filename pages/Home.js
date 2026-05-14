import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, View as BaseView, Modal, Pressable, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MyView from '../componentes/View';
import MyText from '../componentes/Text';
import MyTouchableOpacity from '../componentes/TouchableOpacity';
import Container from '../componentes/Container';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [doces, setDoces] = useState([]);
  const [doceSelecionado, setDoceSelecionado] = useState(null);

  const carregarDoces = () => {
    axios.get('http://10.0.2.2:8000/api/todos_doces')
      .then(res => setDoces(res.data.doces))
      .catch(err => console.error(err));
  };

  useFocusEffect(
    useCallback(() => {
      carregarDoces();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarDoces();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async () => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir o doce "${doceSelecionado?.Nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              
              
              console.log(' Produto sendo DELETADO:', {
                id: doceSelecionado.id,
                nome: doceSelecionado.Nome,
                sabor: doceSelecionado.Sabor,
                preco: doceSelecionado.Preco,
                quantidade: doceSelecionado.Quantidade,
                alergicos: doceSelecionado.Alergicos,
                ingredientes: doceSelecionado.Ingredientes,
                dataHora: new Date().toLocaleString('pt-BR')
              });
              
              const response = await axios.delete(
                `http://10.0.2.2:8000/api/deleta_doce/${doceSelecionado.id}?token=${token}`
              );
              
              if (response.status === 200) {
               
                console.log(' Produto DELETADO com sucesso!', {
                  id: doceSelecionado.id,
                  nome: doceSelecionado.Nome,
                  dataHora: new Date().toLocaleString('pt-BR')
                });
                
                Alert.alert('Sucesso!', 'Doce excluído com sucesso.');
                setDoceSelecionado(null);
                carregarDoces();
              }
            } catch (error) {
              
              console.error(' Erro ao DELETAR produto:', {
                id: doceSelecionado?.id,
                nome: doceSelecionado?.Nome,
                erro: error.message,
                status: error.response?.status,
                dataHora: new Date().toLocaleString('pt-BR')
              });
              Alert.alert('Erro', 'Não foi possível excluir o doce. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => setDoceSelecionado(item)}
    >
      <BaseView style={styles.cardAccent} />
      <BaseView style={styles.cardBody}>
        <MyText style={styles.cardTitle}>{item.Nome}</MyText>
        <MyText style={styles.cardSub}>{item.Sabor} · Quantidade: {item.Quantidade}</MyText>
        <MyText style={styles.cardValor}>R$ {parseFloat(item.Preco).toFixed(2)}</MyText>
      </BaseView>
      <MyText style={styles.cardChevron}>›</MyText>
    </Pressable>
  );

  return (
    <BaseView style={styles.mainContainer}>

      <MyView style={styles.navbar}>
        <MyText style={styles.logoText}>EverSweet</MyText>
        <BaseView style={styles.navButtons}>
          <MyTouchableOpacity style={styles.navIconBtn} onPress={() => navigation.navigate('Login')}>
            <MyText style={styles.navBtnText}>LOGIN</MyText>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.navIconBtn, styles.registerBtn]} onPress={() => navigation.navigate('Cadastro')}>
            <MyText style={styles.navBtnText}>CADASTRO</MyText>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.navIconBtn, styles.registerBtn]} onPress={() => navigation.navigate('Doce')}>
            <MyText style={styles.navBtnText}>DOCES</MyText>
          </MyTouchableOpacity>
        </BaseView>
      </MyView>

      <FlatList
        data={doces}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <MyView style={styles.contentSection}>
              <MyText style={styles.sectionTitle}>Resumo</MyText>
              <Container>
                <MyView style={styles.statsRow}>
                  <MyView style={styles.statBox}>
                    <MyText style={styles.statValue}>{doces.length}</MyText>
                    <MyText style={styles.statLabel}>Doces</MyText>
                  </MyView>
                  <BaseView style={styles.divider} />
                  <MyView style={styles.statBox}>
                    <MyText style={styles.statValue}>
                      {doces.reduce((acc, v) => acc + (v.Quantidade || 0), 0)}
                    </MyText>
                    <MyText style={styles.statLabel}>Em Estoque</MyText>
                  </MyView>
                </MyView>
              </Container>
            </MyView>
            <MyText style={[styles.sectionTitle, styles.listTitle]}>Doces</MyText>
          </>
        }
      />

      <Modal
        visible={!!doceSelecionado}
        transparent
        animationType="slide"
        onRequestClose={() => setDoceSelecionado(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setDoceSelecionado(null)}>
          <Pressable style={styles.modalBox} onPress={() => {}}>
            <MyText style={styles.modalTitulo}>Detalhes</MyText>
            <BaseView style={styles.modalRow}>
              <MyText style={styles.modalLabel}>Nome</MyText>
              <MyText style={styles.modalValor}>{doceSelecionado?.Nome}</MyText>
            </BaseView>
            <BaseView style={styles.modalRow}>
              <MyText style={styles.modalLabel}>Sabor</MyText>
              <MyText style={styles.modalValor}>{doceSelecionado?.Sabor}</MyText>
            </BaseView>
            <BaseView style={styles.modalRow}>
              <MyText style={styles.modalLabel}>Ingredientes</MyText>
              <MyText style={styles.modalValor}>{doceSelecionado?.Ingredientes}</MyText>
            </BaseView>
            <BaseView style={styles.modalRow}>
              <MyText style={styles.modalLabel}>Preço</MyText>
              <MyText style={[styles.modalValor, styles.modalValorDestaque]}>
                R$ {parseFloat(doceSelecionado?.Preco || 0).toFixed(2)}
              </MyText>
            </BaseView>
            <BaseView style={styles.modalRow}>
              <MyText style={styles.modalLabel}>Quantidade</MyText>
              <MyText style={styles.modalValor}>{doceSelecionado?.Quantidade}</MyText>
            </BaseView>
            <BaseView style={styles.modalRow}>
              <MyText style={styles.modalLabel}>Alérgicos</MyText>
              <MyText style={styles.modalValor}>{doceSelecionado?.Alergicos}</MyText>
            </BaseView>
            {!!doceSelecionado?.Descricao && (
              <BaseView style={styles.modalRow}>
                <MyText style={styles.modalLabel}>Descrição</MyText>
                <MyText style={styles.modalValor}>{doceSelecionado?.Descricao}</MyText>
              </BaseView>
            )}
            
            <MyTouchableOpacity
              style={styles.modalEditar}
              onPress={() => {const doce = doceSelecionado; setDoceSelecionado(null); navigation.navigate('EditarDoce', { doce: doce, reload: true });}} >
              <MyText style={styles.modalEditarText}>Editar</MyText>
            </MyTouchableOpacity>
            
            <MyTouchableOpacity
              style={styles.modalExcluir}
              onPress={handleDelete}>
              <MyText style={styles.modalExcluirText}>Excluir</MyText>
            </MyTouchableOpacity>
            
            <Pressable style={styles.modalFechar} onPress={() => setDoceSelecionado(null)}>
              <MyText style={styles.modalFecharText}>Fechar</MyText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

    </BaseView>
  );
}

const styles = StyleSheet.create({
  mainContainer:{ flex: 1, backgroundColor: '#f8f7ff' },
  navbar:{ height: 110, backgroundColor: '#fda7f2', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 45, elevation: 4 },
  logoText:{ color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  navButtons:{ flexDirection: 'row', gap: 8 },
  navIconBtn:{ backgroundColor: '#7b7a7a', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(149,149,149,0.3)' },
  registerBtn:{ backgroundColor: '#7b7a7a' },
  navBtnText:{ color: 'white', fontSize: 11, fontWeight: 'bold' },
  listContent:{ paddingBottom: 30 },
  contentSection:{ width: '100%', paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle:{ fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'left' },
  listTitle:{ paddingHorizontal: 20, paddingTop: 24, marginBottom: 8 },
  statsRow:{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statBox:{ alignItems: 'center', flex: 1 },
  divider:{ width: 1, height: 40, backgroundColor: '#eee' },
  statValue:{ fontSize: 24, fontWeight: 'bold', color: '#b60000' },
  statLabel:{ fontSize: 12, color: '#888', marginTop: 4, textTransform: 'uppercase' },
  card:{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginHorizontal: 20, marginBottom: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eee', overflow: 'hidden' },
  cardPressed:{ opacity: 0.75 },
  cardAccent:{ width: 4, alignSelf: 'stretch', backgroundColor: '#fda7f2' },
  cardBody:{ flex: 1, paddingVertical: 14, paddingHorizontal: 12 },
  cardTitle:{ fontSize: 15, fontWeight: 'bold', color: '#333' },
  cardSub:{ fontSize: 12, color: '#888', marginTop: 3 },
  cardValor:{ fontSize: 14, fontWeight: 'bold', color: '#b60000', marginTop: 4 },
  cardChevron:{ fontSize: 22, color: '#ccc', paddingRight: 14 },
  modalOverlay:{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  modalBox:{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 36 },
  modalTitulo:{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  modalRow:{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalLabel:{ fontSize: 14, color: '#888' },
  modalValor:{ fontSize: 14, color: '#333', fontWeight: '500', maxWidth: '60%', textAlign: 'right' },
  modalValorDestaque:{ color: '#b60000', fontWeight: 'bold', fontSize: 16 },
  modalEditar:{ marginTop: 24, backgroundColor: '#a87d74', padding: 14, borderRadius: 12, alignItems: 'center' },
  modalEditarText:{ color: 'white', fontWeight: 'bold', fontSize: 15 },
  modalExcluir:{ marginTop: 10, backgroundColor: '#dc3545', padding: 14, borderRadius: 12, alignItems: 'center' },
  modalExcluirText:{ color: 'white', fontWeight: 'bold', fontSize: 15 },
  modalFechar:{ marginTop: 10, backgroundColor: '#fda7f2', padding: 14, borderRadius: 12, alignItems: 'center' },
  modalFecharText:{ color: 'white', fontWeight: 'bold', fontSize: 15 },
});