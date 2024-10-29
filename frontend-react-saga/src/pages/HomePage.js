import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; 

const HomePage = () => {

 const { currentUser, logout } = useUserContext();
  const role = currentUser?.roles[0]; 

    return (
        <div className="container text-center my-5">
              {role === 'ROLE_ADMIN' && (
            <>
              <h1 className="mb-4">Bienvenido a la gestión de proyectos</h1>
            <p className="lead">Desde aquí puedes gestionar tus proyectos.</p>

            <div className="d-flex justify-content-center mt-4">
                <Link to="/proyectos" className="me-3">
                    <button className="btn btn-primary">Ver Proyecto</button>
                </Link>

                <Link to="/add-proyecto">
                    <button className="btn btn-success">Agregar Proyecto</button>
                </Link>
            </div>
            </>
          )}
            
        </div>
    );
};

export default HomePage;
