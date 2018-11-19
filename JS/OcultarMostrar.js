$(document).ready(inicializar);
function inicializar(){
    $(".opcionUno").click(mostrarUno);
    $(".opcionDos").click(mostrarDos);
    $(".opcionTres").click(mostrarTres); // Cargar con usuario sin registrar
    $(".btnMenu").click(ocultarTodo);
    $(".opcion1").hide();
    $(".opcion2").hide();
    $(".opcion3").hide();
    $(".btnlogin").click(login);
    $("#btnMisDatos").click(mostrarDatosUsuario);
    $("#btnVolver").click(volverAUsuario);
    $(".MostrarDatosUsuario").hide();
}
function mostrarUno(){
    $(".opcion1").show();
    $(".opcion2").hide();
    $(".opcion3").hide();
    $(".MostrarDatosUsuario").hide();
}
function mostrarDos(){
    $(".opcion2").show();
    $(".opcion1").hide();
    $(".opcion3").hide();
}
function volverAUsuario() {
  $(".opcion1").hide();
  $(".opcion2").show();
  $(".opcion3").hide();
  $(".MostrarDatosUsuario").hide();
}
function mostrarDatosUsuario() {
  $(".opcion1").hide();
  $(".opcion2").hide();
  $(".opcion3").hide();
  $(".MostrarDatosUsuario").show();
}
function mostrarTres(){
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").show();
    $(".MostrarDatosUsuario").hide();
}
function ocultarTodo(){
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").hide();
    $(".login").hide();
    $(".MostrarDatosUsuario").hide();
}
function login(){
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").hide();
    $(".login").show();
    $(".MostrarDatosUsuario").hide();
}
