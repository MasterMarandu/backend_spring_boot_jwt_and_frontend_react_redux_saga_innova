import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchUsers } from '../features/users/userSlice'; 

const TareaModal = ({ show, handleClose, handleSave, tarea }) => {
    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.users.users); // Obtener la lista de usuarios del estado
    const loading = useSelector((state) => state.users.isLoading); // Estado de carga
    const error = useSelector((state) => state.users.error); // Estado de error

  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    estado: '',
    user_id: '',
  });

 // Cargar los usuarios cuando se abra el modal
 useEffect(() => {
    if (show) {

      dispatch(fetchUsers()); // Llama a la función para obtener usuarios al abrir el modal
    }
  }, [show, dispatch]);


  // Rellenar el formulario si se está editando una tarea
  useEffect(() => {
    if (tarea) {
      setFormValues({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        estado: tarea.estado,
        user_id: tarea.user_id,
      });
    } else {
      // Si no estamos editando, limpiamos el formulario
      setFormValues({
        nombre: '',
        descripcion: '',
        estado: '',
        user_id: '',
      });
    }
  }, [tarea]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleSave(formValues); // Guarda la tarea
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tarea ? 'Editar Tarea' : 'Agregar Tarea'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre de la tarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
              placeholder="Descripción de la tarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select name="estado" value={formValues.estado} onChange={handleChange}>
              <option value="">Seleccione el estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
            </Form.Select>
          </Form.Group>

              {/* Select de usuarios */}
              <Form.Group className="mb-3" controlId="user_id">
            <Form.Label>Asignado a</Form.Label>
            <Form.Control
              as="select"
              name="user_id"
              value={formValues.user_id}
              onChange={handleChange}
            >
              <option value="">Selecciona un usuario</option>
              {loading ? (
                <option value="">Cargando...</option> // Muestra un mensaje de carga si es necesario
              ) : (
                usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.username}
                  </option>
                ))
              )}
            </Form.Control>
            {error && <div className="text-danger">{error}</div>} {/* Maneja errores si ocurren */}
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TareaModal;
