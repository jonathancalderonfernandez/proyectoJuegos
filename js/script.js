document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userName = document.getElementById('userName').value;
    document.getElementById('displayName').textContent = userName;
    document.getElementById('userDisplay').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
});

function showModal() {
    document.getElementById('scoreModal').style.display = 'block';
}

function hideModal() {
    document.getElementById('scoreModal').style.display = 'none';
}

function loadGame(gameType) {
    // Aquí podrías cargar el juego dependiendo del tipo
    document.getElementById('gameContainer').innerHTML = '<p>Cargando ' + gameType + '...</p>';
}