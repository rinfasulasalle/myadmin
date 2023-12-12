// datos_globales.js

// Función para cargar y mostrar datos en la tabla usando DataTables
async function cargarDatosGlobales() {
    try {
      const datosGlobales = await fetchData('datosglobales');
      const tableBody = $('#datosGlobalesTable tbody');
  
      // Limpiar tabla antes de cargar datos
      tableBody.empty();
  
      // Iterar sobre datos y agregar filas a la tabla
      datosGlobales.forEach((dato) => {
        const row = `
          <tr>
            <td>${dato.id}</td>
            <td>${dato.columna1}</td>
            <td>${dato.columna2}</td>
            <!-- ... Agrega más celdas según tu estructura de datos ... -->
            <td>
              <button class="btn btn-info btn-sm" onclick="editarDato(${dato.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarDato(${dato.id})">Eliminar</button>
            </td>
          </tr>
        `;
        tableBody.append(row);
      });
  
      // Inicializar DataTable
      $('#datosGlobalesTable').DataTable();
    } catch (error) {
      console.error('Error al cargar datos globales:', error);
    }
  }
  
  // Llamada a la función para cargar datos cuando la página esté lista
  $(document).ready(function () {
    cargarDatosGlobales();
  });
  
  // Funciones CRUD (Editar y Eliminar)
  function editarDato(id) {
    // Implementar lógica de edición aquí
    console.log('Editar dato con ID:', id);
  }
  
  function eliminarDato(id) {
    // Implementar lógica de eliminación aquí
    console.log('Eliminar dato con ID:', id);
  }
  