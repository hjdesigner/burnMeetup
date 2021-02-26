import { useContext } from 'react';
import { CityContext } from '../contexts';

function useCity() {
  return useContext(CityContext);
}

export default useCity;
