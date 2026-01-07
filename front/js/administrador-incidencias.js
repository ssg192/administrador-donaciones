const URL_LISTAR = 'http://localhost:8080/donacion/incidencias';

document.addEventListener('DOMContentLoaded', () => {
    cargarIncidencias();
});

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

// ===== MODAL CONFIRM BONITO =====
function showConfirm(title, message) {
    return new Promise(resolve => {
        const modal = document.getElementById('modal-confirm');
        const okBtn = document.getElementById('modal-ok');
        const cancelBtn = document.getElementById('modal-cancel');

        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;

        // Mostrar modal
        modal.classList.remove('modal-hidden');

        // Limpiar eventos anteriores
        okBtn.onclick = null;
        cancelBtn.onclick = null;

        const cleanUp = () => {
            modal.classList.add('modal-hidden');
            okBtn.onclick = null;
            cancelBtn.onclick = null;
        };

        okBtn.onclick = () => { cleanUp(); resolve(true); };
        cancelBtn.onclick = () => { cleanUp(); resolve(false); };
    });
}

// ===== Cargar incidencias =====
async function cargarIncidencias() {
    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = '<tr><td colspan="5" class="loading-text">Cargando incidencias...</td></tr>';

    try {
        const response = await fetch(URL_LISTAR);
        if (!response.ok) throw new Error("Error al obtener incidencias");

        const lista = await response.json();
        tablaBody.innerHTML = '';

        if (!lista.length) {
            tablaBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay incidencias registradas.</td></tr>';
            return;
        }

        lista.forEach(item => {
            const fila = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = item.idIncidencia;

            const tdTipo = document.createElement('td');
            tdTipo.textContent = item.tipoIncidencia;
            tdTipo.style.fontWeight = "bold";

            const tdProblema = document.createElement('td');
            tdProblema.textContent = item.problema;

            const tdEstado = document.createElement('td');
            const spanEstado = document.createElement('span');
            spanEstado.textContent = item.estado;
            spanEstado.className = 'status-badge ' + (item.estado.toLowerCase().includes('resuelt') ? 'status-resuelta' : 'status-pendiente');
            tdEstado.appendChild(spanEstado);

            const tdAcciones = document.createElement('td');
            tdAcciones.className = 'actions-cell';

            // Botón "Resolver" con modal bonito
            if (item.marcarComoResuelta) {
                const btnResolver = document.createElement('button');
                btnResolver.className = 'btn-resolve';
                btnResolver.textContent = '✓ Resolver';
                btnResolver.onclick = async () => {
                    const ok = await showConfirm(
                        "Resolver incidencia",
                        "¿Deseas marcar esta incidencia como RESUELTA?"
                    );
                    if (ok) marcarResuelta(item.idIncidencia);
                };
                tdAcciones.appendChild(btnResolver);
            }

            // Botón "Eliminar" con modal bonito
            if (item.eliminar) {
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn-delete';
                btnEliminar.textContent = '🗑 Eliminar';
                btnEliminar.onclick = async () => {
                    const ok = await showConfirm(
                        "Eliminar incidencia",
                        "Esta acción es permanente. ¿Deseas continuar?"
                    );
                    if (ok) eliminarIncidencia(item.idIncidencia);
                };
                tdAcciones.appendChild(btnEliminar);
            }

            if (!item.marcarComoResuelta && !item.eliminar) {
                tdAcciones.innerHTML = '<span style="color:#ccc;">-</span>';
            }

            fila.append(tdId, tdTipo, tdProblema, tdEstado, tdAcciones);
            tablaBody.appendChild(fila);
        });

    } catch {
        tablaBody.innerHTML = '<tr><td colspan="5" class="text-center" style="color:red">Error de conexión.</td></tr>';
        showToast("No se pudo cargar las incidencias", "error");
    }
}

// ===== Marcar incidencia como resuelta =====
async function marcarResuelta(id) {
    const urlUpdate = `http://localhost:8080/donacion/${id}/update`;
    const response = await fetch(urlUpdate, { method: 'PATCH' });
    if (response.ok) {
        showToast("Incidencia marcada como resuelta", "success");
        cargarIncidencias();
    } else {
        showToast("No se pudo actualizar la incidencia", "error");
    }
}

// ===== Eliminar incidencia =====
async function eliminarIncidencia(id) {
    const urlEliminar = `http://localhost:8080/donacion/${id}/eliminar`;
    const response = await fetch(urlEliminar, { method: 'DELETE' });
    if (response.ok) {
        showToast("Incidencia eliminada correctamente", "success");
        cargarIncidencias();
    } else {
        showToast("Error al eliminar la incidencia", "error");
    }
}
