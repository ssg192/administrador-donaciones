const idPersona = localStorage.getItem('idPersona');

if (!idPersona) {
    window.location.href = 'login.html';
}

const API_URL = `http://localhost:8080/donacion/${idPersona}/donaciones`;

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener donaciones');
        }
        return response.json();
    })
    .then(donaciones => pintarDonaciones(donaciones))
    .catch(error => {
        console.error(error);
        alert('No se pudieron cargar las donaciones');
    });

function pintarDonaciones(donaciones) {
    const tbody = document.querySelector('#tablaDonaciones tbody');
    tbody.innerHTML = '';

    donaciones.forEach(d => {
        const tr = document.createElement('tr');

        const editarClass = d.editar
            ? 'icono editar'
            : 'icono editar disabled';

        const eliminarClass = d.eliminar
            ? 'icono eliminar'
            : 'icono eliminar disabled';

        tr.innerHTML = `
            <td>${d.tipoDonacion}</td>
            <td>${d.descripcion}</td>
            <td>
                <span class="estado ${d.estado === 'ACTIVO' ? 'activo' : 'inactivo'}">
                    ${d.estado}
                </span>
            </td>
            <td>
                <div class="acciones">
                    <i class="fa-solid fa-pen-to-square ${editarClass}" title="Editar"></i>
                    <i class="fa-solid fa-trash ${eliminarClass}" title="Eliminar"></i>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

