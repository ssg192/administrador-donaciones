// 1. Inicializar el mapa
// Coordenadas [Latitud, Longitud], Zoom (ej. 13)
// Nota: Puse coordenadas genéricas, cámbialas a tu ciudad.
const map = L.map('map').setView([19.4326, -99.1332], 13); 

// 2. Agregar la capa de "azulejos" (el diseño del mapa) - Usamos OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 3. Simulación de datos (Esto vendrá de tu Quarkus luego)
const centrosSimulados = [
    {
        nombre: "Albergue La Esperanza",
        descripcion: "Recibimos ropa y alimentos no perecederos.",
        lat: 19.4350, 
        lng: -99.1380
    },
    {
        nombre: "Cruz Roja Central",
        descripcion: "Solo medicamentos y material de curación.",
        lat: 19.4400, 
        lng: -99.1200
    },
    {
        nombre: "Fundación Vida",
        descripcion: "Juguetes y ropa para niños.",
        lat: 19.4280, 
        lng: -99.1450
    }
];

// 4. Icono personalizado (Opcional, para que se vea mejor)
// Leaflet usa uno azul por defecto, pero esto asegura que se renderice bien.
const icono = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

// 5. Bucle para agregar los marcadores al mapa
centrosSimulados.forEach(centro => {
    // Crear marcador
    const marker = L.marker([centro.lat, centro.lng], {icon: icono}).addTo(map);
    
    // Agregar popup con información HTML
    marker.bindPopup(`
        <div style="text-align:center;">
            <h3>${centro.nombre}</h3>
            <p>${centro.descripcion}</p>
            <button onclick="verDetalles('${centro.nombre}')" style="background:#007bff; color:white; border:none; padding:5px; border-radius:3px; cursor:pointer;">Ver más</button>
        </div>
    `);
});

// Función extra para el botón dentro del mapa
function verDetalles(nombre) {
    alert("Pronto verás más detalles de: " + nombre);
    // Aquí podrías redirigir a una página de perfil del centro
}