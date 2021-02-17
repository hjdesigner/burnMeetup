import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Signup from './src/pages/signup';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.form}>
        <Signup />  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  form: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    height: 'calc(100vh - 66px)',
    justifyContent: 'center',
  },
});
