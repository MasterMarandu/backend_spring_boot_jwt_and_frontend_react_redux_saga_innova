import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from '../sagas';
import authReducer from '../features/auth/authSlice';
import proyectoReducer from '../features/proyectos/proyectoSlice';
import userReducer from '../features/users/userSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    proyectos: proyectoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;