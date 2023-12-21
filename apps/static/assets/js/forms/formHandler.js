// formHandler.js
function submitForm() {
    const form = document.getElementById('userForm');
    const formData = new FormData(form);
    // Convert FormData to a plain JavaScript object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    // Convert the JavaScript object to a JSON string
    const jsonData = JSON.stringify(formDataObject);
    console.log('Form Data in JSON format:', jsonData);
    postData('usuario',jsonData);
  }
  