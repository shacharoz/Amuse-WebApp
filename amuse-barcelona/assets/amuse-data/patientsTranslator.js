function formatHtmlFromPatientList(_patients) {
    var allItemsInHtml = "<div class='row'>";


    //generate items
    var currentItemHtmlTemplate = "";


    for (var i = 0; i < _patients.length; i++) {
        var currentItemData = _patients[i];

        //template for image based item

        currentItemHtmlTemplate = "<div class='col-4'>";
        currentItemHtmlTemplate += "<a class='list-group-item list-group-item-action' href='programs.html'>";
        currentItemHtmlTemplate += "<div class='media'> ";
        currentItemHtmlTemplate += "<img class='d-flex mr-3 rounded-circle' src=" + currentItemData.image_path + " alt=''>";
        currentItemHtmlTemplate += "<div class='media-body'>";
        currentItemHtmlTemplate += "<strong>" + currentItemData.fullname + "</strong>";
        currentItemHtmlTemplate += "</div></div></a></div>";

        allItemsInHtml += currentItemHtmlTemplate;
    }


    //close the row
    allItemsInHtml += "</div>";


    document.getElementById("paients_data_holder").innerHTML = allItemsInHtml;
}

var GetAllPatientsData = function() {
    const serverRespone = {};

    $.get("/patient", function (data,status) {
        if (status !== "success") {
            console.log("Error while updating patients data from server. status:" + status);
        } else {
            var _patients = data;

            //$("#resultHtmlText").html("will be replaced with something");
            formatHtmlFromPatientList(_patients);

            // //write html to gui
            // return allItemsInHtml;

        }
    });

};

GetAllPatientsData();


