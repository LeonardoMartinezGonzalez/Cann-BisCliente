
const btnRegistrarUsuario = document.querySelector('#validar-usuario');
const claveUno = document.querySelector('#clave');
const correo = document.querySelector('#correo');
const terminoCondiciones = document.querySelector('#terminoCondiciones');
const miForm = document.querySelector('#loginForm');

cargarEventos();

function cargarEventos(){
    btnRegistrarUsuario.addEventListener('click', validarDatos);
}

function validarDatos(evt){
    evt.preventDefault();
    if (correo.value != ''){
        if (claveUno.value.length >= 8){
            if (terminoCondiciones.checked)
                miForm.submit();
                //enviarDatos();
            else{
                alert("Debe aceptar términos y condiciones");
                terminoCondiciones.focus();
            }
        }else{
            alert("La contraseña debe tener al menos 8 caracteres");
            claveUno.focus();
        }
            
    }else{
        alert("Debe escribir un correo");
        correo.focus();
    }
}

function enviarDatos(){
    const url = 'http://192.168.1.70:5000/login';
    const data = new FormData(); //Datos de un formulario los puedo encapsular

    data.append('correo', correo.value);
    data.append('clave', claveUno.value);

    fetch(url, {
            method: 'POST',
            headers: { // cabeceras HTTP
                // vamos a enviar los datos en formato JSON
                
                //'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                //'Content-Type': 'application/json',
            },
            // el cuerpo de la petición es una cadena de texto
            // con los datos en formato JSON
            body: JSON.stringify(data) // convertimos el objeto a texto
        })
        .then(respuesta => {
            if (respuesta.ok) {
                console.log(respuesta);
                console.log(respuesta.text());
                return respuesta.text();
            } else
                throw "ERROR: en la llamada a Login de Usuario";
        })
        .then(function(texto) {
            //console.log(texto);
            mostrarResultado(texto);
            //Limpiar el Carrito
            //limpiarHTML();
            //Limpiar el arreglo
            //productosCarrito = [];
            //Limpiar de LocalStorage
            //localStorage.removeItem('carrito'); y tambien remover el token
            // Pintar o Dibujar el Numero de productos del Carrito
            //modificaCantidadProductos();
            //Enviar Mensaje de confirmación de la Orden
            //alert("Orden generada");
            //location.href = "product.php";
        });
}

function mostrarResultado(txt) {
    const txtResultado = document.querySelector('#mensaje');
    txtResultado.innerHTML = txt;
}