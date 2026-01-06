 export const ROLES = Object.freeze({
    ADMIN: 1,
    NECESITADO: 2
});

export const MENU_BY_ROLE = Object.freeze({
    [ROLES.ADMIN]: [
        {
            label: 'Administrar Perfiles',
            path: 'administrador-perfiles.html'
        },
        {
            label: 'Donaciones',
            path: 'administrador-donaciones.html'
        },
        {
            label: 'Mapa',
            path: 'mapa.html'
        },
        {
            label: 'Incidencias',
            path: 'administrador-incidencias.html'
        }
    ],

    [ROLES.NECESITADO]: [
        {
            label: 'Mis donaciones',
            path: 'administrador-donaciones.html'
        },
        {
            label: 'Perfil',
            path: 'perfil.html'
        },
        {
            label: 'Mapa',
            path: 'mapa.html'
        },
        {
            label: 'Solicitar donación',
            path: 'creardonacion.html'
        },
        {
            label: 'Incidencias',
            path: 'incidencias.html'
        },
        {
            label: 'Editar perfil',
            path: 'perfil-editar.html'
        }

    ]
});
