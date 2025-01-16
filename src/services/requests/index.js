async function get(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        const responseBody = await response.json();
        return {
            statusCode: response.status,
            responseBody: responseBody
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.detail) {
            errorDetail = error.response.detail;
        }
        return {
            statusCode: 500,
            responseBody: { error: errorDetail }
        };
    }
}

async function post(url, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(body)
        });

        const responseBody = await response.json();
        return {
            statusCode: response.status,
            responseBody: responseBody
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.detail) {
            errorDetail = error.response.detail;
        }
        return {
            statusCode: 500,
            responseBody: { error: errorDetail }
        };
    }
}

async function put(url, body) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(body)
        });

        const responseBody = await response.json();
        return {
            statusCode: response.status,
            responseBody: responseBody
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.detail) {
            errorDetail = error.response.detail;
        }
        return {
            statusCode: 500,
            responseBody: { error: errorDetail }
        };
    }
}

async function del(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });
        const responseBody = await response.json();
        return {
            statusCode: response.status,
            responseBody: responseBody
        };
    } catch (error) {
        let errorDetail = 'Erro na request';
        if (error.response && error.response.detail) {
            errorDetail = error.response.detail;
        }
        return {
            statusCode: 500,
            responseBody: { error: errorDetail }
        };
    }
}