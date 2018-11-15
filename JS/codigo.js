$(document).ready(iniciar);
function iniciar(){
    $("#logIn").click(mostrarLogin);
    $("#mostrar").click(mostrarTodo);
    $("#btnAltaUsuario").click(validarUsuario);
    $("#btnCrearOferta").click(cargarOfertas); // (PRONTA) llama a funcion que valida oferta y la da de alta en array ofertas
    $("#hosTipo").html(cargoTiposHospedajes());
    $("#btnSolicitudRegistro").click(registroUsuarios);
    $("#btnLogin").click(loginVal);
}
/* Definimos las variables globales
 * y los arrays globales.
 */
var usuarios = [{"Nombre":"polg", "Correo":"polg28@gmail.com", "Clave":"polg28", "Estado":"Habilitado", "Rol":"administrador"}
            ,{"Nombre":"Necuse", "Correo":"necuse@gmail.com", "Clave":"necuse", "Estado":"Pendiente", "Rol":"administrador"}
            ,{"Nombre":"charly", "Correo":"charly@gmail.com", "Clave":"charly", "Estado":"Habilitado", "Rol":"registrado"}
            ,{"Nombre":"jose", "Correo":"jose@adinet.com.uy", "Clave":"jose", "Estado":"Pendiente", "Rol":"pendiente"}];
var reservas = [{}];
var ofertas = [{"Id":1, "Nombre":"La posada", "Ubicacion":"Maldonado", "Foto":"colonia.jpg", "Tipo":"Hotel", "Precio":800, "FinValidez":"20/02/2019"},
               {"Id":2, "Nombre":"Las rosas", "Ubicacion":"Florida", "Foto":"hostel1.jpg", "Tipo":"Hotel", "Precio":1200, "FinValidez":"20/02/2019"},
               {"Id":3, "Nombre":"El Ciclon", "Ubicacion":"Durazno", "Foto":"hotel.jpg", "Tipo":"Hostel", "Precio":500, "FinValidez":"12/03/2019"}];
var hospedajes = [{"tipo":1, "nombre":"Hotel"},
                  {"tipo":2, "nombre":"Hostel"},
                  {"tipo":3, "nombre":"Casa"},
                  {"tipo":4, "nombre":"Apartamento"}];
var passLogin;
var usuarioLogin;
var userOK;
var tipoUser;
function loginVal(){
    var tipo = "usuario";
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
                $("#usuarioLogeado").html("Bienvenido " + usuarioLogin + "! " + tipoUser);
            }
        }
}else {
        alert("Error, contraseña incorrecta :´(");
    }

}
//Funcion para autonumerado de ID en ofertas o reservas
function autoId(tipo){
    var tmp;
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
        if (tmp["Id"] > parseInt(nuevoId)) {
            nuevoId = tmp["Id"];
        }
    }
        }
    }
    nuevoId = (nuevoId + 1);
    return nuevoId;
}
// Función para validar contraseña y usuario
function validarUsuario() {
    var tmpUsuario = {};
    login = false;
    var tipo = "usuario";
    var nombreUsuario = $("#txtNombreUsuario").val();
    var correoUsuario = $("#txtCorreousuario").val();
    var contraseña = $("#txtContraseña").val();
    var contraseñaVal = $("#txtContraseña2").val();
    if (contraseña === contraseñaVal) {
        login = buscar(nombreUsuario,tipo); // Llamada a funcion buscar para ver si ya existe usuario
        if (!login) {
            tmpUsuario["Nombre"] = nombreUsuario;
            tmpUsuario["Correo"] = correoUsuario;
            tmpUsuario["Clave"] = contraseña;
            tmpUsuario["Estado"] = false;
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
//
function generadorId(max){
    for (var i = 1; i <= max; i++) {
        
    }
}
function registroUsuarios(){
    var listado = "", tmpUsuario = {}, idUsuario = {},tmp = {}, estados;
    var pos;
    for (pos = 0; pos <= usuarios.length-1; pos++) {
        tmpUsuario = usuarios[pos];
        if (tmpUsuario["Estado"] === "Pendiente") {
            tmp = tmpUsuario["Nombre"];
            idUsuario["Nombre"] = tmp;
            listado = listado + "<tr>";
            listado = listado + "<td>" + tmpUsuario["Nombre"] + "</td>";
            estados = tmpUsuario["Estado"];
            listado = listado + "<td>" + estados + "</td>";
            listado = listado + "<td>" + tmpUsuario["Correo"] + "</td>";
            listado = listado + "<td>" + "<input type='button' value='Habilitar' id='" + tmpUsuario["Nombre"] + "'>" + "</td>";
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

//Función para cargar las combox de tipos hospedajes
function cargoTiposHospedajes(){
    var pos;
	var tmpHospedaje={}, opciones="";
	for(pos=0; pos<=hospedajes.length-1; pos++){
		tmpHospedaje = hospedajes[pos];
		opciones = opciones + "<option value='" + tmpHospedaje["tipo"];
		opciones = opciones + "'>" + tmpHospedaje["nombre"] + "</option>";		
	}
	return opciones;
}

//funciones para ocultar y mostrar contenedores
function mostrarLogin(){
    $("#contenedorOfertas").hide();
    $("#crearOfertas").hide();
    $("#crearUsuario").hide();
    $("#listadoOfertas").hide();
    $(".login-box").show();
}
function mostrarTodo(){
    $("#contenedorOfertas").show();
    $("#crearOfertas").show();
    $("#crearUsuario").show();
    $("#listadoOfertas").show();
    $(".login-box").hide();
}
//Funciones que valida que no exista oferta a dar de alta y la agrega al array ofertas
function cargarOfertas(){
    var tipo = "oferta";
    var autoId;
    var existe;
    var tmpoferta = {};
    var nombreHosp = $("#txtNombreHosp").val();
    var ubicacion = $("#txtUbicacion").val();
    var tipoHosp = $("#hosTipo").val();
    var precioOferta = parseInt($("#txtPrecio").val());
    var fechaVal = $("#fechaValidez").val();
    if (!isNaN(precioOferta)) {
        existe = buscar(nombreHosp,tipo);  //llamamos a funcion para ver si oferta ya existe
        if (!existe) {
            autoId = autoId(tipo); //llamada a funcion para autonumerar oferta nueva
            $("#idOfertaForm").html(autoId);
            tmpoferta["Id"] = autoId;
            tmpoferta["Nombre"] = nombreHosp;
            tmpoferta["Ubicacion"] = ubicacion;
            tmpoferta["Tipo"] = tipoHosp;
            tmpoferta["Precio"] = precioOferta;
            tmpoferta["FinValidez"] = fechaVal;
            ofertas[ofertas.length] = tmpoferta;    //Se da de alta oferta nueva en array
            $("#txtNombreHosp").val("");
            $("#txtUbicacion").val("");
            $("#hosTipo").val(1);
            $("#txtPrecio").val(0);
            $("#fechaValidez").val("dd / mm / aaaa");
            $("#respCreaOferta").html("Oferta cargada correctamente!");
        }else {
            $("#respCreaOferta").html("Precio debe ser valor numérico");
            $("#txtPrecio").val(0);
        }

    }
}
function generoListadoOferta(){
	var listado = "", tmpOferta = {};
	var pos;
	for(pos=0; pos<=ofertas.length-1; pos++){
		tmpOferta = ofertas[pos];
		listado = listado + "<tr>";
		listado = listado + "<td>" + tmpOferta["Nombre"] + "</td>";
		listado = listado + "<td>"  + tmpOferta["Ubicacion"] + "</td>";
		listado = listado + "<td>" + "<img src='/imagenes/" + tmpOferta["Imagen"] + "'/>" + "</td>";
		listado = listado + "<td>" + tmpOferta["Tipo"] + "</td>";
		listado = listado + "<td>" + tmpOferta["Precio"] + "</td>";
		listado = listado + "<td>"  + tmpOferta["FechaVal"] + "</td>";
		listado = listado + "</tr>";
	}
	$("#contenidoOfertas1").html(listado);
	$("#contenidoOfertas2").html(listado);
	$("#contenidoOfertas3").html(listado);
}
function generoListadoReservas() {
    var listado = "", tmpReserva = {};
    var pos;
    for (pos = 0; pos <= reservas.length - 1; pos++) {
        tmpReserva = reservas[pos];
        listado = listado + "<tr>";
        listado = listado + "<td>" + tmpReserva["Nombre"] + "</td>";
        listado = listado + "<td>" + tmpReserva["Tipo"] + "</td>";
        listado = listado + "<td>" + tmpReserva["Noches"] + "</td>";
        listado = listado + "<td>" + tmpReserva["Precio"] + "</td>";
        listado = listado + "</tr>";
    }
    $("#contenidoReservas").html(listado);
    $("#contenidoReservas2").html(listado);
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
        }
        return existe;
    } else {
        if (tipo === "usuario") {
            for (pos = 0; pos <= usuarios.length - 1; pos++) {
                tmp = usuarios[pos];
                if (tmp["Nombre"] === nombre) {
                    loginUser = true;
                /*    
                    if (tmp["Clave"] === passLogin) {
                        loginUser = true;
                    } else {
                        loginUser = false;
                    }
                */
                }
            }
        }
        return loginUser;
    }
}
