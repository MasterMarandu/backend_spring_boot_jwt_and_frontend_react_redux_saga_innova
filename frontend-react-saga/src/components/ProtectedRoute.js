import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; // Importa el contexto

const ProtectedRoute = ({ children }) => {
  // Desestructurando currentUser desde el contexto
  const { currentUser } = useUserContext(); 
  const token = localStorage.getItem('token');

  // Verifica si no hay token o si currentUser es null o undefined
  if (!token || !currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Si el usuario está autenticado, renderiza los hijos
  return children;
};

export default ProtectedRoute;
