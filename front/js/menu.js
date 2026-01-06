import { MENU_BY_ROLE } from './roles.js';

document.addEventListener('DOMContentLoaded', () => {
    const idRol = Number(localStorage.getItem('idRol'));

    if (!idRol){
    return;
    } 

    const menuConfig = MENU_BY_ROLE[idRol];
    if (!menuConfig){
        return;
    }
    const menuContainer = document.getElementById('menu');

    menuContainer.innerHTML = `
        <nav class="menu">
            <ul>
                ${menuConfig.map(item => `
                    <li>
                        <a href="${item.path}">${item.label}</a>
                    </li>
                `).join('')}
                <li class="logout">
                    <button id="logoutBtn">Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    `;

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'login.html';
    });
});
