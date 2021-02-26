import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const TextList = ({ onPress, item }) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{item.Nome}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#EAE9E9',
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    paddingLeft: 8,
    paddingRight: 8,
    
  },
});

export default TextList;
