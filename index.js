let valorKg = 0;
let kgPorHora = 0;
let kgTotales = 0;
let movimientos = [];

const userNameSpan = document.getElementById('usuario-nombre');
const kgTotalesSpan = document.getElementById('kg-totales');
const movimientosDiv = document.getElementById('movimientos');
const operacionesDiv = document.getElementById('operaciones');
const formularioOperacionDiv = document.getElementById('formulario-operacion');
const valorInputDiv = document.getElementById('valorIn');
const finalizarMovimientosBtn = document.getElementById('finalizar-movimientos');
const sonidoOperacion = document.getElementById('sonido-operacion');

function cargarDatosDesdeJson() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
        })
        .catch(error => console.error('Error cargando el JSON:', error));
}

cargarDatosDesdeJson();

document.getElementById("guardar-nombre").addEventListener("click", function() {
    const nombre = document.getElementById("nombre").value;
    if (nombre) {
        document.getElementById("usuario-nombre").textContent = nombre;
        document.getElementById("usuario").style.display = "none";
        document.getElementById("valorIn").style.display = "block";
    } else {
        Swal.fire("Por favor ingrese su nombre.");
    }
});

document.getElementById("guardar-valores").addEventListener("click", function() {
    const valorKg = document.getElementById("valorKg").value;
    const kgPorHora = document.getElementById("kgPorHora").value;
    if (valorKg && kgPorHora) {
        document.getElementById("valorIn").style.display = "none";
        document.getElementById("operaciones").style.display = "block";
    } else {
        Swal.fire("Por favor ingrese ambos valores.");
    }
});

document.getElementById("botonIngreso").addEventListener("click", function() {
    document.getElementById("formulario-operacion").style.display = "block";
    resetFormulario();
});

document.getElementById("botonEgreso").addEventListener("click", function() {
    document.getElementById("formulario-operacion").style.display = "block";
    resetFormulario();
});

document.getElementById("realizar-operacion").addEventListener("click", function() {
    const opcion = document.getElementById("opcion").value;
    const valor = parseFloat(document.getElementById("valor").value);
    let kgTotales = parseFloat(document.getElementById("kg-totales").textContent);

  
    const isIngreso = document.getElementById("botonIngreso").style.display !== "none";

    if (isIngreso) {
       
        if (opcion === "1") { 
            const kgPorHora = parseFloat(document.getElementById("kgPorHora").value);
            kgTotales += kgPorHora * valor;
        } else if (opcion === "2") { 
            kgTotales += valor;
        } else if (opcion === "3") { 
            const valorKg = parseFloat(document.getElementById("valorKg").value);
            kgTotales += valor / valorKg;
        } else {
            Swal.fire("Opción inválida. Ingrese 1, 2 o 3.");
            return;
        }
        actualizarMovimientos(opcion, valor, true);
    } else {
       
        if (opcion === "1") { 
            const kgPorHora = parseFloat(document.getElementById("kgPorHora").value);
            kgTotales = kgTotales-(kgPorHora * valor); 
        } else if (opcion === "2") { 
            kgTotales =kgTotales- valor; 
        } else if (opcion === "3") { 
            const valorKg = parseFloat(document.getElementById("valorKg").value);
            kgTotales =kgTotales-( valor / valorKg)
            Swal.fire("Opción inválida. Ingrese 1, 2 o 3.");
            return;
        }
        actualizarMovimientos(opcion, valor, false); 
    }

    document.getElementById("kg-totales").textContent = kgTotales.toFixed(2);
    document.getElementById("finalizar-movimientos").style.display = "block"; 

    document.getElementById("formulario-operacion").style.display = "none"; 
});


function actualizarMovimientos(opcion, valor, esIngreso) {
    const movimientosDiv = document.getElementById("movimientos");
    const nuevoMovimiento = document.createElement("p");
    let tipoOperacion = "";

    switch (opcion) {
        case "1":
            tipoOperacion = "Horas trabajadas";
            break;
        case "2":
            tipoOperacion = "Kilos";
            break;
        case "3":
            tipoOperacion = "Pesos";
            break;
    }

    nuevoMovimiento.textContent = `Operación: ${tipoOperacion} - Valor: ${valor} ${esIngreso ? "(Ingreso)" : "(Egreso)"}`;
    movimientosDiv.appendChild(nuevoMovimiento);
}

document.getElementById("jornada-laboral").addEventListener("click", function() {
    const kgTotales = parseFloat(document.getElementById("kg-totales").textContent);
    const nuevoTotal = kgTotales + 24; 
    document.getElementById("kg-totales").textContent = nuevoTotal.toFixed(2);

    actualizarMovimientos("1", "8 horas (24 kg)", true);

    document.getElementById("finalizar-movimientos").style.display = "block";


    document.getElementById("formulario-operacion").style.display = "none"; 
});


document.getElementById("finalizar-movimientos").addEventListener("click", function() {
    Swal.fire({
        title: '¿Desea finalizar los movimientos?',
        showCancelButton: true,
        confirmButtonText: `Finalizar`,
        cancelButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("kg-totales").textContent = "0.00";
            document.getElementById("movimientos").innerHTML = "";
            document.getElementById("finalizar-movimientos").style.display = "none";
            Swal.fire('Movimientos finalizados!', '', 'success');

            document.getElementById("botonIngreso").style.display = "block"; 
            document.getElementById("botonEgreso").style.display = "block"; 
        }
    });
});

function resetFormulario() {
    document.getElementById("opcion").value = "";
    document.getElementById("valor").value = "";
}
