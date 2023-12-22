document.addEventListener('DOMContentLoaded', async function () {
    const dropdownsToLoad = [
        { endpoint: 'dropdown_roles', dropdownId: 'id_usuario_rol' },
        // Contrato
        { endpoint: 'dropdown_tipo_contrato', dropdownId: 'id_contrato_tipo' },
        { endpoint: 'dropdown_contrato_opcion', dropdownId: 'id_contrato_opcion'},
        { endpoint: 'dropdown_empleo_tipo', dropdownId: 'id_empleo_tipo'},
        { endpoint: 'dropdown_empleo_situacion', dropdownId: 'id_empleo_situacion'},
        { endpoint: 'dropdown_areas', dropdownId: 'id_empleo_area'},
        { endpoint: 'dropdown_proyecto', dropdownId: 'id_empleo_proyecto'},
        { endpoint: 'dropdown_rol_proyecto', dropdownId: 'id_empleo_proyecto_rol'},
        // Estudios
        { endpoint: 'dropdown_nivel_educativo', dropdownId: 'id_estudio_nivel_educativo'},
        { endpoint: 'dropdown_situaciones_especiales', dropdownId: 'id_estudio_situacion_especial'},
        { endpoint: 'dropdown_regimen_laboral', dropdownId: 'id_regimen_laboral'},
        { endpoint: 'dropdown_regimen_aseguramiento', dropdownId: 'id_regimen_aseguramiento'},
        { endpoint: 'dropdown_instituciones', dropdownId: 'id_institucion'},
        { endpoint: 'dropdown_carreras', dropdownId: 'id_carrera_educativa'},
        { endpoint: 'dropdown_capacitaciones', dropdownId: 'id_estudio_capacitacion'},
        { endpoint: 'dropdown_especializaciones', dropdownId: 'id_estudio_especializacion'},
        { endpoint: 'dropdown_sedes', dropdownId: 'id_sede_colegiatura'}
    ];

    for (const dropdownInfo of dropdownsToLoad) {
        try {
            await populateDropdown(dropdownInfo.endpoint, dropdownInfo.dropdownId);
        } catch (error) {
            console.error(`Error loading ${dropdownInfo.endpoint}:`, error);
        }
    }
});

async function populateDropdown(endpoint, dropdownId) {
    try {
        const data = await fetchData(endpoint);
        const dropdown = document.getElementById(dropdownId);

        //console.log(`Fetched ${endpoint} data:`, data);

        if (data && data.length > 0) {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item[getPropertyName(endpoint)].trim();
                dropdown.appendChild(option);
            });
        } else {
            console.warn(`No ${endpoint} data found or the data is empty.`);
        }
    } catch (error) {
        console.error(`Error loading ${endpoint}:`, error);
    }
}

function getPropertyName(endpoint) {
    const endpointToPropertyMap = {
        'dropdown_roles': 'rol',
        'dropdown_rol_proyecto': 'rol_titulo',
        'dropdown_areas': 'area',
        'dropdown_tipo_contrato': 'tipo_contrato',
        'dropdown_contrato_opcion': 'opcion_contrato',
        'dropdown_empleo_tipo': 'tipo_empleo',
        'dropdown_empleo_situacion': 'situacion_empleo',
        'dropdown_proyecto': 'proyecto',
        'dropdown_nivel_educativo': 'nivel_educativo',
        'dropdown_situaciones_especiales': 'situacion_especial',
        'dropdown_regimen_laboral': 'regimen_laboral',
        'dropdown_regimen_aseguramiento': 'regimen_aseguramiento',
        'dropdown_instituciones': 'institucion',
        'dropdown_carreras': 'carrera',
        'dropdown_capacitaciones': 'capacitacion',
        'dropdown_especializaciones': 'especializacion',
        'dropdown_sedes': 'sede',
    };
    return endpointToPropertyMap[endpoint] || 'defaultPropertyName';
}