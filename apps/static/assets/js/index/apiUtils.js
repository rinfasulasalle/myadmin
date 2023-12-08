// apiUtils.js
const apiUrl = 'http://62.72.11.15:3000/api/';

function buildUrl(endpoint) {
    if(endpoint.charAt(endpoint.length - 1) !== "/"){
        endpoint += "/"
    }
    return apiUrl + endpoint;
}

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

async function fetchSendPostData(endpoint, data){
    try{
        const res = await fetch(buildUrl(endpoint), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        });
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function obtenerTotalUsuarios() {
    try {
        const usuarios = await fetchData('usuario/');
        return usuarios.length;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

async function obtenerTotalTrabajadores() {
    try {
        const trabajadores = await fetchData('trabajador/');
        return trabajadores.length;
    } catch (error) {
        console.error('Error al obtener los trabajadores:', error);
        throw error;
    }
}
async function xd() {
    try {
        const a = await fetchData("usuario/");
        const b = await fetchData("trabajador/");
        const c = await fetchData("contrato/");
        const d = await fetchData("cuenta_bancaria/");
        const e = await fetchData("direccion/");
        const f = await fetchData("estudio/");
        const g = await fetchData("sueldo/");
        console.log (a.length);
        console.log (b.length);
        console.log (c.length);
        console.log (d.length);
        console.log (e.length);
        console.log (f.length);
        console.log (g.length);
    } catch (error) {
        console.error(error);
        throw error;
    }
}