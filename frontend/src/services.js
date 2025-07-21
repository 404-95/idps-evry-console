import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getServices = () => axios.get(`${API_URL}/services`);
export const controlService = (name, action) =>
    axios.post(`${API_URL}/service/${name}/${action}`);
