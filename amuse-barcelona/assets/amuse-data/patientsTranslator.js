function formatHtmlFromPatientList(_patients) {
    var allItemsInHtml = "";


    var StartingNewRow = "<div id='patients-row' class='row justify-content-center'>  <div id='three-p' class='col-11'> <div id='three-p-row' class='row'> ";
    
    var EndingRow = "</div> </div> </div>";
    
    //generate items
    var currentItemHtmlTemplate = StartingNewRow;

    

    for (var i = 0; i < _patients.length; i++) {
        
        //check if we have more items
        if (i % 3 == 0){
            allItemsInHtml += EndingRow;
            
            if (_patients.length > i ){
                allItemsInHtml += StartingNewRow;
            }
        }
        
        
        var currentItemData = _patients[i];

        //template for image based item
        
        currentItemHtmlTemplate = "<a href='programs.html' id='patient-link' class='col-4'>";
        currentItemHtmlTemplate += "<div id='patient-body' class='row'><img src='" + currentItemData.image_path + "' id='patient-picture' class='col-6'>";
        currentItemHtmlTemplate += "<p id='patient-name' class='col-6'>" + currentItemData.fullname + "</p>";
        currentItemHtmlTemplate += "</div></a>";

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

            formatHtmlFromPatientList(_patients);
        }
    });
    /*
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

    
    
*/
};

GetAllPatientsData();


