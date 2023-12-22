//form05.js
function submitDireccionForm() {
    var formulario = document.getElementById('direccionForm');

    var datosDireccion = {
        trabajador: formulario.elements['trabajador'].value,
        direccion_pais: formulario.elements['direccion_pais'].value,
        direccion_departamento: formulario.elements['direccion_departamento'].value,
        direccion_provincia: formulario.elements['direccion_provincia'].value,
        direccion_distrito: formulario.elements['direccion_distrito'].value,
        direccion_detalle: formulario.elements['direccion_detalle'].value
    };

    console.log(datosDireccion);
    postData('direccion', datosDireccion)
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
