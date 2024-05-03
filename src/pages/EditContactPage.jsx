import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../components/contacts/ContactForm';

const EditContactPage = ({ contact, onSubmit }) => {
  const [formData, setFormData] = useState(contact);
  const { id } = useParams();

  useEffect(() => {
    setFormData(contact);
  }, [contact]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Contact</h2>
      <ContactForm initialValues={formData} onSubmit={onSubmit} />
    </div>
  );
};

export default EditContactPage;