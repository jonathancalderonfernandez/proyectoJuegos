var cantidadRespuestasCorrectas = 0;
var cantidadRespuestasInCorrectas = 0;
var cantidadVictorias = 0;
var cantidadDerrotas = 0;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userName = document.getElementById('userName').value;
    document.getElementById('displayName').textContent = userName;
    document.getElementById('userDisplay').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('menuPrincipal').style.display = 'block';
    
});

function showModal() {
    document.getElementById('scoreModal').style.display = 'block';
}

function hideModal() {
    document.getElementById('scoreModal').style.display = 'none';
}

function loadGame(gameType) {
    limpiarJuego();
    switch(gameType) {
  case 'Preguntas':
    CargarJuegoPreguntas();
    break;
  case 'operaciones':
    CargarJuegoOperaciones();
    break;
    case 'Trivia':
    // code block
    break;
    default:
    // nada
    break;
    }
    
}

function limpiarJuego() {
    document.getElementById('sectionOperaciones').style.display = 'none';
    document.getElementById('idTipoOperacion').style.display = 'none';
    document.getElementById('Preguntas').style.display = 'none';
    document.getElementById('Memoria').style.display = 'none';
    clearInterval(tiempoRegresivo);
}

function mostrarMensaje(titulo, mensaje, mensajeBoton, funcionalidad) {
    $('#modalMensaje').modal('show');
    $('#tituloModal').empty();
    $('#tituloModal').append(titulo);

    $('#contenidoModal').empty();
    $('#contenidoModal').append(mensaje);

    $('#idTextoBoton').empty();
    $('#idTextoBoton').append(mensajeBoton);
}

// Función para desordenar un arreglo
function desordenarArreglo(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
}
