// Obtener ID (asegúrate de guardar esto en login)
const idPersona = localStorage.getItem('idPersona');
const URL_BASE = 'http://localhost:8080/donacion/persona';

document.addEventListener('DOMContentLoaded', () => {
    // Protección básica de ruta
    if (!idPersona) {
        window.location.href = 'login.html';
        return;
    }

    cargarPerfil();

    // Configurar botón de editar (redirige a la vista que creamos antes)
    document.getElementById('btnIrEditar').addEventListener('click', () => {
        window.location.href = 'perfil-editar.html';
    });
});

async function cargarPerfil() {
    try {
        const response = await fetch(`${URL_BASE}/${idPersona}`);
        
        if (!response.ok) throw new Error("No se pudo cargar la información");

        const data = await response.json();

        // 1. Llenar textos principales
        const nombreCompleto = `${data.nombre} ${data.primerApellido} ${data.segundoApellido || ''}`;
        
        document.getElementById('displayNombreCompleto').textContent = nombreCompleto;
        document.getElementById('displayCorreo').textContent = data.correoElectronico;

        // 2. Llenar detalles individuales
        document.getElementById('valNombre').textContent = data.nombre;
        document.getElementById('valApellido1').textContent = data.primerApellido;
        document.getElementById('valApellido2').textContent = data.segundoApellido || '-'; // Guión si no tiene

        // 3. Generar Avatar (Iniciales)
        // Toma la primera letra del nombre y la primera del primer apellido
        const inicialNombre = data.nombre ? data.nombre.charAt(0).toUpperCase() : '';
        const inicialApellido = data.primerApellido ? data.primerApellido.charAt(0).toUpperCase() : '';
        
        document.getElementById('initials').textContent = inicialNombre + inicialApellido;

    } catch (error) {
        console.error(error);
        alert("Error cargando perfil. Por favor inicia sesión nuevamente.");
        // Opcional: window.location.href = 'login.html';
    }
}