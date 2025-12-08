import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// You can also add other default configurations here
axios.defaults.headers.common['Content-Type'] = 'application/json';
