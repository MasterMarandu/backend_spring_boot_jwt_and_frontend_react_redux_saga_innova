import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProyectos } from '../features/proyectos/proyectoSlice';

const ProyectoList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.proyectos.items);

  useEffect(() => {
    dispatch(fetchProyectos());
  }, [dispatch]);


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Proyectos</h2>
      <ul className="list-group">
        {products.map(product => (
          <li key={product.id} className="list-group-item">
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProyectoList;
