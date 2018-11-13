$(document).ready(inicializar);
function inicializar(){
    $(".opcionUno").click(mostrarUno);
    $(".opcionDos").click(mostrarDos);
    $(".opcionTres").click(mostrarTres);
    $(".btnMenu").click(ocultarTodo);
    $(".opcion1").hide();
    $(".opcion2").hide();
    $(".opcion3").hide();
}
function mostrarUno(){
    $(".opcion1").show();
    $(".opcion2").hide();
    $(".opcion3").hide();
}
function mostrarDos(){
    $(".opcion2").show();
    $(".opcion1").hide();
    $(".opcion3").hide();
}
function mostrarTres(){
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").show();
}
function ocultarTodo(){
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").hide();
}