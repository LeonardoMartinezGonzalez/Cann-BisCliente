
const btnRegistrarUsuario = document.querySelector('#registrar-usuario');
const claveUno = document.querySelector('#clave');
const claveDos = document.querySelector('#clave1');
const miForm = document.querySelector('#contactForm');

cargarEventos();

function cargarEventos(){
    btnRegistrarUsuario.addEventListener('click', validarDatos);
}

function validarDatos(evt){
    evt.preventDefault();
    //console.log(claveUno.value, claveDos.value);
    if (claveUno.value === claveDos.value){
        if (claveUno.value.length >= 8){
            alert("Todo bien");
            miForm.submit();
        }else{
            alert("La Contraseña debe ser al menos de 8 caracteres");
            claveUno.focus();
        }
        
    }else{
        alert('Las contraseñas deben ser iguales');
    }
}