import { MENU_BY_ROLE } from './roles.js';

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const correoElectronico = document.getElementById('correoElectronico').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');
    const btnSubmit = document.getElementById('btnSubmit');

    errorDiv.style.display = 'none';
    errorDiv.innerText = '';
    
    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Verificando...';

    try {
        const response = await fetch(`http://localhost:8080/donacion/acceso`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correoElectronico: correoElectronico,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
           localStorage.setItem('idPersona', data.idPersona);
           localStorage.setItem('idRol', data.idRol);
           const menu = MENU_BY_ROLE[data.idRol];

         if (!menu || menu.length === 0) {
            throw new Error('Rol no autorizado');
        }

        window.location.href = menu[0].path;

        } else {
            const errorData = await response.json().catch(() => ({}));
         const mensaje = errorData?.details?.[0]?.message ||errorData?.message || 'Credenciales incorrectas';
         throw new Error(mensaje)
        }

    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.style.display = 'block';
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Ingresar';
    }
});