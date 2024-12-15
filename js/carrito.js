const url = "./js/productos.json";
const contenedorCarrito = document.querySelector("#carrito-productos");

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];


const cargarJSON = () =>{
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        productos = data; 
        mostrarCarrito(); 
    })
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((productoEnCarrito) => {
        let producto = productos.find(p => p.id == productoEnCarrito.id);
        
        if (producto) {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${productoEnCarrito.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${(producto.precio * productoEnCarrito.cantidad)}</p>
                </div>
                <div class="carrito-producto-comprar">
                    <button>Comprar</button>
                </div>
                <div class="carrito-producto-eliminar">
                    <button producto-id="${producto.id}" class="boton-eliminar">Eliminar</button>
                </div>
            `;

            contenedorCarrito.append(div);
        }
    });

    agregarEventosEliminar();
}



function eliminarProducto(id) {
    let indice = carrito.findIndex(producto => producto.id === id);
    carrito.splice(indice, 1); 
    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    mostrarCarrito(); 
}

function agregarEventosEliminar() {
    let botonesEliminar = document.querySelectorAll(".boton-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            let id = boton.dataset.productoid;
            eliminarProducto(id);
        });
    });
}