var palabras = ["HELADERA", "CELULAR", "TELEVISION", "BIBLIOTECA", "AURICULARES", "CAMPEON", "HTML", "AVION", "JAVASCRIPT","VARIABLES", "LOGICA", "DESARROLLADOR"];
localStorage.setItem('palabras', JSON.stringify(palabras));
var palabraSorteada;
var pos;
var flag = true;
var arrayPalabra = [];
var letrasCorrectas = [];
var letrasIncorrectas = [];
var intentos =9;
var incorrectos = 1;



comienzaJuego();
//COMIENZA EL JUEGO
function comienzaJuego(){

    //SE SORTEA LA PALABRA SECRETA
    pos = Math.floor(Math.random()*palabras.length);
    palabraSorteada = palabras[pos];

    //SE GENERA UN ARRAY CON CADA LETRA DE LA PALABRA SORTEADA
    for(var i=0; i< palabraSorteada.length; i++){
        arrayPalabra[i] = palabraSorteada.charAt(i);
    }
    //SE GENERA UN SPAN PARA CADA LETRA
    var aux = 0;
    while(aux < arrayPalabra.length){
        var elemento = document.createElement("span");
        elemento.classList.add("lineas");
        elemento.setAttribute('id','linea'+aux);
        document.getElementById('palabra').appendChild(elemento);
        aux++;
    }
    //SE SETEA INTENTOS Y SE DIBIJA LA BASE DE LA HORCA
    document.getElementById("intentos").innerHTML = intentos;

    dibujarBase();
}
//CAPTURA LA TECLA PULSADA
document.addEventListener('keydown', (event) => {
        var unicode = event.which || event.keyCode;
        var letra = (event.key).toUpperCase();
        validarLetra(unicode);
        if(validarLetra(unicode)){
            console.log("codeValue: " + unicode);
            console.log("letra: " + (event.key).toUpperCase());
            comprobarAcierto(letra);
            
        }
    }, false);


//VALIDAR LETRA
function validarLetra(code){
    var validado = false
    if( code>64 && code<91){
       validado = true
    }
    return validado
}

function comprobarAcierto(caracter){
    var flag3 = true;
    flag = true;
    //COMPRUEBA SI LA LETRA SE ENCUENTRA ENTRE LAS CORRECTAS
    for(var j=0; j< letrasCorrectas.length; j++){
        if(letrasCorrectas[j] == caracter){
            //SI ES CORRECTA PERO YA FUE ANOTADO, NO HACE NADA
            flag3 = false;
            flag = false;
        }
    }
    //SI FLAG3 ES TRUE LA LETRA NO FUE ANOTADA Y SE PROCEDE A APUNTARLA 
    if(flag3){
        for(var i=0; i< arrayPalabra.length; i++){
            if(arrayPalabra[i] == caracter){
                letrasCorrectas.push(caracter);
                document.getElementById("linea"+i).innerHTML = caracter;
                flag = false;
            }
        }
    }
    
    //SI FLAG SIGUE SIENDO TRUE, LA LETRA ES INCORRECTA
    if(flag){
        //VERIFICA SI ESA LETRA YA FUE ANOTADA COMO FALLO
        var flag2 = true
        for(var i=0; i< letrasIncorrectas.length; i++){
            if(letrasIncorrectas[i]==caracter){
                flag2 = false;
            }
        }
        //SI FLAG2 ES TRUE LA LETRA NO FUE ANOTADA Y SE PROCEDE A APUNTARLA
        if(flag2){
            letrasIncorrectas.push(caracter);
            document.getElementById("fallo"+incorrectos).innerHTML = caracter;
            incorrectos = incorrectos + 1;
            intentos--;
            document.getElementById("intentos").innerHTML = intentos;   
        }
        
    }
    //SE LLAMA A LAS FUNCIONES PARA DIBUJAR LA HORCA Y SE VERIFICA SI PERDIO O GANO EN CADA INTENTO
    dibujarHorca(intentos);
    ganaste(arrayPalabra.length,letrasCorrectas.length,palabraSorteada);
    perdiste(intentos,palabraSorteada);
}

//SWITCH QUE VA DIBUJANDO LA HORCA
function dibujarHorca(numeroDeFallo){
    switch(numeroDeFallo){
        case 8: 
            dibujarPrimerError();
            break;

        case 7: 
            dibujarSegundoError();
            break;

        case 6: 
            dibujarTercerError();
            break;
        case 5: 
            dibujarCuartoError();
            break;
        case 4: 
            dibujarQuintoError();
            break;
        case 3: 
            dibujarSextoError();
            break;
        case 2: 
            dibujarSeptimoError();
            break;
        case 1: 
            dibujarOctavoError();
            break;
        case 0: 
            dibujarNovenoError();
            break;                
    }
}

//BOTON NUEVO JUEGO
function nuevoJuego(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("palabra").innerHTML = "";
    
    for(var i=1; i<= letrasIncorrectas.length; i++){
        document.getElementById("fallo"+i).innerHTML = "";
    }
    intentos =9;
    incorrectos = 1;
    letrasCorrectas = [];
    letrasIncorrectas = [];
    arrayPalabra = [];
    comienzaJuego();
}

//DIBIJA LA BASE DE LA HORCA
function dibujarBase(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "#555555";
    ctx.fillStyle = "#222222";
    ctx.lineWidth = 3;

    ctx.moveTo(80,301);
    ctx.lineTo(320,301);

    ctx.moveTo(60,319);
    ctx.lineTo(340,319);

    ctx.fillRect(80,300,240,20);
    ctx.fillRect(60,320,280,20);

    ctx.stroke();

}

function ganaste(largoDePalabra,cantidadLetrasAnotadas,palabraSecreta){
    if(largoDePalabra==cantidadLetrasAnotadas){
        swal("Felicidades ganaste.", "La palabra secreta era: "+palabraSecreta+".","success");
    }
}

function perdiste(intentoN,palabraSecreta){
    console.log("entre1")
    if(intentoN == 0){
        console.log("entre2")
        swal("Lo siento fallaste. ", "La palabra secreta era: "+palabraSecreta,"error");
    }
}


//LAS 9 FUNCIONES QUE REPRESENTAN A LOS 9 ERRORES QUE SE PUEDEN COMETER
function dibujarPrimerError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.fillRect(119,60,22,239);
        
    ctx.fillStyle = "#804000";
    ctx.fillRect(120,61,20,240);

}
function dibujarSegundoError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.fillRect(110,69,151,22);
    ctx.fillStyle = "#804000";
    ctx.fillRect(111,70,150,20);

    ctx.stroke();
    //CLAVOS
    ctx.beginPath();
    ctx.strokeStyle = "#8F8F8F";
    ctx.fillStyle = "#8F8F8F";
    ctx.lineWidth = 4;
    ctx.arc(124,75,0.5,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(134,75,0.5,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(134,85,0.5,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(124,85,0.5,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();


}
function dibujarTercerError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    
    ctx.strokeStyle = "#EBC78C";
    ctx.lineWidth = 3;

    ctx.moveTo(233,70);
    ctx.lineTo(236,90);

    ctx.moveTo(237,70);
    ctx.lineTo(240,90);

    ctx.moveTo(241,70);
    ctx.lineTo(244,90);

    ctx.moveTo(245,70);
    ctx.lineTo(248,90);

    ctx.moveTo(249,70);
    ctx.lineTo(252,90);

    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 8.5;
    ctx.moveTo(244,89);
    ctx.lineTo(244,120);

    ctx.stroke();
    
    ctx.beginPath();
    ctx.strokeStyle = "#EBC78C";
    ctx.lineWidth = 7;
    ctx.moveTo(244,89);
    ctx.lineTo(244,120);

    ctx.stroke();
}
function dibujarCuartoError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#333333";
    ctx.lineWidth = 4;

    ctx.arc(244,144,22,0,Math.PI*2);

    ctx.stroke();

    ctx.fill();


}
function dibujarQuintoError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(244,166);
    ctx.lineTo(244,173);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(244,173);
    ctx.lineTo(244,230);

    ctx.stroke();
}
function dibujarSextoError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(239,225);
    ctx.lineTo(235,270);
    ctx.lineTo(220,270);
    ctx.stroke();
}
function dibujarSeptimoError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(249,225);
    ctx.lineTo(255,270);
    ctx.lineTo(270,270);
    ctx.stroke();
}
function dibujarOctavoError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(234,173);
    ctx.lineTo(220,215);
    ctx.stroke();
}
function dibujarNovenoError(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(254,173);
    ctx.lineTo(268,215);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.moveTo(230,142);
    ctx.lineTo(238,135);
    ctx.moveTo(238,142);
    ctx.lineTo(230,135);

    ctx.moveTo(250,142);
    ctx.lineTo(258,135);
    ctx.moveTo(258,142);
    ctx.lineTo(250,135);

    ctx.moveTo(234,152);
    ctx.lineTo(254,152);

    ctx.stroke();

}

