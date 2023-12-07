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
    // Código específico para llenar el gráfico de NACIONALIDAD
  }
  
  // Función para el gráfico de TIPO DE CONTRATO
  function renderTipoContratoChart() {
    // Código específico para llenar el gráfico de TIPO DE CONTRATO
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
  