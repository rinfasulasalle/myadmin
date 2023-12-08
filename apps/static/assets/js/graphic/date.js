// Función para obtener la fecha en formato YYYY-MM-DD
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
// Establecer la fecha actual como valor por defecto
document.getElementById('startDate').value = getCurrentDate();
document.getElementById('endDate').value = getCurrentDate();