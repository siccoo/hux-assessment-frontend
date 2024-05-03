import React from 'react';

const ContactDetails = ({ contact }) => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{contact.firstName} {contact.lastName}</h5>
          <p className="card-text">Phone Number: {contact.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;