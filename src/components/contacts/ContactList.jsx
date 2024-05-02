import React from 'react';

const ContactList = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <p>{contact.firstName} {contact.lastName}</p>
          <p>{contact.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactList;