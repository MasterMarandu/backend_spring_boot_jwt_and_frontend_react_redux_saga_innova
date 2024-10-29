import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProyectos, deleteProduct } from '../features/proyectos/proyectoSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProyectoPage = () => {
  const dispatch = useDispatch();
  const { items: proyectos = [], isLoading, error,successMessage } = useSelector((state) => state.proyectos);


  useEffect(() => {
    dispatch(fetchProyectos());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        title: 'Éxito',
        text: successMessage,
        icon: 'success'
      }).then(() => {
        dispatch(fetchProyectos());
      });
    }

    if (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el proyecto',
        icon: 'error'
      });
    }
  }, [successMessage, error]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
       dispatch(deleteProduct(id));
    }
  };

  if (isLoading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error al cargar los proyectos: {error}</p>;


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Proyectos</h2>
      <Link to="/add-proyecto">
        <button className="btn btn-primary mb-3">Agregar Nuevo Proyecto</button>
      </Link>
      {proyectos.length === 0 ? (
        <p>No hay proyectos disponibles.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Fecha Inicio</th>
              <th scope="col">Fecha Fin</th>
              <th scope="col">Tareas</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos && proyectos.length > 0 ? (
              proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>{proyecto.nombre}</td>
                  <td>{proyecto.descripcion}</td>
                  <td>{proyecto.fechaInicio}</td>
                  <td>{proyecto.fechaFinalizacion}</td>
                  <td>
                    {proyecto.tareas && Array.isArray(proyecto.tareas) && proyecto.tareas.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {proyecto.tareas.map((tarea, index) => (
                          <li key={index}>
                            {tarea.nombre} - {tarea.estado}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay tareas disponibles para este proyecto.</p>
                    )}
                  </td>
                  <td>
                    <Link to={`/edit-proyecto/${proyecto.id}`} className="btn btn-secondary me-2">
                      Editar
                    </Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(proyecto.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay proyectos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProyectoPage;
