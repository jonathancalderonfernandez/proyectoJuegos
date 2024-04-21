var preguntas  = [];
var preguntaEnCurso = 0;
var cantidadRespuestasCorrectas = 0;
var cantidadRespuestasInCorrectas = 0;

function CargarJuegoPreguntas() {
    preguntaEnCurso = 0;
    document.getElementById('Preguntas').style.display = 'block';
    desordenarArreglo(listaPreguntas);
    PintarPregunta();
}

function PintarPregunta() {
    contarTiempo();
    $("#contenedorPregunta").empty();

    var elementoDiv = document.createElement("div");
    elementoDiv.setAttribute("class", "question");
    elementoDiv.setAttribute("id", "preguntaActual");
    elementoDiv.textContent = listaPreguntas[preguntaEnCurso].texto;
    var divPregunta = document.getElementById("contenedorPregunta");
    divPregunta.appendChild(elementoDiv);
    pintarRespuestas(listaPreguntas[preguntaEnCurso].opciones, listaPreguntas[preguntaEnCurso].respuesta_correcta);

}

function pintarRespuestas(respuestas, respuestaCorrecta) {
    desordenarArreglo(respuestas);
    var elementoButton;
    var divPregunta = document.getElementById("contenedorPregunta");
    var esCorrecta = false;
    respuestas.forEach(function(respuesta) {
        elementoButton = document.createElement("button");
        elementoButton.setAttribute("type", "button");
        elementoButton.setAttribute("class", "btn btn-lg btn-block answer ");
        elementoButton.textContent = respuesta;
        divPregunta.appendChild(elementoButton);
        elementoButton.addEventListener('click', function(event) {
            if(respuestaCorrecta == respuesta) {
                esCorrecta = true;
            }
            validarRespuesta(esCorrecta);
        });
      });
}

function validarRespuesta(esCorrecta) {
    var mensaje = "Incorrecto";
    if(esCorrecta){
        mensaje = "Correcta";
        cantidadRespuestasCorrectas = cantidadRespuestasCorrectas + 1;
        $('#contadorCorrectas').empty();
        $('#contadorCorrectas').append(cantidadRespuestasCorrectas);
    } else {
        respuestaIncorrecta();
    }
    clearInterval(tiempoRegresivo);
    preguntaEnCurso = preguntaEnCurso + 1;
    mostrarMensaje("Resultado de la pregunta", mensaje, "Siguiente pregunta", PintarPregunta);
    
}

function respuestaIncorrecta() {
    cantidadRespuestasInCorrectas = cantidadRespuestasInCorrectas + 1;
    $('#contadorIncorrectas').empty();
    $('#contadorIncorrectas').append(cantidadRespuestasInCorrectas);
}


function contarTiempo(){
    var timer = 15;
    tiempoRegresivo = setInterval(() => {
        var contadortexto = document.getElementById('tiempoLabel');
        contadortexto.innerHTML = timer;
      timer--;
      if(timer <= 0){
        clearInterval(tiempoRegresivo);
        respuestaIncorrecta();
        mostrarMensaje("Resultado de la pregunta", mensaje, "Se acabó el tiempo. Perdiste!", PintarPregunta);
      }
    }, 1000, timer); 
  }


// Función para desordenar un arreglo
function desordenarArreglo(arreglo) {
    for (let i = arreglo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
    }
  }