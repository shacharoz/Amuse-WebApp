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
    
      var _patients = [
            {
                "fullname": "roni benizri"
                , "image_path" : "http://placehold.it/100x100"
                , "gender" : "male"
                , "age" : "34"
                , "address" : "..."
                , "country" : "england"
                , "history" : "a long text of history"
                , "progress" : {
                // a lot of data about previous programs and accomplishments
                }   
            } ,
            {
                "fullname": "roni benizri"
                , "image_path" : "http://placehold.it/100x100"
                , "gender" : "male"
                , "age" : "34"
                , "address" : "..."
                , "country" : "england"
                , "history" : "a long text of history"
                , "progress" : {
                // a lot of data about previous programs and accomplishments
                }   
            } ,{
                "fullname": "roni benizri"
                , "image_path" : "http://placehold.it/100x100"
                , "gender" : "male"
                , "age" : "34"
                , "address" : "..."
                , "country" : "england"
                , "history" : "a long text of history"
                , "progress" : {
                // a lot of data about previous programs and accomplishments
                }   
            } ,{
                "fullname": "roni benizri"
                , "image_path" : "http://placehold.it/100x100"
                , "gender" : "male"
                , "age" : "34"
                , "address" : "..."
                , "country" : "england"
                , "history" : "a long text of history"
                , "progress" : {
                // a lot of data about previous programs and accomplishments
                }   
            } 
            ];
        
            formatHtmlFromPatientList(_patients);

    /*
    
    const serverRespone = {};

    $.get("/patient", function (data,status) {
        if (status !== "success") {
            console.log("Error while updating patients data from server. status:" + status);
        } else {
            var _patients = data;

            formatHtmlFromPatientList(_patients);
        }
    });
*/
};

GetAllPatientsData();


