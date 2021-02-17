import React from 'react';
import { Button } from 'react-native';

const ButtonElement = ({ text, onPress, disabled }) => {

  return (
    <Button onPress={onPress} title={text} color='#4587F4' disabled={disabled} />
  )
}

export default ButtonElement;
