const idPersona = localStorage.getItem('idPersona');

if (!idPersona) {
    window.location.href = 'login.html';
}

const API_URL = `https://administrador-donaciones-production.up.railway.app/donacion/${idPersona}/donaciones`;
const BASE_URL_DONACION = 'https://administrador-donaciones-production.up.railway.app/donacion'; // Base para acciones individuales

// Carga inicial de datos
cargarDonaciones();

// ===== TOAST =====
function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: "✔ ", error: "❌ ", warning: "⚠ ", info: "ℹ " };
    toast.textContent = (icons[type] || "") + message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

// ===== MODAL =====
function showConfirm(title, message) {
    return new Promise(resolve => {
        const modal = document.getElementById('modal-confirm');
        const okBtn = document.getElementById('modal-ok');
        const cancelBtn = document.getElementById('modal-cancel');

        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;

        modal.classList.remove('modal-hidden');
        modal.classList.add('modal-visible');

        // Limpiar eventos previos
        okBtn.onclick = null;
        cancelBtn.onclick = null;

        const cleanUp = () => {
            okBtn.onclick = null;
            cancelBtn.onclick = null;
            modal.classList.remove('modal-visible');
            modal.classList.add('modal-hidden');
        };

        okBtn.onclick = () => { cleanUp(); resolve(true); };
        cancelBtn.onclick = () => { cleanUp(); resolve(false); };
    });
}

// ===== CARGAR DONACIONES =====
function cargarDonaciones() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener donaciones');
            return response.json();
        })
        .then(donaciones => pintarDonaciones(donaciones))
        .catch(error => {
            console.error(error);
            showToast('No se pudieron cargar las donaciones', 'error');
        });
}

function pintarDonaciones(donaciones) {
    const tbody = document.querySelector('#tablaDonaciones tbody');
    tbody.innerHTML = '';

    donaciones.forEach(d => {
        const tr = document.createElement('tr');

        const editarClass = d.editar ? 'icono editar' : 'icono editar disabled';
        const eliminarClass = d.eliminar ? 'icono eliminar' : 'icono eliminar disabled';
        const subirClass = d.subirPublicacion ? 'icono subir' : 'icono subir disabled';
        const bajaClass = d.bajaPublicacion ? 'icono baja' : 'icono baja disabled';

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

// ===== FUNCIONES DE ACCIÓN =====
function irAEditar(id, esPermitido) {
    if (!esPermitido) return;
    window.location.href = `editar-donaciones.html?id=${id}`;
}

function gestionarAccion(id, accion, esPermitido) {
    if (!esPermitido) return;

    if (accion === 'eliminar') {
        showConfirm("Eliminar donación", "¿Estás seguro de eliminar permanentemente esta donación?")
            .then(ok => { if (ok) eliminarDonacion(id); });
    } else if (accion === 'subir') {
        showConfirm("Activar publicación", "¿Deseas activar esta publicación para que sea visible en el mapa?")
            .then(ok => { if (ok) activarDonacion(id); });
    } else if (accion === 'baja') {
        showConfirm("Desactivar publicación", "¿Deseas ocultar esta publicación del mapa (volver inactiva)?")
            .then(ok => { if (ok) desactivarDonacion(id); });
    }
}

// ===== ELIMINAR =====
function eliminarDonacion(id) {
    fetch(`${BASE_URL_DONACION}/donaciones/${id}/eliminar`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                showToast("Donación eliminada.", "success");
                cargarDonaciones();
            } else showToast("Error al eliminar.", "error");
        })
        .catch(err => {
            console.error(err);
            showToast("Error de conexión.", "error");
        });
}

// ===== ACTIVAR =====
function activarDonacion(id) {
    fetch(`${BASE_URL_DONACION}/${id}/volver-activa`, { method: 'PATCH' })
        .then(res => {
            if (res.ok) {
                showToast("¡Publicación activada con éxito!", "success");
                cargarDonaciones();
            } else showToast("No se pudo activar la publicación.", "error");
        })
        .catch(err => {
            console.error(err);
            showToast("Error de conexión.", "error");
        });
}

// ===== DESACTIVAR =====
function desactivarDonacion(id) {
    fetch(`${BASE_URL_DONACION}/${id}/volver-inactiva`, { method: 'PATCH' })
        .then(res => {
            if (res.ok) {
                showToast("Publicación desactivada.", "success");
                cargarDonaciones();
            } else showToast("No se pudo desactivar la publicación.", "error");
        })
        .catch(err => {
            console.error(err);
            showToast("Error de conexión.", "error");
        });
}
