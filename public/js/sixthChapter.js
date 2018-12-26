$(document).ready( function() {
    $.getJSON("collection.json", function(json) {
        var p = document.createElement('p');
        var str = "";
        var table = document.getElementsByTagName("TABLE")[0];
        var newRow = table.insertRow(0);
        var newCell = newRow.insertCell(0);

        $.each(json, function () {
            if (this.name == "Как зарабатывают видеоблогеры") {
                str += "<b>Раздел: </b>" + this.name + "<br>" +
                    "<b>Описание: </b>" + this.length + "<br>" +
                    "<b>Вопросы на которые отвечает глава: </b> <ul>";

                for (var i = 0; i < this.all.length; i++)
                    str += "<li>" + this.all[i] + "</li>";
                str += "</ul> </p>";}
        });
        newCell.innerHTML = str;
        //document.body.appendChild(p);
    })
} );