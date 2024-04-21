var preguntas  = [];
var preguntaEnCurso = 0;

function CargarJuegoPreguntas() {
    preguntaEnCurso = 0;
    document.getElementById('Preguntas').style.display = 'block';
    //desordenarArreglo(listaPreguntas);
    PintarPregunta();
}

function PintarPregunta() {
    var elementoDiv = document.createElement("div");
    elementoDiv.setAttribute("class", "question");
    elementoDiv.setAttribute("id", "preguntaActual");
    elementoDiv.textContent = listaPreguntas[preguntaEnCurso].texto;
    var divPregunta = document.getElementById("contenedorPregunta");
    divPregunta.appendChild(elementoDiv);
    pintarRespuestas(listaPreguntas[preguntaEnCurso].opciones);

}

function pintarRespuestas(respuestas) {
    desordenarArreglo(respuestas);
    var elementoButton;
    var divPregunta = document.getElementById("contenedorPregunta");
    
    respuestas.forEach(function(respuesta) {
        elementoButton = document.createElement("button");
        elementoButton.setAttribute("type", "button");
        elementoButton.setAttribute("class", "btn btn-lg btn-block answer ");
        elementoButton.textContent = respuesta;
        divPregunta.appendChild(elementoButton);
        elementoButton.addEventListener('click', function(event) {
            validarRespuesta();
        });
      });
}

function validarRespuesta() {

    mostrarMensaje("Titulo 1", "Descripcion 1");
}


// Función para desordenar un arreglo
function desordenarArreglo(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
  }