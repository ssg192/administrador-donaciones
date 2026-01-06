 export const ROLES = Object.freeze({
    ADMIN: 1,
    NECESITADO: 2
});

export const MENU_BY_ROLE = Object.freeze({
    [ROLES.ADMIN]: [
        {
            label: 'Dashboard',
            path: 'dashboard-admin.html'
        },
        {
            label: 'Donaciones',
            path: 'administrador-donaciones.html'
        },
        {
            label: 'Mapa',
            path: 'mapa.html'
        }
    ],

    [ROLES.NECESITADO]: [
        {
            label: 'Mis donaciones',
            path: 'administrador-donaciones.html'
        },
        {
            label: 'Perfil',
            path: 'perfil-setup.html'
        },
        {
            label: 'Mapa',
            path: 'mapa.html'
        }
    ]
});
