import axios from 'axios';

export async function get(url) {
    try {
        const response = await axios.get("http://147.93.36.76:5009"+ url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        return {
            statusCode: response.status,
            responseBody: response.data
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.data && error.response.data.detail) {
            errorDetail = error.response.data.detail;
        }
        console.log(error)
        return {
            statusCode: error.response ? error.response.status : 500,
            responseBody: { error: errorDetail }
        };
    }
}

export async function post(url, body) {
    try {
        const response = await axios.post("http://147.93.36.76:5009"+ url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        return {
            statusCode: response.status,
            responseBody: response.data
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.data && error.response.data.detail) {
            errorDetail = error.response.data.detail;
        }
        return {
            statusCode: error.response ? error.response.status : 500,
            responseBody: { error: errorDetail }
        };
    }
}

export async function put(url, body) {
    try {
        const response = await axios.put("http://147.93.36.76:5009"+ url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        return {
            statusCode: response.status,
            responseBody: response.data
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.data && error.response.data.detail) {
            errorDetail = error.response.data.detail;
        }
        return {
            statusCode: error.response ? error.response.status : 500,
            responseBody: { error: errorDetail }
        };
    }
}

export async function del(url) {
    try {
        const response = await axios.delete("http://147.93.36.76:5009"+ url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        return {
            statusCode: response.status,
            responseBody: response.data
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.data && error.response.data.detail) {
            errorDetail = error.response.data.detail;
        }
        return {
            statusCode: error.response ? error.response.status : 500,
            responseBody: { error: errorDetail }
        };
    }
}