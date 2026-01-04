// URL de tu backend Quarkus (ajusta el puerto si es necesario)
const API_URL = 'http://localhost:8080'; 

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // 1. Capturar datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');
    const btnSubmit = document.getElementById('btnSubmit');

    // Limpiar mensajes anteriores
    errorDiv.style.display = 'none';
    errorDiv.innerText = '';
    
    // Deshabilitar botón para evitar doble clic
    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Verificando...';

    try {
        // 2. Enviar petición al Backend (Quarkus)
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        // 3. Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            
            // ASUMIENDO que Quarkus devuelve algo como: { "token": "abc123xyz...", "userId": 1 }
            // Guardamos el token para usarlo después
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', email);

            // Redirigir al dashboard de "Necesitados"
            window.location.href = 'dashboard-necesitados.html'; 
        } else {
            // Si el backend devuelve 401 (No autorizado) o 400
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Credenciales incorrectas');
        }

    } catch (error) {
        // Mostrar error en pantalla
        errorDiv.innerText = error.message;
        errorDiv.style.display = 'block';
    } finally {
        // Reactivar el botón
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Ingresar';
    }
});