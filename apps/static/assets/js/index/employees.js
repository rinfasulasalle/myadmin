// Variables para el manejo de la paginación y búsqueda
let currentPage = 1;
const itemsPerPage = 10;

// Función para cargar datos de empleados
function loadEmployees(page) {
  axios
    .get("http://62.72.11.15:8090/usuarios")
    .then((response) => {
      const employees = response.data;
      const totalItems = response.data.totalElements;

      // Limpiar tabla antes de agregar nuevos datos
      const tableBody = document.querySelector("#employeesTable tbody");
      console.log(response);
      tableBody.innerHTML = "";

      // Llenar tabla con datos de empleados
      employees.forEach((employee) => {
        const row = `<tr>
                       <td>${employee.id}</td>
                       <td>${employee.usuario_nombres}</td>
                       <td>${employee.usuario_apellidos}</td>
                       <td>${employee.usuario_rol}</td>
                       <td>${employee.usuario_correo}</td>
                       <td>${employee.usuario_telefono}</td>

                     </tr>`;
        tableBody.innerHTML += row;
      });

      // Configurar paginación
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      $("#pagination").twbsPagination({
        totalPages: totalPages,
        visiblePages: 5,
        onPageClick: function (event, page) {
          currentPage = page;
          loadEmployees(currentPage);
        },
      });
    })
    .catch((error) => {
      console.error("Error al cargar empleados:", error);
    });
}

// Llamar a la función para cargar empleados al cargar la página
loadEmployees(currentPage);
