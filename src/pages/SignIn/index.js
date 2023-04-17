import React, { useState, useContext } from 'react';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, 
SubmitText, AreaLink, Link, LinkText} from './styles';
import { Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignUp from '../SignUp';
import { AuthContext } from '../../contexts/auth';



export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const { signIn , loadingAuth } = useContext(AuthContext);

  return (
    <Background>
        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >
          <Logo source={require('../../assets/Logo.png')}/>
          
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
            secureTextEntry={true}
            value={password}
            onChangeText={ (text) => setPassword(text) }
            />
          </AreaInput>

        <SubmitButton onPress={ () => signIn(email, password)}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color='#FFF' />
            ) : (
              <SubmitText>Acessar</SubmitText>
            )
          }
        </SubmitButton>

        <AreaLink>
          <Link onPress={() => navigation.navigate(SignUp)}>
            <LinkText>Criar uma conta!</LinkText>
          </Link>
        </AreaLink>

        </Container>
    </Background>
  );
}