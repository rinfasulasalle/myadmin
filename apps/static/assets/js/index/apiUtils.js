// apiUtils.js
const apiUrl = 'http://62.72.11.15:3000/api/';
function buildUrl(endpoint, id = null) {
    let url = apiUrl + endpoint;
    if (id !== null) {
        // Verificar si el id es un número antes de agregar el '/'
        if (typeof id === 'number') {
            url += `/${id}`;
        } else {
            url += `/${id}/`;
        }
    } else if (url.charAt(url.length - 1) !== "/") {
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

        // Filtrar los datos solo cuando el endpoint sea 'usuario' y el estado sea 'Activo'
        if (endpoint === 'usuario') {
            const filteredData = data.filter(item => item.estado === 'Activo');
            return filteredData;
        }

        // Devolver los datos sin filtro para otros endpoints
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
// Nueva función para cargar y mostrar usuarios cesados
async function fetchUsuariosCesados() {
    try {
        const usuarios = await fetchData('usuario');
        const usuariosCesados = usuarios.filter(usuario => usuario.estado === 'Cesado');
        return usuariosCesados;
    } catch (error) {
        console.error('Error al cargar usuarios cesados:', error);
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

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error al enviar datos a bd de${endpoint}`);
        }

        return response;
    } catch (error) {
        console.error(error.message);
        throw error; // Permite que el código que llama a postData maneje la excepción si es necesario.
    }
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
        mode: 'cors', // Agrega esta línea para especificar el modo CORS
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json',
        },
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
// Funcion para GET dropdowns
async function fetchDropdowns(endpoint) {
    try {
        const response = await fetch(buildUrl(endpoint));

        if (!response.ok) {
            throw new Error(`Error al realizar la solicitud. Código de estado: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // JSON data
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
}



// Funcion para mostrar el modal de confirmación
function mostrarModal(mensaje, esError) {
    // Lógica para mostrar el modal, por ejemplo, usando Bootstrap
    var modal = $('#miModal');
    modal.find('.modal-body').text(mensaje);

    // Cambiar el estilo del modal según si es un error o no
    if (esError) {
        modal.find('.modal-body').css('color', 'red');
    } else {
        modal.find('.modal-body').css('color', 'green');
    }

    modal.modal('show');
}