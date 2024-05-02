import React from 'react';
import ContactForm from '../components/contacts/ContactForm';

const CreateContactPage = ({ onSubmit }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };

  return (
    <div>
      <h2>Create Contact</h2>
      <ContactForm initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateContactPage;