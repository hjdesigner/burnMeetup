import React, { useState, createContext } from 'react';
import { db } from '../../firebase';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const getUser = async (uid) => {
    const response = await db
                            .collection('users')
                            .doc(uid)
                            .get();
    if (response) {
      setUser(response.data());
    }
  }
  
  return (
    <UserContext.Provider value={{
      user,
      getUser,
    }}>
      {children}
    </UserContext.Provider>
  )
};

export { UserProvider, UserContext };
