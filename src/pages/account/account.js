import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Ionicons } from '@expo/vector-icons';
import Firebase from '../../../firebase';
import Input from '../../components/Input';
import TextList from '../../components/TextList';
import { useUser, useCity } from '../../hooks';

export default function login({ navigation }) {
  const {
    user,
    setName,
    setLocalization,
    setLevel
  } = useUser();
  const { city } = useCity();

  const [loading, setLoading] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [cityMatch, setCityMatch] = useState([]);
  const [enableSelectCity, setEnableSelectCity] = useState(false);
  
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular,
  });
  
  const SelectCity = (text) => {
    setCityInput(text);
    if (cityInput.length < 4) {
      setCityMatch([]);
      setEnableSelectCity(false);
    }
    if (cityInput.length > 4) {
      let match = city.filter(item => {
        const regex = new RegExp(text, 'gi');
        return item.Nome.match(regex);
      });
      setCityMatch(match);
    }
  }

  const handleClickCity = (text) => {
    setEnableSelectCity(true);
    setLocalization(text)
  }

  const renderItem = ({ item }) => {
    return <TextList item={item} onPress={() => handleClickCity(item.Nome)} />;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#4587F4" />
      ) : (
        <View style={styles.container}>
          <SafeAreaView style={styles.form}>
          <ScrollView>
            <Text style={styles.title}>Meus Dados</Text>
            <Input text='Nome Completo' value={user.name} onChangeText={text => setName(text)} secure={false} />
            <View style={styles.space}></View>
            <Input text='E-mail' value={user.email} editable={false} />
            <View style={styles.space}></View>
            <Input text='Localização' value={cityInput} onChangeText={text => SelectCity(text)} />
            <View style={styles.space}></View>
            {cityMatch.length > 0 && !enableSelectCity && (
              <View style={styles.list}>
                <Text style={styles.selectText}>Selecione sua cidade</Text>
                <SafeAreaView>
                  <FlatList
                    data={cityMatch}
                    renderItem={renderItem}
                    keyExtractor={item => item.ID}
                  />
                </SafeAreaView>
              </View>
            )}
            {user.localization && (
              <Text style={styles.chosenLocation}>{user.localization}</Text>
            )}
            <View style={styles.space}></View>
            <Text style={styles.textLevel}>Nível</Text>
            <View style={styles.levels}>
              <TouchableOpacity
                style={styles.levelButton}
                onPress={(text) => setLevel('Iniciante')}>
                  <Text style={styles.levelText}>Iniciante</Text>
              </TouchableOpacity> 
              <TouchableOpacity
                style={styles.levelButton}
                onPress={() => setLevel('Intermediário')}>
                  <Text style={styles.levelText}>Intermediário</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.levelButton}
                onPress={() => setLevel('Avançado')}>
                  <Text style={styles.levelText}>Avançado</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.space}></View>
            {user.level && <Text style={styles.chosenLevel}>O meu nível é: {user.level}</Text>}
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
          </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#F3F2F2',
    paddingTop: 8,
  },
  selectText: {
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
    fontSize: 13,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#000000',
  },
  form: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FFF',
  },
  container: {
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
  chosenLocation: {
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
  chosenLevel: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 12,
    color: '#000',
    marginRight: 4,
  },
});
