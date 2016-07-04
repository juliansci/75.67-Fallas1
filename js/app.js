var app = (function () {

    var preguntas = [
        {
            "variable": "PDA",
            "pregunta": "1 - ¿Ha padecido un apetito pobre inexplicado o pérdida de peso recientemente?"
        },
        {
            "variable": "PDE",
            "pregunta": "2 - ¿Ha tenido sensación de cansancio o debilidad recientemente?"
        },
        {
            "variable": "DDC",
            "pregunta": "3. ¿Ha tenido dificultad para pensar o concentrarse recientemente?"
        },
        {
            "variable": "SDC",
            "pregunta": "4 - ¿Ha tenido sensaciones frecuentes de inutilidad o culpabilidad recientemente?"
        },
        {
            "variable": "PCDYA",
            "pregunta": "5 - ¿Piensa que puede tener o que tiene problemas con drogas o el alcohol?"
        },
        {
            "variable": "CEA",
            "pregunta": "6 - ¿Ha sufrido cambios bruscos y repentinos en el estado de ánimo?"
        },
        {
            "variable": "PSM",
            "pregunta": "7 - ¿Ha experimentado pensamientos recurrentes sobre la muerte o el suicidio?"
        },
        {
            "variable": "PDP",
            "pregunta": "8 - ¿Ha experimentado pérdida de placer en las actividad que antes gozaba?"
        },
        {
            "variable": "DPD",
            "pregunta": "9 - ¿Ha experimentado problemas para dormir?"
        },
        {
            "variable": "SDT",
            "pregunta": "10 - ¿Se ha sentido triste o desgraciado por un período prolongado recientemente?"
        }
    ];

    var index = 0;

    function init() {
        $('.js-comienzo-test').on('click', function () {
            $(this).hide();
            $('.js-pregunta-container').show();
        });
        $('.js-opcion-si').on('click', function () {
            preguntas[index].respuesta = 1;
            index++;
            if (index >= preguntas.length) {
                procesarResultado();
                return;
            }
            cambiarPregunta();
        });
        $('.js-opcion-no').on('click', function () {
            preguntas[index].respuesta = 0;
            index++;
            if (index >= preguntas.length) {
                procesarResultado();
                return;
            }
            cambiarPregunta();
        });
        $('.js-reiniciar').on('click', function () {
            index = 0;
            cambiarPregunta();
            $('.js-resultado').hide();
            $('.js-pregunta-container').show();
        });
        cambiarPregunta();
    }

    function cambiarPregunta() {
        var preguntaActual = preguntas[index];
        $('.js-contador-total').text(preguntas.length);
        $('.js-pregunta').text(preguntaActual.pregunta);
        $('.js-contador').text(index + 1);
    }

    function procesarResultado() {

        var esTDM = esTrastornoDepresivoMayor();
        var esTD = esTrastornoDistimico();
        var esTPS = esTrastornoPorSustancias();
        var esTB = esTrastornoBipolar();
        var esTC = esTrastornoCiclotimico();
        if (esTDM) {
            $('.js-resultado-text').html('Usted probablemente sufra un <strong>Trastorno Depresivo Mayor</strong>.<br> Consulte a un médico psiquiatra sobre este resultado.');
        }
        if (esTD) {
            $('.js-resultado-text').html('Usted probablemente sufra un <strong>Trastorno Distímico</strong>.<br> Consulte a un médico psiquiatra sobre este resultado.');
        }
        if (esTPS) {
            $('.js-resultado-text').html('Usted probablemente sufra un <strong>Trastorno por Sustancias</strong>.<br> Consulte a un médico psiquiatra sobre este resultado.');
        }
        if (esTB) {
            $('.js-resultado-text').html('Usted probablemente sufra un <strong>Trastorno Bipolar</strong>.<br> Consulte a un médico  psiquiatra sobre este resultado.');
        }
        if (esTC) {
            $('.js-resultado-text').html('Usted probablemente sufra un <strong>Trastorno Ciclotímico</strong>.<br> Consulte a un médico psiquiatra sobre este resultado.');
        }
        if (!esTDM && !esTD && !esTPS && !esTB && !esTC) {
            $('.js-resultado-text').html('No se ha podido determinar su cuadro.<br> Si piensa que puede estar sufriendo un trastorno depresivo consulte \n\
        a un médico psiquiatra.');
        }
        $('.js-pregunta-container').hide();
        $('.js-resultado').show();
    }


    function esTrastornoDepresivoMayor() {
        var esTDM = true;
        $.each(preguntas, function (index, pregunta) {
            if (pregunta.variable === "PDA" && pregunta.respuesta === 0)
                esTDM = false;

            if (pregunta.variable === "PDE" && pregunta.respuesta === 0)
                esTDM = false;

            if (pregunta.variable === "DDC" && pregunta.respuesta === 1)
                esTDM = false;

            if (pregunta.variable === "SDC" && pregunta.respuesta === 0)
                esTDM = false;

            if (pregunta.variable === "PSM" && pregunta.respuesta === 0)
                esTDM = false;

            if (pregunta.variable === "PDP" && pregunta.respuesta === 0)
                esTDM = false;

            if (pregunta.variable === "DPD" && pregunta.respuesta === 0)
                esTDM = false;

            if (pregunta.variable === "SDT" && pregunta.respuesta === 1)
                esTDM = false;
        });
        return esTDM;
    }

    function esTrastornoDistimico() {
        var esTD = true;
        $.each(preguntas, function (index, pregunta) {
            if (pregunta.variable === "PDA" && pregunta.respuesta === 0)
                esTD = false;

            if (pregunta.variable === "PDE" && pregunta.respuesta === 0)
                esTD = false;

            if (pregunta.variable === "DDC" && pregunta.respuesta === 0)
                esTD = false;

            if (pregunta.variable === "SDC" && pregunta.respuesta === 1)
                esTD = false;

            if (pregunta.variable === "PSM" && pregunta.respuesta === 1)
                esTD = false;

            if (pregunta.variable === "DPD" && pregunta.respuesta === 0)
                esTD = false;

            if (pregunta.variable === "SDT" && pregunta.respuesta === 1)
                esTD = false;
        });
        return esTD;
    }

    function esTrastornoPorSustancias() {
        var esTPS = true;
        $.each(preguntas, function (index, pregunta) {
            if (pregunta.variable === "PDA" && pregunta.respuesta === 1)
                esTPS = false;

            if (pregunta.variable === "PDE" && pregunta.respuesta === 1)
                esTPS = false;

            if (pregunta.variable === "DDC" && pregunta.respuesta === 1)
                esTPS = false;

            if (pregunta.variable === "SDC" && pregunta.respuesta === 1)
                esTPS = false;

            if (pregunta.variable === "PCDYA" && pregunta.respuesta === 0)
                esTPS = false;

            if (pregunta.variable === "CEA" && pregunta.respuesta === 1)
                esTPS = false;

            if (pregunta.variable === "PSM" && pregunta.respuesta === 1)
                esTPS = false;

            if (pregunta.variable === "PDP" && pregunta.respuesta === 0)
                esTPS = false;

        });
        return esTPS;
    }
    function esTrastornoBipolar() {
        var esTB = true;
        $.each(preguntas, function (index, pregunta) {
            if (pregunta.variable === "PDA" && pregunta.respuesta === 0)
                esTB = false;

            if (pregunta.variable === "PDE" && pregunta.respuesta === 0)
                esTB = false;

            if (pregunta.variable === "DDC" && pregunta.respuesta === 0)
                esTB = false;

            if (pregunta.variable === "SDC" && pregunta.respuesta === 1)
                esTB = false;

            if (pregunta.variable === "PCDYA" && pregunta.respuesta === 1)
                esTB = false;

            if (pregunta.variable === "CEA" && pregunta.respuesta === 0)
                esTB = false;

            if (pregunta.variable === "PSM" && pregunta.respuesta === 1)
                esTB = false;

            if (pregunta.variable === "PDP" && pregunta.respuesta === 1)
                esTB = false;

            if (pregunta.variable === "DPD" && pregunta.respuesta === 1)
                esTB = false;

        });
        return esTB;
    }
    function esTrastornoCiclotimico() {
        var esTC = true;
        $.each(preguntas, function (index, pregunta) {
            if (pregunta.variable === "DDC" && pregunta.respuesta === 0)
                esTC = false;

            if (pregunta.variable === "SDC" && pregunta.respuesta === 1)
                esTC = false;

            if (pregunta.variable === "PDP" && pregunta.respuesta === 1)
                esTC = false;

            if (pregunta.variable === "SDT" && pregunta.respuesta === 0)
                esTC = false;

        });
        return esTC;
    }
    return {
        init: init
    };

})();
