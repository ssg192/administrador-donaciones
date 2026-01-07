// URLs de la API
const URL_CREAR = 'https://administrador-donaciones-production.up.railway.app/donacion/incidencia';
const URL_CATALOGO = 'https://administrador-donaciones-production.up.railway.app/donacion/catalogo/tipo-incidencia';

document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogoIncidencias();
});

// ---------------------------------------------------------
// 1. CARGAR CATÁLOGO (GET)
// ---------------------------------------------------------
async function cargarCatalogoIncidencias() {
    const select = document.getElementById('idTipoIncidencia');

    try {
        const response = await fetch(URL_CATALOGO);
        
        if (!response.ok) throw new Error("Error al cargar el catálogo");

        const tipos = await response.json();

        // Limpiar "Cargando..."
        select.innerHTML = '<option value="">-- Selecciona una opción --</option>';

        // Llenar el select
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;       // id para el JSON final
            option.textContent = tipo.nombre; // texto visible
            select.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        select.innerHTML = '<option value="">Error de conexión</option>';
    }
}

// ---------------------------------------------------------
// 2. ENVIAR FORMULARIO (POST)
// ---------------------------------------------------------
document.getElementById('incidenciaForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('btnSubmit');
    const msgDiv = document.getElementById('feedbackMessage');
    
    // Obtener valores
    const idTipoIncidencia = document.getElementById('idTipoIncidencia').value;
    const descripcion = document.getElementById('descripcion').value;

    // Validar selección
    if (!idTipoIncidencia) {
        mostrarMensaje("Debes seleccionar un tipo de problema.", "error");
        return;
    }

    // UI: Bloquear botón
    btn.disabled = true;
    btn.textContent = "Enviando...";
    ocultarMensaje();

    try {
        // Construir JSON
        const payload = {
            idTipoIncidencia: parseInt(idTipoIncidencia), // Aseguramos que sea número
            descripcion: descripcion
        };

        const response = await fetch(URL_CREAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            mostrarMensaje("¡Incidencia reportada con éxito!", "success");
            // Limpiar formulario
            document.getElementById('incidenciaForm').reset();
        } else {
            throw new Error("El servidor rechazó la solicitud.");
        }

    } catch (error) {
        console.error(error);
        mostrarMensaje("Ocurrió un error al enviar. Intenta de nuevo.", "error");
    } finally {
        // Restaurar botón
        btn.disabled = false;
        btn.textContent = "Enviar Reporte";
    }
});

// Funciones auxiliares para mensajes
function mostrarMensaje(texto, tipo) {
    const msgDiv = document.getElementById('feedbackMessage');
    msgDiv.textContent = texto;
    msgDiv.style.display = 'block';
    
    // Cambiar estilo según tipo
    if (tipo === 'success') {
        msgDiv.className = 'error-message success-style';
    } else {
        msgDiv.className = 'error-message error-style';
    }
}

function ocultarMensaje() {
    document.getElementById('feedbackMessage').style.display = 'none';
}