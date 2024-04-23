var preguntas  = [];
var preguntaEnCurso = 0;
var tiempoRegresivo;

//Encargado de la carga inicial del juego de preguntas.
function CargarJuegoPreguntas() {
    cantidadRespuestasCorrectas = 0;
    cantidadRespuestasInCorrectas = 0;
    cantidadVictorias = 0;
    cantidadDerrotas = 0;
    preguntaEnCurso = 0;
    document.getElementById('Preguntas').style.display = 'block';
    desordenarArreglo(listaPreguntas);
    $('#contadorCorrectas').empty();
    $('#contadorIncorrectas').empty();
    cantidadRespuestasCorrectas = 0;
    cantidadRespuestasInCorrectas = 0
    PintarPregunta();
}

//se encarga de pintar las pregunta en curso.
function PintarPregunta() {
    if(preguntaEnCurso > 0){
        limpiarInterval();
        
    }
    if(preguntaEnCurso < 20) {
        contarTiempo();
        $("#contenedorPregunta").empty();

        var elementoDiv = document.createElement("div");
        elementoDiv.setAttribute("class", "question");
        elementoDiv.setAttribute("id", "preguntaActual");
        elementoDiv.textContent = listaPreguntas[preguntaEnCurso].texto;
        var divPregunta = document.getElementById("contenedorPregunta");
        divPregunta.appendChild(elementoDiv);
        pintarRespuestas(listaPreguntas[preguntaEnCurso].opciones, listaPreguntas[preguntaEnCurso].respuesta_correcta);
    } else {
        marcadorPreguntas();
    }

}

//se encarga de validar la condicion para saber si hubo una victoria en el juego o una derrota.
function marcadorPreguntas() {
    var resultado = (cantidadRespuestasCorrectas * 100) / 20;
    if(resultado > 80) {
        cantidadVictorias = cantidadVictorias +1;
        $("#victoriasLabel").empty();
        $("#victoriasLabel").append(cantidadVictorias);
        mostrarMensaje("Resultado","Felicidades ganaste", "Cerrar");
        limpiarJuego();
    } else {
        cantidadDerrotas = cantidadDerrotas +1;
        $("#derrotasLabel").empty();
        $("#derrotasLabel").append(cantidadDerrotas);
        mostrarMensaje("Resultado", "Has perdido", "Cerrar");
        limpiarJuego();
    }

}

//se encarga de pintar las respuestas de las preguntas
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

//se encarga de validad si la respuesta seleccionada es la correcta.
function validarRespuesta(esCorrecta) {
    limpiarInterval();
    
    var mensaje = "Incorrecto";
    if(esCorrecta){
        mensaje = "Correcta";
        cantidadRespuestasCorrectas = cantidadRespuestasCorrectas + 1;
        $('#contadorCorrectas').empty();
        $('#contadorCorrectas').append(cantidadRespuestasCorrectas);
    } else {
        respuestaIncorrecta();
    }
    
    preguntaEnCurso = preguntaEnCurso + 1;
    mostrarMensaje("Resultado de la pregunta", mensaje, "Siguiente pregunta");
    PintarPregunta();
}

//aumenta el contador de respuestas incorrectas.
function respuestaIncorrecta() {
    cantidadRespuestasInCorrectas = cantidadRespuestasInCorrectas + 1;
    $('#contadorIncorrectas').empty();
    $('#contadorIncorrectas').append(cantidadRespuestasInCorrectas);
}

timerInicialPreguntas = 15;
timerPreguntas = 15;

//encargado de manejar el temporizador del juego de preguntas.
function contarTiempo(){
    timerPreguntas = timerInicialPreguntas;
    tiempoRegresivo = setInterval(ActualizarTiempoRestante, 1000);
    listaIdInterval.push(tiempoRegresivo);
}

//actualiza el tiempo restante y muestra mensaje si se acaba el tiempo.
function ActualizarTiempoRestante() {
    
    var contadortexto = document.getElementById('tiempoLabel');
    contadortexto.innerHTML = timerPreguntas  + " segundos";
    timerPreguntas--;
    if(timerPreguntas < 0){
        
        limpiarInterval();
        respuestaIncorrecta();
        preguntaEnCurso = preguntaEnCurso + 1;
        mostrarMensaje("Resultado de la pregunta", "Se acabó el tiempo. Perdiste!","Siguiente pregunta");
        PintarPregunta();
    }
  }
