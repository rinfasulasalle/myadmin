// apiUtils.js

const apiUrl = 'http://62.72.11.15:3000/api/v1/';

// Función para construir la URL completa
function buildUrl(endpoint) {
    return apiUrl + endpoint;
}

// Función para realizar una solicitud con fetch y devolver la respuesta en formato JSON
async function fetchData(endpoint) {
    const url = buildUrl(endpoint);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener datos de ${url}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

// Exportar las funciones para su uso en otros archivos
// Exponer las funciones en un objeto global
window.apiUtils = {
    buildUrl,
    fetchData
};
fetchData('dropdown_roles/');
/* 
// Llamar a cada función específica para obtener y mostrar datos de cada tabla
fetchData('dropdown_roles/');
fetchData('dropdown_areas/');
fetchData('dropdown_capacitaciones/');
fetchData('dropdown_carreras/');
fetchData('dropdown_contrato_opcion/');
fetchData('dropdown_empleo_situacion/');
fetchData('dropdown_empleo_tipo/');
fetchData('dropdown_especializaciones/');
fetchData('dropdown_instituciones/');
fetchData('dropdown_nivel_educativo/');
fetchData('dropdown_proyecto/');
fetchData('dropdown_regimen_aseguramiento/');
fetchData('dropdown_rol_proyecto/');
fetchData('dropdown_sedes/');
fetchData('dropdown_situaciones_especiales/');
fetchData('dropdown_tipo_contrato/');
*/
