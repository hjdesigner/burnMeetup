import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Navigation from './Navigation';
import { UserProvider } from './src/contexts';

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <Header />
        <View style={styles.nav}>
          <Navigation />
        </View>
      </UserProvider> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  nav: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  }
});
