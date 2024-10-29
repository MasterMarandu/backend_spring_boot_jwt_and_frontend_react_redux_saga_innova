import axios from 'axios';

const API_URL = 'http://localhost:8080/api';



export const authenticateUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'An error occurred during login');
    }
  };

  export const fetchProyectos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred during the fetch');
    }
  };

  export const addProyecto = async (proyecto) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, proyecto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al agregar proyecto');
    }
  };
  
 
  export const updateProyecto = async (proyecto) => {
    try {
      const response = await axios.put(`${API_URL}/projects/${proyecto.id}`, proyecto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al actualizar proyecto');
    }
  };
  

  export const deleteProyecto = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/projects/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al eliminar proyecto');
    }
  };

  export const fetchProyectoByIdApi = async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al obtener el proyecto');
    }
  };

  export const fetchUsuariosApi = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/role/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al obtener el proyecto');
    }
  };

  export const fetchTareasByUserIdApi = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error al obtener el proyecto');
    }
  };

  export const updateTareaApi = async (tarea) => {
    try {
      const response = await axios.post(`${API_URL}/tasks/${tarea.id}`, null, {
        params: {
          estado: tarea.estado, // Pasar el estado como parámetro de consulta
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar la tarea');
    }
  };

  