const idPersona = localStorage.getItem('idPersona');

if (!idPersona) {
    window.location.href = 'login.html';
}

const API_URL = `http://localhost:8080/donacion/${idPersona}/donaciones`;
const BASE_URL_DONACION = 'http://localhost:8080/donacion'; // Base para las acciones individuales

// Carga inicial de datos
cargarDonaciones();

function cargarDonaciones() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener donaciones');
            }
            return response.json();
        })
        .then(donaciones => pintarDonaciones(donaciones))
        .catch(error => {
            console.error(error);
            alert('No se pudieron cargar las donaciones');
        });
}

function pintarDonaciones(donaciones) {
    const tbody = document.querySelector('#tablaDonaciones tbody');
    tbody.innerHTML = '';

    donaciones.forEach(d => {
        const tr = document.createElement('tr');

        // 1. Clases CSS para estado visual
        const editarClass = d.editar ? 'icono editar' : 'icono editar disabled';
        const eliminarClass = d.eliminar ? 'icono eliminar' : 'icono eliminar disabled';
        const subirClass = d.subirPublicacion ? 'icono subir' : 'icono subir disabled';
        const bajaClass = d.bajaPublicacion ? 'icono baja' : 'icono baja disabled';

        // 2. Renderizado HTML
        tr.innerHTML = `
            <td>${d.tipoDonacion}</td>
            <td>${d.descripcion}</td>
            <td>
                <span class="estado ${d.estado === 'ACTIVO' ? 'activo' : 'inactivo'}">
                    ${d.estado}
                </span>
            </td>
            <td>
                <div class="acciones">
                    <i class="fa-solid fa-arrow-up ${subirClass}" title="Volver Activa" 
                       onclick="gestionarAccion(${d.idDonacion}, 'subir', ${d.subirPublicacion})"></i>
                    
                    <i class="fa-solid fa-arrow-down ${bajaClass}" title="Volver Inactiva" 
                       onclick="gestionarAccion(${d.idDonacion}, 'baja', ${d.bajaPublicacion})"></i>

                    <i class="fa-solid fa-pen-to-square ${editarClass}" title="Editar"
                       onclick="irAEditar(${d.idDonacion}, ${d.editar})"></i>

                    <i class="fa-solid fa-trash ${eliminarClass}" title="Eliminar"
                       onclick="gestionarAccion(${d.idDonacion}, 'eliminar', ${d.eliminar})"></i>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// --- FUNCIONES DE ACCIÓN ---

function irAEditar(id, esPermitido) {
    if (!esPermitido) return;
    window.location.href = `editar-donaciones.html?id=${id}`;
}

// Función principal que distribuye la lógica según la acción
function gestionarAccion(id, accion, esPermitido) {
    if (!esPermitido) return; // Si el botón está deshabilitado visualmente, no hacemos nada.

    console.log(`Ejecutando ${accion} en donación ${id}`);

    if (accion === 'eliminar') {
        eliminarDonacion(id);
    } 
    else if (accion === 'subir') {
        activarDonacion(id);
    } 
    else if (accion === 'baja') {
        desactivarDonacion(id);
    }
}

// 1. Lógica para ELIMINAR (DELETE)
function eliminarDonacion(id) {
    if (!confirm("¿Estás seguro de eliminar permanentemente esta donación?")) return;

    fetch(`${BASE_URL_DONACION}/donaciones/${id}/eliminar`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            alert("Donación eliminada.");
            cargarDonaciones();
        } else {
            alert("Error al eliminar.");
        }
    })
    .catch(err => console.error(err));
}

// 2. Lógica para VOLVER ACTIVA (PATCH) - Subir Publicación
function activarDonacion(id) {
    if (!confirm("¿Deseas activar esta publicación para que sea visible en el mapa?")) return;

    fetch(`${BASE_URL_DONACION}/${id}/volver-activa`, {
        method: 'PATCH'
    })
    .then(res => {
        if (res.ok) {
            alert("¡Publicación activada con éxito!");
            cargarDonaciones(); // Recargar tabla para ver el nuevo estado
        } else {
            alert("No se pudo activar la publicación.");
        }
    })
    .catch(err => {
        console.error("Error al activar:", err);
        alert("Error de conexión.");
    });
}

// 3. Lógica para VOLVER INACTIVA (PATCH) - Baja Publicación
function desactivarDonacion(id) {
    if (!confirm("¿Deseas ocultar esta publicación del mapa (volver inactiva)?")) return;

    fetch(`${BASE_URL_DONACION}/${id}/volver-inactiva`, {
        method: 'PATCH'
    })
    .then(res => {
        if (res.ok) {
            alert("Publicación desactivada.");
            cargarDonaciones(); // Recargar tabla para ver el nuevo estado
        } else {
            alert("No se pudo desactivar la publicación.");
        }
    })
    .catch(err => {
        console.error("Error al desactivar:", err);
        alert("Error de conexión.");
    });
}