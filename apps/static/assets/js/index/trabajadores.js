/*
const apiUrl = 'http://62.72.11.15:3000/api/';
function buildUrl(endpoint) {
    if(endpoint.charAt(endpoint.length - 1) !== "/"){
        endpoint += "/"
    }
    return apiUrl + endpoint;
}
*/
//console.log()
//fetchData('usuario/')

//fetchData('contrato/')
async function obtenerDatosUsuario() {
    try {
        const datosUsuario = await fetchData('usuario/');
        console.log('USUARIOS: OBTENIDO');
        return datosUsuario;
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
    }
}
async function obtenerDatosTrabajador() {
    try {
        const datosTrabajador = await fetchData('trabajador/');
        console.log('TRABAJADOR: OBTENIDO');
        return datosTrabajador;
    } catch (error) {
        console.error('Error al obtener datos del trabajador:', error);
        throw error;
    }
}
async function obtenerDatosDireccion() {
    try {
        const datosDireccion = await fetchData('direccion/');
        console.log('DIRECCION: OBTENIDO');
        return datosDireccion;
    } catch (error) {
        console.error('Error al obtener datos del contrato:', error);
        throw error;
    }
}
async function obtenerDatosSueldo() {
    try {
        const datosSueldo = await fetchData('sueldo/');
        console.log('SUELDOS: OBTENIDO');
        return datosSueldo;
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
    }
}
async function obtenerDatosCuentaBancaria() {
    try {
        const datosCuentaBancaria = await fetchData('cuenta_bancaria/');
        console.log('CUENTA BANC: OBTENIDO');
        return datosCuentaBancaria;
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
    }
}
async function obtenerDatosContrato() {
    try {
        const datosContrato = await fetchData('contrato/');
        console.log('CONTRATOS: OBTENIDO');
        return datosContrato;
    } catch (error) {
        console.error('Error al obtener datos del contrato:', error);
        throw error;
    }
}
async function obtenerDatosEstudio() {
    try {
        const datosEstudio = await fetchData('estudio/');
        console.log('ESTUDIO: OBTENIDO');
        return datosEstudio;
    } catch (error) {
        console.error('Error al obtener datos del contrato:', error);
        throw error;
    }
}
async function llenarTablaCompleta() {
    try {
        const datosUsuario = await obtenerDatosUsuario();
        const datosTrabajador = await obtenerDatosTrabajador();
        const datosDireccion = await obtenerDatosDireccion();
        const datosSueldo = await obtenerDatosSueldo();
        const datosCuentaBancaria = await obtenerDatosCuentaBancaria();
        const datosContrato = await obtenerDatosContrato();
        const datosEstudio = await obtenerDatosEstudio();
        const table = $('#example1').DataTable();

        datosUsuario.forEach((datoUsuario, index) => {
            const datoTrabajador = datosTrabajador[index];
            const datoDireccion = datosDireccion[index];
            const datoSueldo = datosSueldo[index];
            const datoCuentaBancaria = datosCuentaBancaria[index];
            const datoContrato = datosContrato[index];

            table.row.add([
                datoUsuario.id,
                datoUsuario.usuario_nombres,
                datoUsuario.usuario_apellido_paterno,
                datoUsuario.usuario_apellido_materno,
                datoUsuario.usuario_telefono,
                datoTrabajador.trabajador_fecha_nacimiento,
                datoTrabajador.trabajador_tipo_documento,
                datoTrabajador.trabajador_nacionalidad,
                datoTrabajador.trabajador_estado_civil,
                datoTrabajador.trabajador_ubigeo,
                datoTrabajador.trabajador_fecha_ingreso_sistema,
                datoTrabajador.trabajador_fecha_ingreso,
                datoTrabajador.trabajador_exp_previa,
                datoTrabajador.trabajador_edad,
                datoTrabajador.trabajador_record,
                datoTrabajador.trabajador_total_anios_exp,
                datoDireccion.direccion_pais,
                datoDireccion.direccion_departamento,
                datoDireccion.direccion_provincia,
                datoDireccion.direccion_distrito,
                datoDireccion.direccion_detalle,
                datoSueldo.sueldo_valor_basico,
                datoSueldo.sueldo_asigfam_porcentaje,
                datoSueldo.sueldo_bono_porcentaje,
                datoSueldo.sueldo_asignacion_familiar,
                datoSueldo.sueldo_monto_bono,
                datoSueldo.sueldo_mensual,
                datoSueldo.sueldo_anual,
                datoCuentaBancaria.cuenta_bancaria_sueldo_banco,
                datoCuentaBancaria.cuenta_bancaria_sueldo_codigo,
                datoCuentaBancaria.cuenta_bancaria_cts_codigo_cci,
                datoCuentaBancaria.cuenta_bancaria_cts_codigo,//tipo?? OK
                datoContrato.id_contrato_tipo,
                datoContrato.id_contrato_opcion,
                datoContrato.id_empleo_tipo,
                datoContrato.id_empleo_situacion,
                datoContrato.id_empleo_area,
                datoContrato.id_empleo_proyecto,
                datoContrato.empleo_departamento,
                datoContrato.empleo_cargo,


            ]).draw(false);
        });
    } catch (error) {
        console.error('Error al llenar la tabla:', error);
        throw error;
    }
}

$(document).ready(function () {
    llenarTablaCompleta();
});
