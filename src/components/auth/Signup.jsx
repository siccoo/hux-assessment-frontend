import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../utils/apiUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    errors: {},
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
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
        await signup(formData);
        navigate.push('/login');
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Signup</h2>
          <form>
            <input className={`form-control mb-3 ${formData.errors.username ? 'is-invalid' : ''}`} type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            {formData.errors.username && <div className="invalid-feedback">{formData.errors.username}</div>}
            <input className={`form-control mb-3 ${formData.errors.email ? 'is-invalid' : ''}`} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {formData.errors.email && <div className="invalid-feedback">{formData.errors.email}</div>}
            <div className="input-group mb-3">
              <input className={`form-control ${formData.errors.password ? 'is-invalid' : ''}`} type={formData.showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                {formData.showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
            </div>
            {formData.errors.password && <div className="invalid-feedback">{formData.errors.password}</div>}
            <input className={`form-control mb-3 ${formData.errors.confirmPassword ? 'is-invalid' : ''}`} type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            {formData.errors.confirmPassword && <div className="invalid-feedback">{formData.errors.confirmPassword}</div>}
            <button className="btn btn-primary btn-block" type="submit" onClick={handleSubmit}>Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;