// dropdowns.js
document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.getElementById('dropdownOptions');
    var confirmarButton = document.getElementById('confirmarButton');
    var resultCard = document.getElementById('resultCard');
    var resultCardBody = document.getElementById('resultCardBody');
    var tableContainer = document.getElementById('tableContainer');

    // Objeto con las opciones y etiquetas personalizadas
    var opciones = [
        { value: 'dropdown_roles', label: 'Dropdown de Roles' },
        { value: 'dropdown_rol_proyecto', label: 'Dropdown de Rol de Proyecto' },
        { value: 'dropdown_areas', label: 'Dropdown de Áreas' },
        { value: 'dropdown_tipo_contrato', label: 'Dropdown de Tipo de Contrato' },
        { value: 'dropdown_contrato_opcion', label: 'Dropdown de Opción de Contrato' },
        { value: 'dropdown_empleo_tipo', label: 'Dropdown de Tipo de Empleo' },
        { value: 'dropdown_empleo_situacion', label: 'Dropdown de Situación de Empleo' },
        { value: 'dropdown_proyecto', label: 'Dropdown de Proyecto' },
        { value: 'dropdown_nivel_educativo', label: 'Dropdown de Nivel Educativo' },
        { value: 'dropdown_situaciones_especiales', label: 'Dropdown de Situaciones Especiales' },
        { value: 'dropdown_regimen_laboral', label: 'Dropdown de Régimen Laboral' },
        { value: 'dropdown_regimen_aseguramiento', label: 'Dropdown de Régimen de Aseguramiento' },
        { value: 'dropdown_instituciones', label: 'Dropdown de Instituciones' },
        { value: 'dropdown_carreras', label: 'Dropdown de Carreras' },
        { value: 'dropdown_capacitaciones', label: 'Dropdown de Capacitaciones' },
        { value: 'dropdown_especializaciones', label: 'Dropdown de Especializaciones' },
        { value: 'dropdown_sedes', label: 'Dropdown de Sedes' },
    ];

    // Llena el dropdown con las opciones
    opciones.forEach(function (opcion) {
        var option = document.createElement('option');
        option.value = opcion.value;
        option.text = opcion.label;
        dropdown.add(option);
    });

    confirmarButton.addEventListener('click', async function () {
        var selectedValue = dropdown.value;

        try {
            var data = await fetchData(selectedValue);

            resultCardBody.innerHTML = "";

            var table = document.createElement('table');
            table.className = 'table table-bordered table-striped';

            var thead = document.createElement('thead');
            var tr = document.createElement('tr');

            for (var key in data[0]) {
                var th = document.createElement('th');
                th.textContent = key;
                tr.appendChild(th);
            }

            // Añade dos columnas adicionales para los botones de editar y eliminar
            tr.innerHTML += '<th>Editar</th><th>Eliminar</th>';

            thead.appendChild(tr);
            table.appendChild(thead);

            var tbody = document.createElement('tbody');

            data.forEach(function (item) {
                tr = document.createElement('tr');

                for (var key in item) {
                    var td = document.createElement('td');
                    td.textContent = item[key];
                    tr.appendChild(td);
                }

                // Añade botones de editar y eliminar con eventos onClick
                tr.innerHTML += '<td><button class="btn btn-warning btn-sm editar-btn">Editar</button></td>' +
                                '<td><button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button></td>';

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);

            resultCardBody.appendChild(table);

            resultCard.style.display = 'block';

            // Añade eventos de clic a los botones de editar y eliminar
            document.querySelectorAll('.editar-btn').forEach(function (button, index) {
                button.addEventListener('click', function () {
                    mostrarDatosModal(data[index]);
                });
            });

            document.querySelectorAll('.eliminar-btn').forEach(function (button, index) {
                button.addEventListener('click', function () {
                    eliminarDato(data[index]);
                });
            });

        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    });

    function mostrarDatosModal(data) {
        // Abre el modal
        $('#editarModal').modal('show');
    
        // Limpia el contenido anterior del modal
        var modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = '';
    
        // Agrega campos de formulario al modal para cada propiedad en los datos
        for (var key in data) {
            var input = document.createElement('input');
            input.type = 'text';
            input.id = 'edit' + key;
            input.value = data[key];
            input.className = 'form-control';
            var label = document.createElement('label');
            label.for = 'edit' + key;
            label.textContent = key + ': ';
    
            modalBody.appendChild(label);
            modalBody.appendChild(input);
        }
    }
    
    document.getElementById('guardarCambiosBtn').addEventListener('click', function () {
        // Recopila los cambios del formulario modal
        var cambios = {};
        document.querySelectorAll('[id^="edit"]').forEach(function (input) {
            var key = input.id.replace('edit', '');
            cambios[key] = input.value;
        });
    
        // Aquí puedes enviar los cambios al servidor usando una función como fetchData
        // reemplaza este bloque con tu lógica de envío de datos al servidor
        fetchData('tu_endpoint_de_edicion', cambios)
            .then(function (respuesta) {
                // Lógica después de enviar los cambios (puedes cerrar el modal, actualizar la página, etc.)
                console.log('Cambios guardados:', respuesta);
                $('#editarModal').modal('hide');
            })
            .catch(function (error) {
                console.error('Error al guardar cambios:', error);
            });
    });
});
