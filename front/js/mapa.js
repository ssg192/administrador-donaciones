// 1. Configuración inicial del mapa
// Coordenadas iniciales (Ej: Centro de México). Ajusta esto a tu ciudad.
const map = L.map('map').setView([19.4326, -99.1332], 5); 

// Capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// 2. Configuración del ícono (Parche para un bug común de Leaflet con rutas de imágenes)
const iconoDefault = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
//TODO : Sacar rol de la sesión 
// URL de tu API (Ajusta el endpoint según tu controlador en Quarkus)
const API_URL = 'http://localhost:8080/donacion/donaciones?idRol=1'; 

// 3. Función asíncrona para obtener datos (GET)
async function cargarPuntos() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // Si necesitas token para ver el mapa, agrega 'Authorization': ...
            }
        });

        if (!response.ok) {
            throw new Error('Error al conectar con el servidor');
        }

        const listaCentros = await response.json();
        console.log("Datos recibidos:", listaCentros);

        // 4. Iterar sobre la lista recibida y crear marcadores
        listaCentros.forEach(centro => {
            // Validar que vengan coordenadas válidas para no romper el mapa
            if (centro.latitud && centro.longitud) {
                
                // Crear marcador usando las coordenadas del JSON
                const marker = L.marker([centro.latitud, centro.longitud], { icon: iconoDefault })
                    .addTo(map);

                // Crear el contenido del globo (popup) usando tus campos
                const contenidoPopup = `
                    <div style="text-align: center;">
                        <h3 style="margin: 0 0 5px 0; color: #007bff;">${centro.tipoDonacion}</h3>
                        <p style="margin: 5px 0;">${centro.descripcion}</p>
                        <span style="font-size: 0.8rem; background: #eee; padding: 2px 5px; border-radius: 4px;">
                            Estado: ${centro.estado}
                        </span>
                    </div>
                `;

                marker.bindPopup(contenidoPopup);
            }
        });

    } catch (error) {
        console.error("Error cargando el mapa:", error);
        alert("No se pudieron cargar los puntos de donación.");
    }
}

// Ejecutar la función cuando cargue el script
cargarPuntos();