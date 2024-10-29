import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../features/auth/authSlice'; // Ajusta la ruta según sea necesario

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch(); // Usa dispatch de Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated, user]);

  const logout = () => {
    localStorage.removeItem('token'); // Elimina el token
    dispatch(logoutAction()); // Llama a la acción de logout
    setCurrentUser(null); // Actualiza el estado del usuario
  };

  return (
    <UserContext.Provider value={{ currentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
