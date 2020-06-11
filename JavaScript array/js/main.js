$(function () {
  "use strict";
  $(".contenedor-btn .btn").hide();
  // input of numbers in order to performance a array and add animation
  // to our array in order to show it in the DOM.
  $("div.contenido .btn").on("click", arrayNumber);
  var num = document.getElementById("arreglo");
  var arrayN = [];

  function arrayNumber() {
    $(".contenedor-btn .btn").hide();
    $(".box1").remove();
    if (num.value === "") {
      alert("inserte numeros");
    } else {
      arrayN = Array.from(num.value);
      var time1 = 350 * arrayN.length;
      for (var i = 1; i <= arrayN.length; i++) {
        $("<div>", {
          class: "box1",
          id: "box" + i,
        }).appendTo(".contenedor");
        $("<p>" + arrayN[i - 1] + "</p>").appendTo("#box" + i);
      }
      // Animation of array in the DOM.
      var valorMax;
      var valorMin;
      var margen;
      if($(window).width() > '1000'){
        valorMax = 40;
        valorMin = -2.25;
        margen = 4.5;
        $('.box1 p').css({"font-size": "3rem",
                          "margin-top": "0px"
                        });
        $('.box1').css({"width": "4rem", "height":"4rem"});
      }else if(($(window).width() > '600') && ($(window).width() < '1000')){
        if(($(window).width() > '600') && ($(window).width() < '800')){
          valorMax = 25;
        }else{
          valorMax = 30;
        }
        valorMin = -2.25;
        margen = 3.5;
        $('.box1 p').css({"font-size": "2rem",
                          "margin-top": "0px"
                        });
        $('.box1').css({"width": "3rem", "height":"3rem"});
      }else{
        if(($(window).width() > '430') && ($(window).width() < '600')){
          valorMax = 4;
        }else{
          valorMax = 0.5;
        }
        valorMin = 0;
        margen = 2.25;
        $('.box1 p').css({"font-size": "1rem",
                          "margin-top": "4px"
                        });
        $('.box1').css({"width": "2rem", 
                        "height":"2rem",
                        "margin-right": ".15rem"
                      });
      }
      var time = 250 * arrayN.length;
      var Impar = valorMin * arrayN.length + (valorMax*1.25);
      var par = valorMin * arrayN.length + valorMax; //40

      for (var i = 1; i <= arrayN.length; i++) {
        if (arrayN.length % 2 != 0) {
          $("#box" + i).animate({ left: Impar + "rem" }, time);
          Impar = Impar + margen;
        } else {
          $("#box" + i).animate({ left: par + "rem" }, time);
          par = par + margen;
        }
        time = time - 250;
      }
    }
    $(".contenedor-btn .btn").fadeIn(time1);
  }

  // Duplicate div in order to use in the animation.
  $(".contenedor-btn .btn").on("click", function () {
    var tamaño = arrayN.length;
    //ordenarArray(arrayN, tamaño);
    //--------------------------------------------------------------------
    for (var i = 1; i <= tamaño; i++) {
      var copia = $("#box" + i).clone();
      copia.addClass("b" + i);
      copia.css({ "background-color": "aqua" });
      $(".contenedor").append(copia);
      copia.hide();
      copia.fadeIn(500);

      var valorLeftStr = $("#box" + i).css("left");
      var posicion = valorLeftStr.indexOf("p");
      var valorLeftpx = valorLeftStr.substr(0, posicion);
      var valorLeftRem = valorLeftpx * 0.0625;
      copia.animate({ top: "10rem" }, "fast");
      if (i === tamaño) {
        copia.animate({ left: "10rem" }, "fast", cambiar);
      } else {
        copia.animate({ left: "10rem" }, "fast");
      }
      copia.animate({ top: "5rem" }, 1000);
      copia.animate({ left: valorLeftRem + "rem" }, 1000);
    }
  });
  function cambiar() {
    var ordenar = arrayN.sort();
    var tamaño = arrayN.length;

    for (var i = 0; i < tamaño; i++) {
      $(".b" + (i + 1) + " p").text(ordenar[i]);
    }
  }
  
});