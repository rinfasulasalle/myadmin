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
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad por Sexo',
                        data: datos,
                        backgroundColor: colores,
                    }],
                },
                options: {
                          responsive: true,
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
function renderheadcountPorProyectoChart() {
  // Obtener datos de los proyectos
  fetchData('dropdown_proyecto/')
      .then(proyectosData => {
          // Obtener datos de los contratos
          fetchData('contrato/')
              .then(contratosData => {
                  // Mapear los nombres de los proyectos por su id
                  const proyectosMap = {};
                  proyectosData.forEach(proyecto => {
                      proyectosMap[proyecto.id] = proyecto.proyecto;
                  });

                  // Realizar el conteo por proyecto
                  const conteoPorProyecto = contratosData.reduce((conteo, contrato) => {
                      const proyectoId = contrato.id_empleo_proyecto;
                      const proyectoNombre = proyectosMap[proyectoId];
                      conteo[proyectoNombre] = (conteo[proyectoNombre] || 0) + 1;
                      return conteo;
                  }, {});

                  // Obtener las etiquetas y datos para el gráfico
                  const labels = Object.keys(conteoPorProyecto);
                  const datos = Object.values(conteoPorProyecto);
                  // Crea un array de colores variados
                  const colores = labels.map((_, index) => getRandomColor());

                  // Configurar el gráfico
                  const config = {
                      type: 'bar',
                      data: {
                          labels: labels,
                          datasets: [{
                              label: 'Headcount por Proyecto',
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
                                  beginAtZero: true,
                              }
                          }]
                        }
                    },
                  };
                // Obtener el contexto del canvas y crear el gráfico
                const ctx = document.getElementById('headcountPorProyectoChart').getContext('2d');
                new Chart(ctx, config);
              })
              .catch(error => {
                  console.error('Error al obtener datos de contratos:', error);
              });
      })
      .catch(error => {
          console.error('Error al obtener datos de proyectos:', error);
      });
}

  
// Función para el gráfico de HEADCOINT POR AREA
function renderHeadcountPorAreaChart() {
  // Obtener datos de las áreas
  fetchData('dropdown_areas/')
      .then(areasData => {
          // Obtener datos de los contratos
          fetchData('contrato/')
              .then(contratosData => {
                  // Mapear los nombres de las áreas por su id
                  const areasMap = {};
                  areasData.forEach(area => {
                      areasMap[area.id] = area.area;
                  });

                  // Realizar el conteo por área
                  const conteoPorArea = contratosData.reduce((conteo, contrato) => {
                      const areaId = contrato.id_empleo_area;
                      const areaNombre = areasMap[areaId];
                      conteo[areaNombre] = (conteo[areaNombre] || 0) + 1;
                      return conteo;
                  }, {});

                  // Obtener las etiquetas y datos para el gráfico
                  const labels = Object.keys(conteoPorArea);
                  const datos = Object.values(conteoPorArea);
                  // Crea un array de colores variados
                  const colores = labels.map((_, index) => getRandomColor());

                  // Configurar el gráfico
                  const config = {
                      type: 'horizontalBar',
                      data: {
                          labels: labels,
                          datasets: [{
                              label: 'Headcount por Área',
                              data: datos,
                              backgroundColor: colores,
                          }],
                      },
                      options: {
                          scales: {
                              xAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                    beginAtZero: true,
                                }
                            }]
                          }
                      },
                  };

                  // Obtener el contexto del canvas y crear el gráfico
                  const ctx = document.getElementById('headcountPorAreaChart').getContext('2d');
                  new Chart(ctx, config);
              })
              .catch(error => {
                  console.error('Error al obtener datos de contratos:', error);
              });
      })
      .catch(error => {
          console.error('Error al obtener datos de áreas:', error);
      });
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
                            beginAtZero: true,
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
  // Obtener datos de los niveles educativos
  fetchData('dropdown_nivel_educativo/')
      .then(nivelesEducativosData => {
          // Obtener datos de los estudios
          fetchData('estudio/')
              .then(estudiosData => {
                  // Mapear los nombres de los niveles educativos por su id
                  const nivelesEducativosMap = {};
                  nivelesEducativosData.forEach(nivel => {
                      nivelesEducativosMap[nivel.id] = nivel.nivel_educativo;
                  });

                  // Realizar el conteo por nivel educativo
                  const conteoPorNivelEducativo = estudiosData.reduce((conteo, estudio) => {
                      const nivelEducativoId = estudio.id_estudio_nivel_educativo;
                      const nivelEducativoNombre = nivelesEducativosMap[nivelEducativoId];
                      conteo[nivelEducativoNombre] = (conteo[nivelEducativoNombre] || 0) + 1;
                      return conteo;
                  }, {});

                  // Obtener las etiquetas y datos para el gráfico
                  const labels = Object.keys(conteoPorNivelEducativo);
                  const datos = Object.values(conteoPorNivelEducativo);
                  // Crea un array de colores variados
                  const colores = labels.map((_, index) => getRandomColor());

                  // Configurar el gráfico
                  const config = {
                      type: 'horizontalBar',
                      data: {
                          labels: labels,
                          datasets: [{
                              label: 'Nivel Educativo',
                              data: datos,
                              backgroundColor: colores,
                          }],
                      },
                      options: {
                        scales: {
                          xAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0,
                                beginAtZero: true,
                            }
                        }]
                      }
                      },
                  };

                  // Obtener el contexto del canvas y crear el gráfico
                  const ctx = document.getElementById('nivelEducativoChart').getContext('2d');
                  new Chart(ctx, config);
              })
              .catch(error => {
                  console.error('Error al obtener datos de estudios:', error);
              });
      })
      .catch(error => {
          console.error('Error al obtener datos de niveles educativos:', error);
      });
}

  
// Función para el gráfico de INGENIEROS COLEGIADOS
function renderIngenierosColegiadosChart() {
    // Obtener datos de las especializaciones
    fetchData('dropdown_especializaciones/')
        .then(especializacionesData => {
            // Obtener datos de los estudios
            fetchData('estudio/')
                .then(estudiosData => {
                    // Mapear los nombres de las especializaciones por su id
                    const especializacionesMap = {};
                    especializacionesData.forEach(especializacion => {
                        especializacionesMap[especializacion.id] = especializacion.especializacion;
                    });

                    // Filtrar los estudios de ingenieros colegiados
                    const estudiosIngenierosColegiados = estudiosData.filter(estudio => estudio.id_estudio_especializacion);

                    // Realizar el conteo por especialización
                    const conteoPorEspecializacion = estudiosIngenierosColegiados.reduce((conteo, estudio) => {
                        const especializacionId = estudio.id_estudio_especializacion;
                        const especializacionNombre = especializacionesMap[especializacionId];
                        conteo[especializacionNombre] = (conteo[especializacionNombre] || 0) + 1;
                        return conteo;
                    }, {});

                    // Obtener las etiquetas y datos para el gráfico
                    const labels = Object.keys(conteoPorEspecializacion);
                    const datos = Object.values(conteoPorEspecializacion);
                    // Crea un array de colores variados
                    const colores = labels.map((_, index) => getRandomColor());

                    // Configurar el gráfico
                    const config = {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Ingenieros Colegiados por Especialización',
                                data: datos,
                                backgroundColor: colores,
                            }],
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                        beginAtZero: true,
                                    }
                                }]
                            }
                        },
                    };

                    // Obtener el contexto del canvas y crear el gráfico
                    const ctx = document.getElementById('ingenierosColegiadosChart').getContext('2d');
                    new Chart(ctx, config);
                })
                .catch(error => {
                    console.error('Error al obtener datos de estudios:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener datos de especializaciones:', error);
        });
}





  
// Función para el gráfico de ROL DE PROYECTO (Classification)
function renderRolProyectoChart() {
    // Obtener datos de los roles de proyecto
    fetchData('dropdown_rol_proyecto/')
        .then(rolesProyectoData => {
            // Obtener datos de los contratos
            fetchData('contrato/')
                .then(contratosData => {
                    // Ordenar los roles de proyecto por id de forma descendente
                    rolesProyectoData.sort((a, b) => b.id - a.id);

                    // Mapear los nombres de los roles de proyecto por su id
                    const rolesProyectoMap = {};
                    rolesProyectoData.forEach(rol => {
                        rolesProyectoMap[rol.id] = rol.rol_titulo;
                    });

                    // Realizar el conteo por rol de proyecto
                    const conteoPorRolProyecto = contratosData.reduce((conteo, contrato) => {
                        const rolProyectoId = contrato.id_empleo_proyecto_rol;
                        const rolProyectoNombre = rolesProyectoMap[rolProyectoId];
                        conteo[rolProyectoNombre] = (conteo[rolProyectoNombre] || 0) + 1;
                        return conteo;
                    }, {});

                    // Obtener las etiquetas y datos para el gráfico
                    const labels = Object.keys(conteoPorRolProyecto);
                    const datos = Object.values(conteoPorRolProyecto);
                    // Crea un array de colores variados
                    const colores = labels.map((_, index) => getRandomColor());

                    // Configurar el gráfico
                    const config = {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Rol de Proyecto (Classification)',
                                data: datos,
                                backgroundColor: colores,
                            }],
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                        beginAtZero: true,
                                    }
                                }]
                            }
                        },
                    };

                    // Obtener el contexto del canvas y crear el gráfico
                    const ctx = document.getElementById('rolProyectoChart').getContext('2d');
                    new Chart(ctx, config);
                })
                .catch(error => {
                    console.error('Error al obtener datos de contratos:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener datos de roles de proyecto:', error);
        });
}




  
// Llamadas a las funciones para renderizar los gráficos
renderHeadcountSexoChart();
renderheadcountPorProyectoChart();
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
