const apiUrl = 'http://62.72.11.15:3000/api/';

// Función para construir la URL completa
function buildUrl(endpoint) {
    return apiUrl + endpoint;
}

async function fetchData(endpoint) {
    const url = buildUrl(endpoint);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al obtener datos de ${url}`);
        }

        const jsonResponse = await response.json();

        if (!jsonResponse || typeof jsonResponse !== 'object') {
            throw new Error('La respuesta no es un objeto válido.');
        }

        // Verifica si la propiedad 'data' está presente
        const data = jsonResponse.hasOwnProperty('data') ? jsonResponse.data : jsonResponse;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Función para llamar y mostrar datos de cada tabla
async function fetchDataAndLog(endpoint) {
    try {
        const data = await fetchData(endpoint);
        console.log(`Datos de ${endpoint}:`, data);
    } catch (error) {
        console.error(error.message);
    }
}

// Llamar a cada función específica para obtener y mostrar datos de cada tabla
(async () => {
    try {
        await fetchDataAndLog('dropdown_roles/');
        await fetchDataAndLog('dropdown_areas/');
        // Repite para otros endpoints...
    } catch (error) {
        console.error('Error general:', error.message);
    }
})();
