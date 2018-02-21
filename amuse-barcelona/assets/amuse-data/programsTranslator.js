function formatHtmlFromTherapyList(_programs) {
    var allItemsInHtml = "<div class='row'>";


    //generate items
    var currentItemHtmlTemplate = "";


    for (var i = 0; i < _programs.length; i++) {
        var currentItemData = _programs[i];

        //template for image based item

        currentItemHtmlTemplate = "<div class='col-4'>";
        currentItemHtmlTemplate += " <a href='program.html?id="+currentItemData.id+"&step=1' class='list-group-item list-group-item-action'>";
        currentItemHtmlTemplate += "<div class='card-body'>";
        currentItemHtmlTemplate += "<h6 class='card-title mb-1'>"+currentItemData.title+"</h6>";
        currentItemHtmlTemplate += "</div><hr class='my-0'><div class='card-body'>";
        currentItemHtmlTemplate += "<p class='card-text small'>"+ currentItemData.description+"</p></div>";
        currentItemHtmlTemplate += "<div class='card-body py-2 small'><i class='fa fa-fw fa-thumbs-up'></i>1 Hour</div>";
        currentItemHtmlTemplate += "<div class='col-md-3'><div class='card mb-4'>";
        currentItemHtmlTemplate += "<img class='' src='"+currentItemData.main_image_path+"' alt=''>";
        currentItemHtmlTemplate += "</div></div></a></div>";
        
        allItemsInHtml += currentItemHtmlTemplate;
    }


    //close the row
    allItemsInHtml += "</div>";


    document.getElementById("programs_data_holder").innerHTML = allItemsInHtml;
}


var GetAllProgramsData = function() {
    
    
    var _programs = [

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
    
    formatHtmlFromTherapyList(_programs);
    
    /*
    const serverRespone = {};

    $.get("/programs", function (data,status) {
        if (status !== "success") {
            console.log("Error while updating patients data from server. status:" + status);
        } else {
            var _programs = data;

            formatHtmlFromTherapyList(_programs);
        }
    });
    */
};

GetAllProgramsData();


