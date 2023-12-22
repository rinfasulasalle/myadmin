//form07.js
function submitEstudioForm() {
    var formulario = document.getElementById('estudioForm');
    var datosEstudio = {
        trabajador: formulario.elements['trabajador'].value,
        id_estudio_nivel_educativo: formulario.elements['id_estudio_nivel_educativo'].value,
        id_estudio_situacion_especial: formulario.elements['id_estudio_situacion_especial'].value,
        id_regimen_laboral: formulario.elements['id_regimen_laboral'].value,
        id_regimen_aseguramiento: formulario.elements['id_regimen_aseguramiento'].value,
        id_institucion: formulario.elements['id_institucion'].value,
        id_carrera_educativa: formulario.elements['id_carrera_educativa'].value,
        id_estudio_capacitacion: formulario.elements['id_estudio_capacitacion'].value,
        id_estudio_especializacion: formulario.elements['id_estudio_especializacion'].value,
        estudio_fecha_colegiatura: formulario.elements['estudio_fecha_colegiatura'].value,
        id_sede_colegiatura: formulario.elements['id_sede_colegiatura'].value,
        condicion_estudio: formulario.elements['condicion_estudio'].value
    };

    console.log(datosEstudio);
    // Lógica para enviar datos a la API y mostrar el modal de confirmación
    postData('estudio', datosEstudio)
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