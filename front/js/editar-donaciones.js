// URLs Base
const URL_BASE_DONACION = 'http://localhost:8080/donacion';
const URL_CATALOGO = 'http://localhost:8080/donacion/catalogo/tipo-donacion';

// Variables globales mapa
let map, marker;
let idDonacion = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener ID de la URL (ej. editar-donacion.html?id=5)
    const urlParams = new URLSearchParams(window.location.search);
    idDonacion = urlParams.get('id');

    if (!idDonacion) {
        alert("No se especificó una donación para editar.");
        window.history.back();
        return;
    }

    inicializar();
});

async function inicializar() {
    // Cargar catálogo primero para que el select esté listo
    await cargarCatalogo();
    // Luego cargar los datos para rellenar el formulario
    await cargarDatosDonacion();
}

// ---------------------------------------------------------
// 1. CARGAR CATÁLOGO
// ---------------------------------------------------------
async function cargarCatalogo() {
    const select = document.getElementById('idTipoDonacion');
    try {
        const response = await fetch(URL_CATALOGO);
        if(!response.ok) throw new Error("Error cargando catálogo");
        
        const tipos = await response.json();
        
        select.innerHTML = '<option value="">Seleccione...</option>';
        tipos.forEach(t => {
            const option = document.createElement('option');
            option.value = t.id;
            option.textContent = t.nombre;
            select.appendChild(option);
        });
    } catch (e) {
        console.error(e);
        alert("Error al cargar tipos de donación.");
    }
}

// ---------------------------------------------------------
// 2. CARGAR DATOS Y MAPA
// ---------------------------------------------------------
async function cargarDatosDonacion() {
    try {
        const response = await fetch(`${URL_BASE_DONACION}/${idDonacion}`);
        if(!response.ok) throw new Error("Error obteniendo la donación");

        const data = await response.json();

        // Rellenar campos
        document.getElementById('idTipoDonacion').value = data.idTipoDonacion;
        document.getElementById('descripcion').value = data.descripcion;
        
        // Inicializar Mapa con las coordenadas que vienen del JSON
        iniciarMapa(data.latitud, data.longitud);

    } catch (e) {
        console.error(e);
        alert("No se pudo cargar la información de la donación.");
    }
}

function iniciarMapa(lat, lng) {
    // Si por alguna razón vienen en 0 o nulas, usar default (CDMX)
    const latInicial = lat || 19.4326;
    const lngInicial = lng || -99.1332;

    map = L.map('mapPicker').setView([latInicial, lngInicial], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Crear marcador arrastrable en la posición original
    marker = L.marker([latInicial, lngInicial], { draggable: true }).addTo(map);

    // Actualizar inputs ocultos
    actualizarInputs(latInicial, lngInicial);

    // Eventos de arrastre
    marker.on('dragend', function(e) {
        const pos = marker.getLatLng();
        actualizarInputs(pos.lat, pos.lng);
    });

    map.on('click', function(e) {
        marker.setLatLng(e.latlng);
        actualizarInputs(e.latlng.lat, e.latlng.lng);
    });
}

function actualizarInputs(lat, lng) {
    document.getElementById('latitud').value = lat;
    document.getElementById('longitud').value = lng;
    document.getElementById('coords-text').innerText = `Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

// ---------------------------------------------------------
// 3. GUARDAR CAMBIOS (EDITAR)
// ---------------------------------------------------------
document.getElementById('editarDonacionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btnSubmit');
    const msgDiv = document.getElementById('feedbackMessage');

    const idTipo = document.getElementById('idTipoDonacion').value;
    const descripcion = document.getElementById('descripcion').value;
    const lat = document.getElementById('latitud').value;
    const lng = document.getElementById('longitud').value;

    btn.disabled = true;
    btn.textContent = "Guardando...";
    msgDiv.style.display = 'none';

    // JSON para editar
    const payload = {
        "idTipoDonacion": parseInt(idTipo),
        "descripcion": descripcion,
        "latitud": parseFloat(lat),
        "longitud": parseFloat(lng),
        "profundidad": 0 // Valor hardcodeado según requerimiento
    };

    try {
        const response = await fetch(`${URL_BASE_DONACION}/${idDonacion}/editar`, {
            method: 'PUT', // O 'POST', según tu backend
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("¡Donación actualizada correctamente!");
            window.history.back(); // Regresar a la lista
        } else {
            throw new Error("Error al guardar cambios.");
        }

    } catch (error) {
        console.error(error);
        msgDiv.innerText = "Error al conectar con el servidor.";
        msgDiv.style.display = 'block';
        btn.disabled = false;
        btn.textContent = "Guardar Cambios";
    }
});