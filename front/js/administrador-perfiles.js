const API_URL = 'http://localhost:8080/donacion/personal';
const BASE_URL_PERSONA = 'http://localhost:8080/donacion/persona'; // Para eliminar usuarios

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    obtenerUsuarios();
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

// ===== CARGAR USUARIOS =====
async function obtenerUsuarios() {
    const tablaBody = document.getElementById('tablaBody');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        const usuarios = await response.json();

        tablaBody.innerHTML = '';

        if (usuarios.length === 0) {
            tablaBody.innerHTML = `
                <tr>
                    <td colspan="3" class="loading-text">No hay usuarios registrados.</td>
                </tr>`;
            return;
        }

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');

            // Columnas
            const tdId = document.createElement('td');
            tdId.textContent = usuario.idPersona;

            const tdNombre = document.createElement('td');
            tdNombre.innerHTML = `<strong>${usuario.nombre}</strong>`;

            const tdAcciones = document.createElement('td');
            tdAcciones.className = 'text-center';

            if (usuario.eliminar) {
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn-delete';
                btnEliminar.textContent = 'Eliminar';

                btnEliminar.onclick = () => confirmarEliminacion(usuario.idPersona, usuario.nombre);
                tdAcciones.appendChild(btnEliminar);
            } else {
                tdAcciones.textContent = '-';
            }

            fila.append(tdId, tdNombre, tdAcciones);
            tablaBody.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        tablaBody.innerHTML = `
            <tr>
                <td colspan="3" class="loading-text" style="color: red;">
                    Error al cargar los datos. Intenta nuevamente.
                </td>
            </tr>`;
        showToast("No se pudieron cargar los usuarios", "error");
    }
}

// ===== ELIMINAR USUARIO =====
async function confirmarEliminacion(id, nombre) {
    const ok = await showConfirm("Eliminar usuario", `¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`);

    if (!ok) return;

    try {
        const response = await fetch(`${BASE_URL_PERSONA}/${id}/eliminar`, { method: 'DELETE' });

        if (response.ok) {
            showToast(`Usuario "${nombre}" eliminado correctamente.`, "success");
            obtenerUsuarios();
        } else {
            showToast("No se pudo eliminar el usuario. Puede tener datos asociados.", "error");
        }

    } catch (error) {
        console.error(error);
        showToast("Error de conexión al intentar eliminar.", "error");
    }
}
