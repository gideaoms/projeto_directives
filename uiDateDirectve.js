app.directive("uiDate", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatDate = function (date, code) {
                if (code === 8) {
                    return date.substring(0, date.length);
                }
                date = date.replace(/[^0-9]+/g, "");
                if (date.length > 1) {
                    date = date.substring(0, 2) + "/" + date.substring(2);
                }
                if (date.length > 4) {
                    date = date.substring(0, 5) + "/" + date.substring(5);
                }
                if (date.length > 9) {
                    date = date.substring(0, 10) + " " + date.substring(10);
                }
                if (date.length > 12) {
                    date = date.substring(0, 13) + ":" + date.substring(13, 15);
                }
                return date;
            };

            /* ocorre quando há uma interação com o usuario (teclado) */
            element.bind("keyup", function (e) {
                ctrl.$setViewValue(_formatDate(ctrl.$viewValue, e.keyCode));
                ctrl.$render();
            });

            /* quando eu coloco um return o valor é jogado para o model, entao eu posso dar um return somente quando uma validacao é satisfatoria */
            ctrl.$parsers.push(function (value) {
                if (value.length === 16) {
//                    var datahora = value.split(' ');
//                    var dateArray = datahora[0].split("/");
//                    var horaArray = datahora[1].split(":");
//                    return new Date(dateArray[2], dateArray[1] - 1, dateArray[0], horaArray[1]).getTime();
                    return value;
                }
            });

            /* formata o valor antes de colocar na tela */
            ctrl.$formatters.push(function (value) {
                return $filter("date")(value, "dd/MM/yyyy H:i");
            });
        }
    };
});
