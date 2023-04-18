import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from '../../services/firebaseConnection';
import { Background, Container, Nome, Saldo, Title, List, Area } from './styles';
import { format, isPast } from 'date-fns';
import { AuthContext } from '../../contexts/auth';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import DatePicker from '../../components/DatePicker';


import HistoricoList from '../../components/HistoricoList';
import Header from '../../components/Header';

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  // const [newDate, setnewDate] = useState(new Date());
  // const [show, setShow] = useState(false);

  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      })
      await firebase.database().ref('historico').child(uid)
      .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
      .limitToLast(10).on('value', (snapshot) => {
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          };
          setHistorico((prev) => [...prev, list]);
        })
      })
    }

    loadList();
  }, []);

  const handleDelete = (data) => {
    if( isPast(new Date(data.date))) {
      alert('Você não pode excluir um registro antigo!');
      return;
    }

    Alert.alert(
      'Cuidado!',
      `Você deseja excluir ${data.tipo} Valor: ${data.valor} `,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  };

  const handleDeleteSuccess = async (data) => {
    await firebase.database().ref('historico')
    .child(uid).child(data.key).remove()
    .then( async () => {
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);
      
      await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual);
    })
  }
  
  // const onChange = (date) => {
  //   setnewDate(date);
  // }


  return (
    
      <Background>
        <View
          style={{
            marginBottom: 20,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <StatusBar style="light" />
        </View>
        <Header />

        <Container>
          <Nome>{ user && user.nome }</Nome>
          <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
        </Container>

        <Area>
          <TouchableOpacity >
            <Icon name='event' color='#FFF' size={30} />
          </TouchableOpacity>
          <Title>Ultimas movimentações</Title>
        </Area>

        <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={ item => item.key}
        renderItem={ ({ item }) => ( <HistoricoList data={item} handleDelete={handleDelete} /> )}
        />

        {/* {show && (
          <DatePicker 
          date={newDate}
          onChange={onChange}
          />
        )} */}

      </Background>
  );
}