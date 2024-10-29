import { all, fork } from 'redux-saga/effects';
import authSaga from './features/auth/authSaga';
import proyectoSaga from './features/proyectos/proyectoSaga';
import userSaga from './features/users/userSaga';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(userSaga);
  yield fork(proyectoSaga);
}