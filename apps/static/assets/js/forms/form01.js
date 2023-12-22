//form01.js
function submitUsuarioForm() {
    var formulario = document.getElementById('usuarioForm');
    // Crear un objeto para almacenar los datos del formulario
    var datosUsuario = {
      id: formulario.elements['id'].value,
      usuario_nombres: formulario.elements['usuario_nombres'].value,
      usuario_apellido_paterno: formulario.elements['usuario_apellido_paterno'].value,
      usuario_apellido_materno: formulario.elements['usuario_apellido_materno'].value,
      usuario_correo: formulario.elements['usuario_correo'].value,
      usuario_contrasenia: formulario.elements['id'].value, // Asignar el valor del DNI como contraseña
      usuario_telefono: formulario.elements['usuario_telefono'].value,
      estado: formulario.elements['estado'].value,
      id_usuario_rol: formulario.elements['id_usuario_rol'].value
    };

    console.log(datosUsuario);
    // Lógica para enviar datos a la API y mostrar el modal de confirmación
    postData('usuario', datosUsuario)
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
