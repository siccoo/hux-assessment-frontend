import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate.push('/contacts');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;