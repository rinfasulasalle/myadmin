// apiUtils.js
const apiUrl = 'http://62.72.11.15:3000/api/';
function buildUrl(endpoint, id = null) {
    let url = apiUrl + endpoint;
    if (id !== null) {
        url += `/${id}`;
    }
    if (url.charAt(url.length - 1) !== "/") {
        url += "/";
    }
    return url;
}
// Funcion para GET con fetch de algun endpoint
async function fetchData(endpoint) {
    try {
        const response = await fetch(buildUrl(endpoint));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not in JSON format");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Funcion para POST con fetch de algun endpoint y un json body
async function postData(endpoint, data) {
    const url = buildUrl(endpoint);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al enviar datos a ${endpoint}`);
            }
            return response;
        })
        .catch(error => {
            console.error(error.message);
        });
}

// Función para PUT con fetch de algún endpoint y un json body
async function putData(endpoint, id, data) {
    const url = buildUrl(endpoint, id);
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar datos en ${endpoint}`);
            }
            return response;
        })
        .catch(error => {
            console.error(error.message);
        });
}

// Función para DELETE con fetch de algún endpoint
async function deleteData(endpoint, id) {
    const url = buildUrl(endpoint, id);
    const options = {
        method: 'DELETE',
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar datos en ${endpoint}`);
            }
            return response;
        })
        .catch(error => {
            console.error(error.message);
        });
}

// Utils para despues
// Funcion para calcular cuatos usuarios hay(tamaño)
async function obtenerTotalUsuarios() {
    try {
        const usuarios = await fetchData('usuario/');
        return usuarios.length;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}
// Funcion para calcular cuatos trabajadores hay(tamaño)
async function obtenerTotalTrabajadores() {
    try {
        const trabajadores = await fetchData('trabajador/');
        return trabajadores.length;
    } catch (error) {
        console.error('Error al obtener los trabajadores:', error);
        throw error;
    }
}