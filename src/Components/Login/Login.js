import React, { useState } from 'react';
import './styles.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { regSchema } from '../Schemas/register';
import { useNavigate } from 'react-router-dom';
// ... (import statements and component definition)

export const Login = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Email is required';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('https://ecommerce-node-3.vercel.app/auth/login', values);
        if (data.message === 'success') {
          console.log('login successful');
          localStorage.setItem('token', data.token);
          navigate('/movie'); // Make sure the route is correctly defined
        } else {
          setErrors([data.err[0].message]);
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    },
    validationSchema: regSchema,
  });

   return (
    <>
<div className="container pt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
  {errors.map((err, index) => (
    <div key={index} className="alert alert-danger">
      {err}
    </div>
  ))}
        <form className="form" onSubmit={formik.handleSubmit} style={{ width: '50%' }}>
  <div className="mb-3">
    <label className="input-form" htmlFor="exampleInputEmail1">
      Email address
    </label>
    <input
      type="email"
      className={`form-control-login ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
      id="exampleInputEmail1"
      name="email"
      aria-describedby="emailHelp"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.email && formik.errors.email && (
      <div className="text-danger alert-message" style={{ margin: '20px 20px' }}>
  {formik.errors.email}
</div>    )}
  </div>

  <div className="mb-3">
    <label className="input-form" htmlFor="exampleInputPassword">
      Password
    </label>
    <input
      type="password"
      className={`form-control-login ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
      id="exampleInputPassword"
      name="password"
      aria-describedby="emailHelp"
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched.password && formik.errors.password && (
      <div className="text-danger alert-message" style={{ margin: '20px 20px' }}>
  {formik.errors.password}
</div>    )}
  </div>

  <div className="center-container">
    <button className="reg-btn" type="submit">
      Submit
    </button>
  </div>
</form>

</div>



    </>
  );
};
