const API_URL = 'http://localhost:8080/donacion/personal';

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    obtenerUsuarios();
});

async function obtenerUsuarios() {
    const tablaBody = document.getElementById('tablaBody');

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al conectar con el servidor');
        }

        const usuarios = await response.json();

        // Limpiar mensaje de "Cargando..."
        tablaBody.innerHTML = '';

        // Verificar si hay datos
        if (usuarios.length === 0) {
            tablaBody.innerHTML = `
                <tr>
                    <td colspan="3" class="loading-text">No hay usuarios registrados.</td>
                </tr>`;
            return;
        }

        // Iterar sobre el array JSON y crear filas
        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');

            // Columna ID
            const tdId = document.createElement('td');
            tdId.textContent = usuario.idPersona;

            // Columna Nombre
            const tdNombre = document.createElement('td');
            tdNombre.innerHTML = `<strong>${usuario.nombre}</strong>`;

            // Columna Acciones (Botón Eliminar)
            const tdAcciones = document.createElement('td');
            tdAcciones.className = 'text-center';

            if (usuario.eliminar) {
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn-delete';
                btnEliminar.textContent = 'Eliminar';
                
                // Asignamos el evento click
                btnEliminar.onclick = () => confirmarEliminacion(usuario.idPersona, usuario.nombre);
                
                tdAcciones.appendChild(btnEliminar);
            } else {
                tdAcciones.textContent = '-';
            }

            fila.appendChild(tdId);
            fila.appendChild(tdNombre);
            fila.appendChild(tdAcciones);

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
    }
}

// --- LÓGICA DE ELIMINACIÓN ACTUALIZADA ---
async function confirmarEliminacion(id, nombre) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al usuario "${nombre}"?`);
    
    if (confirmacion) {
        // 1. Construir la URL exacta con el ID
        const urlEliminar = `http://localhost:8080/donacion/persona/${id}/eliminar`;

        try {
            // 2. Ejecutar la petición DELETE
            const response = await fetch(urlEliminar, {
                method: 'DELETE' // Método estándar para borrar
            });
            
            // 3. Verificar respuesta
            if (response.ok) {
                alert(`Usuario "${nombre}" eliminado correctamente.`);
                // 4. Recargar la tabla para ver que desapareció
                obtenerUsuarios();
            } else {
                // Si el servidor responde con error (ej. 400 o 500)
                alert("No se pudo eliminar el usuario. Es posible que tenga datos asociados.");
            }

        } catch (error) {
            console.error(error);
            alert("Error de conexión al intentar eliminar.");
        }
    }
}