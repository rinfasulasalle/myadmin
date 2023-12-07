// my_graphics.js

// Función para generar un color aleatorio en formato rgba
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
}

// Función para el gráfico de HEADCOUNT POR SEXO
function renderHeadcountSexoChart() {
    fetchData('trabajador/')
        .then(data => {
            // Realiza el conteo por trabajador_sexo
            const conteoPorSexo = data.reduce((conteo, trabajador) => {
                const sexo = trabajador.trabajador_sexo;
                conteo[sexo] = (conteo[sexo] || 0) + 1;
                return conteo;
            }, {});

            // Obtiene las etiquetas y datos para el gráfico
            const labels = Object.keys(conteoPorSexo);
            const datos = Object.values(conteoPorSexo);
            // Crea un array de colores variados
            const colores = labels.map((_, index) => getRandomColor());

            // Configura el gráfico
            const config = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad por Sexo',
                        data: datos,
                        backgroundColor: colores,
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0,
                                beginAtZero: true
                            }
                        }]
                    }
                },
            };

            // Obtén el contexto del canvas y crea el gráfico
            const ctx = document.getElementById('headcountSexoChart').getContext('2d');
            new Chart(ctx, config);
        })
        .catch(error => {
            console.error('Error al obtener datos de trabajadores:', error);
        });
}

// Función para el gráfico de HEADCOUNT PRO PROYECTO
function renderHeadcountProProyectoChart() {
  // Código específico para llenar el gráfico de HEADCOUNT PRO PROYECTO
}
  
// Función para el gráfico de HEADCOINT POR AREA
function renderHeadcountPorAreaChart() {
  // Código específico para llenar el gráfico de HEADCOINT POR AREA
}
  
// Función para el gráfico de NACIONALIDAD
function renderNacionalidadChart() {
  fetchData('trabajador/')
      .then(data => {
          // Realiza el conteo por trabajador_nacionalidad
          const conteoPorNacionalidad = data.reduce((conteo, trabajador) => {
              const nacionalidad = trabajador.trabajador_nacionalidad;
              conteo[nacionalidad] = (conteo[nacionalidad] || 0) + 1;
              return conteo;
          }, {});

          // Obtiene las etiquetas y datos para el gráfico
          const labels = Object.keys(conteoPorNacionalidad);
          const datos = Object.values(conteoPorNacionalidad);
          // Crea un array de colores variados
          const colores = labels.map((_, index) => getRandomColor());

          // Configura el gráfico
          const config = {
              type: 'bar',
              data: {
                  labels: labels,
                  datasets: [{
                      label: 'Cantidad por Nacionalidad',
                      data: datos,
                      backgroundColor: colores,
                  }],
              },
              options: {
                  scales: {
                      yAxes: [{
                          display: true,
                          ticks: {
                              suggestedMin: 0,
                              beginAtZero: true
                          }
                      }]
                  }
              },
          };

          // Obtén el contexto del canvas y crea el gráfico
          const ctx = document.getElementById('nacionalidadChart').getContext('2d');
          new Chart(ctx, config);
      })
      .catch(error => {
          console.error('Error al obtener datos de trabajadores:', error);
      });
}

  
// Función para el gráfico de TIPO DE CONTRATO
function renderTipoContratoChart() {
  // Obtener datos de los tipos de contrato
  fetchData('dropdown_tipo_contrato/')
      .then(tiposContratoData => {
          // Obtener datos de los trabajadores
          fetchData('contrato/')
              .then(contratosData => {
                  // Mapear los nombres de los tipos de contrato por su id
                  const tiposContratoMap = {};
                  tiposContratoData.forEach(tipo => {
                      tiposContratoMap[tipo.id] = tipo.tipo_contrato;
                  });

                  // Realizar el conteo por tipo de contrato
                  const conteoPorTipoContrato = contratosData.reduce((conteo, contrato) => {
                      const tipoContratoId = contrato.id_contrato_tipo;
                      const tipoContratoNombre = tiposContratoMap[tipoContratoId];
                      conteo[tipoContratoNombre] = (conteo[tipoContratoNombre] || 0) + 1;
                      return conteo;
                  }, {});

                  // Obtener las etiquetas y datos para el gráfico
                  const labels = Object.keys(conteoPorTipoContrato);
                  const datos = Object.values(conteoPorTipoContrato);
                  // Crea un array de colores variados
                  const colores = labels.map((_, index) => getRandomColor());

                  // Configurar el gráfico
                  const config = {
                      type: 'pie',
                      data: {
                          labels: labels,
                          datasets: [{
                              data: datos,
                              backgroundColor: colores,
                          }],
                      },
                      options: {
                          responsive: true,
                      },
                  };

                  // Obtener el contexto del canvas y crear el gráfico
                  const ctx = document.getElementById('tipoContratoChart').getContext('2d');
                  new Chart(ctx, config);
              })
              .catch(error => {
                  console.error('Error al obtener datos de contratos:', error);
              });
      })
      .catch(error => {
          console.error('Error al obtener datos de tipos de contrato:', error);
      });
}


  
// Función para el gráfico de Nivel Educativo
function renderNivelEducativoChart() {
  // Código específico para llenar el gráfico de Nivel Educativo
}
  
// Función para el gráfico de INGENIEROS COLEGIADOS
function renderIngenierosColegiadosChart() {
  // Código específico para llenar el gráfico de INGENIEROS COLEGIADOS
}
  
// Función para el gráfico de ROL DE PROYECTO (Classification)
function renderRolProyectoChart() {
  // Código específico para llenar el gráfico de ROL DE PROYECTO (Classification)
}
  
// Llamadas a las funciones para renderizar los gráficos
renderHeadcountSexoChart();
renderHeadcountProProyectoChart();
renderHeadcountPorAreaChart();
renderNacionalidadChart();
renderTipoContratoChart();
renderNivelEducativoChart();
renderIngenierosColegiadosChart();
renderRolProyectoChart();

async function mostrarTotales() {
  try {
    // Obtener el total de usuarios
    const totalUsuarios = await obtenerTotalUsuarios();

    // Obtener el total de trabajadores
    const totalTrabajadores = await obtenerTotalTrabajadores();

    // Mostrar los totales en los elementos HTML
    document.getElementById('totalUsuarios').textContent = totalUsuarios;
    document.getElementById('totalTrabajadores').textContent = totalTrabajadores;
  } catch (error) {
    console.error('Error al obtener los totales:', error);
  }
}

// Llamada inicial para mostrar los totales después de renderizar los gráficos
mostrarTotales();