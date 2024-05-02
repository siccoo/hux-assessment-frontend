import axios from 'axios';

const BASE_URL = 'http://localhost:3010/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set JWT token in request headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Authentication (Login)
export const login = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

// Logout
export const logout = async () => {
  try {
    // Implement logout functionality here (e.g., clearing localStorage, removing token from headers)
    setAuthToken(null); // Remove JWT token from request headers
    return true;
  } catch (error) {
    throw new Error('Logout failed');
  }
};

// Signup with authentication
export const signup = async (userData) => {
  try {
    const response = await api.post('/user/signup', userData);
    const { token } = response.data;
    setAuthToken(token);
    return true; // Signup successful
  } catch (error) {
    console.error('Signup failed:', error);
    return false; // Signup failed
  }
};

// Contacts
export const createContact = async (contactData) => {
  try {
    const response = await api.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating contact');
  }
};

export const updateContact = async (contactId, contactData) => {
  try {
    const response = await api.put(`/contacts/${contactId}`, contactData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating contact');
  }
};

export const getContactDetails = async (contactId) => {
  try {
    const response = await api.get(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching contact details');
  }
};

export const getContactsList = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching contacts list');
  }
};

export const deleteContact = async (contactId) => {
  try {
    await api.delete(`/contacts/${contactId}`);
  } catch (error) {
    throw new Error('Error deleting contact');
  }
};

export default api;