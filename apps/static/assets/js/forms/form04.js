//form04.js
function submitCuentaBancariaForm() {
    var formulario = document.getElementById('cuentaBancariaForm');

    var datosCuentaBancaria = {
        trabajador: formulario.elements['trabajador'].value,
        cuenta_bancaria_sueldo_codigo_cci: formulario.elements['cuenta_bancaria_sueldo_codigo_cci'].value,
        cuenta_bancaria_sueldo_codigo: formulario.elements['cuenta_bancaria_sueldo_codigo'].value,
        cuenta_bancaria_sueldo_banco: formulario.elements['cuenta_bancaria_sueldo_banco'].value,
        cuenta_bancaria_cts_codigo_cci: formulario.elements['cuenta_bancaria_cts_codigo_cci'].value,
        cuenta_bancaria_cts_codigo: formulario.elements['cuenta_bancaria_cts_codigo'].value,
        cuenta_bancaria_cts_banco: formulario.elements['cuenta_bancaria_cts_banco'].value
    };

    console.log(datosCuentaBancaria);

    postData('cuenta_bancaria', datosCuentaBancaria)
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
