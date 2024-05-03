import React from 'react';

const ContactList = ({ contacts }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-item card">
          <div className="card-body">
            <p className="card-text">{contact.firstName} {contact.lastName}</p>
            <p className="card-text">{contact.phoneNumber}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;