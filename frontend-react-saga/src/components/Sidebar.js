// src/components/Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const { currentUser, logout } = useUserContext();
  const role = currentUser?.roles[0]; 

    return (
      <div className="sidebar">
        <h2>Menú</h2>
        <ul>
          {role === 'ROLE_ADMIN' && (
            <>
              <li>
                <NavLink to="/proyectos">Proyectos</NavLink>
              </li>
              <li>
                <NavLink to="/add-proyecto">Agregar Proyecto</NavLink>
              </li>
            </>
          )}
          {role === 'ROLE_USER' && (
            <>
              <li>
                <NavLink to="/tareas">Tareas</NavLink>
              </li>
            </>
          )}
           {/* Botón de Logout */}
        <li>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;