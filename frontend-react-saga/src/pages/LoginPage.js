import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container mt-5">
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h2>Login</h2>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object({
              username: Yup.string().required('Username is required'),
              password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(loginUser(values));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form-group">
                <div className="mb-3">
                  <label htmlFor="username">UserName</label>
                  <Field className="form-control" name="username" type="text" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <Field className="form-control" name="password" type="password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
