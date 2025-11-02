// Em: src/services/api.js

import axios from 'axios';

// --- 1. A API REAL ---
// (Use o seu IP real aqui, como antes)
const realApi = axios.create({
  baseURL: 'http://192.168.0.9:3000' // <-- SEU IP REAL DO BACKEND
});

// --- 2. DADOS FALSOS PARA SUA AMIGA ---
// (Ela pode mudar esses dados para testar o layout)
const FAKE_USER_DATA = {
  id: 'admin-id-fake',
  name: 'Amiga do Front (Admin)',
  email: 'admin@admin.com',
  phone: '99 99999-9999',
  age: 25,
  diabetesType: 'TIPO_1' // (Use um valor que exista no seu Picker)
};

// --- 3. A API FALSA (MOCK) ---
// Ela simula as respostas do backend
const fakeApi = {
  // Simula o GET /users/me
  get: (url, config) => {
    console.warn(`API MOCK (FALSO) CHAMADA: GET ${url}`);
    return new Promise((resolve) => {
      setTimeout(() => { // Simula a demora da rede
        if (url === '/users/me') {
          resolve({ data: FAKE_USER_DATA });
        } else {
          resolve({ data: {} });
        }
      }, 400); // 400ms de delay
    });
  },
  
  // Simula o PATCH /users/me (Salvar Perfil)
  patch: (url, data, config) => {
    console.warn(`API MOCK (FALSO) CHAMADA: PATCH ${url}`, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url === '/users/me') {
          // "Salva" os dados falsos e os retorna
          Object.assign(FAKE_USER_DATA, data); 
          resolve({ data: FAKE_USER_DATA });
        } else {
          resolve({ data: {} });
        }
      }, 400);
    });
  },

  // Simula o POST /users (Registro)
  post: (url, data, config) => {
     console.warn(`API MOCK (FALSO) CHAMADA: POST ${url}`, data);
     return new Promise((resolve) => {
        setTimeout(() => {
            // Se for o registro, só retorna sucesso
            if (url === '/users') {
                resolve({ data: { id: 'fake-user-id', ...data } });
            } else {
                resolve({ data: { message: "Mock post success" } });
            }
        }, 400);
     });
  }
};

// --- 4. O "INTERRUPTOR" ---
let isMockMode = false;

// --- 5. O OBJETO "PROXY" QUE O APP USARÁ ---
const api = {
  // Nossos 'get', 'post' e 'patch' vão checar o "interruptor"
  get: (url, config) => {
    return isMockMode ? fakeApi.get(url, config) : realApi.get(url, config);
  },
  
  post: (url, data, config) => {
    return isMockMode ? fakeApi.post(url, data, config) : realApi.post(url, data, config);
  },
  
  patch: (url, data, config) => {
    return isMockMode ? fakeApi.patch(url, data, config) : realApi.patch(url, data, config);
  },
  
  // Função para LIGAR o modo falso (que o Login.jsx vai chamar)
  enableMockMode: () => {
    console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.warn('!!! MODO MOCK (API FALSA) ATIVADO !!!');
    console.warn('!!! NENHUMA CHAMADA REAL SERÁ FEITA !!!');
    console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    isMockMode = true;
    // Colocamos um token falso só para garantir
    realApi.defaults.headers.common['Authorization'] = 'Bearer FAKE_MOCK_TOKEN';
  },
  
  // O 'defaults' que o app real usa para salvar o token
  defaults: realApi.defaults
};

// 6. Exportamos o "Proxy"
export default api;