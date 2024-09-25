let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];

function clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = parseFloat(document.getElementById("valorGasto").value);
    let descripcionGasto = document.getElementById("descripcionGasto").value;

    if (!nombreGasto || isNaN(valorGasto) || !descripcionGasto) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (valorGasto > 150) {
        alert('¡Alerta! El gasto registrado es mayor a $150.');
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto);

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");
    let htmlLista = "";
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];

        htmlLista += `<li>${elemento} - COP $ ${valorGasto.toFixed(2)}<br>Descripción: ${descripcionGasto}
        <div class="actions">
            <button onclick="modificarGasto(${posicion});">✏️</button>
            <button onclick="eliminarGasto(${posicion});">🗑️</button>
        </div>
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
    document.getElementById("descripcionGasto").value = "";
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
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