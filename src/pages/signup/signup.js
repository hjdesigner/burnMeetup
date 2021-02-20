import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Alert, TouchableOpacity, useWindowDimensions, Button } from 'react-native';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import Firebase, { db } from '../../../firebase';
import Input from '../../components/Input';

export default function signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledEmail, setDisabledEmail] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);
  const [success, setSuccess] = useState(false);
  const windowHeight = useWindowDimensions().height;

  const handleEmail = (text) => {
    const er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    setEmail(text);
    er.test(text) ? setDisabledEmail(false) : setDisabledEmail(true);
  }
  const handlePassword = (text) => {
    setPassword(text);
    text.length >= 6 ? setDisabledPassword(false) : setDisabledPassword(true);
  }
  const handleSend = async () => {
    try {
      const response = await Firebase.auth().createUserWithEmailAndPassword(email, password);
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
        };
        setSuccess(true);
        db.collection('users')
          .doc(response.user.uid)
          .set(user)

        return;
      }
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('O endereço de e-mail já está sendo usado por outra conta.')
        return;
      }
      Alert.alert('Houve um erro na hora de criar sua conta, tente novamente mais tarde.');
    }
  }

  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ height: windowHeight - 100, justifyContent: 'center', width: '100%' }}>
      <View style={styles.form}>
        {success ? (
          <>
            <Text style={styles.textSuccess}>Conta criada com sucesso!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Fazer login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.text}>Junte-se a um grupo para praticar exercícios juntos.</Text>
            <Input text='Seu endereço de e-mail' value={email} onChangeText={handleEmail} secure={false} />
            <View style={styles.space}></View>
            <Input text='Seu senha' value={password} onChangeText={handlePassword} secure={true} />
            <View style={styles.space}></View>
            <TouchableOpacity
              style={(disabledEmail || disabledPassword) ? styles.buttonDisabled: styles.button}
              disabled={disabledEmail || disabledPassword} 
              onPress={handleSend}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <Button title='voltar para o login' onPress={() => navigation.navigate('Login')} />
          </>
        )}
      </View>
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
  textSuccess: {
    marginBottom: 48,
    marginTop: 40,
    fontSize: 18,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#4587F4',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
  },
  buttonDisabled: {
    width: '100%',
    backgroundColor: '#4587F4',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  }
});
