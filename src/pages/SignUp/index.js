import React, {useContext, useState} from 'react';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, 
SubmitText } from './styles';
import { AuthContext } from '../../contexts/auth';
import { ActivityIndicator } from 'react-native';

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  return (
    <Background>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >

        <AreaInput>
          <Input
          placeholder="Nome"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          value={nome}
          onChangeText={ (text) => setNome(text) }
          />
        </AreaInput>
        
        <AreaInput>
          <Input
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ (text) => setEmail(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={ (text) => setPassword(text) }
          />
        </AreaInput>

      <SubmitButton onPress={ () => signUp(email, password, nome) }>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color='#FFF' />
            ) : (
              <SubmitText>Cadastrar</SubmitText>
            )
          }
      </SubmitButton>

      </Container>
   </Background>
  );
}