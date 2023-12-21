// usuarios.js

// Función para cargar y mostrar usuarios activos
async function cargarUsuariosActivos() {
    try {
        const usuarios = await fetchData('usuario');
        const usuariosActivos = usuarios.filter(usuario => usuario.estado === 'Activo');
        mostrarUsuariosEnTabla(usuariosActivos, 'tablaUsuariosActivos', 'DAR DE BAJA');
    } catch (error) {
        console.error('Error al cargar usuarios activos:', error);
    }
}

// Función para cargar y mostrar usuarios cesados
async function cargarUsuariosCesados() {
    try {
        const usuarios = await fetchData('usuario');
        const usuariosCesados = usuarios.filter(usuario => usuario.estado === 'Cesado');
        mostrarUsuariosEnTabla(usuariosCesados, 'tablaUsuariosCesados', 'ACTIVAR USUARIO');
    } catch (error) {
        console.error('Error al cargar usuarios cesados:', error);
    }
}

// Función para mostrar usuarios en una tabla específica
function mostrarUsuariosEnTabla(usuarios, tablaId, accionLabel) {
    const tabla = document.getElementById(tablaId);

    // Limpiar la tabla antes de agregar nuevos datos
    tabla.innerHTML = '';

    // Crear encabezado de la tabla
    const encabezado = tabla.createTHead();
    const filaEncabezado = encabezado.insertRow();
    for (const key in usuarios[0]) {
        const th = document.createElement('th');
        th.textContent = key;
        filaEncabezado.appendChild(th);
    }
    // Agregar columna de acciones
    const thAcciones = document.createElement('th');
    thAcciones.textContent = 'Acciones';
    filaEncabezado.appendChild(thAcciones);

    // Crear filas de datos
    const cuerpoTabla = tabla.createTBody();
    usuarios.forEach(usuario => {
        const fila = cuerpoTabla.insertRow();
        for (const key in usuario) {
            const celda = fila.insertCell();
            celda.textContent = usuario[key];
        }

        // Agregar botón de acción
        const celdaAcciones = fila.insertCell();
        const botonAccion = document.createElement('button');
        botonAccion.textContent = accionLabel;
        botonAccion.classList.add('btn', accionLabel === 'DAR DE BAJA' ? 'btn-danger' : 'btn-success');
        botonAccion.addEventListener('click', () => ejecutarAccion(usuario.id, accionLabel));
        celdaAcciones.appendChild(botonAccion);
    });
}

// Función para ejecutar la acción correspondiente (dar de baja o activar usuario)
async function ejecutarAccion(idUsuario, accionLabel) {
    try {
        const url = buildUrl('usuario', idUsuario);

        // Obtener la fila completa del usuario
        const filaUsuario = obtenerFilaUsuario(idUsuario);

        // Verificar si la fila se obtuvo correctamente
        if (!filaUsuario) {
            console.error(`Error al obtener la fila del usuario con ID ${idUsuario}`);
            return;
        }

        // Construir el cuerpo de la solicitud usando la fila completa
        const requestBody = {
            ...filaUsuario,
            estado: accionLabel === 'DAR DE BAJA' ? 'Cesado' : 'Activo'
        };

        // Mostrar la data que se está enviando
        console.log('Data enviada en la solicitud PUT:', requestBody);

        const response = await putData('usuario', idUsuario, requestBody);

        if (response && response.ok) {
            console.log(`Usuario con ID ${idUsuario} ${accionLabel}`);
            cargarUsuariosActivos();
            cargarUsuariosCesados();
        } else {
            const errorMessage = response ? await response.text() : 'Error desconocido';
            console.error(`Error al ${accionLabel.toLowerCase()} al usuario con ID ${idUsuario}: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error al ejecutar acción:', error);
    }
}

// Función para obtener la fila completa del usuario
function obtenerFilaUsuario(idUsuario) {
    // Obtener la tabla activa y cesada
    const tablaUsuariosActivos = $('#tablaUsuariosActivos').DataTable();
    const tablaUsuariosCesados = $('#tablaUsuariosCesados').DataTable();

    // Buscar la fila en ambas tablas
    const filaActivos = tablaUsuariosActivos.row(`[data-id="${idUsuario}"]`).data();
    const filaCesados = tablaUsuariosCesados.row(`[data-id="${idUsuario}"]`).data();

    // Retornar la fila encontrada o null si no se encuentra
    return filaActivos || filaCesados || null;
}

