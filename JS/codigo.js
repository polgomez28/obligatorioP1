$(document).ready(iniciar);
function iniciar(){
    //Inicia llamas para ocultar mostrar.
    //PROVISORIO
    $(".btnMenu").click(mostrarRegistrarme);
    $("#btnMisDatos").click(mostrarDatosUsuario);
    
    $(".btnlogin").click(mostrarLogin); //muestra login desde menu -Ingresar
    $("#btnVolverNoRegistrado").click(noRegistrado);
    $("#btnVolverRegistrado").click(volver);
    $("#mostrar").click(mostrarTodo);
    $("#btnAltaUsuario").click(validarUsuario);
    $("#btnCrearOferta").click(cargarOfertas); // (PRONTA) llama a funcion que valida oferta y la da de alta en array ofertas
    $("#hosTipo").html(cargoTiposHospedajes());
    $("#btnLogin").click(loginVal);
    $("#btnSalir").click(logout);
    generoListadoOferta();
    listaFavoritos();
    registroUsuarios();
    
}
/* Definimos las variables globales
 * y los arrays globales.
 */

var usuarios = [{"Id":1, "Nombre":"polg", "Correo":"polg28@gmail.com", "Clave":"polg28", "Estado":"Habilitado", "Rol":"administrador"}
                ,{"Id":2, "Nombre":"Necuse", "Correo":"necuse@gmail.com", "Clave":"necuse", "Estado":"Pendiente", "Rol":"administrador"}
                ,{"Id":3, "Nombre":"charly", "Correo":"charly@gmail.com", "Clave":"charly", "Estado":"Habilitado", "Rol":"registrado"}
                ,{"Id":4, "Nombre":"jose", "Correo":"jose@adinet.com.uy", "Clave":"jose", "Estado":"Pendiente", "Rol":"pendiente"}];

var reservas = [{"Id":1, "IdReserva":1, "Usuario":"charly", "Nombre":"La Posada", "Ubicacion":"Maldonado", "Foto":"colonia.jpg", "Tipo":"Hotel", "Precio":800, "FinValidez":"20/02/2019", "Reserva":"Pendiente", "Vendida":1}
                 ,{"Id":3, "IdReserva":2, "Usuario":"Necuse", "Nombre":"El Ciclon", "Ubicacion":"Durazno", "Foto":"hotel.jpg", "Tipo":"Hotel", "Precio":500, "FinValidez":"20/02/2019", "Reserva":"Pendiente", "Vendida":3}];

var favoritos = [{"Id":1, "Nombre":"La Posada", "Ubicacion":"Maldonado", "Foto":"colonia.jpg", "Tipo":"Hotel", "Precio":800, "FinValidez":"20/02/2019"}];

var ofertas = [{"Id":1, "Nombre":"La Posada", "Ubicacion":"Maldonado", "Foto":"colonia.jpg", "Tipo":"Hotel", "Precio":800, "FinValidez":"2018-11-24", "Estado":"Activa", "Destacada":"SI"},
               {"Id":2, "Nombre":"Las Rosas", "Ubicacion":"Florida", "Foto":"hostel1.jpg", "Tipo":"Hotel", "Precio":1200, "FinValidez":"2019-05-20", "Estado":"Activa", "Destacada":"SI"},
               {"Id":3, "Nombre":"El Ciclon", "Ubicacion":"Durazno", "Foto":"hotel.jpg", "Tipo":"Hostel", "Precio":500, "FinValidez":"2019-5-25", "Estado":"Inactiva", "Destacada":"NO"}];

var hospedajes = [{"tipo":1, "nombre":"Hotel"},
                  {"tipo":2, "nombre":"Hostel"},
                  {"tipo":3, "nombre":"Casa"},
                  {"tipo":4, "nombre":"Apartamento"}];

var passLogin, usuarioLogin, tipoUser, fotosDir = "imagenes/", FechaActual = new Date();
// Tomamos la hora actual en una variable para validar fechas de ofertas


function loginVal(){
    var tipo = "usuario", userOK;
    //var tmp = {};
    usuarioLogin = $("#txtUser").val();
    passLogin = $("#txtPassword").val();
    userOK = buscar(usuarioLogin, tipo);
    if (userOK) {
        
        //$("#usuarioLogeado").html("Bienvenido " + usuarioLogin + "!");
        
        for (var i = 0; i <= usuarios.length-1; i++) {
            tmp = usuarios[i];
            if (tmp["Nombre"] === usuarioLogin && tmp["Clave"] === passLogin) {
                tipoUser = tmp["Rol"];
                $("#usarioLogueado").html("Bienvenido " + usuarioLogin + "!");
                masVendidasDisparo();
                generoListadoOferta(usuarioLogin);
                loginCheck(usuarioLogin,tipoUser);
            }
        }
}else {
        alert("Error, contraseña incorrecta :´(");
    }

}
//Funcion para autonumerado de ID en ofertas o reservas
function autoId(tipo){
    var tmp ;
    var nuevoId = 0;
    if (tipo === "oferta") {
        for (pos = 0; pos <= ofertas.length-1; pos++) {
        tmp = ofertas[pos];
        if (tmp["Id"] > parseInt(nuevoId)) {
            nuevoId = tmp["Id"];
        }
    }
    }else {
        if (tipo === "reserva") {
            for (pos = 0; pos <= reservas.length-1; pos++) {
        tmp = reservas[pos];
        if (tmp["IdReserva"] > parseInt(nuevoId)) {
            nuevoId = tmp["IdReserva"];
        }
    }
        }
    }
    if (tipo === "Favorito") {
          for (pos = 0; pos <= favoritos.length-1; pos++) {
        tmp = favoritos[pos];
        if (tmp["Id"] > parseInt(nuevoId)) {
            nuevoId = tmp["Id"];
        }
    }
    }
    if (tipo === "usuario") {
        for (pos = 0; pos <= usuarios.length-1; pos++) {
        tmp = usuarios[pos];
        if (tmp["Id"] > parseInt(nuevoId)) {
            nuevoId = tmp["Id"];
        }
    }
    }
    nuevoId = (nuevoId + 1);
    return nuevoId;
}
// Función para validar contraseña y usuario
function validarUsuario() {
    var tmpUsuario = {}, nuevoId;
    login = false;
    var tipo = "usuario";
    var nombreUsuario = $("#txtNombreUsuario").val();
    var correoUsuario = $("#txtCorreousuario").val();
    var contraseña = $("#txtContraseña").val();
    var contraseñaVal = $("#txtContraseña2").val();
    if (contraseña === contraseñaVal) {
        login = buscar(nombreUsuario,tipo); // Llamada a funcion buscar para ver si ya existe usuario
        if (!login) {
            nuevoId = autoId(tipo);
            tmpUsuario["Id"] = nuevoId;
            tmpUsuario["Nombre"] = nombreUsuario;
            tmpUsuario["Correo"] = correoUsuario;
            tmpUsuario["Clave"] = contraseña;
            tmpUsuario["Estado"] = "Pendiente";
            tmpUsuario["Rol"] = "pendiente";
            usuarios[usuarios.length] = tmpUsuario;
            $("#respSolicitudUsuario").html("Usuario dado de alta correctamente!");
        } else {
            $("#respSolicitudUsuario").html("Error, usuario ya existe");
        }
    }else {
        $("#respSolicitudUsuario").html("Error, la contraseña no coincide");
    }

}
function registroUsuarios(){
    var listado = "", tmpUsuario = {}, idUsuario = {}, estados;
    var pos;
    for (pos = 0; pos <= usuarios.length-1; pos++) {
        tmpUsuario = usuarios[pos];
        if (tmpUsuario["Estado"] === "Pendiente") {
            idUsuario = tmpUsuario["Id"];
            listado = listado + "<tr>";
            listado = listado + "<td>" + tmpUsuario["Nombre"] + "</td>";
            estados = tmpUsuario["Estado"];
            listado = listado + "<td>" + estados + "</td>";
            listado = listado + "<td>" + tmpUsuario["Correo"] + "</td>";
            listado = listado + "<td>" + "<input type='button' class='btnFormularios' value='Habilitar' onclick='habilitarUsuario(" + idUsuario + ")'" + " id='" + idUsuario + "'>" + "</td>";
            listado = listado + "</tr>";
        }else {
            listado = listado + "<tr>";
            listado = listado + "<td>" + tmpUsuario["Nombre"] + "</td>";
            estados = tmpUsuario["Estado"];
            listado = listado + "<td>" + estados + "</td>";
            listado = listado + "<td>" + tmpUsuario["Correo"] + "</td>";
            listado = listado + "<td>" + "Activo" + "</td>";
            listado = listado + "</tr>";
        }

    }
    $("#solicitudRegistro").html(listado);
}
function habilitarUsuario(idUser) {
    salir = false;
    indice = 0;
    while (!salir && indice <= usuarios.length - 1) {
        tmp = usuarios[indice];
        if (tmp["Id"] === idUser) {
            salir = true;
        } else {
            indice++;
        }
    }
    if (salir) {
        tmp["Estado"] = "Habilitado";
        usuarios[indice] = tmp;
        registroUsuarios();
    }
}
//Función para cargar las combox de tipos hospedajes
function cargoTiposHospedajes(){
    var pos;
	var tmpHospedaje={}, opciones="";
	for(pos=0; pos<=hospedajes.length-1; pos++){
		tmpHospedaje = hospedajes[pos];
		opciones = opciones + "<option value='" + tmpHospedaje["nombre"];
		opciones = opciones + "'>" + tmpHospedaje["nombre"] + "</option>";		
	}
	return opciones;
}


//Funciones que valida que no exista oferta a dar de alta y la agrega al array ofertas
function cargarOfertas(){
    var tipo = "oferta";
    var autoIdOK;
    var existe;
    var tmpoferta = {};
    var nombreHosp = $("#txtNombreHosp").val();
    var ubicacion = $("#txtUbicacion").val();
    var tipoHosp = $("#hosTipo").val();
    var precioOferta = parseInt($("#txtPrecio").val());
    var fechaVal = $("#fechaValidez").val();
    var foto = $("#txtFoto").val();
    var nombreFoto = foto.substr(12);
    if (!isNaN(precioOferta)) {
        existe = buscar(nombreHosp,tipo);  //llamamos a funcion para ver si oferta ya existe
        if (!existe) {
            if(fechaVal > FechaActual){
            autoIdOK = autoId(tipo); //llamada a funcion para autonumerar oferta nueva
            $("#idOfertaForm").html(autoIdOK);
            tmpoferta["Id"] = autoIdOK;
            tmpoferta["Nombre"] = nombreHosp;
            tmpoferta["Ubicacion"] = ubicacion;
            tmpoferta["Tipo"] = tipoHosp;
            tmpoferta["Precio"] = precioOferta;
            tmpoferta["FinValidez"] = fechaVal;
            tmpoferta["Foto"] = nombreFoto;
            tmpoferta["Estado"] = "Activa";
            ofertas[ofertas.length] = tmpoferta;    //Se da de alta oferta nueva en array
            $("#txtNombreHosp").val("");
            $("#txtUbicacion").val("");
            $("#hosTipo").val(1);
            $("#txtPrecio").val(0);
            $("#fechaValidez").val("dd / mm / aaaa");
            $("#respCreaOferta").html("Oferta cargada correctamente!");
            generoListadoOferta();
        }else {
                $("#respCreaOferta").html("Error, fecha oferta tiene que ser mayor a fecha actual");
            }

        }else {
            $("#respCreaOferta").html("Error, oferta ya existe. Ingrese una diferente");
            $("#txtPrecio").val(0);
        }

    }else {
        $("#respCreaOferta").html("Precio debe ser valor numérico");
    }

}

function generoListadoOferta() {
    var listado = "", pos, tmp;
    for (pos = 0; pos <= ofertas.length - 1; pos++) {
        tmpOferta = ofertas[pos];
        if (tipoUser === "registrado") {
            if (tmpOferta["Estado"] === "Activa") {
                if (tmpOferta["Destacada"] === "SI") {
                    tmp = tmpOferta["Id"];
                    listado = listado + "<tr>";
                    listado = listado + "<td>" + tmpOferta["Nombre"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Ubicacion"] + "</td>";
                    listado = listado + "<td>" + "<img src='imagenes/" + tmpOferta["Foto"] + "'/>" + "</td>";
                    listado = listado + "<td>" + tmpOferta["Tipo"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Precio"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["FinValidez"] + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Reservar' class='btnFormularios' onclick='addReserva(" + tmp + ")'" + " id='reserva" + tmp + "'>" + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Favorito' class='btnFormularios'  onclick='addFavoritos(" + tmp + ")'" + " id='btn" + tmpOferta["Id"] + "'>" + "</td>";
                    listado = listado + "</tr>";
                } else {
                    tmp = tmpOferta["Id"];
                    listado = listado + "<tr>";
                    listado = listado + "<td>" + tmpOferta["Nombre"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Ubicacion"] + "</td>";
                    listado = listado + "<td>" + "<img src='imagenes/" + tmpOferta["Foto"] + "'/>" + "</td>";
                    listado = listado + "<td>" + tmpOferta["Tipo"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Precio"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["FinValidez"] + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Reservar' class='btnFormularios' onclick='addReserva(" + tmp + ")'" + " id='reserva" + tmp + "'>" + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Favorito' class='btnFormularios'  onclick='addFavoritos(" + tmp + ")'" + " id='btn" + tmpOferta["Id"] + "'>" + "</td>";
                    listado = listado + "</tr>";
                }


            }

        } else {
            if (tipoUser === "administrador") {
                if (tmpOferta["Destacada"] === "SI") {
                    tmp = tmpOferta["Id"];
                    listado = listado + "<tr>";
                    listado = listado + "<td>" + tmpOferta["Nombre"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Ubicacion"] + "</td>";
                    listado = listado + "<td>" + "<img src='imagenes/" + tmpOferta["Foto"] + "'/>" + "</td>";
                    listado = listado + "<td>" + tmpOferta["Tipo"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Precio"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["FinValidez"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Estado"] + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Destacar' class='btnFormularios' onclick='destacarOferta(" + tmp + ")'" + " id='destacar" + tmp + "'>" + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Habilitar' class='btnFormularios' onclick='activarOferta(" + tmp + ")'" + " id='activa" + tmp + "'>" + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Deshabilitar' class='btnFormularios' onclick='quitarOferta(" + tmp + ")'" + " id='quita" + tmp + "'>" + "</td>";
                    listado = listado + "</tr>";
                } else {
                    tmp = tmpOferta["Id"];
                    listado = listado + "<tr>";
                    listado = listado + "<td>" + tmpOferta["Nombre"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Ubicacion"] + "</td>";
                    listado = listado + "<td>" + "<img src='imagenes/" + tmpOferta["Foto"] + "'/>" + "</td>";
                    listado = listado + "<td>" + tmpOferta["Tipo"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Precio"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["FinValidez"] + "</td>";
                    listado = listado + "<td>" + tmpOferta["Estado"] + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Destacar' class='btnFormularios' onclick='destacarOferta(" + tmp + ")'" + " id='destacar" + tmp + "'>" + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Habilitar' class='btnFormularios' onclick='activarOferta(" + tmp + ")'" + " id='activa" + tmp + "'>" + "</td>";
                    listado = listado + "<td>" + "<input type='button' value='Deshabilitar' class='btnFormularios' onclick='quitarOferta(" + tmp + ")'" + " id='quita" + tmp + "'>" + "</td>";
                    listado = listado + "</tr>";
                }


            } else {
                if (tmpOferta["Estado"] === "Activa") {
                    if (tmpOferta["Destacada"] === "SI") {
                        tmp = tmpOferta["Id"];
                        listado = listado + "<tr>";
                        listado = listado + "<td>" + tmpOferta["Nombre"] + "</td>";
                        listado = listado + "<td>" + tmpOferta["Ubicacion"] + "</td>";
                        listado = listado + "<td>" + "<img src='imagenes/" + tmpOferta["Foto"] + "'/>" + "</td>";
                        listado = listado + "<td>" + tmpOferta["Tipo"] + "</td>";
                        listado = listado + "<td>" + tmpOferta["Precio"] + "</td>";
                        listado = listado + "<td>" + tmpOferta["FinValidez"] + "</td>";
                        listado = listado + "</tr>";
                    } else {
                        tmp = tmpOferta["Id"];
                        listado = listado + "<tr>";
                        listado = listado + "<td>" + tmpOferta["Nombre"] + "</td>";
                        listado = listado + "<td>" + tmpOferta["Ubicacion"] + "</td>";
                        listado = listado + "<td>" + "<img src='imagenes/" + tmpOferta["Foto"] + "'/>" + "</td>";
                        listado = listado + "<td>" + tmpOferta["Tipo"] + "</td>";
                        listado = listado + "<td>" + tmpOferta["Precio"] + "</td>";
                        listado = listado + "<td>" + tmpOferta["FinValidez"] + "</td>";
                        listado = listado + "</tr>";
                    }


                }
            }
        }
    }
    $("#contenidoOfertas3").html(listado);
}
function destacarOferta(idOferta){
    var tmpOferta = {}, pos;
    for (pos = 0; pos <= ofertas.length-1; pos++) {
      tmpOferta = ofertas[pos];
      if (tmpOferta["Id"] === idOferta) {
          tmpOferta["Destacar"] = "SI";
          ofertas[pos] = tmpOferta;
          generoListadoOferta();
        }
      }
}
function activarOferta(idOferta){
    var tmpOferta = {}, pos;
  for (pos = 0; pos <= ofertas.length-1; pos++) {
      tmpOferta = ofertas[pos];
      if (tmpOferta["Id"] === idOferta) {
          tmpOferta["Estado"] = "Activa";
          ofertas[pos] = tmpOferta;
          generoListadoOferta();
        }
      }
}
function quitarOferta(idOferta) {
    var tmpOferta = {}, pos, tipo = "Reserva", reservada;
    for (pos = 0; pos <= ofertas.length - 1; pos++) {
        tmpOferta = ofertas[pos];
        if (tmpOferta["Id"] === idOferta) {
            reservada = buscar(idOferta, tipo);
            if (reservada) {
                alert("Error, esta reservada");
            } else {
                tmpOferta["Estado"] = "Inactiva";
                ofertas[pos] = tmpOferta;
                generoListadoOferta();
            }
        }
    }
}

// REALIZO UNA RESERVA, LA VALIDO Y LA AGREGO AL ARRAY RESERVAS

function addReserva(idboton) {
    $("#reserva" + idboton).attr("disabled", true);
    var salir = false, indice = 0, tmp = {}, existe, tipo = "Reserva";
    existe = buscar(idboton,tipo);
    if(!existe){
        while (!salir && indice <= ofertas.length - 1) {
        tmp = ofertas[indice];
        if (tmp["Id"] === idboton) {
            salir = true;
        } else {
            indice++;
        }
    }
    if (salir) {
        tmp["Reserva"] = "Pendiente";
        tmp["Usuario"] = usuarioLogin;
        reservas[reservas.length] = tmp;
        listaReservas();
    }
    }else {
        alert("La oferta ya está reservada");
    }
}
// FUNCIÓN PARA LISTAR LAS RESERVAS
function listaReservas() {
    var listado = "", listadoPen = "", listadoDen = "", tmpReserva = {}, pos, tmp, listadoUsu, totalPendientes=0;
    var totalDenegada = 0, totalAceptada = 0;
    for (pos = 0; pos <= reservas.length - 1; pos++) {
        tmpReserva = reservas[pos];
        
        if (tmpReserva["Reserva"] === "Pendiente") {
            if(tmpReserva["Usuario"] === usuarioLogin || tipoUser !== "registrado"){
            tmp = tmpReserva["Id"];
            totalPendientes += tmpReserva["Precio"];
            listadoPen = listadoPen + "<tr>";
            listadoPen = listadoPen + "<td>" + tmpReserva["Id"] + "</td>";
            listadoPen = listadoPen + "<td>" + tmpReserva["Usuario"] + "</td>";
            listadoPen = listadoPen + "<td>" + tmpReserva["Nombre"] + "</td>";
            listadoPen = listadoPen + "<td>" + tmpReserva["Ubicacion"] + "</td>";
            listadoPen = listadoPen + "<td>" + "<img src='imagenes/" + tmpReserva["Foto"] + "'/>" + "</td>";
            listadoPen = listadoPen + "<td>" + tmpReserva["Tipo"] + "</td>";
            listadoPen = listadoPen + "<td>" + tmpReserva["Precio"] + "</td>";
            listadoPen = listadoPen + "<td>" + tmpReserva["FinValidez"] + "</td>";
            listadoPen = listadoPen + "<td>" + "<input type='button' value='Confirmar Reserva'  onclick='confirmarReserva(" + tmp + ")'" + " id='conf" + tmp + "'>" + "</td>";
            listadoPen = listadoPen + "<td>" + "<input type='button' value='Denegar Reserva'  onclick='denegarReserva(" + tmp + ")'" + " id='denegar" + tmp + "'>" + "</td>";
            listadoPen = listadoPen + "</tr>";
        }
        }else{
        if (tmpReserva["Reserva"] === "Aceptada") {
            if(tmpReserva["Usuario"] === usuarioLogin || tipoUser !== "registrado"){
            tmp = tmpReserva["Id"];
            totalAceptada += tmpReserva["Precio"];
            listado = listado + "<tr>";
            listado = listado + "<td>" + tmpReserva["Id"] + "</td>";
            listado = listado + "<td>" + tmpReserva["Usuario"] + "</td>";
            listado = listado + "<td>" + tmpReserva["Nombre"] + "</td>";
            listado = listado + "<td>" + tmpReserva["Ubicacion"] + "</td>";
            listado = listado + "<td>" + "<img src='imagenes/" + tmpReserva["Foto"] + "'/>" + "</td>";
            listado = listado + "<td>" + tmpReserva["Tipo"] + "</td>";
            listado = listado + "<td>" + tmpReserva["Precio"] + "</td>";
            listado = listado + "<td>" + tmpReserva["FinValidez"] + "</td>";
            listado = listado + "</tr>";
        }
        }
        }
        if (tmpReserva["Reserva"] === "Denegada") {
            if(tmpReserva["Usuario"] === usuarioLogin || tipoUser !== "registrado"){
            tmp = tmpReserva["Id"];
            totalDenegada += tmpReserva["Precio"];
            listadoDen = listadoDen + "<tr>";
            listadoDen = listadoDen + "<td>" + tmpReserva["Id"] + "</td>";
            listadoDen = listadoDen + "<td>" + tmpReserva["Usuario"] + "</td>";
            listadoDen = listadoDen + "<td>" + tmpReserva["Nombre"] + "</td>";
            listadoDen = listadoDen + "<td>" + tmpReserva["Ubicacion"] + "</td>";
            listadoDen = listadoDen + "<td>" + "<img src='imagenes/" + tmpReserva["Foto"] + "'/>" + "</td>";
            listadoDen = listadoDen + "<td>" + tmpReserva["Tipo"] + "</td>";
            listadoDen = listadoDen + "<td>" + tmpReserva["Precio"] + "</td>";
            listadoDen = listadoDen + "<td>" + tmpReserva["FinValidez"] + "</td>";
            listadoDen = listadoDen + "</tr>";
        }
        }
        if (tmpReserva["Usuario"] === usuarioLogin && tipoUser !== "administrador") {
            tmp = tmpReserva["Id"];
            listadoUsu = listadoUsu + "<tr>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["Id"] + "</td>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["Usuario"] + "</td>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["Reserva"] + "</td>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["Nombre"] + "</td>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["Ubicacion"] + "</td>";
            listadoUsu = listadoUsu + "<td>" + "<img src='imagenes/" + tmpReserva["Foto"] + "'/>" + "</td>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["Tipo"] + "</td>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["Precio"] + "</td>";
            listadoUsu = listadoUsu + "<td>" + tmpReserva["FinValidez"] + "</td>";
            listadoUsu = listadoUsu + "</tr>";
        }
    }
    $("#contenidoReservas2").html(listadoUsu);
    $("#listadoOfertasNoConf").html(listadoPen);
    $("#listadoOfertasConf").html(listado);
    $("#listadoOfertasDen").html(listadoDen);
    $("#montoConfirmadas").html("Total $ confirmadas: " + totalAceptada);
    $("#montoPendientes").html("Total $ pendientes: " + totalPendientes);
    $("#montoDenegadas").html("Total $ denegadas: " +totalDenegada);
}
// Función para confirmar las reservas en tabla de confirmadas
function confirmarReserva(idReserva) {
  var tmpReserva = {}, pos;
  for (pos = 0; pos <= reservas.length-1; pos++) {
      tmpReserva = reservas[pos];
      if (tmpReserva["Id"] === idReserva) {
          tmpReserva["Reserva"] = "Aceptada";
          tmpReserva["Vendida"] = (tmpReserva["Vendida"] + 1);
          reservas[pos] = tmpReserva;
          listaReservas();
        }
      }
    }

function denegarReserva(idReserva) {
  var tmpReserva = {}, pos;
  for (pos = 0; pos <= reservas.length-1; pos++) {
      tmpReserva = reservas[pos];
      if (tmpReserva["Id"] === idReserva) {
          tmpReserva["Reserva"] = "Denegada";
          reservas[pos] = tmpReserva;
          listaReservas();
        }
      }
    }

function addFavoritos(idboton) {
    $("#btn" + idboton).attr("disabled", true);
    var salir = false, indice = 0, tmp = {}, existe, tipo = "Favorito";
    existe = buscar(idboton,tipo);
    if(!existe){
        while (!salir && indice <= ofertas.length - 1) {
        tmp = ofertas[indice];
        if (tmp["Id"] === idboton) {
            salir = true;
        } else {
            indice++;
        }
    }
    if (salir) {
        favoritos[favoritos.length] = tmp;
        listaFavoritos();
    }
    }else {
        alert("La oferta ya existe en favoritos");
    }
}
function listaFavoritos(){
    var listado = "", tmpFavoritos = {}, tmp;
    for(pos=0; pos<=favoritos.length-1; pos++){
		tmpFavoritos = favoritos[pos];
                tmp = tmpFavoritos["Id"];
                listado = listado + "<tr>";
		listado = listado + "<td>" + tmpFavoritos["Nombre"] + "</td>";
		listado = listado + "<td>"  + tmpFavoritos["Ubicacion"] + "</td>";
		listado = listado + "<td>" + "<img src='imagenes/" + tmpFavoritos["Foto"] + "'/>" + "</td>";
		listado = listado + "<td>" + tmpFavoritos["Tipo"] + "</td>";
		listado = listado + "<td>" + tmpFavoritos["Precio"] + "</td>";
		listado = listado + "<td>"  + tmpFavoritos["FinValidez"] + "</td>";
                listado = listado + "<td>" + "<input type='button' value='Reservar' class='btnFormularios' onclick='addReserva(" + tmp + ")'" + " id='reservaFav" + tmp + "'>" + "</td>";
		listado = listado + "</tr>";
        
	}
        $("#contenidoFavoritos").html(listado);
}

function estadoDeCuenta(){
    var pos, tmpReserva = {}, listado = "", total = 0;
    for (pos = 0; pos <= reservas.length-1; pos++) {
        tmpReserva = reservas[pos];
        if (tmpReserva["Usuario"] === usuarioLogin && tmpReserva["Reserva"] === "Aceptada") {
            listado = listado + "<tr>";
            listado = listado + "<td>" + tmpReserva["Nombre"] + "</td>";
            listado = listado + "<td>" + tmpReserva["Precio"] + "</td>";
            listado = listado + "<td>" + tmpReserva["Reserva"] + "</td>";
            listado = listado + "</tr>";
            total += tmpReserva["Precio"];
        }
    }
    $("#estadoCuenta").html(listado);
    $("#totalEstadoCuenta").html("Total: " + total);
}

function buscar(nombre, tipo) {
    var tmp;
    var existe = false;
    var loginUser;
    //En el if validamos que exista oferta segun variable tipo recibida
    // y en el else validamos usuarios por if anidado segun variable tipo tambien.
    if (tipo === "oferta") {
        for (pos = 0; pos <= ofertas.length - 1; pos++) {
            tmp = ofertas[pos];
            if (tmp["Nombre"] === nombre) {
                existe = true;
            }
            if (tmp["Id"] === nombre) {
                existe = true;
            }
        }
        return existe;
    } else {
        if (tipo === "Reserva") {
            for (pos = 0; pos <= reservas.length - 1; pos++) {
                tmp = reservas[pos];
                if (tmp["Id"] === nombre) {
                    existe = true;
                }
            }
            return existe;
        }
        if (tipo === "Favorito") {
            for (pos = 0; pos <= favoritos.length - 1; pos++) {
                tmp = favoritos[pos];
                if (tmp["Id"] === nombre) {
                    existe = true;
                }
            }
            return existe;
        }
        if (tipo === "usuario") {
            for (pos = 0; pos <= usuarios.length - 1; pos++) {
                tmp = usuarios[pos];
                if (tmp["Nombre"] === nombre) {
                    loginUser = true;
                }
            }
            return loginUser;
        }
    }
}

/*
 * funciones para ocultar y mostrar contenedores
 */

function masVendidas(a,b){
    var retorno = 0, a, b;
    if (a["Vendida"]>b["Vendida"]) {
        retorno = 1;
    }else {
        if (a["Vendida"]<b["Vendida"]) {
        retorno = -1;
    }
    }
    return retorno;
}
function masVendidasDisparo(){
    var listado = "", pos;
    reservas.sort(masVendidas).reverse();
        for (pos = 0; pos <= reservas.length-1; pos++) {
        tmpReserva = reservas[pos];
            listado = listado + "<tr>";
            listado = listado + "<td>" + tmpReserva["Nombre"] + "</td>";
            listado = listado + "<td>" + tmpReserva["Usuario"] + "</td>";
            listado = listado + "</tr>";
        }
    $("#listadoOfertasMasVendidas").html(listado);
}
function noRegistrado(){
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").show();
    $(".opcion3Ofertas").show();
    $(".MostrarDatosUsuario").hide();
    $(".login").hide();
    $(".registrarme").hide();
}

function mostrarDatosUsuario() {
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").hide();
    $(".login").hide();
    $(".opcion3Ofertas").hide();
    $(".MostrarDatosUsuario").hide();
    $(".registrarme").hide();
  $(".MostrarDatosUsuario").show();
}
function mostrarRegistrarme(){
    $(".opcion2").hide();
    $(".opcion1").hide();
    $(".opcion3").hide();
    $(".login").hide();
    $(".opcion3Ofertas").hide();
    $(".MostrarDatosUsuario").hide();
    $(".registrarme").show();
}
function loginCheck(usuarioLogin,tipoUser){
    var pos, tmp;
    for (pos = 0; pos <= usuarios.length-1; pos++) {
        tmp = usuarios[pos];
        if (tmp["Nombre"] === usuarioLogin) {
            if (tipoUser === "administrador") {
                $(".opcion2").hide();
                $(".opcion1").show();
                $(".opcion3").hide();
                $(".login").hide();
                $(".misDatos").show();
                $(".opcion3Ofertas").show();
                $(".MostrarDatosUsuario").hide();
                $(".banner").show();
                $(".registrarme").hide();
                listaReservas();
                generoListadoOferta();
                registroUsuarios();
            }
            if (tipoUser === "registrado") {
                $(".opcion2").show();
                $(".opcion1").hide();
                $(".opcion3").hide();
                $(".login").hide();
                $(".misDatos").show();
                $(".opcion3Ofertas").show();
                $(".MostrarDatosUsuario").hide();
                $(".banner").show();
                $(".registrarme").hide();
                listaFavoritos();
                listaReservas();
                estadoDeCuenta();
            }
        }
    }
}
function volver(){
    if (tipoUser === "administrador") {
        $(".opcion2").hide();
        $(".opcion1").show();
        $(".opcion3").hide();
        $(".login").hide();
        $(".misDatos").show();
        $(".opcion3Ofertas").show();
        $(".MostrarDatosUsuario").hide();
        $(".banner").show();
        $(".registrarme").hide();
    }
    if (tipoUser === "registrado") {
        $(".opcion2").show();
        $(".opcion1").hide();
        $(".opcion3").hide();
        $(".login").hide();
        $(".misDatos").show();
        $(".opcion3Ofertas").show();
        $(".MostrarDatosUsuario").hide();
        $(".banner").show();
        $(".registrarme").hide();
    }else {
        $(".opcion2").hide();
        $(".opcion1").hide();
        $(".opcion3").show();
        $(".opcion3Ofertas").show();
        $(".MostrarDatosUsuario").hide();
        $(".login").hide();
    }
}
function logout(){
    usuarioLogin = "", tipoUser = "";
    $("#usarioLogueado").html("Chau! vuelve pronto :)");
    noRegistrado();
    generoListadoOferta();
}
function mostrarLogin(){
    $("#contenedorOfertas").hide();
    $("#crearOfertas").hide();
    $("#crearUsuario").hide();
    $("#listadoOfertas").hide();
    $("#loginWeb").show();
    $(".opcion3Ofertas").hide();
    $(".opcion3").hide();
    $(".banner").hide();
    $(".registrarme").hide();
}
function mostrarTodo(){
    $("#contenedorOfertas").show();
    $("#crearOfertas").show();
    $("#crearUsuario").show();
    $("#listadoOfertas").show();
    $(".login-box").hide();
}