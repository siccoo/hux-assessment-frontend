import React, { useState, useEffect } from 'react';
import ContactList from '../components/contacts/ContactList';
import { getContactsList } from '../utils/apiUtils';

const ContactsListPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactsList();
      setContacts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Contacts</h2>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default ContactsListPage;