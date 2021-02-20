import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/Header';
import Signup from './src/pages/signup';
import Login from './src/pages/login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.nav}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
             options={{ 
              headerShown: false,
              cardStyle: { 
                backgroundColor: '#FFF',
              }
            }}
            name="Signup"
            component={Signup} />
          <Stack.Screen 
            options={{ 
              headerShown: false,
              cardStyle: { 
                backgroundColor: '#FFF',
              }
            }}
            name="Login"
            component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
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
    width: '100%',
  },
  nav: {
    width: '100%',
    height: '100%',
  }
});
