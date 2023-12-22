//form02.js
function submitSueldoForm() {
    var formulario = document.getElementById('sueldoForm');
    // Crear un objeto para almacenar los datos del formulario
    var datosSueldo = {
        trabajador: formulario.elements['trabajador'].value,
        sueldo_valor_basico: formulario.elements['sueldo_valor_basico'].value,
        sueldo_opc_asigfam: formulario.elements['sueldo_opc_asigfam'].checked,
        sueldo_opc_bono: formulario.elements['sueldo_opc_bono'].checked,
        sueldo_porcentaje_bono: formulario.elements['sueldo_porcentaje_bono'].value,
        sueldo_monto_asigfam: 0.0,
        sueldo_monto_bono: 0.0,
        sueldo_mensual: 0.0,
        sueldo_anual: 0.0,
    };

    console.log(datosSueldo);
    // Lógica para enviar datos a la API y mostrar el modal de confirmación
    postData('sueldo', datosSueldo)
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

function actualizarHabilitacionBono() {
    var checkboxBono = document.getElementById('sueldo_opc_bono');
    var inputPorcentajeBono = document.getElementById('sueldo_porcentaje_bono');

    // Habilita o deshabilita el campo según el estado del checkbox
    inputPorcentajeBono.disabled = !checkboxBono.checked;

    // Si el checkbox no está seleccionado, establece el valor de sueldo_porcentaje_bono en 0.0
    if (!checkboxBono.checked) {
        inputPorcentajeBono.value = '0.0';
    }
}

// Asocia la función a la propiedad onchange del checkbox
document.getElementById('sueldo_opc_bono').onchange = actualizarHabilitacionBono;

// Llama a la función una vez al cargar la página para establecer el estado inicial
actualizarHabilitacionBono();