import { MENU_BY_ROLE } from './roles.js';

document.addEventListener('DOMContentLoaded', () => {
    const idRol = Number(localStorage.getItem('idRol'));
    const menuContainer = document.getElementById('menu');
    
    let menuConfig = [];
    let mostrarLogout = false;

    // 1. Lógica para definir qué menú mostrar
    if (idRol && MENU_BY_ROLE[idRol]) {
        // SI hay rol y existe en el archivo roles.js
        menuConfig = MENU_BY_ROLE[idRol];
        mostrarLogout = true; // Mostramos botón de salir
    } else {
        // NO hay rol (Usuario no logueado / Público)
        menuConfig = [
            { label: 'Iniciar Sesión', path: 'login.html' },
            { label: 'Levantar Incidencia', path: 'incidencias.html' } // Ajusta este path al que uses
        ];
        mostrarLogout = false; // Ocultamos botón de salir
    }

    // 2. Renderizar el HTML
    menuContainer.innerHTML = `
        <nav class="menu">
            <ul>
                ${menuConfig.map(item => `
                    <li>
                        <a href="${item.path}">${item.label}</a>
                    </li>
                `).join('')}

                ${mostrarLogout ? `
                    <li class="logout">
                        <button id="logoutBtn">Cerrar sesión</button>
                    </li>
                ` : ''}
            </ul>
        </nav>
    `;

    // 3. Asignar evento al botón Logout (solo si existe)
    if (mostrarLogout) {
        const btnLogout = document.getElementById('logoutBtn');
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                localStorage.clear();
                window.location.href = 'login.html';
            });
        }
    }
});