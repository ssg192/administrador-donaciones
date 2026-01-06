// URLs de la API
const URL_CREAR = 'http://localhost:8080/donacion';
const URL_CATALOGO = 'http://localhost:8080/donacion/catalogo/tipo-donacion';

// Variables globales para el mapa
let map, marker;

document.addEventListener('DOMContentLoaded', () => {
    inicializarMapa();
    cargarCatalogoTipos();
});

// ---------------------------------------------------------
// 1. INICIALIZAR MAPA (Leaflet)
// ---------------------------------------------------------
function inicializarMapa() {
    // Coordenadas por defecto (Centro de México o tu localidad)
    const latDefault = 19.4326;
    const lngDefault = -99.1332;

    map = L.map('mapPicker').setView([latDefault, lngDefault], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Crear marcador arrastrable
    marker = L.marker([latDefault, lngDefault], { draggable: true }).addTo(map);

    // Evento al soltar el marcador
    marker.on('dragend', function(e) {
        const position = marker.getLatLng();
        actualizarInputsCoordenadas(position.lat, position.lng);
    });

    // Evento al hacer clic en el mapa (mueve el marcador ahí)
    map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        actualizarInputsCoordenadas(e.latlng.lat, e.latlng.lng);
    });

    // Inicializar valores ocultos
    actualizarInputsCoordenadas(latDefault, lngDefault);
}

function actualizarInputsCoordenadas(lat, lng) {
    document.getElementById('latitud').value = lat;
    document.getElementById('longitud').value = lng;
    document.getElementById('coords-text').innerText = `Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

// ---------------------------------------------------------
// 2. CARGAR CATÁLOGO (Select)
// ---------------------------------------------------------
async function cargarCatalogoTipos() {
    const select = document.getElementById('idTipoDonacion');
    
    try {
        const response = await fetch(URL_CATALOGO);
        if (!response.ok) throw new Error("Error al cargar catálogo");
        
        const tipos = await response.json();
        
        // Limpiar opción de "Cargando..."
        select.innerHTML = '<option value="">-- Selecciona un tipo --</option>';

        // Rellenar el select
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;      // El ID que pide el JSON final
            option.textContent = tipo.nombre; // Lo que ve el usuario
            select.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        select.innerHTML = '<option value="">Error al cargar opciones</option>';
    }
}

// ---------------------------------------------------------
// 3. ENVIAR FORMULARIO (POST)
// ---------------------------------------------------------
document.getElementById('donacionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btnSubmit');
    const msgDiv = document.getElementById('feedbackMessage');
    
    // Obtener datos
    const idTipoDonacion = document.getElementById('idTipoDonacion').value;
    const descripcion = document.getElementById('descripcion').value;
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;

    // Obtener ID del usuario logueado (desde localStorage)
    // ¡IMPORTANTE! Asegúrate de guardar esto al hacer Login
    const idPersona = localStorage.getItem('idPersona') || 0; // Usamos 0 si no hay login para probar, pero debería ser real

    if (!idTipoDonacion) {
        alert("Por favor selecciona un tipo de donación");
        return;
    }

    // Construir el JSON exacto que pediste
    const payload = {
        "idPersona": parseInt(idPersona), // Convertir a entero
        "idTipoDonacion": parseInt(idTipoDonacion),
        "descripcion": descripcion,
        "latitud": parseFloat(latitud),
        "longitud": parseFloat(longitud),
        "profundidad": 0 // Valor por defecto ya que no se pide en UI
    };

    // UI: Bloquear botón
    btn.disabled = true;
    btn.innerText = "Guardando...";
    msgDiv.style.display = 'none';

    try {
        const response = await fetch(URL_CREAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Si usas seguridad JWT
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("¡Centro registrado con éxito!");
            window.location.href = 'index.html'; // O redirigir al mapa
        } else {
            throw new Error("Error en el servidor al guardar.");
        }

    } catch (error) {
        console.error(error);
        msgDiv.innerText = "Ocurrió un error al registrar. Inténtalo de nuevo.";
        msgDiv.style.display = 'block';
        btn.disabled = false;
        btn.innerText = "Registrar Lugar";
    }
});