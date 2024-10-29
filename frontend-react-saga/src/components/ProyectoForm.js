import { useParams } from 'react-router-dom'; // Importa useParams
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProyecto, updateProyecto, fetchProyectoById } from '../features/proyectos/proyectoSlice'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TareaModal from './TareaModal';
import { Button, Form, Table } from 'react-bootstrap';

const ProyectoForm = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFinalizacion: '',
    tareas: [], // Lista de tareas asociadas al proyecto
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Para saber si estamos editando una tarea existente
  const [currentTarea, setCurrentTarea] = useState(null); // Tarea actual para editar o agregar
  const { successMessage, error, selectedProyecto } = useSelector((state) => state.proyectos);

  const handleShowModal = () => {
    setCurrentTarea(null); // Limpia la tarea actual al abrir el modal para agregar
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(fetchProyectoById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProyecto) {
      setProyecto(selectedProyecto);
    }

  }, [selectedProyecto, dispatch]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        title: 'Éxito',
        text: successMessage,
        icon: 'success'
      }).then(() => {
        //navigate('/proyectos'); // Redirige a la lista de proyectos
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
  }, [successMessage, error]); // Escuchar cambios en successMessage y error

  // Función para guardar la tarea ingresada en el modal
  const handleSaveTarea = (newTarea) => {
    if (editIndex !== null) {
      // Si estamos editando, reemplazamos la tarea existente
      const updatedTareas = [...proyecto.tareas];
      updatedTareas[editIndex] = newTarea;
      setProyecto({
        ...proyecto,
        tareas: updatedTareas,
      });
      setEditIndex(null); // Reinicia el índice de edición
    } else {
      // Si es una nueva tarea, la agregamos
      setProyecto({
        ...proyecto,
        tareas: [...proyecto.tareas, newTarea],
      });
    }
    handleCloseModal();
  };

  // Función para editar una tarea
  const handleEditTarea = (index) => {
    setEditIndex(index);
    setCurrentTarea(proyecto.tareas[index]);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar el error cuando se corrige el campo
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (id) {
      dispatch(updateProyecto(proyecto));
    }else{
      dispatch(addProyecto(proyecto)); // Despachar la acción
    }
  };



  const validate = () => {
    const newErrors = {};
    if (!proyecto.nombre) newErrors.nombre = 'El nombre del proyecto es obligatorio';
    if (!proyecto.descripcion) newErrors.descripcion = 'La descripción es obligatoria';
    if (!proyecto.fechaInicio) newErrors.fechaInicio = 'La fecha de inicio es obligatoria';
    if (proyecto.tareas.length === 0) newErrors.tareas = 'Se requiere al menos una tarea';

    proyecto.tareas.forEach((tarea, index) => {
      if (!tarea.nombre) {
        if (!newErrors.tareas) newErrors.tareas = {};
        newErrors.tareas[index] = { nombre: 'El nombre de la tarea es obligatorio' };
      }
      if (!tarea.descripcion) {
        if (!newErrors.tareas) newErrors.tareas = {};
        newErrors.tareas[index] = { ...newErrors.tareas[index], descripcion: 'La descripción de la tarea es obligatoria' };
      }
      if (!tarea.estado) {
        if (!newErrors.tareas) newErrors.tareas = {};
        newErrors.tareas[index] = { ...newErrors.tareas[index], estado: 'El estado de la tarea es obligatorio' };
      }
      if (!tarea.user_id) {
        if (!newErrors.tareas) newErrors.tareas = {};
        newErrors.tareas[index] = { ...newErrors.tareas[index], user_id: 'El ID del usuario asignado es obligatorio' };
      }
    });

    return newErrors;
  };

  return (
    <div className="container mt-5">
      <h2>Formulario del Proyecto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre del Proyecto</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={proyecto.nombre}
            onChange={handleChange}
            isInvalid={!!errors.nombre}
            placeholder="Ingrese el nombre del proyecto"
          />
          <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={proyecto.descripcion}
            onChange={handleChange}
            isInvalid={!!errors.descripcion}
            placeholder="Descripción del proyecto"
          />
          <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="fechaInicio">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="date"
            name="fechaInicio"
            value={proyecto.fechaInicio}
            onChange={handleChange}
            isInvalid={!!errors.fechaInicio}
          />
          <Form.Control.Feedback type="invalid">{errors.fechaInicio}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="fechaFinalizacion">
          <Form.Label>Fecha de Finalización</Form.Label>
          <Form.Control
            type="date"
            name="fechaFinalizacion"
            value={proyecto.fechaFinalizacion}
            onChange={handleChange}
          />
        </Form.Group>

        <h4>Tareas del Proyecto</h4>
        <Button variant="primary" onClick={handleShowModal}>
          Agregar Tarea
        </Button>

          {/* Grilla de tareas */}
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
            {proyecto.tareas.length === 0 ? (
              <tr>
                <td colSpan="5">No hay tareas agregadas.</td>
              </tr>
            ) : (
              proyecto.tareas.map((tarea, index) => (
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

        <Button variant="success" type="submit">
          Guardar Proyecto
        </Button>
      </Form>

      <TareaModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTarea}
        tarea={currentTarea}
      />
    </div>
  );
};

export default ProyectoForm;
