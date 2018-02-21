function formatHtmlFromTherapy(step_data) {
    var allItemsInHtml = "<div class='row'>";


    //generate items
    var currentItemHtmlTemplate = "";


    for (var i = 0; i < step_data.length; i++) {
        var currentItemData = step_data[i];

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


    document.getElementById("program_step_data_holder").innerHTML = allItemsInHtml;
}


var GetSpeicificStep = function(program_id, step_index) {
    
    //console.log("data: "+program_id + " "+ step_index);
    
    var _step = 
       {
            "title": "program title"
            , "description" : "program description program description program description"
            , "main_image_path": "http://placehold.it/200x200"
            , "sensor_system_image": "http://placehold.it/200x200"
            , "activity" : "activity activity activity activity activity activity "
            , "response" : "response response response response response response "
            , "values" : {
                "physical_therapy" : "some text here"
                , "occupational_therapy" : ""
                , "speach_language_therapy" : "some text here"
                , "music_therapy" : ""
            }
            , "activate_link" : "c://path_to_file.lnk" 
            , "id": 1
       };
    
    
    formatHtmlFromTherapy(_step);
    
    
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





var page_parameters = new URL(window.location.href);
var _program_id = page_parameters.searchParams.get("id");
var _step_index = page_parameters.searchParams.get("step");


GetSpeicificStep(_program_id, _step_index);


