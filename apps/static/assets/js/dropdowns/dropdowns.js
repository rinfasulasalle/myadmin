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
        // Agrega más opciones según sea necesario
    ];

    // Llena el dropdown con las opciones
    opciones.forEach(function (opcion) {
        var option = document.createElement('option');
        option.value = opcion.value;
        option.text = opcion.label;
        dropdown.add(option);
    });
   // Evento click boton
   // Evento click boton
   confirmarButton.addEventListener('click', async function () {
    // Obtén el valor seleccionado del dropdown
    var selectedValue = dropdown.value;

    try {
        // Utiliza fetchData para obtener datos del endpoint seleccionado
        var data = await fetchData(selectedValue);

        // Muestra los datos en una tabla
        resultCardBody.innerHTML = ""; // Limpia el contenido anterior

        // Crea una tabla de Bootstrap
        var table = document.createElement('table');
        table.className = 'table table-bordered table-striped';

        // Crea la cabecera de la tabla
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');

        for (var key in data[0]) {
            var th = document.createElement('th');
            th.textContent = key;
            tr.appendChild(th);
        }

        thead.appendChild(tr);
        table.appendChild(thead);

        // Crea el cuerpo de la tabla
        var tbody = document.createElement('tbody');

        data.forEach(function (item) {
            tr = document.createElement('tr');

            for (var key in item) {
                var td = document.createElement('td');
                td.textContent = item[key];
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        // Agrega la tabla al contenedor
        resultCardBody.appendChild(table);

        // Muestra la tarjeta
        resultCard.style.display = 'block';
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
});
});
