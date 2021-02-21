import React, { useState, createContext } from 'react';
import { db } from '../../firebase';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);

  const getUser = async (uid) => {
    const response = await db
                            .collection('users')
                            .doc(uid)
                            .get();
    if (response) {
      setUser(response.data());
      setUserLoading(false);
    }
  }
  
  return (
    <UserContext.Provider value={{
      user,
      userLoading,
      getUser,
      setUserLoading,
    }}>
      {children}
    </UserContext.Provider>
  )
};

export { UserProvider, UserContext };
