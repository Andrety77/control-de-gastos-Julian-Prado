let listaNombresGastos = [];
// Declara un array vacío para almacenar los nombres de los gastos

let listaValoresGastos = [];
// Declara un array vacío para almacenar los valores de los gastos

let listaDescripcionesGastos = [];
// Declara un array vacío para almacenar las descripciones de los gastos

document.getElementById("valorGasto").addEventListener("input", function() {
    this.value = formatNumber(this.value);
});
// Añade un evento 'input' al campo 'valorGasto' que formatea el número mientras se escribe

function formatNumber(value) {
    return value.replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// Define una función que formatea un número eliminando caracteres no numéricos y añadiendo puntos como separadores de miles

function clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    // Obtiene el valor del campo 'nombreGasto'

    let valorGasto = parseFloat(document.getElementById("valorGasto").value.replace(/\./g, ""));
    // Obtiene el valor del campo 'valorGasto', elimina los puntos y lo convierte a número

    let descripcionGasto = document.getElementById("descripcionGasto").value;
    // Obtiene el valor del campo 'descripcionGasto'

    if (!nombreGasto || isNaN(valorGasto) || !descripcionGasto) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    // Verifica que todos los campos estén completos y que 'valorGasto' sea un número

    if (valorGasto > 1000000) {
        alert('¡Alerta! El gasto registrado es mayor a un millón.');
    }
    // Muestra una alerta si el valor del gasto es mayor a un millón

    listaNombresGastos.push(nombreGasto);
    // Añade el nombre del gasto al array 'listaNombresGastos'

    listaValoresGastos.push(valorGasto);
    // Añade el valor del gasto al array 'listaValoresGastos'

    listaDescripcionesGastos.push(descripcionGasto);
    // Añade la descripción del gasto al array 'listaDescripcionesGastos'

    actualizarListaGastos();
    // Llama a la función 'actualizarListaGastos' para actualizar la lista de gastos en la interfaz
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById("listaDeGastos");
    // Obtiene el elemento de la lista de gastos

    const totalElementos = document.getElementById("totalGastos");
    // Obtiene el elemento que muestra el total de gastos

    let htmlLista = "";
    // Inicializa una cadena vacía para construir el HTML de la lista

    let totalGastos = 0;
    // Inicializa el total de gastos en 0

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];

        htmlLista += `<li>${elemento} - COP $ ${valorGasto.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<br>Descripción: ${descripcionGasto}
        <div class="actions">
            <button onclick="modificarGasto(${posicion});">✏️</button>
            <button onclick="eliminarGasto(${posicion});">🗑️</button>
        </div>
        </li>`;
        // Construye el HTML para cada gasto, incluyendo botones para modificar y eliminar

        totalGastos += valorGasto;
        // Suma el valor del gasto al total de gastos
    });

    listaElementos.innerHTML = htmlLista;
    // Actualiza el HTML de la lista de gastos

    totalElementos.innerHTML = totalGastos.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Actualiza el total de gastos en la interfaz

    limpiar();
    // Llama a la función 'limpiar' para vaciar los campos del formulario
}

function limpiar() {
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value = "";
}
// Define una función que vacía los campos del formulario

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}
// Define una función que elimina un gasto de las listas y actualiza la interfaz

function modificarGasto(posicion) {
    const nombreGasto = prompt('Modificar nombre del gasto:', listaNombresGastos[posicion]);
    const valorGasto = parseFloat(prompt('Modificar valor del gasto:', listaValoresGastos[posicion]).replace(/\./g, ""));
    const descripcionGasto = prompt('Modificar descripción del gasto:', listaDescripcionesGastos[posicion]);

    if (nombreGasto && !isNaN(valorGasto) && descripcionGasto) {
        listaNombresGastos[posicion] = nombreGasto;
        listaValoresGastos[posicion] = valorGasto;
        listaDescripcionesGastos[posicion] = descripcionGasto;
        actualizarListaGastos();
    }
}
// Define una función que permite modificar un gasto y actualiza la interfaz

document.getElementById("filtroGasto").addEventListener("input", function() {
    const filtro = this.value.toLowerCase();
    const listaElementos = document.getElementById("listaDeGastos");
    const items = listaElementos.getElementsByTagName("li");

    Array.from(items).forEach(item => {
        const texto = item.textContent.toLowerCase();
        if (texto.includes(filtro)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});
// Añade un evento 'input' al campo 'filtroGasto' que filtra los elementos de la lista de gastos según el texto ingresado