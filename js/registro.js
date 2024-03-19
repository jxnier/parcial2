// Función para registrar un psicólogo
function registrarPsicologo() {
    var formulario = document.getElementById('registroForm');
    var formData = new FormData(formulario);
    var jsonData = {};

    formData.forEach(function(value, key) {
        jsonData[key] = value;
    });

    fetch('http://localhost:5000/psicologo_', { 
        method: 'POST',
        body: formData 
    })
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        alert('Registro exitoso');
        formulario.reset();
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert('Hubo un error en el registro');
    });
}

// Manejar el evento submit del formulario de registro
document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    registrarPsicologo(); // Llamar a la función para registrar psicólogo
});
