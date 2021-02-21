import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './src/pages/signup';
import Login from './src/pages/login';
import Home from './src/pages/home';
import Account from './src/pages/account';
import { useUser } from './src/hooks';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { user } = useUser();

  return (
    <>
      {user.uid ? (
        <View style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              }
              if (route.name === 'Account') {
                iconName = focused ? 'cog' : 'cog';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              style: {
                fontSize: 30,
              }
            }}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Account" component={Account} />
          </Tab.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
        </View>
      ) : (
        <>
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
        </>
      )}
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});

export default Navigation;
