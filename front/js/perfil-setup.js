const API_URL = 'http://localhost:8080';

// 1. Verificación de Seguridad
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'login.html'; // Si no hay token, fuera de aquí
}

// 2. Inicializar Mapa Selector
// Coordenada default (CDMX centro), ajusta a tu región
const defaultLat = 19.4326;
const defaultLng = -99.1332;

const map = L.map('mapPicker').setView([defaultLat, defaultLng], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenStreetMap'
}).addTo(map);

// Crear un marcador arrastrable
let marker = L.marker([defaultLat, defaultLng], {
    draggable: true
}).addTo(map);

// Función para actualizar los inputs ocultos cuando se mueve el pin
function updateCoordinates(lat, lng) {
    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
}

// Inicializar inputs con valores por defecto
updateCoordinates(defaultLat, defaultLng);

// Escuchar evento "dragend" (cuando sueltas el pin)
marker.on('dragend', function(e) {
    const position = marker.getLatLng();
    updateCoordinates(position.lat, position.lng);
});

// También mover el pin si hacen clic en el mapa
map.on('click', function(e) {
    marker.setLatLng(e.latlng);
    updateCoordinates(e.latlng.lat, e.latlng.lng);
});


// 3. Manejo del Formulario
document.getElementById('profileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const btnSave = document.querySelector('.btn-save');
    const msgBox = document.getElementById('messageBox');
    
    // Recopilar Checkboxes seleccionados
    const selectedCategories = [];
    document.querySelectorAll('input[name="categorias"]:checked').forEach((checkbox) => {
        selectedCategories.push(checkbox.value);
    });

    if (selectedCategories.length === 0) {
        alert("Por favor selecciona al menos una categoría de donación.");
        return;
    }

    // Preparar objeto a enviar
    const perfilData = {
        descripcion: document.getElementById('descripcion').value,
        historia: document.getElementById('historia').value,
        telefono: document.getElementById('telefono').value,
        sitioWeb: document.getElementById('sitioWeb').value,
        necesidadesEspecificas: document.getElementById('necesidadesEspecificas').value,
        categorias: selectedCategories, // Array de strings
        latitud: parseFloat(document.getElementById('lat').value),
        longitud: parseFloat(document.getElementById('lng').value)
    };

    btnSave.disabled = true;
    btnSave.innerText = "Guardando...";

    try {
        // Enviar al backend (ENDPOINT SUGERIDO: PUT /api/perfil)
        // Usamos el token para que el backend sepa de quién es este perfil
        const response = await fetch(`${API_URL}/api/perfil`, {
            method: 'PUT', // O POST, depende de tu backend
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // ¡Importante! Enviar el token
            },
            body: JSON.stringify(perfilData)
        });

        if (response.ok) {
            alert("¡Perfil completado con éxito!");
            window.location.href = 'dashboard.html'; // O a donde quieras enviarlos después
        } else {
            throw new Error("Error al guardar el perfil.");
        }

    } catch (error) {
        msgBox.style.display = 'block';
        msgBox.innerText = 'Error de conexión o servidor. Intenta de nuevo.';
        console.error(error);
        btnSave.disabled = false;
        btnSave.innerText = "Guardar y Publicar Perfil";
    }
});

// Botón Logout
document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});