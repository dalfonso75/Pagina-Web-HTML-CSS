(function() {
    "use strict";
    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function(){
        var map = L.map('mapa').setView([4.707572, -74.110122], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([4.707572, -74.110122]).addTo(map)
            .bindPopup('GDLWebCamp 2020.<br> Bolestos ya disponibles.')
            .openPopup();

        // Campos usuarios
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_completo = document.getElementById('pase_completo');
        var pase_dosdias = document.getElementById('pase_dosdias');
        
        // Botones y divs
        var calcular = document.getElementById('calcular');
        var errordiv = document.getElementById('error');
        var btnRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        // Extras 
        var etiquetas = document.getElementById('etiquetas');
        var camisas = document.getElementById('camisa_evento');

        if(document.getElementById('calcular')){

            calcular.addEventListener('click', calcularMontos);

            pase_dia.addEventListener('blur', mostrarDias);
            pase_completo.addEventListener('blur', mostrarDias);
            pase_dosdias.addEventListener('blur', mostrarDias);

            nombre.addEventListener('blur', validarCampo);
            apellido.addEventListener('blur', validarCampo);
            email.addEventListener('blur', validarCampo);

            email.addEventListener('blur', validarMail);
            function validarCampo(){
                if(this.value == ''){
                    errordiv.style.display= "block";
                    errordiv.innerHTML= "*Este campo es obligatorio ";
                    this.style.border = "1px solid red";
                    errordiv.style.color = "red";
                }else {
                    errordiv.style.display= "none";
                    this.style.border = "1px solid gray";
                }
            }
            function validarMail(){
                if(this.value.indexOf('@') > -1){
                    errordiv.style.display= "none";
                    this.style.border = "1px solid gray";
                }else {
                    errordiv.style.display= "block";
                    errordiv.innerHTML= "*E-mail invalido";
                    this.style.border = "1px solid red";
                    errordiv.style.color = "red";
                }
            }

            function calcularMontos(event){
                event.preventDefault();
                if(regalo.value === '') {
                    alert("Debes elegir un regalo");
                    regalo.focus();
                }else {
                    var boletosDia = parseInt(pase_dia.value, 10)|| 0,
                        boletos2Dias = parseInt(pase_dosdias.value)|| 0,
                        boletoCompleto = parseInt(pase_completo.value)|| 0,
                        cantCamisas = parseInt(camisas.value)|| 0,
                        cantEtiquetas = parseInt(etiquetas.value)|| 0;
                    
                    var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + (cantCamisas * 10 * 0.93) + (cantEtiquetas * 2);
                    var listadoProductos = [];
                    if(boletosDia >= 1){
                        listadoProductos.push(boletosDia + ' Pases por día');
                    }
                    if(boletos2Dias >= 1){
                        listadoProductos.push(boletos2Dias + ' Pases por dos días');
                    }
                    if(boletoCompleto >= 1){
                        listadoProductos.push(boletoCompleto + ' Pases completo');
                    }
                    if(cantCamisas >= 1){
                        listadoProductos.push(cantCamisas + ' Camisas');
                    }
                    if(cantEtiquetas >= 1){
                        listadoProductos.push(cantEtiquetas + ' Etiquetas');
                    }
                    lista_productos.style.display="block";
                    lista_productos.innerHTML = '';
                    for (var i = 0; i < listadoProductos.length; i++){
                        lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                    }
                    
                    suma.innerHTML = '$ ' + totalPagar.toFixed(2);
                    
                }
            }
            function mostrarDias() {
                var boletosDia = parseInt(pase_dia.value, 10)|| 0,
                    boletos2Dias = parseInt(pase_dosdias.value)|| 0,
                    boletoCompleto = parseInt(pase_completo.value)|| 0;

                var diasElegidos = [];
                if (boletosDia > 0){
                    diasElegidos.push('viernes');
                }
                if (boletos2Dias > 0){
                    diasElegidos.push('viernes', 'sabado');
                }
                if (boletoCompleto > 0){
                    diasElegidos.push('viernes', 'sabado', 'domingo');
                }
                for(var i = 0; i < diasElegidos.length; i++){
                    document.getElementById(diasElegidos[i]).style.display="block";
                }
                console.log(diasElegidos);
            }

        }
    });
})();


//jquery.....

$(function(){
    //Lettering. //Crea los span para el texto.
    $('.nombre-sitio').lettering();

    // Menu fijo 
    var windowHeight = $(window).height();
    var barraAltura = $('.barra').innerHeight();

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll > windowHeight){
            $('.barra').addClass('fixed');
            $('body').css({'margin-top': barraAltura+'px'});
        }else {
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top': '0px'});
        }
    });

    //Menu Responseive.
    $('.menu-movil').on('click', function(){
        $('.navegacion-principal').slideToggle();
    });

    // Programa del evento.
    $('.programa-evento .info-curso:first').fadeIn(1000);
    $('.menu-programa a:first').addClass('activo');
    $('.menu-programa a').on('click', function(){
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        var enlace = $(this).attr('href');
        $('.ocultar').hide();
        $(enlace).fadeIn(1000);
        return false;
    });
    //Animaciones para los numeros de Invitados.s
    var resumenLista = $('.resumen-evento');
    if (resumenLista.length > 0){
        $('.resumen-evento').waypoint(function(){
            $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1000);
            $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
            $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1400);
            $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1600);
        }, {
            offset: '60%'
        });
    }
    //Cuenta regresiva.
    $('.cuenta-regresiva').countdown('2020/09/28 09:00:00', function(event){
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });

});