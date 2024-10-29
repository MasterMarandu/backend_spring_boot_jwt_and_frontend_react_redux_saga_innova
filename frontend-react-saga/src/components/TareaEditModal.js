import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TareaEditModal = ({ show, handleClose, handleSave, tarea }) => {

  const [formValues, setFormValues] = useState({
    nombre: '',
    descripcion: '',
    estado: '',
    user_id: '',
  });

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
              disabled={true}
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
              disabled={true}
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

export default TareaEditModal;
