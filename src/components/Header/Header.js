import React from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';

const Header = () => {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Burn Meetup</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#4587F4',
  }
});

export default Header;
