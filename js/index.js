// Función para validar el texto
const validarTexto = (texto) => {
    const regex = /^[a-z\s]*$/; // Solo permite minúsculas y espacios
    if (!regex.test(texto)) {
        throw new Error("El texto solo debe contener letras minúsculas y sin acentos.");
    }
};

// Función para encriptar el texto
const encriptar = (texto) => {
    validarTexto(texto); // Validar antes de encriptar
    return texto.replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g, "ai")
                .replace(/o/g, "ober")
                .replace(/u/g, "ufat");
};

// Función para desencriptar el texto
const desencriptar = (texto) => {
    validarTexto(texto); // Validar antes de desencriptar
    return texto.replace(/enter/g, "e")
                .replace(/imes/g, "i")
                .replace(/ai/g, "a")
                .replace(/ober/g, "o")
                .replace(/ufat/g, "u");
};

// Event listener para encriptar el texto
document.getElementById('botonEncriptar').addEventListener('click', () => {
    try {
        const texto = document.getElementById('textoEncriptado').value;
        const resultado = encriptar(texto);
        document.getElementById('textoDesencriptado').value = resultado;
        actualizarVisibilidad();
    } catch (error) {
        console.error('Error al encriptar:', error.message);
        Swal.fire({ icon: 'error', title: 'Error', text: error.message });
    }
});

// Event listener para desencriptar el texto
document.getElementById('botonDesencriptar').addEventListener('click', () => {
    try {
        const textoEncriptado = document.getElementById('textoEncriptado').value;
        const resultado = desencriptar(textoEncriptado);
        document.getElementById('textoDesencriptado').value = resultado;
        actualizarVisibilidad();
    } catch (error) {
        console.error('Error al desencriptar:', error.message);
        Swal.fire({ icon: 'error', title: 'Error', text: error.message });
    }
});

// Event listener para copiar el resultado al portapapeles
document.getElementById('botonCopiar').addEventListener('click', () => {
    try {
        const resultado = document.getElementById('textoDesencriptado');
        resultado.select();
        document.execCommand('copy');
        Swal.fire({
            icon: 'success',
            title: 'Copiado',
            text: 'El texto se copió al portapapeles.',
            customClass: {
                title: 'swal-title-custom', 
                popup: 'swal-popup-custom',  
                confirmButton: 'swal-confirm-button-custom'
            }
        });
    } catch (error) {
        console.error('Error al copiar:', error.message);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Ocurrió un error al copiar el texto al portapapeles.' });
    }
});

// Event listener para detectar cambios en el primer textarea y actualizar el segundo
document.getElementById('textoEncriptado').addEventListener('input', () => {
    const texto = document.getElementById('textoEncriptado').value;
    try {
        validarTexto(texto);
        document.getElementById('textoDesencriptado').value = texto ? encriptar(texto) : '';
    } catch (error) {
        console.error('Error en el texto:', error.message);
        Swal.fire({ icon: 'error', title: 'Error', text: error.message });
    }
    actualizarVisibilidad();
});

// Función para actualizar la visibilidad de la imagen y subtítulos según el contenido del segundo textarea
const actualizarVisibilidad = () => {
    const textoDesencriptado = document.getElementById('textoDesencriptado').value;
    const contenedorImagen = document.querySelector('.contenedor_imagen');
    const contenedorSubtitulos = document.querySelector('.contenedor_subtitulos');
    const botonCopiar = document.getElementById('botonCopiar');

    if (textoDesencriptado.trim() === '') {
        contenedorImagen.style.display = 'block';
        contenedorSubtitulos.style.display = 'block';
        botonCopiar.classList.add('oculto');
    } else {
        contenedorImagen.style.display = 'none';
        contenedorSubtitulos.style.display = 'none';
        botonCopiar.classList.remove('oculto');
    }
};

// Inicialmente ocultar el botón de copiar
document.getElementById('botonCopiar').classList.add('oculto');
