import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  tareas: [],
  id:null,
  error: null,
  isLoading: false,
  selectedProyecto: null,
  successMessage: null,
};

const productSlice = createSlice({
  name: 'proyectos',
  initialState,
  reducers: {

    fetchProyectos(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchProyectosSuccess(state, action) {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchProyectosFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    addProyecto(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    addProyectoSuccess(state, action) {
      state.items.push(action.payload);
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Proyecto agregado exitosamente';
    },
    addProyectoFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateProyecto(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateProyectoSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Proyecto actualizado exitosamente';
    },
    updateProyectoFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchProyectoById(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchProyectoByIdSuccess(state, action) {
      state.selectedProyecto = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchProyectoByIdFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    deleteProduct(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
  
    deleteProductSuccess(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Proyecto eliminado exitosamente';
    },
    deleteProductFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },


    fetchTareasById(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchTareasByIdSuccess(state, action) {
      state.tareas = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchTareasByIdFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    updateTarea(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateTareaSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Tarea actualizado exitosamente';
    },
    updateTareaFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },



  },
});

export const {
  fetchProyectos,
  fetchProyectosSuccess,
  fetchProyectosFailure,
  addProyecto,
  addProyectoSuccess,
  addProyectoFailure,
  updateProyecto,
  updateProyectoSuccess,
  updateProyectoFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  fetchProyectoById,
  fetchProyectoByIdSuccess,
  fetchProyectoByIdFailure,
  fetchTareasById,
  fetchTareasByIdSuccess,
  fetchTareasByIdFailure,
  updateTarea,
  updateTareaSuccess,
  updateTareaFailure

} = productSlice.actions;

export default productSlice.reducer;