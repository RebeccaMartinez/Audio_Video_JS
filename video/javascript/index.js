//Inicialización de Variables

var vid, btn, navbar, tiempoActual, duracion, mutebtn, volumenbar;

function intialize(){

	//Referenciando las variables

	vid = document.getElementById("mi_video");
	btn = document.getElementById("btnplaypause");
	navbar = document.getElementById("navbar");
	tiempoActual = document.getElementById("tiempoactual");
	duracion = document.getElementById("duracion");
	mutebtn = document.getElementById("mutebtn");
	volumenbar = document.getElementById("volumenbar");

	//Añadiendo Listeners

	btn.addEventListener("click",playPause,false);
	navbar.addEventListener("change",vidBar,false);
	vid.addEventListener("timeupdate",actualiza_navbar,false);
	mutebtn.addEventListener("click",vidmute,false);
	volumenbar.addEventListener("change",volumen_set,false);
}

window.onload = intialize; //Lo que hace esta línea es asegurar que el HTML está cargado completamente. Así nos ahorramos errores al llamar a los elementos del HTML.

function playPause(){
	if(vid.paused){
		vid.play();
		btn.innerHTML = "Pause";
	} else {
		vid.pause();
		btn.innerHTML = "Play";
	}
}

function vidBar(){
	var navbarto = vid.duration * (navbar.value / 100);
	vid.currentTime = navbarto;
}

function actualiza_navbar(){
	var new_time = vid.currentTime * (100 / vid.duration);
	navbar.value = new_time;
	// Aqui empieza el codigo para mostrar el tiempo actual del video y su duración
	var minActual = Math.floor(vid.currentTime / 60);
	var secActual = Math.floor(vid.currentTime - minActual * 60);
	var minDuracion = Math.floor(vid.duration / 60);
	var secDuracion = Math.floor(vid.duration - minDuracion * 60);
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

function vidmute(){
	if(vid.muted){
		vid.muted = false;
		mutebtn.innerHTML = "Mute";
	} else {
		vid.muted = true;
		mutebtn.innerHTML = "Unmute";
	}
}

function volumen_set(){
	vid.volume = volumenbar.value / 100;
}