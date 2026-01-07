const API_URL = 'https://administrador-donaciones-production.up.railway.app';

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // 1. Obtener valores separados
    const nombre = document.getElementById('nombre').value;
    const primerApellido = document.getElementById('primerApellido').value;
    const segundoApellido = document.getElementById('segundoApellido').value;
    
    const correoElectronico = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const feedbackDiv = document.getElementById('feedbackMessage');
    const btnRegister = document.getElementById('btnRegister');

    // Resetear mensajes
    feedbackDiv.style.display = 'none';
    feedbackDiv.className = 'error-message';

    // 2. Validaciones
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

    btnRegister.disabled = true;
    btnRegister.innerText = 'Registrando...';

    try {
        // 3. Enviar JSON con la nueva estructura
        // Asegúrate de que tu DTO en Quarkus tenga estos mismos nombres de campos
        const response = await fetch(`https://administrador-donaciones-production.up.railway.app/donacion/persona`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                correoElectronico: correoElectronico,
                password: password
            })
        });

        if (response.ok) {
            feedbackDiv.className = 'success-message';
            feedbackDiv.innerText = '¡Cuenta creada! Redirigiendo...';
            feedbackDiv.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Error al crear la cuenta.');
        }

    } catch (error) {
        feedbackDiv.innerText = error.message;
        feedbackDiv.style.display = 'block';
        btnRegister.disabled = false;
        btnRegister.innerText = 'Registrarse';
    }
});