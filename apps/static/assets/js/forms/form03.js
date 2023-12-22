//form03.js
function submitContratoForm() {
    var formulario = document.getElementById('contratoForm');

    var datosContrato = {
        trabajador: formulario.elements['trabajador'].value,
        id_contrato_tipo: formulario.elements['id_contrato_tipo'].value,
        id_contrato_opcion: formulario.elements['id_contrato_opcion'].value,
        id_empleo_tipo: formulario.elements['id_empleo_tipo'].value,
        id_empleo_situacion: formulario.elements['id_empleo_situacion'].value,
        id_empleo_area: formulario.elements['id_empleo_area'].value,
        id_empleo_proyecto: formulario.elements['id_empleo_proyecto'].value,
        id_empleo_proyecto_rol: formulario.elements['id_empleo_proyecto_rol'].value,
        empleo_departamento: formulario.elements['empleo_departamento'].value,
        empleo_cargo: formulario.elements['empleo_cargo'].value
    };

    console.log(datosContrato);
    postData('contrato', datosContrato)
    .then(response => {
        // Aquí puedes manejar la respuesta si es necesario
        console.log('Respuesta de la API:', response);
        // Muestra el modal de confirmación con la respuesta de la API
        mostrarModal('Formulario enviado correctamente: ' + response);
    })
    .catch(error => {
        // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
        console.error('Error al enviar los datos:', error);
        // Muestra el modal de error con el mensaje de error
        mostrarModal(error.message, true);
    });
}