document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userName = document.getElementById('userName').value;
    document.getElementById('displayName').textContent = userName;
    document.getElementById('userDisplay').style.display = 'block';
    document.getElementById('userDisplayButon').style.display = 'block';
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

    switch(gameType) {
  case 'Preguntas':
    CargarJuegoPreguntas();
    break;
  case 'operaciones':
    // code block
    break;
    case 'Trivia':
    // code block
    break;
    default:
    // code block
    break;
    }
    
}

function mostrarMensaje(titulo, mensaje) {
    $('#myModal').modal('show');
    $('#idTituloMensaje').empty();
    $('#idTituloMensaje').append(titulo);

    $('#idTextoMesaje').empty();
    $('#idTextoMesaje').append(mensaje);

    $('#idTextoBoton').empty();
    $('#idTextoBoton').append(mensaje);
}

