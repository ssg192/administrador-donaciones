const API_URL = 'http://localhost:8080'; // Ajusta según tu backend

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // 1. Obtener valores
    const orgName = document.getElementById('orgName').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const feedbackDiv = document.getElementById('feedbackMessage');
    const btnRegister = document.getElementById('btnRegister');

    // Limpiar estilos previos del mensaje
    feedbackDiv.style.display = 'none';
    feedbackDiv.className = 'error-message'; // Resetear clase base

    // 2. Validación simple en Frontend
    if (password !== confirmPassword) {
        feedbackDiv.innerText = "Las contraseñas no coinciden.";
        feedbackDiv.style.display = 'block';
        return;
    }

    if (password.length < 8) {
        feedbackDiv.innerText = "La contraseña debe tener al menos 8 caracteres.";
        feedbackDiv.style.display = 'block';
        return;
    }

    // Deshabilitar botón
    btnRegister.disabled = true;
    btnRegister.innerText = 'Registrando...';

    try {
        // 3. Petición al Backend
        // Estructura el JSON según lo que espere tu entidad en Java/Quarkus
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: orgName,
                direccion: address,
                email: email,
                password: password
                // Nota: No enviamos confirmPassword al backend
            })
        });

        if (response.ok) {
            // Registro exitoso
            feedbackDiv.className = 'success-message'; // Cambiar a estilo verde
            feedbackDiv.innerText = '¡Registro exitoso! Redirigiendo al login...';
            feedbackDiv.style.display = 'block';

            // Esperar 2 segundos y redirigir al login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } else {
            // Error del servidor (ej. "El correo ya existe")
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al registrar la cuenta.');
        }

    } catch (error) {
        feedbackDiv.innerText = error.message;
        feedbackDiv.style.display = 'block';
        btnRegister.disabled = false;
        btnRegister.innerText = 'Registrarse';
    }
});