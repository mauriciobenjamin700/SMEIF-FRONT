import axios from 'axios';
import API_URL from '../../constants/api';

export const get_classes = async () => {
    try {
        const response = await axios.get(`${API_URL}classes/list`);
        return response.data; // Retorna os dados diretamente
    } catch (err) {
        console.error('Erro ao buscar classes:', err);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

export const get_disciplines = async () => {
    try {
        const response = await axios.get(`${API_URL}disciplines/list`);
        return response.data; // Retorna os dados diretamente
    } catch (err) {
        console.error('Erro ao buscar disciplinas:', err);
        return []; // Retorna uma lista vazia em caso de erro
    }
}