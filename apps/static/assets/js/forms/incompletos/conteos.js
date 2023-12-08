// pruebas.js

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

actualizarContador('usuario/', 'usuarios-contador');
actualizarContador('trabajador/', 'trabajadores-contador');
actualizarContador('contrato/','contratos-contador');
actualizarContador('cuenta_bancaria/','cuentas_bancarias-contador');
actualizarContador('direccion/','direcciones-contador');
actualizarContador('estudio/','estudios-contador');
actualizarContador('sueldo/','sueldos-contador');
