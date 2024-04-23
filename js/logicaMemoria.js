var tamaño = 6;

var numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];

//Encargado de la carga inicial del juego de memoria.
function CargarJuegoMemoria() {
    currentvalue = document.getElementById('Tamaño').value;
    if(currentvalue == "Medio"){
        document.getElementById("Tamaño").value="Difícil";
        cambiar(6);
    }else{
        document.getElementById("Tamaño").value="Medio";
        cambiar(4);
    }
}

//Encargado de la carga inicial del juego de memoria.
function IniciarJuegoMemoria(num) {
    this.tamaño= num;// recibir tamaño
    this.numeros= null;
    document.getElementById('Memoria').style.display = 'block';
    if  (num==6) {
        this.numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];
    } else {
        this.numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    }
    this.numeros = this.numeros.sort(function(){return Math.random() - 0.3});
    console.log();
    crear("IniciarJuegoMemoria");
}

//Se crea la tabla que se utiliza en el juego.
function crear(){
    var col = this.tamaño;
    var filas = this.tamaño;
    var tabla="<table border=\"0\">";
    var k = 0;
    
    tabla+="<tr><td></td>";
    for(j=0;j<col;j++){ 
        tabla+="<td>"+(j+1)+ "</td>";
    }
    tabla+="</tr>";
    
    for(i=0;i<filas;i++){
        tabla+="<tr>";
        tabla+="<td>"+(i+1)+ "</td>";
        for(j=0;j<col;j++){ 
            tabla+="<td><button class='botonMemoria' id='"+(k) +"' onclick= 'girar("+(k) +")'></button></td>";
            k++;
        }
        tabla+="</tr>";
    }
    tabla+="</table>";
    document.getElementById("resultado").innerHTML=tabla;
}

function crear2() {
    document.getElementById("resultado").innerHTML="";
}


//Metodo que se encarga de realizar la logica que valida el evento de girar las cartas.
function girar(id){

    if (temporizador == false){
      contarTiempoMemoria();
      
      temporizador = true;
    }
    
    if (cartasDestapadas == 0){
      //Mostrar número
      let card1 = document.getElementById(id);   
      primeraEleccion = numeros[id]; 
      if (document.getElementById("Tipo").value =="Numérico") {
        card1.innerHTML = "<img src='./images/" + primeraEleccion + ".JPG' alt=''>";  
      } else {
        card1.innerHTML = "<img src='./images2/" + primeraEleccion + ".JPG' alt=''>";  
      }
      //Deshabilitar botón
      card1.disabled = true;
      cartasDestapadas++;
  
      
      primerId = id;
  
    }else if (cartasDestapadas == 1){
      //Mostrar número
      let card2 = document.getElementById(id);
      segundaEleccion = numeros[id];
      if (document.getElementById("Tipo").value =="Numérico") {
        card2.innerHTML = "<img src='./images/" + segundaEleccion + ".JPG' alt=''>";  
      } else {
        card2.innerHTML = "<img src='./images2/" + segundaEleccion + ".JPG' alt=''>"; 
      }
        
      //Deshabilitar botón
      card2.disabled = true;
      cartasDestapadas++;
  
      segundoId = id;
      
      movimientos++;
      mostrarMovimientos.innerHTML = "Movimientos: " + movimientos;
  
      if(primeraEleccion == segundaEleccion){
        cartasDestapadas = 0;
        pares++;
      }else{
        setTimeout(()=>{
          card1 = document.getElementById(primerId);
          card2 = document.getElementById(segundoId);
          card1.innerHTML = ' ';
          card2.innerHTML = ' ';
          card1.disabled = false;
          card2.disabled = false; 
          cartasDestapadas = 0;
        },500)
      }
    }
    
    if (document.getElementById("Tamaño").value == "Medio" & pares == 8){// 2 condiciones if es dificil y hay 18 pares 
      
        clearInterval(tiempoRegresivoMemoria);
        mostrarMovimientos.innerHTML = "Movimientos: " + movimientos;
        temporizador=false;
      
        cantidadVictorias = cantidadVictorias +1;
        $("#victoriasLabel").empty();
        $("#victoriasLabel").append(cantidadVictorias);
        mostrarMensaje("Resultado","Felicidades ganaste", "Cerrar");
    }
    if (document.getElementById("Tamaño").value == "Difícil" & pares == 18){// 2 condiciones if es dificil y hay 18 pares 
     
        clearInterval(tiempoRegresivoMemoria);
        mostrarMovimientos.innerHTML = "Movimientos: " + movimientos;
        temporizador=false;
      
        cantidadVictorias = cantidadVictorias +1;
        $("#victoriasLabel").empty();
        $("#victoriasLabel").append(cantidadVictorias);
        mostrarMensaje("Resultado","Felicidades ganaste", "Cerrar");
    }
}
function bloquearTarjetas(numeros){
  if (document.getElementById("Tamaño").value == "Medio") {
    for(let i = 0; i<=15; i++){
      let tarjetaBloqueada = document.getElementById(i);
      if (document.getElementById("Tipo").value =="Numérico") {
        tarjetaBloqueada.innerHTML = "<img src='./images/" + numeros[i] + ".jpg' alt=''>";   
      } else {
        tarjetaBloqueada.innerHTML = "<img src='./images2/" + numeros[i] + ".jpg' alt=''>";   
      }
       
      tarjetaBloqueada.disabled = true;
    }
  } else {
    for(let i = 0; i<=35; i++){
      let tarjetaBloqueada = document.getElementById(i);
      if (document.getElementById("Tipo").value =="Numérico") {
        tarjetaBloqueada.innerHTML = "<img src='./images/" + numeros[i] + ".jpg' alt=''>";   
      } else {
        tarjetaBloqueada.innerHTML = "<img src='./images2/" + numeros[i] + ".jpg' alt=''>";   
      }
       
      tarjetaBloqueada.disabled = true;
    }
  }
  }

  //Encargado de establecer el temporizador del juego de cartas.
  function contarTiempoMemoria(){
    tiempoRegresivoMemoria = setInterval(() => {
    listaIdInterval.push(tiempoRegresivoMemoria);
      mostrarTiempo.innerHTML = timer + " segundos";
      timer--;
      if(timer < 0){
        clearInterval(tiempoRegresivoMemoria);
        bloquearTarjetas(numeros);
        temporizador=false;
        //DERROTA
        cantidadDerrotas = cantidadDerrotas +1;
        $("#derrotasLabel").empty();
        $("#derrotasLabel").append(cantidadDerrotas);
        mostrarMensaje("Resultado", "Has perdido", "Cerrar");
      }
    }, 1000, timer); 
  }

  //encargado de cambiar la dificultad.
  function onoff(){
    currentvalue = document.getElementById('Tamaño').value;
    if(currentvalue == "Difícil"){
      document.getElementById("Tamaño").value="Medio";
      cambiar(4);
    }else{
      document.getElementById("Tamaño").value="Difícil";
      cambiar(6);
    }
  }

  //encargado de cambiar el modo de juego de imagenes a numerico.
  function onoff2(){
    currentvalue = document.getElementById('Tipo').value;
    if(currentvalue == "Gráfico"){
      document.getElementById("Tipo").value="Numérico";
    }else{
      document.getElementById("Tipo").value="Gráfico";
    }
    currentvalue = document.getElementById('Tamaño').value;
    if(currentvalue == "Difícil"){
      cambiar(6);
    }else{
      cambiar(4);
    }
  }


  //encargado de cambiar el tipo de juego o modalidad y lo carga nuevamente.
  function cambiar(num){
    numeros = numeros.sort(function(){return Math.random() - 0.3})
    cartasDestapadas = 0;
    pares = 0;
    currentvalue = document.getElementById('Tamaño').value;
    if(currentvalue == "Difícil"){
      timerInicial = 80;
      timer = 80;
    }else{
      timerInicial = 40;
      timer = 40;
    }
    movimientos = 0;
    document.getElementById('restante').value = 40;//tiempo de nivel
    mostrarTiempo = document.getElementById('restante');
    mostrarTiempo.innerHTML = timer + " segundos";
    document.getElementById('movimientos').value = 0;
    mostrarMovimientos = document.getElementById('movimientos');// cambiar a 0
    mostrarMovimientos.innerHTML = "Movimientos: " + movimientos;
    IniciarJuegoMemoria(num);
  }


  