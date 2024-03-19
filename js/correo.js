document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("pqrsForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);

        fetch("http://localhost:5000/enviarpqrs", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Hubo un problema al enviar el formulario.");
            }
            return response.json();
        })
        .then(data => {
            alert("¡PQRS enviado exitosamente!");
            form.reset();
        })
        .catch(error => {
            alert("Error al enviar el formulario: " + error.message);
        });
    });
});
