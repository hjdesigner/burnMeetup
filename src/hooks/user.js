import { useContext } from 'react';
import { UserContext } from '../contexts';

function useUser() {
  return useContext(UserContext);
}

export default useUser;
