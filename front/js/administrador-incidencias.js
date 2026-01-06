const URL_LISTAR = 'http://localhost:8080/donacion/incidencias';

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', () => {
    cargarIncidencias();
});

async function cargarIncidencias() {
    const tablaBody = document.getElementById('tablaBody');

    try {
        const response = await fetch(URL_LISTAR);
        if (!response.ok) throw new Error("Error al obtener incidencias");
        
        const lista = await response.json();

        tablaBody.innerHTML = ''; // Limpiar loader

        if (lista.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay incidencias registradas.</td></tr>';
            return;
        }

        lista.forEach(item => {
            const fila = document.createElement('tr');

            // 1. ID
            const tdId = document.createElement('td');
            tdId.textContent = item.idIncidencia;

            // 2. Tipo
            const tdTipo = document.createElement('td');
            tdTipo.textContent = item.tipoIncidencia;
            tdTipo.style.fontWeight = "bold";

            // 3. Problema (Descripción)
            const tdProblema = document.createElement('td');
            tdProblema.textContent = item.problema;

            // 4. Estado (Con estilo visual)
            const tdEstado = document.createElement('td');
            const spanEstado = document.createElement('span');
            spanEstado.textContent = item.estado;
            spanEstado.className = 'status-badge';
            
            // Estilos visuales según estado
            if (item.estado.toLowerCase().includes('resuelt')) {
                spanEstado.classList.add('status-resuelta');
            } else {
                spanEstado.classList.add('status-pendiente');
            }
            tdEstado.appendChild(spanEstado);

            // 5. Acciones
            const tdAcciones = document.createElement('td');
            tdAcciones.className = 'actions-cell';

            // Botón RESOLVER
            if (item.marcarComoResuelta) {
                const btnResolver = document.createElement('button');
                btnResolver.className = 'btn-resolve';
                btnResolver.textContent = '✓ Resolver';
                btnResolver.title = "Marcar como resuelta";
                btnResolver.onclick = () => marcarResuelta(item.idIncidencia);
                tdAcciones.appendChild(btnResolver);
            }

            // Botón ELIMINAR
            if (item.eliminar) {
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn-delete';
                btnEliminar.textContent = '🗑 Eliminar';
                btnEliminar.title = "Eliminar incidencia";
                btnEliminar.onclick = () => eliminarIncidencia(item.idIncidencia);
                tdAcciones.appendChild(btnEliminar);
            }

            // Si no hay acciones disponibles
            if (!item.marcarComoResuelta && !item.eliminar) {
                tdAcciones.innerHTML = '<span style="color:#ccc;">-</span>';
            }

            fila.appendChild(tdId);
            fila.appendChild(tdTipo);
            fila.appendChild(tdProblema);
            fila.appendChild(tdEstado);
            fila.appendChild(tdAcciones);

            tablaBody.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        tablaBody.innerHTML = '<tr><td colspan="5" class="text-center" style="color:red">Error de conexión.</td></tr>';
    }
}

// --- Lógica de Botones Actualizada ---

async function marcarResuelta(id) {
    if(!confirm("¿Deseas marcar esta incidencia como RESUELTA?")) return;

    // Construcción de la URL
    const urlUpdate = `http://localhost:8080/donacion/${id}/update`;

    try {
        const response = await fetch(urlUpdate, { 
            method: 'PATCH' // Método solicitado
        });
        
        if (response.ok) {
            alert(`Incidencia marcada como resuelta correctamente.`);
            cargarIncidencias(); // Recargar tabla para ver el cambio de estado
        } else {
            alert("No se pudo actualizar el estado de la incidencia.");
        }

    } catch (error) {
        console.error(error);
        alert("Error de conexión al intentar actualizar.");
    }
}

async function eliminarIncidencia(idIncidencia) {
    if(!confirm("¿Estás seguro de ELIMINAR esta incidencia permanentemente?")) return;

    // Nota: Como no me has dado la URL específica para eliminar incidencias en este paso,
    // he dejado la lógica lista para cuando tengas el endpoint (usualmente DELETE).
    // Si la URL es: http://localhost:8080/donacion/{id}/eliminar, descomenta abajo:

    
    const urlEliminar = `http://localhost:8080/donacion/${idIncidencia}/eliminar`;
    try {
        const response = await fetch(urlEliminar, { method: 'DELETE' });
        if (response.ok) {
            alert("Incidencia eliminada.");
            cargarIncidencias();
        } else {
            alert("Error al eliminar.");
        }
    } catch (error) { alert("Error de conexión"); }
    
    
    
}