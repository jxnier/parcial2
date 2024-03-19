const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const usuarioInput = document.getElementById('usuario');
const contrasenaInput = document.getElementById('contrasena');

const limpiar = () => {
    usuarioInput.value = '';
    contrasenaInput.value = '';
};

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const ingresar = () => {
    const usuario = usuarioInput.value;
    const contrasena = contrasenaInput.value;
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://storage.googleapis.com/datos_tablas/adminuser.json', true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const usuarios = JSON.parse(xhr.responseText);
            const usuarioValido = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

            if (usuarioValido) {
                limpiar();
                if (usuarioValido.tipo === 'admin') {
                    window.location.href = '/html/administrador.html';
                } else if (usuarioValido.tipo === 'usuario') {
                    window.location.href = '/html/psico.html';
                }
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        } else {
            console.error('Error al cargar el archivo JSON');
        }
    };

    xhr.send();
};

document.getElementById("login").addEventListener("click", ingresar);


function registrar() {
    var formulario = document.getElementById('userForm');
    var formData = new FormData(formulario);
    var jsonData = {};

    formData.forEach(function(value, key) {
        jsonData[key] = value;
    });

    fetch('http://localhost:5000/add_registro', { 
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

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    registrar();
});
