document
  .getElementById("dni_search_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var dni = document.getElementById("dni").value;
    var url_api = "http://62.72.11.15:8090/usuario";
    // Procesar los datos o realizar validaciones aquí
    console.log("dni:", dni);
    data = {
      id: dni,
    };
    var dataJSON = JSON.stringify(data);
    axios
      .get(url_api, dataJSON)
      .then((response) => {
        console.table(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
