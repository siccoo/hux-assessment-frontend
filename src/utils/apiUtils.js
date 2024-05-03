import { logout } from "./authUtils.js";

export const AUTH_TOKEN = "__API_TOKEN__";

export const getAuthToken = () => window.localStorage.getItem(AUTH_TOKEN);

const baseURL = 'http://localhost:3010/api';

const api = async (
  { path, method = "POST", payload = null, params = null },
  customConfigs
) => {
  const token = getAuthToken();

  const headers = {
    Accept: "application/json, */*",
    "Content-type": "application/json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const configs = {
    method,
    headers,
    ...customConfigs,
  };

  // return console.log(configs);

  if (payload) configs.body = JSON.stringify(payload);

  let url = new window.URL(`${baseURL}${path}`);

  const buildParams = (data) => {
    const params = new window.URLSearchParams();

    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(`${key}[]`, item);
        });
      } else {
        params.append(key, value);
      }
    }

    return params;
  };

  if (params) url.search = buildParams(params);

  return window
    .fetch(url, configs)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        let errorMessage;
        if (data && data.detail) {
          if (typeof data.detail === "string") {
            errorMessage = data.detail;
          } else if (Array.isArray(data.detail)) {
            errorMessage = data.detail
              .map(({ message, token_class }) => `${token_class}: ${message}`)
              .join(", ");
          }
        } else if (data.error) {
          if (typeof data.error === "string") {
            errorMessage = data.error;
          } else if (Array.isArray(data.error)) {
            errorMessage = data.error
              .map(({ message, token_class }) => `${token_class}: ${message}`)
              .join(", ");
          }
        } else {
          errorMessage = "An unknown error occurred!";
        }

        let error = new Error(errorMessage);
        // console.log(error, "test");
        if (data.code === "token_not_valid" || error === "Token is invalid or expired") {
          //destroy client auth details and log user out
          logout();
        } else {
          error.status = response.status || 500;
        }
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

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
// export const logout = async () => {
//   try {
//     // Implement logout functionality here (e.g., clearing localStorage, removing token from headers)
//     setAuthToken(null); // Remove JWT token from request headers
//     return true;
//   } catch (error) {
//     throw new Error('Logout failed');
//   }
// };

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