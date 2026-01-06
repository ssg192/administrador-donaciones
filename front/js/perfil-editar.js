// Obtener ID del usuario desde localStorage
const idPersona = localStorage.getItem('idPersona');
const URL_BASE = 'http://localhost:8080/donacion/persona';

document.addEventListener('DOMContentLoaded', () => {
    if (!idPersona) {
        alert("No se encontró sesión activa.");
        window.location.href = 'login.html';
        return;
    }
    cargarDatosPerfil();
});

// 1. CARGAR DATOS (GET)
async function cargarDatosPerfil() {
    try {
        const response = await fetch(`${URL_BASE}/${idPersona}`);
        
        if (!response.ok) throw new Error("Error al obtener datos del usuario");

        const datos = await response.json();

        document.getElementById('nombre').value = datos.nombre || '';
        document.getElementById('primerApellido').value = datos.primerApellido || '';
        document.getElementById('segundoApellido').value = datos.segundoApellido || '';
        document.getElementById('correoElectronico').value = datos.correoElectronico || '';

    } catch (error) {
        console.error(error);
        alert("Error cargando perfil: " + error.message);
    }
}

// 2. GUARDAR CAMBIOS (POST/PUT)
document.getElementById('editarPerfilForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('btnSubmit');
    const msgDiv = document.getElementById('feedbackMessage');
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value;
    const primerApellido = document.getElementById('primerApellido').value;
    const segundoApellido = document.getElementById('segundoApellido').value;
    const correo = document.getElementById('correoElectronico').value;
    
    const passwordNueva = document.getElementById('passwordNueva').value;
    const confirmPass = document.getElementById('confirmPasswordNueva').value;
    const passwordActual = document.getElementById('passwordActual').value;

    // Validación de contraseñas nuevas
    if (passwordNueva !== "" && passwordNueva !== confirmPass) {
        mostrarMensaje("La nueva contraseña y su confirmación no coinciden.");
        return;
    }

    if (!passwordActual) {
        mostrarMensaje("Debes ingresar tu contraseña actual para confirmar.");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Guardando...";
    msgDiv.style.display = 'none';

    // Construir JSON
    const payload = {
        "nombre": nombre,
        "primerApellido": primerApellido,
        "segundoApellido": segundoApellido,
        "correoElectronico": correo,
        "password": passwordActual,
        // CAMBIO AQUÍ: Si está vacío (""), enviamos null. Si no, enviamos el valor.
        "passwordNueva": passwordNueva === "" ? null : passwordNueva 
    };

    try {
        const response = await fetch(`${URL_BASE}/${idPersona}/editar`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("¡Perfil actualizado con éxito!");
            window.location.reload(); 
        } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Error al actualizar. Verifica tu contraseña actual.");
        }

    } catch (error) {
        console.error(error);
        mostrarMensaje(error.message);
        btn.disabled = false;
        btn.textContent = "Guardar Cambios";
    }
});

function mostrarMensaje(texto) {
    const msgDiv = document.getElementById('feedbackMessage');
    msgDiv.textContent = texto;
    msgDiv.style.display = 'block';
}