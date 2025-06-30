export const API_URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001/api'
  : 'https://api-cafeteria.prod/api';