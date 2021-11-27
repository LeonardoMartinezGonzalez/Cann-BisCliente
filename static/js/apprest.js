//Variables
const listaProductos = document.querySelector('#lista-productos');
const carrito = document.querySelector('#miCarrito');
const numeroProductos = document.querySelector('.barra .numero-productos'); //Numero de Productos en el carrito
//const precioConDescuento = document.querySelector('.info-producto .price-sale');

let productosCarrito = []; // Declaracion del arreglo para guardar los productos del cliente


cargarEventListeners();

function cargarEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);
    //Cargar el Carrito con Local Storage cuando se Carga la Página
    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        //dibuja el Carrito y sus productos
        dibujarCarritoHTML();
        //Colocar el No. de Productos que hay en carrito
        modificarCantidadProductos(cuentaProductosCarrito());
    });
}

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

function leerDatosProducto(producto) {
    //Obtener el Precio con Descuento si tiene
    let precioDescuento;
    if (producto.querySelector('.info-producto .price-sale'))
        precioDescuento = producto.querySelector('.info-producto .price-sale').textContent;
    else
        precioDescuento = '0.0';
    //Crear el Objeto en JavaScript
    const infoProducto = {
        imagen: producto.children[0].style.backgroundImage,
        nombre: producto.querySelector('.info-producto h2').textContent,
        precioConDescuento: precioDescuento,
        precioSinDescuento: producto.querySelector('.info-producto .precio').textContent,
        id: producto.querySelector('.imagen-producto a').getAttribute('Data-id'),
        cantidad: 1
    }
    console.log(infoProducto);
    //Verificar si existe el producto en el arreglo
    const existe = productosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        const tmpProductos = productosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++; //Incremento la cantidad
                return producto; //Regreso el Producto para que se asigne al arreglo temporal de productos
            } else
                return producto; //Regreso el Producto para que se asigne al arreglo temporal de productos
        });
        productosCarrito = [...tmpProductos];
    } else
        productosCarrito = [...productosCarrito, infoProducto]; //Agregar al carrito el producto seleccionado
    //Obtener el Número de productos cargados y pintarlos en lapagina php
    const numProductosCarrito = cuentaProductosCarrito();
    modificarCantidadProductos(numProductosCarrito);
    //Dibujar el carrito
    dibujarCarritoHTML();
    //console.log(productosCarrito); 
}

function dibujarCarritoHTML() {
    limpiarHTML();
    productosCarrito.forEach(producto => {
        let img = producto.imagen;
        img = img.replace('"', '');
        img = img.replace('"', '');
        const codigoHTML = document.createElement(`div`);
        codigoHTML.innerHTML = `<div class="dropdown-item d-flex align-items-start" href="#">
                                <div class="img" style="background-image: ${img};"></div>
                                    <div class="text pl-3">
                                        <h4>${producto.nombre}</h4>
                                        <p class="mb-0">
                                            <a href="#" class="price">${producto.precioSinDescuento}</a>
                                            <span class="quantity ml-3">Cantidad: ${producto.cantidad} </span>
                                        </p>
                                    </div>
                            </div>`;
        carrito.appendChild(codigoHTML);
    });
    carrito.appendChild(agregarPieCarrito());
    //Agregar el Carrito de Compras a  Local Storage
    sincronizarStorage();
}

//Función para sincronizar con Local Storage
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function agregarPieCarrito() {
    const codigoSpan = document.createElement('span'); //CReatste un elemento SPAN
    codigoSpan.setAttribute('class', 'ion-ios-arrow-round-forward'); // Creaste el atributo CLASS y su VALOR

    const codigoA = document.createElement('a');
    codigoA.setAttribute('class', 'dropdown-item text-center btn-link d-block w-100');
    codigoA.setAttribute('href', 'cart.html');
    codigoA.textContent = 'Ver contenido del carrito';

    codigoA.appendChild(codigoSpan);

    return codigoA;
}

function limpiarHTML() {
    //Forma lenta
    /*  carrito.innerHTML = ''; */
    //Forma rápida
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}

//Funcion que pinta el numero de productos en el carrito
function modificarCantidadProductos(numP) {
    numeroProductos.textContent = numP;
}

//Funcion que cuenta el Numero de productos en el carrito
function cuentaProductosCarrito() {
    return productosCarrito.length;
}

/* Hacer el pie del carrito */


/* LocalStorage */
/* 1. Cómo guardar
2. Cómo sacar
3.  */