import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsersSuccess, fetchUsersFailure } from './userSlice';
import { fetchUsuariosApi } from '../../services/api';

function* fetchUsersSaga() {
  try {
    const response = yield call(fetchUsuariosApi);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* usersSaga() {
  yield takeLatest('users/fetchUsers', fetchUsersSaga);
  
}
