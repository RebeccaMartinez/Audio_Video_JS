//Definición de Variables
var audioElm, playbutton, masvel, menosvel, mute, navbar, volumenbar, tiempoActual, duracion;

function initialize () {
  //Asignacion de su valor a cada variable
  audioElm = document.getElementById("audio1");
  playbutton = document.getElementById('playbutton');
  masvel = document.getElementById("masvel");
  menosvel = document.getElementById("menosvel");
  mute = document.getElementById("mute");
  navbar = document.getElementById("navbar");
  volumenbar = document.getElementById("volumenbar");
  tiempoActual = document.getElementById("tiempoActual");
  duracion = document.getElementById("duracion");

  //EventListeners
  playbutton.addEventListener("click",playPausa);
  masvel.addEventListener("click",aumentarVel);
  menosvel.addEventListener("click",disminuirVel);
  mute.addEventListener("click",mutear);
  navbar.addEventListener("change",audioBar);
  navbar.addEventListener("mousedown", md);
	navbar.addEventListener("mouseup", mu);
  volumenbar.addEventListener("mousemove", volumen_set);
  audioElm.addEventListener("timeupdate", actualizarTiempo);
}

window.onload = initialize; //Lo que hace esta línea es asegurar que el HTML está cargado completamente. Así nos ahorramos errores al llamar a los elementos del HTML.

//función que obtiene el fichero del campo de texto, se lo asigna al elemento de audio e inicia la reproducción


//Función que inicia y pausa el audio
function playPausa() {
  if (audioElm.paused) {
    audioElm.play();
    playbutton.style.background = 'url("http://mannyzone.com/images/pause.png") no-repeat';
  }
    else {
      audioElm.pause();
      playbutton.style.background = 'url("http://mannyzone.com/images/play.png") no-repeat';
    }
}
// Aumenta la velocidad del audio
function aumentarVel() {
  audioElm.playbackRate += 1;
}

// Dsminuye la velocidd del audio
function disminuirVel() {
  if (audioElm.playbackRate <= 1) {
    var temp = audioElm.playbackRate;
    audioElm.playbackRate = (temp / 2);
  } else {
    audioElm.playbackRate -= 1;
  }
}

//función que mutea y desmutea el audio
function mutear (){
  if(audioElm.muted){
		audioElm.muted = false;
    mute.style.background = 'url("http://help.motorola.com/hc/apps/connect/10/en-us/images/global/mdpi/mc_sound_on.png") no-repeat';
	} else {
		audioElm.muted = true;
    mute.style.background = 'url("http://www.oakschurch.co.uk/controls%5Ccvol_mute.png") no-repeat';
	}
}

//función que permite adelantar o atrasar el audio mediante la barra de progreso
function audioBar() {
   var navbarto = audioElm.duration * (navbar.value / 100);
   audioElm.currentTime = navbarto;
 }

 //función que actualiza el volumen del audio
function volumen_set () {
  audioElm.volume = volumenbar.value / 100;
}


//funcuón que actualiza la barra de progreso a medida que  avanza el audio y muestra el tiempo atcual y total del audio
function actualizarTiempo() {
  var new_time = audioElm.currentTime * (100 / audioElm.duration);
  navbar.value = new_time;
  // Aqui empieza el codigo para mostrar el tiempo actual del audio y su duración
  var minActual = Math.floor(audioElm.currentTime / 60);
  var secActual = Math.floor(audioElm.currentTime - minActual * 60);
  var minDuracion = Math.floor(audioElm.duration / 60);
  var secDuracion = Math.floor(audioElm.duration - minDuracion * 60);
  if (secActual < 10){
    secActual = "0" + secActual;
  }
  if(minActual < 10){
    minActual = "0" + minActual;
  }
  if(secDuracion < 10){
    secDuracion = "0" + secDuracion;
  }
  if(minDuracion < 10){
    minDuracion = "0" + minDuracion;
  }
  tiempoActual.innerHTML = minActual+":"+secActual;
  duracion.innerHTML = minDuracion+":"+secDuracion;

}

//función que pausa el audio
function md (){
	audioElm.pause();
}

//función que reproduce el audio
function mu () {
	audioElm.play();
}
