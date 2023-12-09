document.addEventListener("DOMContentLoaded", async function () {
    try {
        const rolesData = await fetchData("dropdown_roles/");
        console.log("Roles Data:", rolesData);

        const userData = await fetchData("usuario/");
        console.log("User Data:", userData);

        fillTable(userData, rolesData);
        setupEventListeners(rolesData);
        addAddUserButton(rolesData);
        setupSaveUserButton(rolesData);
    } catch (error) {
        console.error(error.message);
    }
});

function setupSaveUserButton(rolesData) {
    const saveUserButton = document.getElementById("addUserButton");
    if (saveUserButton) {
        saveUserButton.addEventListener("click", async () => {
            console.log("Save user button clicked");
            await saveAddUser(rolesData);
        });
    }
}

async function loadAndFillTable(rolesData) {
    try {
        const userData = await fetchData("usuario/");
        console.log("User Data:", userData);

        fillTable(userData, rolesData);
    } catch (error) {
        console.error(error.message);
    }
}

function fetchData(endpoint) {
    return fetch(`http://62.72.11.15:3000/api/${endpoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos de ${endpoint}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error(error.message);
        });
}

function fillTable(data, rolesData) {
    const tableBody = document.querySelector("#example1 tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla nuevamente

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
            <button class="btn btn-sm btn-info edit-btn" data-user-id="${user.id}">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
        </td>
    `;
    return row;
}

function appendRowToTable(user, rolesData) {
    const tableBody = document.querySelector("#example1 tbody");
    const newRow = createRow(user, rolesData);
    tableBody.appendChild(newRow);
}


function getRoleName(roleId, rolesData) {
    const role = rolesData.find(role => role.id === roleId);
    return role ? role.rol : "Rol no encontrado";
}

function addAddUserButton(rolesData) {
    const addUserButtonContainer = document.getElementById("example1");
    if (addUserButtonContainer) {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        button.textContent = "Agregar Usuario";
        button.addEventListener("click", () => showCreateUserForm(rolesData));

        addUserButtonContainer.appendChild(button);
    }
}

async function addUserFromForm(rolesData) {
    try {
        console.log("Attempting to add user");
        const newUser = {
            usuario_nombres: document.getElementById("newUserName").value,
            usuario_apellidos: document.getElementById("newUserLastName").value,
            id_usuario_rol: document.getElementById("newUserRole").value,
            usuario_correo: document.getElementById("newUserEmail").value,
            usuario_telefono: document.getElementById("newUserPhone").value,
            usuario_dni: document.getElementById("newUserDNI").value,
            usuario_contrasenia: document.getElementById("newUserPassword").value,
        };

        console.log("Nuevo usuario:", newUser);

        // Rest of the code...
    } catch (error) {
        console.error(error.message);
    }
}


  function appendRowToTable(user, rolesData) {
    const tableBody = document.querySelector("#example1 tbody");
    const newRow = createRow(user, rolesData);
    tableBody.appendChild(newRow);
  }
  async function fetchSendPostData(endpoint, data) {
    const url = `http://62.72.11.15:3000/api/${endpoint}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error al enviar datos a ${endpoint}`);
        }

        return response.json();
    } catch (error) {
        console.error(error.message);
    }
}




function setupEventListeners(rolesData) {
    const addUserForm = document.getElementById("addUserForm");
    if (addUserForm) {
        addUserForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            await addUserFromForm(rolesData);
        });
    }

    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const userId = event.target.dataset.userId;
            editUser(userId, rolesData);
        });
    });
}

async function updateTable(rolesData) {
    try {
        const userData = await fetchData("usuario/");
        fillTable(userData, rolesData);
    } catch (error) {
        console.error(error.message);
    }
}

function showCreateUserForm(rolesData) {
    const modalContent = `
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addUserModalLabel">Agregar Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addUserForm">
                        <div class="form-group">
                            <label for="newUserDNI">DNI:</label>
                            <input type="text" class="form-control" id="newUserDNI" required>
                        </div>
                        <div class="form-group">
                            <label for="newUserName">Nombres:</label>
                            <input type="text" class="form-control" id="newUserName" required>
                        </div>
                        <div class="form-group">
                            <label for="newUserLastName">Apellidos:</label>
                            <input type="text" class="form-control" id="newUserLastName" required>
                        </div>
                        <div class="form-group">
                            <label for="newUserRole">Rol:</label>
                            <select class="form-control" id="newUserRole" required>
                                ${getRoleOptions(rolesData)}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newUserEmail">Correo:</label>
                            <input type="email" class="form-control" id="newUserEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="newUserPhone">Teléfono:</label>
                            <input type="text" class="form-control" id="newUserPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="newUserPassword">Contraseña:</label>
                            <input type="password" class="form-control" id="newUserPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary" id="addUserButton">Guardar Usuario</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalContent);

    $("#addUserModal").modal("show");
}

async function saveAddUser(rolesData) {
    try {
        const newUser = getUserDataFromForm();

        console.log("Nuevo usuario:", newUser);

        // Utiliza la función fetchSendPostData para enviar la solicitud POST
        await fetchSendPostData("usuario/", newUser);

        // Solo realiza una solicitud GET después de agregar el usuario
        const updatedUserData = await fetchData("usuario/");
        updateTable(updatedUserData, rolesData);
        closeAndClearModal("addUserModal");
    } catch (error) {
        handleServerError("Error al agregar usuario");
    }
}

function getUserDataFromForm() {
    return {
        usuario_nombres: document.getElementById("newUserName").value,
        usuario_apellidos: document.getElementById("newUserLastName").value,
        id_usuario_rol: document.getElementById("newUserRole").value,
        usuario_correo: document.getElementById("newUserEmail").value,
        usuario_telefono: document.getElementById("newUserPhone").value,
        usuario_dni: document.getElementById("newUserDNI").value,
        usuario_contrasenia: document.getElementById("newUserPassword").value,
    };
}


async function addNewUser(rolesData) {
    try {
        const newUser = {
            usuario_nombres: getValueById("newUserName"),
            usuario_apellidos: getValueById("newUserLastName"),
            id_usuario_rol: getValueById("newUserRole"),
            usuario_correo: getValueById("newUserEmail"),
            usuario_telefono: getValueById("newUserPhone"),
            usuario_dni: getValueById("newUserDNI"),
            usuario_contrasenia: getValueById("newUserPassword"),
        };

        // Utilize the function fetchSendPostData to send the POST request
        const response = await fetchSendPostData("usuario/", newUser);

        if (response.ok) {
            const createdUser = await response.json();
            console.log(`Usuario con ID ${createdUser.id} agregado con éxito`);

            // Update the table with the new user
            appendRowToTable(createdUser, rolesData);

            // Close the modal after adding the user
            closeAndClearModal("addUserModal");
        } else {
            console.error(`Error al agregar usuario: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}


function closeAndClearModal(modalId) {
    // Cierra el modal utilizando Bootstrap
    $(`#${modalId}`).modal("hide");

    // Limpia el contenido del modal para futuras aperturas
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        modalElement.innerHTML = "";
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
                            <input type="text" class="form-control" id="editUserName" value="${user.usuario_nombres}" required>
                    
                    
                    
                    
                            </div>
                        <div class="form-group">
                            <label for="editUserLastName">Apellidos:</label>
                            <input type="text" class="form-control" id="editUserLastName" value="${user.usuario_apellidos}" required>
                        </div>
                        <div class="form-group">
                            <label for="editUserRole">Rol:</label>
                            <select class="form-control" id="editUserRole" required>
                                ${getRoleOptions(rolesData, user.id_usuario_rol)}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editUserEmail">Correo:</label>
                            <input type="email" class="form-control" id="editUserEmail" value="${user.usuario_correo}" required>
                        </div>
                        <div class="form-group">
                            <label for="editUserPhone">Teléfono:</label>
                            <input type="text" class="form-control" id="editUserPhone" value="${user.usuario_telefono}" required>
                        
                        </div>

                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Mostrar el modal
    $("#editUserModal").modal("show");

    // Configurar el evento de envío del formulario de edición de usuario
    const editUserForm = document.getElementById("editUserForm");
    if (editUserForm) {
        editUserForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const editedUser = {
                usuario_nombres: document.getElementById("editUserName").value,
                usuario_apellidos: document.getElementById("editUserLastName").value,
                id_usuario_rol: document.getElementById("editUserRole").value,
                usuario_correo: document.getElementById("editUserEmail").value,
                usuario_telefono: document.getElementById("editUserPhone").value,
            };
            saveEditedUser(user.id, editedUser);
        });
    }
}

function getRoleOptions(rolesData, selectedRoleId) {
    return rolesData.map(role => `
        <option value="${role.id}" ${role.id === selectedRoleId ? 'selected' : ''}>${role.rol}</option>
    `).join('');
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
            await updateTable(rolesData); // Actualizar la tabla después de la edición
        } else {
            console.error(`Error al actualizar usuario con ID ${userId}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function editUser(userId, rolesData) {
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


