import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Ionicons } from '@expo/vector-icons';
import Firebase from '../../../firebase';
import Input from '../../components/Input';
import { useUser } from '../../hooks';

export default function login({ navigation }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#4587F4" />
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.title}>Meus Dados</Text>
            <Input text='Nome Completo' value='' onChangeText={() => {}} secure={false} />
            <View style={styles.space}></View>
            <Input text='E-mail' value='' onChangeText={() => {}} secure={false} editable={false} />
            <View style={styles.space}></View>
            <Input text='Localização' value='' onChangeText={() => {}} secure={false} disabled={true} />
            <View style={styles.space}></View>
            <Text style={styles.textLevel}>Nível</Text>
            <View style={styles.levels}>
              <TouchableOpacity
                style={styles.levelButton}
                onPress={() => {}}>
                  <Text style={styles.levelText}>Iniciante</Text>
              </TouchableOpacity> 
              <TouchableOpacity
                style={styles.levelButton}
                onPress={() => {}}>
                  <Text style={styles.levelText}>Intermediário</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.levelButton}
                onPress={() => {}}>
                  <Text style={styles.levelText}>Avançado</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.space}></View>
            <Input text='Interesses' value='' onChangeText={() => {}} secure={false} />
            <View style={styles.space}></View>
            <View style={styles.interests}>
              <TouchableOpacity
                style={styles.interestsButton}
                onPress={() => {}}>
                  <Text style={styles.interestsText}>Yoga</Text>
                  <Ionicons name="close" size={14} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.interestsButton}
                onPress={() => {}}>
                  <Text style={styles.interestsText}>Skate</Text>
                  <Ionicons name="close" size={14} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.interestsButton}
                onPress={() => {}}>
                  <Text style={styles.interestsText}>Box</Text>
                  <Ionicons name="close" size={14} color="#000" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {}}>
                <Text style={styles.buttonText}>Atualizar Cadastro</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FFF',
  },
  space: {
    marginTop: 16,
  },
  title: {
    marginBottom: 48,
    paddingTop: 24,
    fontSize: 18,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#000000',
  },
  select: {
    width: '100%',
    fontSize: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#4587F4',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    marginTop: 16,
    marginBottom: 16,
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
  },
  textLevel: {
    fontSize: 14,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#000000',
    marginBottom: 8,
  },
  levels: {
    flexDirection: 'row',
  },
  levelButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    marginBottom: 8,
    marginRight: 8,
  },
  levelText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 12,
    color: '#000',
  },
  interests: {
    flexDirection: 'row',
  },
  interestsButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F2F2',
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    marginBottom: 8,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestsText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 12,
    color: '#000',
    marginRight: 4,
  },
});
