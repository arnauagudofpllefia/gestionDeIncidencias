import { sumar, restar } from "../funciones/auxiliares.js"


const Incidencias = [
    {
        id: 1,
        titol: "Ordenador no se enciende",
        descripcio: "L'ordinador de recepció no encén",
        estat: "Obert",
        prioritat: "Alta",
        asignat: "Joan Garcia",
        data: "2025-09-20"
    },
    {
        id: 2,
        titol: "Problema amb impressora",
        descripcio: "No imprimeix documents PDF.",
        estat: "En Procés",
        prioritat: "Mitjana",
        asignat: "Maria López",
        data: "2025-09-21"
    },
    {
        id: 3,
        titol: "Actualització de software",
        descripcio: "Cal actualitzar l'antivirus.",
        estat: "En Procés",
        prioritat: "Baixa",
        asignat: "Pere Martínez",
        data: "2025-09-22"
    },
    {
        id: 4,
        titol: "Canvi de monitor",
        descripcio: "El monitor mostra línies estranyes.",
        estat: "Obert",
        prioritat: "Mitjana",
        asignat: "Anna Torres",
        data: "2025-09-23"
    },
    {
        id: 5,
        titol: "Recuperació de fitxers",
        descripcio: "S'han esborrat fitxers importants.",
        estat: "Tancat",
        prioritat: "Alta",
        asignat: "Carlos Ruiz",
        data: "2025-09-23"
    },
]

let tabla = document.querySelector("tbody")
let casilla = "";

const selectEstat = document.querySelector('#filtreEstat');
const selectPrioritat = document.querySelector('#filtrePrioritat');

renderTabla()

filtrarIncidencias()

function renderTabla() {
    // Rellenar la tabla con las incidencias
    for (let i = 0; i < Incidencias.length; i++) {
        const textoTrunc = Incidencias[i].descripcio.slice(0, 20) + "..."

        casilla += `
        <tr>
            <td>${Incidencias[i].id}</td>
            <td>${Incidencias[i].titol}</td>
            <td>${textoTrunc}</td>
            <td><span id="spanEstat" class="badge text-dark">${Incidencias[i].estat}</span></td>
            <td><span id="spanPrio" class="badge ">${Incidencias[i].prioritat}</span></td>
            <td>${Incidencias[i].asignat}</td>
            <td>${Incidencias[i].data}</td>
            <td>
                <button class="btn btn-sm btn-success data="editar">Edita</button>
                <button class="btn btn-sm btn-danger data="eliminar">Elimina</button>
            </td>
        </tr>
    `;

    }

    tabla.innerHTML = casilla
}


function aplicarClases(incidenciasFiltradas) {
    let estatSpans = document.querySelectorAll("#spanEstat");
    let prioSpans = document.querySelectorAll("#spanPrio");

    // Aplicar clases segun su estado
    for (let i = 0; i < incidenciasFiltradas.length; i++) {
        let estado = estatSpans[i] // Utlizamos [i] para acceder a cada span individualmente
        if (incidenciasFiltradas[i].estat == "Obert") {
            estado.classList.add("bg-warning")
        }
        if (incidenciasFiltradas[i].estat == "En Procés") {
            estado.classList.add("bg-info")
        }
        if (incidenciasFiltradas[i].estat == "Tancat") {
            estado.classList.add("bg-success")
        }
    }

    // Aplicar clases segun su prioridad
    for (let i = 0; i < incidenciasFiltradas.length; i++) {
        let prio = prioSpans[i] // Utlizamos [i] para acceder a cada span individualmente
        if (incidenciasFiltradas[i].prioritat == "Alta") {
            prio.classList.add("bg-danger")
        }
        if (incidenciasFiltradas[i].prioritat == "Mitjana") {
            prio.classList.add("bg-warning")
            prio.classList.add("text-dark")
        }
        if (incidenciasFiltradas[i].prioritat == "Baixa") {
            prio.classList.add("bg-primary")
        }
    }
}



selectEstat.addEventListener("change", function () {
    filtrarIncidencias()
})

selectPrioritat.addEventListener("change", function () {
    filtrarIncidencias()
})



function filtrarIncidencias() {
    // Obtener valores de los selects
    const valorEstat = selectEstat.value
    const valorPrioritat = selectPrioritat.value

    // Estadísticas
    const divNumIncidencias = document.querySelector("#totalIncidecias")
    const numIncidencias = Incidencias.length
    divNumIncidencias.textContent = numIncidencias

    const divNumIncidenciasAbiertas = document.querySelector("#incidenciasAbiertas")
    const numIncidenciasAbiertas = Incidencias.filter(incidencia => incidencia.estat === 'Obert').length
    divNumIncidenciasAbiertas.textContent = numIncidenciasAbiertas

    const divNumIncidenciasEnProceso = document.querySelector("#incidenciasEnProceso")
    const numIncidenciasEnProceso = Incidencias.filter(incidencia => incidencia.estat === 'En Procés').length
    divNumIncidenciasEnProceso.textContent = numIncidenciasEnProceso

    const divNumIncidenciasCerradas = document.querySelector("#incidenciasCerradas")
    const numIncidenciasCerradas = Incidencias.filter(incidencia => incidencia.estat === 'Tancat').length
    divNumIncidenciasCerradas.textContent = numIncidenciasCerradas

    //Filtrar las incidencias en la variable incidenciasFiltradas dependiendo del valor de de los select


    let incidenciasFiltradas = Incidencias;
    if (valorEstat === "obert") {
        incidenciasFiltradas = incidenciasFiltradas.filter(incidencia => incidencia.estat === "Obert")
    }
    if (valorEstat === "en_proces") {
        incidenciasFiltradas = incidenciasFiltradas.filter(incidencia => incidencia.estat === "En Procés")
    }
    if (valorEstat === "tancat") {
        incidenciasFiltradas = incidenciasFiltradas.filter(incidencia => incidencia.estat === "Tancat")
    }
    if (valorPrioritat === "alta") {
        incidenciasFiltradas = incidenciasFiltradas.filter(incidencia => incidencia.prioritat === "Alta")
    }
    if (valorPrioritat === "mitjana") {
        incidenciasFiltradas = incidenciasFiltradas.filter(incidencia => incidencia.prioritat === "Mitjana")
    }
    if (valorPrioritat === "baixa") {
        incidenciasFiltradas = incidenciasFiltradas.filter(incidencia => incidencia.prioritat === "Baixa")
    }

    let casilla1 = "";
    for (let i = 0; i < incidenciasFiltradas.length; i++) {
        const textoTrunc = incidenciasFiltradas[i].descripcio.slice(0, 20) + "..."
        casilla1 += `
        <tr>
            <td>${incidenciasFiltradas[i].id}</td>
            <td>${incidenciasFiltradas[i].titol}</td>
            <td>${textoTrunc}</td>
            <td><span id="spanEstat" class="badge text-dark">${incidenciasFiltradas[i].estat}</span></td>
            <td><span id="spanPrio" class="badge ">${incidenciasFiltradas[i].prioritat}</span></td>
            <td>${incidenciasFiltradas[i].asignat}</td>
            <td>${incidenciasFiltradas[i].data}</td>
            <td>
                <button class="btn btn-sm btn-success" data-editar>Edita</button>
                <button class="btn btn-sm btn-danger" data-eliminar>Elimina</button>
            </td>
        </tr>
        `
    }
    tabla.innerHTML = casilla1
    aplicarClases(incidenciasFiltradas)
}

const limpiarFiltros = document.querySelector("#btnLimpiar")
limpiarFiltros.addEventListener("click", function () {
    selectEstat.value = ""
    selectPrioritat.value = ""
    filtrarIncidencias()
})



// Función para abrir el modal de nueva incidencia (Bootstrap 5)
function obrirModalNova() {
    const btnNovaInc = document.querySelector('#btnNovaInc')
    const modalElement = document.querySelector('#modalNovaIncidencia')

    btnNovaInc.addEventListener('click', function () {
        // Usar la API de Bootstrap 5 para mostrar el modal
        const modal = new bootstrap.Modal(modalElement)
        modal.show()
        const guardarIncidencia = document.querySelector("#btnGuardarIncidencia")
        guardarIncidencia.addEventListener("click", function ()  {
            // Obtener los valores justo al guardar
            const valorTitol = String(document.querySelector("#novaIncidenciaTitol").value)
            const valorDesc = String(document.querySelector("#novaIncidenciaDesc").value)
            const valorEstat = document.querySelector("#novaIncidenciaEstat").value
            const valorPrio = document.querySelector("#novaIncidenciaPrioritat").value
            const valorAssignat = String(document.querySelector("#novaIncidenciaAssignat").value)
            Incidencias.push({
                id: Incidencias.length + 1,
                titol: valorTitol,
                descripcio: valorDesc,
                estat: valorEstat,
                prioritat: valorPrio,
                asignat: valorAssignat,
                data: "2025-09-22"
            })
            console.log(Incidencias)
            casilla = ""
            renderTabla()
            aplicarClases(Incidencias)

        })
        
        // Elimina el fondo gris para poder seguir clicando
        document.querySelectorAll('.modal-backdrop').forEach(e => e.remove());
        
    })


}

obrirModalNova();








