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

  const setName = (text) => {
    setUser({
      ...user,
      name: text,
    })
  }

  const setLocalization = (text) => {
    setUser({
      ...user,
      localization: text,
    });
  }

  const setLevel = (text) => {
    setUser({
      ...user,
      level: text,
    })
  }
  
  return (
    <UserContext.Provider value={{
      user,
      userLoading,
      getUser,
      setUserLoading,
      setName,
      setLocalization,
      setLevel,
    }}>
      {children}
    </UserContext.Provider>
  )
};

export { UserProvider, UserContext };
