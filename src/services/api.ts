import axios from 'axios';

const api = axios.create({
    // Tem que ser HTTPS e o link exato do Render
    baseURL: 'https://diabeat-api.onrender.com' 
});

export const S3_BUCKET_NAME = 'diabeat-files-tcc';
export const S3_REGION = 'sa-east-1';

export default api;