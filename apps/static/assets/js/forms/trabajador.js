//Se ejecuta al iniciar
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const rolesData = await fetchData("dropdown_roles/");
    const selectRol = document.getElementById("id_usuario_rol");
    
    rolesData.forEach(element => {
      selectRol.innerHTML += `<option value=${element.id}> ${element.rol} </option`;
    });
  } catch (error) {
      console.error(error.message);
  }
});

//El DNI se copia en los demás formularios
document.getElementById("dni").addEventListener("change", (event)=>{
  const dniTrajabadores = document.getElementById("dni-trabajadores");
  const dniEstudios = document.getElementById("dni-estudios");
  dniEstudios.value = dniTrajabadores.value = event.target.value;
});

//Envía los datos del formulario
document.getElementById("formh-usuarios").addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target);
  console.log(Object.fromEntries(formData));
  await fetchSendPostData("usuario/", Object.fromEntries(formData) )
});

//Envia los datos del 2do formulario trabajadores
document.getElementById("formh-trabajadores").addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target);
  let dataObj = Object.fromEntries(formData);

  dataObj.trabajador_record = 0;
  dataObj.trabajador_edad = 0;
  dataObj.trabajador_total_anios_exp = 0;
  dataObj.trabajador_path_doc_estado_civil = "PATH/"+dataObj.usuario_relacionado+".pdf"
  dataObj.trabajador_path_documento = "DNI/"+dataObj.usuario_relacionado+".pdf"
  let hoy = new Date()
  dataObj.trabajador_fecha_ingreso_sistema = hoy.toISOString().substring(0, 10);
  console.log(dataObj);

  await fetchSendPostData("trabajador/", dataObj)
});