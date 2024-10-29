import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchProductsSuccess, fetchProductsFailure, addProductSuccess, addProductFailure, deleteProductSuccess, updateProyectoSuccess, updateProductFailure, deleteProductFailure, fetchProductByIdSuccess, fetchProductByIdFailure, fetchProyectosSuccess, fetchProyectosFailure, addProyectoSuccess, addProyectoFailure, updateProyectoFailure,fetchProyectoById, fetchProyectoByIdSuccess, fetchProyectoByIdFailure, fetchTareasByIdSuccess, fetchTareasByIdFailure, updateTareaSuccess, updateTareaFailure } from './proyectoSlice';
import { fetchProducts as fetchProductsApi, addProductApi, updateProductApi, deleteProductApi, fetchProductByIdApi, deleteProyecto, fetchProyectos, addProyecto, updateProyecto, fetchProyectoByIdApi, fetchTareasByUserIdApi,updateTareaApi } from '../../services/api';


function* fetchProyectoSaga() {
  try {
    const response = yield call(fetchProyectos);
    yield put(fetchProyectosSuccess(response));
  } catch (error) {
    yield put(fetchProyectosFailure(error.message));
  }
}

function* addProyectoSaga(action) {
  try {
    const response = yield call(addProyecto, action.payload);
    yield put(addProyectoSuccess(response.data));
  } catch (error) {
    yield put(addProyectoFailure(error.message));  // Maneja errores
  }
}

function* updateProyectoSaga(action) {
  try {
    const response = yield call(updateProyecto, action.payload);
    yield put(updateProyectoSuccess(response.data));
  } catch (error) {
    yield put(updateProyectoFailure(error.message));
  }
}

function* deleteProyectoSaga(action) {
  try {
    const response = yield call(deleteProyecto, action.payload);
    yield put(deleteProductSuccess(response));
  } catch (error) {
    yield put(deleteProductFailure(error.message));  // Maneja errores
  }
}

function* handleFetchProyectoById(action) {
  try {
    const response = yield call(fetchProyectoByIdApi, action.payload);
    yield put(fetchProyectoByIdSuccess(response));
  } catch (error) {
    yield put(fetchProyectoByIdFailure(error.message));
  }
}

function* handleFetchTareasByUserId(action) {
  try {
    const response = yield call(fetchTareasByUserIdApi, action.payload);
    yield put(fetchTareasByIdSuccess(response));
  } catch (error) {
    yield put(fetchTareasByIdFailure(error.message));
  }
}

function* updateTareaSaga(action) {
  try {
    const response = yield call(updateTareaApi, action.payload);
    yield put(updateTareaSuccess(response.data));
  } catch (error) {
    yield put(updateTareaFailure(error.message));
  }
}

export default function* productSaga() {
  yield takeLatest('proyectos/fetchProyectos', fetchProyectoSaga);
  yield takeLatest('proyectos/addProyecto', addProyectoSaga);
  yield takeLatest('proyectos/updateProyecto', updateProyectoSaga);
  yield takeLatest('proyectos/deleteProduct', deleteProyectoSaga);
  yield takeLatest('proyectos/fetchProyectoById', handleFetchProyectoById);
  yield takeLatest('proyectos/fetchTareasById', handleFetchTareasByUserId);
  yield takeLatest('proyectos/updateTarea', updateTareaSaga);
}