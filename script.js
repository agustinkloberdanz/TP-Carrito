class Producto {
    constructor(id, descripcion, precio, cantidad, imagen) {
        this.id = null
        this.descripcion = descripcion
        this.precio = precio
        this.cantidad = 0
        this.imagen = imagen
    }
}

let arrCarrito = []
let carritoBody = document.getElementById('carrito-body')
let carrito = document.getElementById('carrito')

function agregarItem(id) {
    const existe = arrCarrito.some(element => element.id == id)

    if (existe) {
        arrCarrito.map(element => {
            if (element.id == id) {
                element.cantidad++
            }
        })
        actualizarCarrito()
    } else {
        const producto = new Producto()

        var element = document.getElementById(id)
        var parent = element.parentElement

        var img = parent.querySelector('.img-producto')
        var descripcion = parent.querySelector('.modelo')
        var precio = parent.querySelector('.precio')

        producto.id = id
        producto.imagen = img.getAttribute('src')
        producto.descripcion = descripcion.innerHTML
        producto.precio = precio.innerHTML
        producto.cantidad++

        arrCarrito.push(producto)
        actualizarCarrito()
    }
}

function actualizarCarrito() {
    carritoBody.innerHTML = ""

    arrCarrito.forEach(prod => {
        var div = document.createElement('div')
        var img = document.createElement('img')
        var desc = document.createElement('p')
        var precio = document.createElement('p')
        var cant = document.createElement('p')
        var buttonDescontar = document.createElement('button')
        var buttonAgregar = document.createElement('button')
        var buttonEliminar = document.createElement('button')

        desc.innerHTML = prod.descripcion
        precio.innerHTML = prod.precio
        cant.innerHTML = prod.cantidad
        img.src = prod.imagen

        buttonDescontar.innerHTML = '-'
        buttonAgregar.innerHTML = '+'

        var i = document.createElement('i')
        i.setAttribute('class', 'fa fa-trash-o')
        buttonEliminar.appendChild(i)

        img.setAttribute('class', 'img-producto-en-carrito')
        desc.setAttribute('class', 'prodinfo-en-carrito')
        precio.setAttribute('class', 'prodinfo-en-carrito')
        cant.setAttribute('class', 'prodinfo-en-carrito')

        buttonDescontar.addEventListener('click', () => eliminarUnElemento(prod))
        buttonDescontar.setAttribute('class', 'boton-eliminar')

        buttonAgregar.addEventListener('click', () => agregarUnElemento(prod))
        buttonAgregar.setAttribute('class', 'boton-agregar')

        buttonEliminar.addEventListener('click', () => eliminarDelCarrito(prod))
        buttonEliminar.setAttribute('class', 'boton-eliminar')

        div.setAttribute('class', 'prod-en-carrito')
        div.setAttribute('id', prod.id)

        div.appendChild(desc)
        div.appendChild(precio)
        div.appendChild(cant)
        div.appendChild(img)
        div.appendChild(buttonDescontar)
        div.appendChild(buttonAgregar)
        div.appendChild(buttonEliminar)

        carritoBody.appendChild(div)
    })

    if (arrCarrito.length > 0) {
        carrito.style.display = 'block'

        var subtotal = calcularTotal()
        var total = document.createElement('h3')
        total.innerHTML = 'Total a pagar: $' + subtotal

        var vaciarButton = document.createElement('button')
        vaciarButton.addEventListener('click', () => vaciarCarrito())
        vaciarButton.setAttribute('class', 'boton-eliminar')
        vaciarButton.innerHTML = 'Vaciar carrito'

        var pagarButton = document.createElement('button')
        pagarButton.innerHTML = 'Pagar'
        pagarButton.setAttribute('class', 'boton-pagar')
        pagarButton.addEventListener('click', () => pagarTotal())

        carritoBody.appendChild(total)
        carritoBody.appendChild(pagarButton)
        carritoBody.appendChild(vaciarButton)
    }
    else{
        carrito.style.display = 'none'
    }
}

function pagarTotal() {
    prompt('Número de tarjeta: ')
}

function calcularTotal() {
    var subtotal = 0
    arrCarrito.forEach(element => subtotal += element.precio * element.cantidad)
    return subtotal
}

function eliminarUnElemento(prod) {
    prod.cantidad--
    if (prod.cantidad === 0) {
        const item = arrCarrito.find((element) => element.id == prod.id)
        const indice = arrCarrito.indexOf(item)
        arrCarrito.splice(indice, 1)
    }
    actualizarCarrito()
}

function agregarUnElemento(prod) {
    prod.cantidad++
    actualizarCarrito()
}

function eliminarDelCarrito(prod) {
    const item = arrCarrito.find((element) => element.id == prod.id)
    const indice = arrCarrito.indexOf(item)
    arrCarrito.splice(indice, 1)
    actualizarCarrito()
}

function vaciarCarrito() {
    arrCarrito.length = 0
    actualizarCarrito()
}
