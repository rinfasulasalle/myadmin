//form02.js
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function submitTrabajadorForm(){
    var formulario = document.getElementById('trabajadorForm');
    var datosTrabajador = {
        usuario_relacionado:formulario.elements['usuario_relacionado'].value,
        trabajador_tipo_documento: formulario.elements['trabajador_tipo_documento'].value,
        //trabajador_path_documento: formulario.elements['trabajador_path_documento'].value,
        trabajador_nacionalidad: formulario.elements['trabajador_nacionalidad'].value,
        trabajador_fecha_nacimiento: formatDate(formulario.elements['trabajador_fecha_nacimiento'].value),
        trabajador_ubigeo: formulario.elements['trabajador_ubigeo'].value,
        trabajador_sexo: formulario.elements['trabajador_sexo'].value,
        trabajador_estado_civil: formulario.elements['trabajador_estado_civil'].value,
        //trabajador_path_doc_estado_civil: formulario.elements['trabajador_path_doc_estado_civil'].value,
        trabajador_fecha_ingreso_sistema: formatDate(formulario.elements['trabajador_fecha_ingreso_sistema'].value),
        trabajador_fecha_ingreso: formatDate(formulario.elements['trabajador_fecha_ingreso'].value),
        trabajador_edad: 0,
        trabajador_record: 0.0,
        trabajador_exp_previa: formulario.elements['trabajador_exp_previa'].value,
        trabajador_total_anios_exp: 0.0,
    }
    console.log(datosTrabajador);
    
    postData('trabajador', datosTrabajador)
        .then(response => {
            console.log('Respuesta de la API:', response);

            if (response.id) {
                const errores = Object.values(response).flat().join('\n');
                mostrarModal('Error al enviar el formulario:\n' + errores, true);
            } else {
                mostrarModal('Formulario enviado correctamente', false);
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            mostrarModal('Error al enviar el formulario. Por favor, inténtalo nuevamente. ' + error.message, true);
        });
}