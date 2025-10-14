import axios from 'axios';

const api = axios.create({
  // Para testes no NAVEGADOR no mesmo PC, este é o endereço correto.
  baseURL: 'http://localhost:3000' 
});

export default api;