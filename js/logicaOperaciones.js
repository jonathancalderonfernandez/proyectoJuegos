var tipoOperacionTexto;

function CargarJuegoOperaciones() {
    preguntaEnCurso = 0;
    document.getElementById('sectionOperaciones').style.display = 'block';
    PintarOperacion();
}

function PintarOperacion() {
    $("#contenedorOperacion").empty();

    var elementoDiv = document.createElement("div");
    elementoDiv.setAttribute("class", "question");
    elementoDiv.setAttribute("id", "OperacionActual");

    var operacionNumero = ObtenerNumeroAleatorio(2);
    $('#indicadorOperacion').empty();
    var respuestaCorrecta = 0;
    var operando1 = ObtenerNumeroAleatorio(99);
    var operando2 = ObtenerNumeroAleatorio(99);
    if(operacionNumero == 1){
        respuestaCorrecta = parseFloat(operando1) + parseFloat(operando2);
        tipoOperacionTexto = "+";
        $('#indicadorOperacion').append("suma");
    }else {
        respuestaCorrecta = parseFloat(operando1) - parseFloat(operando2);
        tipoOperacionTexto = "-";
        $('#indicadorOperacion').append("resta");
    }
       
        
        
    elementoDiv.textContent = operando1 + tipoOperacionTexto + operando2 + " = ?";
    var divOperacion = document.getElementById("contenedorOperacion");
    divOperacion.appendChild(elementoDiv);
    pintarRespuestasOperaciones(respuestaCorrecta);

}

function pintarRespuestasOperaciones(respuestaCorrecta) {
    var respuestaIncorrecta1 = 0;
    var respuestaIncorrecta2 = 0;
    
    while(respuestaIncorrecta1 == 0 || respuestaIncorrecta1 == respuestaCorrecta || respuestaIncorrecta1 == respuestaIncorrecta2) {
        respuestaIncorrecta1 = ObtenerNumeroAleatorio(99);
    }

    while(respuestaIncorrecta2 == 0 || respuestaIncorrecta2 == respuestaCorrecta || respuestaIncorrecta1 == respuestaIncorrecta2) {
        respuestaIncorrecta2 = ObtenerNumeroAleatorio(99);
    }
    var respuestas= [];
    respuestas[0] = respuestaCorrecta;
    respuestas[1] = respuestaIncorrecta1;
    respuestas[2] = respuestaIncorrecta2;
    desordenarArreglo(respuestas);

    var divOperacion = document.getElementById("contenedorOperacion");
    var esCorrecta = false;
    respuestas.forEach(function(respuesta) {
        elementoButton = document.createElement("button");
        elementoButton.setAttribute("type", "button");
        elementoButton.setAttribute("class", "btn btn-lg btn-block answer ");
        elementoButton.textContent = respuesta;
        divOperacion.appendChild(elementoButton);
        elementoButton.addEventListener('click', function(event) {
            if(respuestaCorrecta == respuesta) {
                esCorrecta = true;
            }
            validarRespuestaOperacion(esCorrecta);
        });
      });

}

function validarRespuestaOperacion(esCorrecta) {
    var mensaje = "Incorrecta";
    if(esCorrecta){
        mensaje = "Correcta";
    }
    mostrarMensaje("Resultado de la operación", mensaje, "Siguiente operación");
    PintarOperacion();
}

function ObtenerNumeroAleatorio(numero) {
    return Math.floor(Math.random() * numero) + 1;
}