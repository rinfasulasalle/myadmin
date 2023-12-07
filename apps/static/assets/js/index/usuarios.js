
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const rolesData = await fetchData("dropdown_roles/");
        console.log("Roles Data:", rolesData);

        const userData = await fetchData("usuario/");
        console.log("User Data:", userData);

        fillTable(userData, rolesData);
        setupEventListeners(rolesData);
    } catch (error) {
        console.error(error.message);
    }
});

function fillTable(data, rolesData) {
    const tableBody = document.querySelector("#example1 tbody");

    data.forEach(user => {
        const row = createRow(user, rolesData);
        tableBody.appendChild(row);
    });
}

function createRow(user, rolesData) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.usuario_nombres}</td>
        <td>${user.usuario_apellidos}</td>
        <td>${getRoleName(user.id_usuario_rol, rolesData)}</td>
        <td>${user.usuario_correo}</td>
        <td>${user.usuario_telefono}</td>
        <td>
            <button class="btn btn-sm btn-info" onclick="editUser(${user.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
        </td>
    `;
    return row;
}

function getRoleName(roleId, rolesData) {
    const role = rolesData.find(role => role.id === roleId);
    return role ? role.rol : "Rol no encontrado";
}

function setupEventListeners(rolesData) {
    const addUserButton = document.getElementById("addUserButton");
    if (addUserButton) {
        addUserButton.addEventListener("click", () => showCreateUserForm(rolesData));
    }

    // Agrega el botón de "Agregar Usuario" al contenedor
    const addUserButtonContainer = document.getElementById("addUserButtonContainer");
    if (addUserButtonContainer) {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.textContent = "Agregar Usuario";
        button.addEventListener("click", () => showCreateUserForm(rolesData));
        addUserButtonContainer.appendChild(button);
    }

    // Configura el evento de envío del formulario de agregar usuario
    const addUserForm = document.getElementById("addUserForm");
    if (addUserForm) {
        addUserForm.addEventListener("submit", (event) => {
            event.preventDefault();
            addUserFromForm(rolesData);
        });
    }
}


function showCreateUserForm(rolesData) {
    // Aquí puedes implementar la lógica para mostrar un formulario modal para crear un nuevo usuario
    // Puedes usar librerías como Bootstrap para los modales o implementar uno personalizado
    // Después de ingresar los detalles, llama a la función addUser con los datos ingresados
    console.log("Mostrar formulario para crear usuario");
}

async function addUserFromForm(rolesData) {
    try {
        const newUser = {
            usuario_nombres: document.getElementById("newUserName").value,
            usuario_apellidos: document.getElementById("newUserLastName").value,
            id_usuario_rol: document.getElementById("newUserRole").value,
            usuario_correo: document.getElementById("newUserEmail").value,
            usuario_telefono: document.getElementById("newUserPhone").value,
        };

        const response = await fetch("http://62.72.11.15:3000/api/usuario/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            const createdUser = await response.json();

            // Actualiza la interfaz de usuario
            const tableBody = document.querySelector("#example1 tbody");
            const newRow = createRow(createdUser, rolesData);
            tableBody.appendChild(newRow);

            // Cierra el modal
            $("#addUserModal").modal("hide");
        } else {
            console.error("Error al agregar usuario");
        }
    } catch (error) {
        console.error(error.message);
    }
}

function showEditUserModal(user, rolesData) {
    const modalContent = `
    <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog" aria-labelledby="editUserModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editUserModalLabel">Editar Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="editUserForm">
                    <div class="form-group">
                        <label for="editUserName">Nombres:</label>
                        <input type="text" class="form-control" id="editUserName" required>
                    </div>
                    <div class="form-group">
                        <label for="editUserLastName">Apellidos:</label>
                        <input type="text" class="form-control" id="editUserLastName" required>
                    </div>
                    <div class="form-group">
                        <label for="editUserRole">Rol:</label>
                        <select class="form-control" id="editUserRole" required>
                            <!-- Aquí debes llenar las opciones del rol -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editUserEmail">Correo:</label>
                        <input type="email" class="form-control" id="editUserEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="editUserPhone">Teléfono:</label>
                        <input type="text" class="form-control" id="editUserPhone" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </form>
            </div>
        </div>
    </div>
</div>

    `;

    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Obtener las opciones de roles y llenar el select
    const editUserRoleSelect = document.getElementById("editUserRole");
    rolesData.forEach(role => {
        const option = document.createElement("option");
        option.value = role.id;
        option.textContent = role.rol;
        editUserRoleSelect.appendChild(option);
    });

    // Mostrar el modal
    $("#editUserModal").modal("show");

    // Configurar el evento de envío del formulario de edición de usuario
    const editUserForm = document.getElementById("editUserForm");
    if (editUserForm) {
        editUserForm.addEventListener("submit", (event) => {
            event.preventDefault();
            editUser(user.id);
        });
    }
}
async function saveEditedUser(userId, editedUser) {
    try {
        const response = await fetch(`http://62.72.11.15:3000/api/usuario/${userId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        });

        if (response.ok) {
            console.log(`Usuario con ID ${userId} actualizado con éxito`);
            $("#editUserModal").modal("hide");
        } else {
            console.error(`Error al actualizar usuario con ID ${userId}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function editUser(userId) {
    try {
        const response = await fetch(`http://62.72.11.15:3000/api/usuario/${userId}/`);
        if (response.ok) {
            const userToEdit = await response.json();
            console.log("Editar usuario:", userToEdit);
            showEditUserModal(userToEdit, rolesData);
        } else {
            console.error(`Error al obtener detalles del usuario con ID ${userId}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}


async function deleteUser(userId) {
    try {
        // Realiza una solicitud DELETE al backend para eliminar el usuario
        const response = await fetch(`http://62.72.11.15:3000/api/usuario/${userId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(`Usuario con ID ${userId} eliminado con éxito`);

            // Obtén la interfaz de usuario
            const tableBody = document.querySelector('#example1 tbody');

            // Busca la fila correspondiente al usuario que se está eliminando
            const rowToDelete = tableBody.querySelector(`tr[data-user-id="${userId}"]`);

            // Elimina la fila
            if (rowToDelete) {
                tableBody.removeChild(rowToDelete);
            }
        } else {
            console.error(`Error al eliminar usuario con ID ${userId}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}


