var cantidadRespuestasCorrectas = 0;
var cantidadRespuestasInCorrectas = 0;
var cantidadVictorias = 0;
var cantidadDerrotas = 0;
var listaIdInterval = [];
var cartasDestapadas = 0;

var temporizador = false;
var pares = 0;
var timerInicialPreguntas = 15
var timerPreguntas = 15;
var timerInicial = 40;
var timer = 40;

var movimientos = 0;
var mostrarTiempo = document.getElementById('restante');

var mostrarMovimientos = document.getElementById('movimientos');// cambiar a 0
var numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];// if
    numeros = numeros.sort(function(){return Math.random() - 0.3})

//encargado de guardar el usuario del juego.
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userName = document.getElementById('userName').value;
    document.getElementById('displayName').textContent = userName;
    document.getElementById('userDisplay').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('menuPrincipal').style.display = 'block';
    
});

//metodo utilizado en el menu para cargar los diferentes juegos.
function loadGame(gameType) {
    limpiarJuego();
    switch(gameType) {
  case 'Preguntas':
    CargarJuegoPreguntas();
    break;
  case 'operaciones':
    CargarJuegoOperaciones();
    break;
    case 'Memoria':
        CargarJuegoMemoria()
    break;
    default:
    // nada
    break;
    }
    
}

//encargado de permitir hacer los cambios entre los juegos y eliminar los demas juegos en curso.
function limpiarJuego() {
    document.getElementById('sectionOperaciones').style.display = 'none';
    document.getElementById('idTipoOperacion').style.display = 'none';
    document.getElementById('Preguntas').style.display = 'none';
    document.getElementById('Memoria').style.display = 'none';
    limpiarInterval();
}

//encargado de eliminar los temporizadores activos.
function limpiarInterval() {
    listaIdInterval.forEach(function(idInterval) {
        clearInterval(idInterval);
      });
      listaIdInterval.length = 0;
}

//funcion encargada de levantar el modal y mostrar los mensajes.
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

  