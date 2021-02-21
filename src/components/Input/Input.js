import React from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';

const Input = ({ text, value, onChangeText, secure, ...props}) => {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
      <TextInput style={styles.input} secureTextEntry={secure} value={value} onChangeText={text => onChangeText(text)} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%'
  },
  label: {
    fontSize: 14,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EAE9E9',
    marginTop: 8,
    height: 40,
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
    fontFamily: 'OpenSans_400Regular',
    color: '#000000',
  }
});

export default Input;
