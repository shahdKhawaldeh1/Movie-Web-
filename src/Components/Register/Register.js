import React, { useState } from 'react';
import './styles.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { regSchema } from '../Schemas/register';
import { useNavigate } from 'react-router-dom'; 

export const Register = () => {
  const [error, setErrors] = useState([]);
  const navigate = useNavigate(); 
  const { errors, values, handleChange, handleSubmit, handleBlur, touched } = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      cpassword: '',
    },
    validationSchema: regSchema,
    onSubmit: register,
  });

  async function register(formData) {
    try {
      const response = await axios.post(
        'https://lazy-blue-sockeye-gear.cyclic.app/appi/v1/auth/signup',
        formData
      );
      if (response.data.message === 'success') {
        console.log('registered');
        navigate('/login'); 
      } else {
        setErrors([response.data.err[0]]);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div className="container mt-5 pt-5">
        {error.map((err, index) => (
          <div key={index} className="alert alert-danger">
            {err}
          </div>
        ))}
      </div>
      <form className="form-register" onSubmit={handleSubmit}>
        <div className="w-50 m-auto">
          <div className="mb-3">
            <label className="input-form" htmlFor="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <div className="small text-danger">{errors.email}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-3">
            <label className="input-form" htmlFor="exampleInputName">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
              id="exampleInputName"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? (
              <div className="small text-danger">{errors.name}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-3">
            <label className="input-form" htmlFor="exampleInputPassword">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
              id="exampleInputPassword"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <div className="small text-danger">{errors.password}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-3">
            <label className="input-form" htmlFor="exampleInputConfirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${touched.cpassword && errors.cpassword ? 'is-invalid' : ''}`}
              id="exampleInputConfirmPassword"
              name="cpassword"
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.cpassword && errors.cpassword ? (
              <div className="small text-danger">{errors.cpassword}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="center-container">
            <button className="reg-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
