let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = []; // Nueva lista para las descripciones

function clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = parseFloat(document.getElementById("valorGasto").value);
    let descripcionGasto = document.getElementById("descripcionGasto").value; // Nuevo campo

    if (valorGasto > 150) {
        alert('¡Alerta! El gasto registrado es mayor a $150 dólares.');
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto); // Agregar descripción a la lista

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");
    let htmlLista = "";
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion]; // Obtener descripción

        htmlLista += `<li>${elemento} - $ ${valorGasto.toFixed(2)}<br>Descripción: ${descripcionGasto}
        <button onclick="modificarGasto(${posicion});">Modificar</button>
        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        </li>`;

        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value = ""; // Limpiar descripción
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1); // Eliminar descripción
    actualizarListaGastos();
}

function modificarGasto(posicion) {
    const nombreGasto = prompt('Modificar nombre del gasto:', listaNombresGastos[posicion]);
    const valorGasto = parseFloat(prompt('Modificar valor del gasto:', listaValoresGastos[posicion]));
    const descripcionGasto = prompt('Modificar descripción del gasto:', listaDescripcionesGastos[posicion]);

    if (nombreGasto && !isNaN(valorGasto) && descripcionGasto) {
        listaNombresGastos[posicion] = nombreGasto;
        listaValoresGastos[posicion] = valorGasto;
        listaDescripcionesGastos[posicion] = descripcionGasto;
        actualizarListaGastos();
    }
}