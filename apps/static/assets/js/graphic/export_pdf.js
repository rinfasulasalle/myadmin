function exportToPDF() {
    // Obtener el nombre de usuario y la fecha actual
    var username = "Nombre de usuario"; // Reemplaza esto con el nombre real del usuario logueado
    var currentDate = new Date().toLocaleDateString();

    // Crear instancia de jsPDF
    var pdf = new jsPDF();

    // Agregar encabezado al PDF
    pdf.text(`Usuario: ${username}`, 20, 20);
    pdf.text(`Fecha de exportación: ${currentDate}`, 20, 30);

    // Obtener el contenido de la vista y agregarlo al PDF
    var content = document.getElementById("pdfContent"); // Reemplaza "pdfContent" con el ID de tu contenido principal
    pdf.fromHTML(content, 20, 40);

    // Descargar el PDF
    pdf.save(`reporte_${currentDate}.pdf`);
}