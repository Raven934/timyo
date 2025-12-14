import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Get CSRF token before making requests
export const getCsrfToken = async () => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
    withCredentials: true,
  });
};

export default api;
