$(document).ready( function() {
    $.getJSON("collection.json", function(json) {
        var p = document.createElement('p');
        var str = "";
        var table = document.getElementsByTagName("TABLE")[0];
        var newRow = table.insertRow(0);
        var newCell = newRow.insertCell(0);

        $.each(json, function () {
            if (this.name == "Второй этап: развлекательные шоу и обзоры вирусных видео (2011-2013)") {
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