// load_dropdowns.js

const dropdownUrls = {
    "dropdown_roles": "http://62.72.11.15:3000/api/dropdown_roles/",
    "dropdown_rol_proyecto": "http://62.72.11.15:3000/api/dropdown_rol_proyecto/",
    "dropdown_areas": "http://62.72.11.15:3000/api/dropdown_areas/",
    // ... (agrega el resto de tus URLs aquí)
  };
  
  // Función para cargar dinámicamente los dropdowns
  async function loadAllDropdowns() {
    for (const [dropdownName, url] of Object.entries(dropdownUrls)) {
      try {
        // Agregar sufijo "/api" si no está presente en la URL
        const fullUrl = url.startsWith('/api/') ? url : `/api${url}`;
        
        // Llamada para cargar dinámicamente cada dropdown
        await loadDropdownOptions(dropdownName, fullUrl);
      } catch (error) {
        console.error(`Error al cargar ${dropdownName}:`, error.message);
      }
    }
  }
  
  // Llamada para cargar todos los dropdowns al cargar la página
  loadAllDropdowns();
  