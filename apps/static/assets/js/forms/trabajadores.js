document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch data from the 'dropdown_roles' endpoint
        const rolesData = await fetchData('dropdown_roles');

        // Select the dropdown element
        const idUsuarioRolDropdown = document.getElementById('id_usuario_rol');

        // Log the fetched data to the console for debugging
        console.log('Fetched roles data:', rolesData);

        // Check if the rolesData array is not empty
        if (rolesData && rolesData.length > 0) {
            // Iterate over the rolesData and populate the dropdown
            rolesData.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id; // Assuming each role object has an 'id' property
                option.textContent = role.rol.trim(); // Trim spaces from the role name
                idUsuarioRolDropdown.appendChild(option);
            });
        } else {
            console.warn('No roles data found or the data is empty.');
        }
    } catch (error) {
        console.error('Error loading roles:', error);
    }
});