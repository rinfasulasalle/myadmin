// conteo.js

function actualizarContador(endpoint, elementoId) {
  // Hacer la solicitud al servidor para obtener el número de elementos
  fetchData(endpoint)
    .then(data => {
      // Actualizar el contenido del contador con la longitud de los datos obtenidos
      document.getElementById(elementoId).innerText = data.length;
    })
    .catch(error => {
      console.error('Error al obtener datos:', error);
    });
}

// Función para encontrar usuarios no registrados en trabajadores
async function encontrarUsuariosNoRegistrados() {
  try {
    // Obtener datos de los endpoints 'usuario/' y 'trabajador/'
    const usuarios = await fetchData('usuario/');
    const trabajadores = await fetchData('trabajador/');

    // Obtener los IDs de usuarios y trabajadores
    const usuariosIds = usuarios.map(usuario => usuario.id);
    const trabajadoresIds = trabajadores.map(trabajador => trabajador.usuario_relacionado);

    // Encontrar usuarios no registrados
    const usuariosNoRegistrados = usuariosIds.filter(id => !trabajadoresIds.includes(id));

    // Mostrar usuarios no registrados en la lista
    const listaUsuariosNoRegistrados = document.getElementById('usuarios-no-registrados-en-trabajadores');
    listaUsuariosNoRegistrados.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

    if (usuariosNoRegistrados.length > 0) {
      const ul = document.createElement('ul');
      ul.classList.add('list-group');

      usuariosNoRegistrados.forEach(id => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `Usuario DNI: ${id}`;
        ul.appendChild(li);
      });

      listaUsuariosNoRegistrados.appendChild(ul);
    } else {
      const alert = document.createElement('div');
      alert.classList.add('alert', 'alert-info');
      alert.textContent = 'Todos los usuarios están registrados en trabajadores.';
      listaUsuariosNoRegistrados.appendChild(alert);
    }

  } catch (error) {
    console.error('Error al encontrar usuarios no registrados:', error);
  }
}

// Función para encontrar trabajadores no relacionados en el endpoint especificado
async function encontrarRegistrosNoRelacionados(endpoint) {
  try {
    // Obtener datos de los endpoints 'trabajador/' y el endpoint especificado
    const trabajadores = await fetchData('trabajador/');
    const registrosEspecificos = await fetchData(endpoint);

    // Obtener los trabajadores relacionados en 'trabajador/'
    const trabajadoresRelacionados = trabajadores.map(trabajador => trabajador.usuario_relacionado);

    // Encontrar trabajadores no relacionados
    const trabajadoresNoRelacionados = trabajadoresRelacionados.filter(trabajador => !registrosEspecificos.some(registro => registro.trabajador === trabajador));

    // Mostrar trabajadores no relacionados en la lista
    const resultadosTablaSeleccionada = document.getElementById('resultados-tabla-seleccionada');
    resultadosTablaSeleccionada.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

    if (trabajadoresNoRelacionados.length > 0) {
      const ul = document.createElement('ul');
      ul.classList.add('list-group');

      trabajadoresNoRelacionados.forEach(trabajador => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `DNI: ${trabajador}`;
        ul.appendChild(li);
      });

      resultadosTablaSeleccionada.appendChild(ul);
    } else {
      const alert = document.createElement('div');
      alert.classList.add('alert', 'alert-info');
      alert.textContent = `Todos los trabajadores están relacionados en ${endpoint}.`;
      resultadosTablaSeleccionada.appendChild(alert);
    }

  } catch (error) {
    console.error(`Error al encontrar trabajadores no relacionados en ${endpoint}:`, error);
  }
}


// Evento al hacer clic en el botón "Examinar"
function examinarTabla() {
  const tablaSeleccionada = document.getElementById('tabla-a-examinar');
  const endpointSeleccionado = tablaSeleccionada.value;

  if (endpointSeleccionado) {
    encontrarRegistrosNoRelacionados(endpointSeleccionado);
  } else {
    console.error('Error: Debes seleccionar una tabla para examinar.');
  }
}

// Actualizar contadores
actualizarContador('usuario/', 'usuarios-contador');
actualizarContador('trabajador/', 'trabajadores-contador');
actualizarContador('contrato/', 'contratos-contador');
actualizarContador('cuenta_bancaria/', 'cuentas_bancarias-contador');
actualizarContador('direccion/', 'direcciones-contador');
actualizarContador('estudio/', 'estudios-contador');
actualizarContador('sueldo/', 'sueldos-contador');

// Encontrar usuarios no registrados y mostrar en la lista
encontrarUsuariosNoRegistrados();