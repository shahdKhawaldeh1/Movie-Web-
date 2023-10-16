import React from 'react';
import './styles.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'; // Import Yup for validation
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [error, setErrors] = React.useState([]);
  const navigate = useNavigate();

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      cpassword: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .notRequired()
        .nullable(),

      name: Yup.string()
        .notRequired()
        .nullable(),

      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .notRequired()
        .nullable(),

      cpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .notRequired()
        .nullable(),
    }),
    onSubmit: register,
  });

  async function register(formData) {
    try {
      const response = await axios.post(
        'https://correct-url-here.com', // Update the correct URL
        formData
      );
      if (response.data.message === 'success') {
        console.log('registered');
        navigate('/login');
      } else {
        if (Array.isArray(response.data.err)) {
          setErrors(response.data.err);
        } else {
          setErrors([response.data.err]);
        }
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
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="small text-danger">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="input-form" htmlFor="exampleInputName">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="exampleInputName"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="small text-danger">{errors.name}</div>
            )}
          </div>
          <div className="mb-3">
          <div className="mb-3">
            <label className="input-form" htmlFor="exampleInputPassword">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="exampleInputPassword"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="small text-danger">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="input-form" htmlFor="exampleInputConfirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.cpassword ? 'is-invalid' : ''
              }`}
              id="exampleInputConfirmPassword"
              name="cpassword"
              value={values.cpassword}
              onChange={handleChange}
            />
            {errors.cpassword && (
              <div className="small text-danger">{errors.cpassword}</div>
            )}
          </div>
          <div className="center-container">
            <button className="reg-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
        </div>
      </form>
    </>
  );
};
