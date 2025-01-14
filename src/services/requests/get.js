import axios from 'axios';
import API_URL from '../../constants/api';


export const get_teachers = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

    try {
        const response = await axios.get(`${API_URL}teacher/list`, { headers });
        return response.data; // Retorna os dados diretamente
    } catch (err) {
        console.error('Erro ao buscar professores:', err);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

export const get_classes = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

    try {
        const response = await axios.get(`${API_URL}classes/list`, { headers });
        return response.data; // Retorna os dados diretamente
    } catch (err) {
        console.error('Erro ao buscar classes:', err);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

export const get_disciplines = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

    try {
        const response = await axios.get(`${API_URL}disciplines/list`, { headers });
        return response.data; // Retorna os dados diretamente
    } catch (err) {
        console.error('Erro ao buscar disciplinas:', err);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

export const get_events = async () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

    try {
        const response = await axios.get(`${API_URL}classes/list-events`, { headers });
        return response.data; // Retorna os dados diretamente
    } catch (err) {
        console.error('Erro ao buscar disciplinas:', err);
        return []; // Retorna uma lista vazia em caso de erro
    }
}