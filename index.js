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

document.getElementById('guardar-nombre').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    if (nombre !== "") {
        userNameSpan.textContent = nombre;
        document.getElementById('usuario').style.display = 'none';
        valorInputDiv.style.display = 'block';
    }
});

document.getElementById('guardar-valores').addEventListener('click', () => {
    valorKg = parseFloat(document.getElementById('valorKg').value);
    kgPorHora = parseFloat(document.getElementById('kgPorHora').value);
    if (valorKg > 0 && kgPorHora > 0) {
        valorInputDiv.style.display = 'none';
        operacionesDiv.style.display = 'block';
    }
});

document.getElementById('botonIngreso').addEventListener('click', () => {
    mostrarFormulario('ingreso');
});

document.getElementById('botonEgreso').addEventListener('click', () => {
    mostrarFormulario('egreso');
});

finalizarMovimientosBtn.addEventListener('click', () => {
    operacionesDiv.style.display = 'none';
    finalizarMovimientosBtn.style.display = 'none';
    movimientosDiv.style.display = 'block';
});

function mostrarFormulario(tipo) {
    formularioOperacionDiv.style.display = 'block';
    formularioOperacionDiv.innerHTML = `
        <p>Seleccione la opción deseada:</p>
        <p>1 - Por horas trabajadas</p>
        <p>2 - Por kilos</p>
        <p>3 - Por pesos</p>
        <input type="text" id="opcion" placeholder="Ingrese 1, 2 o 3">
        <input type="text" id="valor" placeholder="Ingrese el valor">
        <button id="realizar-operacion">Realizar Operación</button>
    `;

    document.getElementById('realizar-operacion').addEventListener('click', () => {
        try {
            const operacion = document.getElementById('opcion').value;
            const valor = parseFloat(document.getElementById('valor').value);

            const operacionValida = ['1', '2', '3'].includes(operacion);
            if (operacionValida && valor > 0) {
                realizarOperacion(tipo, operacion, valor);
                formularioOperacionDiv.style.display = 'none';
                finalizarMovimientosBtn.style.display = 'block';
                sonidoOperacion.play();
            } else {
                throw new Error("Operación no válida o valor incorrecto");
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        }
    });
}

function realizarOperacion(tipo, operacion, valor) {
    let kg;
    switch (operacion) {
        case '1':
            kg = valor * kgPorHora;
            break;
        case '2':
            kg = valor;
            break;
        case '3':
            kg = valor / valorKg;
            break;
        default:
            return;
    }

    if (tipo === 'ingreso') {
        kgTotales += kg;
        movimientos.push({ tipo: 'Ingreso', kg: kg.toFixed(2) });
    } else {
        kgTotales -= kg;
        movimientos.push({ tipo: 'Egreso', kg: kg.toFixed(2) });
    }

    actualizarMovimientos();
}

function actualizarMovimientos() {
    kgTotalesSpan.textContent = kgTotales.toFixed(2);
    movimientosDiv.innerHTML = "";
    movimientos.forEach(movimiento => {
        movimientosDiv.innerHTML += `<div>${movimiento.tipo}: ${movimiento.kg} kg</div>`;
    });
}
