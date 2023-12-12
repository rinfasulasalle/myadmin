// dropdowns.js
document.addEventListener('DOMContentLoaded', function () {
    // Obtén la referencia al elemento del dropdown
    var dropdown = document.getElementById('dropdownOptions');
    var confirmarButton = document.getElementById('confirmarButton');
    var resultCard = document.getElementById('resultCard');
    var resultCardBody = document.getElementById('resultCardBody');

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
    confirmarButton.addEventListener('click', function () {
        // Obtén el valor seleccionado del dropdown
        var selectedValue = dropdown.value;

        // Muestra el resultado en la tarjeta
        resultCardBody.textContent = "Seleccionaste: " + selectedValue;

        // Muestra la tarjeta
        resultCard.style.display = 'block';
    });
});
