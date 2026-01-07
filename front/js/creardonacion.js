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
    const latDefault = 19.4326;
    const lngDefault = -99.1332;

    map = L.map('mapPicker').setView([latDefault, lngDefault], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    marker = L.marker([latDefault, lngDefault], { draggable: true }).addTo(map);

    marker.on('dragend', function(e) {
        const position = marker.getLatLng();
        actualizarInputsCoordenadas(position.lat, position.lng);
    });

    map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        actualizarInputsCoordenadas(e.latlng.lat, e.latlng.lng);
    });

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
        select.innerHTML = '<option value="">-- Selecciona un tipo --</option>';

        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.nombre;
            select.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        select.innerHTML = '<option value="">Error al cargar opciones</option>';
    }
}

// ---------------------------------------------------------
// 3. ENVIAR FORMULARIO (POST) con Modal
// ---------------------------------------------------------
document.getElementById('donacionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btnSubmit');
    const msgDiv = document.getElementById('feedbackMessage');

    const idTipoDonacion = document.getElementById('idTipoDonacion').value;
    const descripcion = document.getElementById('descripcion').value;
    const latitud = document.getElementById('latitud').value;
    const longitud = document.getElementById('longitud').value;

    const idPersona = localStorage.getItem('idPersona') || 0;

    // Validación
    if (!idTipoDonacion) {
        await showConfirm("Validación", "Por favor selecciona un tipo de donación");
        return;
    }

    // Confirmación antes de enviar
    const ok = await showConfirm("Confirmación", "¿Deseas registrar este nuevo centro de donación?");
    if (!ok) return;

    const payload = {
        idPersona: parseInt(idPersona),
        idTipoDonacion: parseInt(idTipoDonacion),
        descripcion,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        profundidad: 0
    };

    btn.disabled = true;
    btn.innerText = "Guardando...";
    msgDiv.style.display = 'none';

    try {
        const response = await fetch(URL_CREAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            await showConfirm("Éxito", "¡Centro registrado con éxito!");
            window.location.href = 'administrador-donaciones.html';
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

// ---------------------------------------------------------
// 4. MODAL REUTILIZABLE
// ---------------------------------------------------------
function showConfirm(title, message) {
    return new Promise(resolve => {
        const modal = document.getElementById('modal-confirm');
        const okBtn = document.getElementById('modal-ok');
        const cancelBtn = document.getElementById('modal-cancel');

        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;

        modal.classList.remove('modal-hidden');
        modal.classList.add('modal-visible');

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
