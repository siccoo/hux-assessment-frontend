import React from 'react';
import ContactForm from '../components/contacts/ContactForm';

const CreateContactPage = ({ onSubmit }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Contact</h2>
      <ContactForm initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateContactPage;