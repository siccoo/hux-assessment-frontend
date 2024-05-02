import React from 'react';

const ContactDetails = ({ contact }) => {
  return (
    <div>
      <p>{contact.firstName} {contact.lastName}</p>
      <p>{contact.phoneNumber}</p>
    </div>
  );
};

export default ContactDetails;