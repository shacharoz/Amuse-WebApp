function formatHtmlFromTherapyList(_programs) {
    var allItemsInHtml = "";


    var StartingNewRow = "<div id='programs-row' class='row justify-content-center'>  <div id='three-p' class='col-11'> <div id='three-p-row' class='row'> ";

    var EndingRow = "</div> </div> </div>";



    //generate items
    var currentItemHtmlTemplate = StartingNewRow;


    for (var i = 0; i < _programs.length; i++) {

        //check if we have more items
        if (i % 3 == 0){
            allItemsInHtml += EndingRow;

            if (_programs.length > i ){
                allItemsInHtml += StartingNewRow;
            }
        }


        var currentItemData = _programs[i];

        //template for image based item


        currentItemHtmlTemplate = "<a href='program.html?id=" + currentItemData.id + "&step=0' id='program-link' class='col-4'>";
        currentItemHtmlTemplate += "<div id='program-body'>";
        currentItemHtmlTemplate += "<p id='program-header'>" + currentItemData.title + "</p>";
        currentItemHtmlTemplate += "<hr id='program-hr'>";
        currentItemHtmlTemplate += "<p id='program-description'>" + currentItemData.description + "</p>";
        currentItemHtmlTemplate += "<img src='_view/programs/clock-icon.png' id='program-clock'>";
        currentItemHtmlTemplate += "<p id='program-time'>1 hr</p>";
        currentItemHtmlTemplate += "<img src='" + currentItemData.main_image_path + "' id='program-img'>";
        currentItemHtmlTemplate += "</div></a>";

        allItemsInHtml += currentItemHtmlTemplate;
    }


    //close the row
    allItemsInHtml += "";


    document.getElementById("programs_data_holder").innerHTML = allItemsInHtml;
}


var GetAllProgramsData = function() {

    var _result = [
   
             {
                 "title": "program title"
                 , "description" : "program description program description program description"
                 , "main_image_path": "http://placehold.it/200x200"
                 , "id": 1
             }
         ,
             {
                 "title": "program title"
                 , "description" : "program description program description program description"
                 , "main_image_path": "http://placehold.it/200x200"
                 , "id": 2
             }
         ,
             {
                 "title": "program title"
                 , "description" : "program description program description program description"
                 , "main_image_path": "http://placehold.it/200x200"
                 , "id": 3
             }
         ,
             {
                 "title": "program title"
                 , "description" : "program description program description program description"
                 , "main_image_path": "http://placehold.it/200x200"
                 , "id": 4
             }

            ];
            
    var serverRespone = {};

    //therapy
    $.get("/program", function (data,status) {
        
        if (status !== "success") {
            console.log("Error while updating patients data from server. status:" + status);

        } else {
             _result = data;
            formatHtmlFromTherapyList(_result);
        }
    }).fail(function() {
        
         console.log("Error while updating patients data from server.");

    });

    formatHtmlFromTherapyList(_result);


 };

GetAllProgramsData();


