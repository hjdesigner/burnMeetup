import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import Firebase from '../../../firebase';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledEmail, setDisabledEmail] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);

  const handleEmail = (text) => {
    setEmail(text);
    text.length > 1 ? setDisabledEmail(false) : setDisabledEmail(true);
  }
  const handlePassword = (text) => {
    setPassword(text);
    text.length > 1 ? setDisabledPassword(false) : setDisabledPassword(true);
  }
  const handleSend = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuário criado com sucesso!'))
      .catch(error => Alert.alert('Não foi possível criar o usuário', 'Tente novamente mais tarde'));
  }

  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.text}>Junte-se a um grupo para praticar exercícios juntos.</Text>
      <Input text='Seu endereço de e-mail' value={email} onChangeText={handleEmail} secure={false} />
      <View style={styles.space}></View>
      <Input text='Seu senha' value={password} onChangeText={handlePassword} secure={true} />
      <View style={styles.space}></View>
      <Button text='Cadastrar' onPress={handleSend} disabled={disabledEmail || disabledPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
  },
  space: {
    marginTop: 16,
  },
  title: {
    marginBottom: 40,
    fontSize: 18,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#000000',
  },
  text: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular',
    color: '#000000',
  },
});
