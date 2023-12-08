//Se ejecuta al iniciar
document.addEventListener("DOMContentLoaded", async function () {
  try {
    fetchData("dropdown_roles/").then( data => {
      const select = document.getElementById("id_usuario_rol");

      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.rol} </option>`;
      });
    });

    fetchData("dropdown_nivel_educativo/").then( data => {
      const select = document.getElementById("id_estudio_nivel_educativo");
    
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.nivel_educativo} </option>`;
      });
    });

    fetchData("dropdown_sedes/").then( data => {
      const select = document.getElementById("id_sede_colegiatura");
    
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.sede} </option>`;
      });
    });

    fetchData("dropdown_situaciones_especiales/").then( data => {
      const select = document.getElementById("id_estudio_situacion_especial");
      
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.situacion_especial} </option>`;
      });
    });

    fetchData("dropdown_regimen_laboral/").then( data => {
      const select = document.getElementById("id_regimen_laboral");
      
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.regimen_laboral} </option>`;
      });
    });

    fetchData("dropdown_regimen_aseguramiento/").then( data => {
      const select = document.getElementById("id_regimen_aseguramiento");
      
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.regimen_aseguramiento} </option>`;
      });
    });

    fetchData("dropdown_instituciones/").then( data => {
      const select = document.getElementById("id_institucion");
      
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.institucion} </option>`;
      });
    });

    fetchData("dropdown_carreras/").then( data => {
      const select = document.getElementById("id_carrera_educativa");
      
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.carrera} </option>`;
      });
    });

    fetchData("dropdown_capacitaciones/").then( data => {
      const select = document.getElementById("id_estudio_capacitacion");
      
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.capacitacion} </option>`;
      });
    });

    fetchData("dropdown_especializaciones/").then( data => {
      const select = document.getElementById("id_estudio_especializacion");
      
      data.forEach(ele => {
        select.innerHTML += `<option value=${ele.id}> ${ele.especializacion} </option>`;
      });
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

//Envía los datos del 3er formulario
document.getElementById("formh-estudios").addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target);
  console.log(Object.fromEntries(formData));
  await fetchSendPostData("estudio/", Object.fromEntries(formData) )
});