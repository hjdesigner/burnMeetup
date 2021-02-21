import React from 'react';
import AppLoading from 'expo-app-loading';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { useUser } from '../../hooks';

const home = ({ navigation }) => {
  const { user } = useUser();
  
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      {!user.complete && (
        <View style={styles.warning}>
          <TouchableOpacity
            style={styles.warningButton}
            onPress={() => navigation.navigate('Account')}
          >
            <Text style={styles.warningText}>Para ter uma experiência completa, clique aqui e finalize seu cadastro.</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  warning: {
    backgroundColor: '#FFF',
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  warningButton: {
    backgroundColor: '#fff3cd',
    borderWidth: 1,
    borderColor: '#ffeeba',
    borderRadius: 5,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  warningText: {
    fontSize: 15,
    color: '#856404',
    fontFamily: 'OpenSans_400Regular',
  }
});

export default home;
