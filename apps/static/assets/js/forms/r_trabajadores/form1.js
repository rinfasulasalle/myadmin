// form1.js

// Función para enviar el formulario al servidor
async function submitForm1() {
    try {
        // Obtener los valores de los campos del formulario
        const nombres = document.getElementById('usuarioNombres').value;
        const apellidos = document.getElementById('usuarioApellidos').value;
        const correo = document.getElementById('usuarioCorreo').value;
        const contrasenia = document.getElementById('usuarioContrasenia').value;
        const telefono = document.getElementById('usuarioTelefono').value;
        const rol = document.getElementById('usuarioRol').value;

        // Verificar que los campos necesarios no estén vacíos
        if (!nombres || !apellidos || !correo || !contrasenia || !telefono || !rol) {
            alert('Por favor, completa todos los campos antes de enviar el formulario.');
            return;
        }

        // Construir el objeto de datos a enviar al servidor
        const userData = {
            nombres,
            apellidos,
            correo,
            contrasenia,
            telefono,
            rol,
        };

        // Enviar los datos al servidor utilizando la función postData
        await postData('usuario', userData);

        // Mostrar un mensaje de éxito o realizar otras acciones después de enviar los datos
        alert('Usuario registrado exitosamente');

        // Puedes redirigir a otra página o hacer cualquier otra acción que necesites después de registrar al usuario
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        // Puedes manejar el error de alguna manera si es necesario
    }
}
