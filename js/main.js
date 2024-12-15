
const url = "./js/productos.json"
const contenedor = document.querySelector("#contenedor-productos");
const mostrarTodos = document.getElementById("todos");
const mostrarMoviles = document.getElementById("moviles");
const mostrarPortatiles = document.getElementById("portatiles");
const mostrarTelevisiones = document.getElementById("televisiones");
const botonesAgregar = document.querySelectorAll(".producto-agregar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//CARGA DATOS JSON
const cargarJSON = () =>{
    fetch(url)
        .then((res)=>{
            return res.json();
        }).then((data) => {
            mostrarProductos(data);
            agregarEventos(data);
        });
};

function mostrarProductos(productos){
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =
        `
        <img class="producto-imagen" src="${producto.imagen}" alt="Imagen de ${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" producto-id="${producto.id}">Agregar</button>
        </div>
        `
        contenedor.append(div);
    });
}

function filtrarPorCategoria(productos, categoria) {
    if (categoria === "todos") {
        mostrarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(producto => producto.categoria.id === categoria);
        mostrarProductos(productosFiltrados);
    }
}

//MÉTODO PARA CARGAR LOS EVENTOS DE LA PÁGINA
function agregarEventos(productos) {
    mostrarTodos.addEventListener("click", () => filtrarPorCategoria(productos, "todos"));
    mostrarMoviles.addEventListener("click", () => filtrarPorCategoria(productos, "moviles"));
    mostrarPortatiles.addEventListener("click", () => filtrarPorCategoria(productos, "portatiles"));
    mostrarTelevisiones.addEventListener("click", () => filtrarPorCategoria(productos, "televisiones"));

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            let idProducto = boton.dataset.productoid;
            let producto = productos.find(p => p.id == idProducto);
            agregarAlCarrito(producto);
        });
    });
}



//ACTUALIZAR CARRITO
function agregarAlCarrito(producto) {
    let productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

cargarJSON()