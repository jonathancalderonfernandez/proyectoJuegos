var preguntas  = [];
var preguntaEnCurso = 0;


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

function PintarPregunta() {
    if(preguntaEnCurso > 0){
        clearInterval(tiempoRegresivo);
    }
    if(preguntaEnCurso < 5) {
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
    clearInterval(tiempoRegresivo);
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

function respuestaIncorrecta() {
    cantidadRespuestasInCorrectas = cantidadRespuestasInCorrectas + 1;
    $('#contadorIncorrectas').empty();
    $('#contadorIncorrectas').append(cantidadRespuestasInCorrectas);
}

var tiempoRegresivo;
var timerInicial = 15;
var timer = 15;

function contarTiempo(){
    timer = timerInicial;
    tiempoRegresivo = setInterval(ActualizarTiempoRestante, 1000);
}

function ActualizarTiempoRestante() {
    
    var contadortexto = document.getElementById('tiempoLabel');
    contadortexto.innerHTML = timer;
    timer--;
    if(timer < 0){
        clearInterval(tiempoRegresivo);
        respuestaIncorrecta();
        preguntaEnCurso = preguntaEnCurso + 1;
        console.log("llamado ActualizarTiempoRestante");
        mostrarMensaje("Resultado de la pregunta", "Se acabó el tiempo. Perdiste!","Siguiente pregunta");
        PintarPregunta();
    }
  }




function limpiarJuego() {
    console.log("llamado ActualizarTiempoRestante");
    document.getElementById('Preguntas').style.display = 'none';
}