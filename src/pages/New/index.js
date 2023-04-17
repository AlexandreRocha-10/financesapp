import React, { useContext, useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { Background, Input, SubmitButton, SubmitText} from './styles';
import Picker from '../../components/Picker/index.android';
import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';


export default function New() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');

  const navigation = useNavigation();
  const { user: usuario } = useContext(AuthContext);

  const handleSubmit = () => {
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || tipo === null){
      alert('Preencha todos os campos!');
      return;
    }

    Alert.alert('Confirmando dados', `Tipo ${tipo} Valor: ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  };

  const handleAdd = async () => {
    let uid = usuario.uid;

    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yy' ),
    })
    
    let user = await firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);
    })
    setValor('');
    Keyboard.dismiss();
    navigation.navigate('Home');

  };



  return (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
    <Background>
        <Header/>

        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
          placeholder="  Valor desejado"
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={ () => Keyboard.dismiss() }
          value={valor}
          onChangeText={ (text) => setValor(text) }
          />
          
          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>

    </Background>
    </TouchableWithoutFeedback>
  );
}