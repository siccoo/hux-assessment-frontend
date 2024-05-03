import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/apiUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
    errors: {}, // State to track form errors
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    setFormData({
      ...formData,
      errors,
    });
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(formData);
        // Handle successful login, e.g., redirect to dashboard
        navigate.push('/contacts');
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form>
            <input className={`form-control mb-3 ${formData.errors.username ? 'is-invalid' : ''}`} type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            {formData.errors.username && <div className="invalid-feedback">{formData.errors.username}</div>}
            <div className="input-group mb-3">
              <input className={`form-control ${formData.errors.password ? 'is-invalid' : ''}`} type={formData.showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                {formData.showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
            </div>
            {formData.errors.password && <div className="invalid-feedback">{formData.errors.password}</div>}
            <button className="btn btn-primary btn-block" type="submit" onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
