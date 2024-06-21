// Función para encriptar el texto
const encriptar = (texto) => {
    return texto.replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g, "ai")
                .replace(/o/g, "ober")
                .replace(/u/g, "ufat");
};

// Función para desencriptar el texto
const desencriptar = (texto) => {
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
        console.error('Error al encriptar:', error);
        alert('Ocurrió un error al encriptar el texto.');
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
        console.error('Error al desencriptar:', error);
        alert('Ocurrió un error al desencriptar el texto.');
    }
});

// Event listener para copiar el resultado al portapapeles
document.getElementById('botonCopiar').addEventListener('click', () => {
    try {
        const resultado = document.getElementById('textoDesencriptado');
        resultado.select();
        document.execCommand('copy');
        alert("Texto copiado al portapapeles");
    } catch (error) {
        console.error('Error al copiar:', error);
        alert('Ocurrió un error al intentar copiar el texto.');
    }
});

// Event listener para detectar cambios en el primer textarea y actualizar el segundo
document.getElementById('textoEncriptado').addEventListener('input', () => {
    const texto = document.getElementById('textoEncriptado').value;
    document.getElementById('textoDesencriptado').value = texto ? encriptar(texto) : '';
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
