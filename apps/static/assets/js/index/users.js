// Función para cargar y mostrar usuarios en la tabla
async function cargarUsuariosEnTabla(endpoint, tableId, estado) {
    try {
      const usuarios = await fetchData(endpoint);
      const usuariosFiltrados = usuarios.filter(usuario => usuario.estado === estado);

      // Obtener la referencia de la tabla
      const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];

      // Limpiar el contenido actual de la tabla
      table.innerHTML = '';

      // Llenar la tabla con los usuarios
      usuariosFiltrados.forEach(usuario => {
        const row = table.insertRow();
        row.insertCell(0).textContent = usuario.id;
        row.insertCell(1).textContent = usuario.usuario_nombres;
        row.insertCell(2).textContent = usuario.usuario_apellido_paterno;
        row.insertCell(3).textContent = usuario.usuario_apellido_materno
        row.insertCell(4).textContent = usuario.usuario_correo;
        row.insertCell(5).textContent = usuario.usuario_telefono;
        row.insertCell(6).textContent = usuario.estado;

        // Agregar botón de acción
        const cell = row.insertCell(7);
        const btn = document.createElement('button');
        btn.textContent = 'Cesado';
        btn.classList.add('btn', 'btn-danger'); // Estilo rojo de Bootstrap
        btn.innerHTML = '<i class="fas fa-user-slash"></i> Cesar';
        btn.addEventListener('click', () => cambiarEstado(usuario, tableId));
        cell.appendChild(btn);
        });
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    }

    // Función para cambiar el estado de un usuario a "Cesado"
    async function cambiarEstado(usuario, tableId) {
        try {
        // Actualizar el estado del usuario a "Cesado"
        usuario.estado = 'Cesado';
        await putData('usuario', usuario.id, usuario);
    
        // Recargar la tabla correspondiente
        await cargarUsuariosEnTabla('usuario', tableId, 'Cesado');
        } catch (error) {
        console.error('Error al cambiar el estado del usuario:', error);
        }
    }
  


    // Cargar usuarios activos y cesados al cargar la página
    window.onload = async function () {
      await cargarUsuariosEnTabla('usuario', 'tablaUsuariosActivos', 'Activo');
      await cargarUsuariosEnTabla('usuario', 'tablaUsuariosCesados', 'Cesado');
    };