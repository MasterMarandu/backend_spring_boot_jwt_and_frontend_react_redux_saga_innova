import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { fetchTareasById, updateTarea } from '../features/proyectos/proyectoSlice';
import { useUserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import TareaEditModal from './TareaEditModal';
import 'react-toastify/dist/ReactToastify.css';

const TareasList = () => {
    const { currentUser } = useUserContext();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Para saber si estamos editando una tarea existente
  const [currentTarea, setCurrentTarea] = useState(null); // Tarea actual para editar o agregar
  const tareas = useSelector(state => state.proyectos.tareas);
  const { successMessage, error, selectedProyecto } = useSelector((state) => state.proyectos);

  useEffect(() => {
    dispatch(fetchTareasById(currentUser.id));
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        title: 'Éxito',
        text: successMessage,
        icon: 'success'
      }).then(() => {
        toast("Se ha actualizado el estado de la tarea");
        dispatch(fetchTareasById(currentUser.id));
      });
    }

    if (error) {
      console.log('El error es', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el proyecto',
        icon: 'error'
      });
    }
  }, [successMessage, error]); //


    // Función para guardar la tarea ingresada en el modal
    const handleSaveTarea = (newTarea) => {
        if (editIndex !== null) {
            const tarea =  tareas[editIndex]; // Obtiene la tarea a editar
            const updatedTarea = { ...tarea, estado: newTarea.estado }; // Crea una copia y actualiza el estado
            dispatch(updateTarea(updatedTarea)); // Envía la tarea actualizada al dispatcher
        } else {
            // Lógica para agregar una nueva tarea si es necesario
        }
        handleCloseModal();
    };

    // Función para editar una tarea
    const handleEditTarea = (index) => {
        setEditIndex(index);
        setCurrentTarea(tareas[index]);
        setShowModal(true);
      };

      const handleCloseModal = () => setShowModal(false);


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de tareas</h2>
      <ul className="list-group">
    
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Asignado a</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareas.length === 0 ? (
              <tr>
                <td colSpan="5">No hay tareas.</td>
              </tr>
            ) : (
              tareas.map((tarea, index) => (
                <tr key={index}>
                  <td>{tarea.nombre}</td>
                  <td>{tarea.descripcion}</td>
                  <td>{tarea.estado}</td>
                  <td>{tarea.user_id}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditTarea(index)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </ul>

      <TareaEditModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTarea}
        tarea={currentTarea}
      />

      <ToastContainer />

    </div>
  );
};

export default TareasList;
