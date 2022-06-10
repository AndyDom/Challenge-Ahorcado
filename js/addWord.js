
function agregarPalabra(){
    
    var pal = document.querySelector("#addPalabra").value.toUpperCase();
    var palBase = JSON.parse(localStorage.getItem("palabras"));
    palBase.push(pal);
    var palBaseDos = JSON.stringify(palBase);
    localStorage.setItem('palabras', palBaseDos);

    location.href = "game.html";  
   
}


console.log(agregarPalabra);
