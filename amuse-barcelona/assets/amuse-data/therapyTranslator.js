var currentProgramData;
var currentStepData;

var page_parameters = new URL(window.location.href);
var _program_id = page_parameters.searchParams.get("id");
var _step_index = parseInt(page_parameters.searchParams.get("step") , 10);




function formatHtmlFromTherapy(current_index) {

    currentStepData = currentProgramData[current_index];

    //update page title in top bar
    document.getElementById("topbar-header").innerHTML = "Program: "+ currentStepData.title;

    //bug here
    //document.getElementById("data-program-title").innerHTML = currentStepData.title;



    //application row data
    var step_main_holder_html = "<div id='program1-row' class='row justify-content-center'>             <div id='three-divs' class='col-11'>   <div id='three-divs-row' class='row justify-content-around'>";
    step_main_holder_html += "<div id='program1-body' class='col-3'>";
    step_main_holder_html += "<p id='program1-header'>Application</p>";
    step_main_holder_html += "<hr id='program1-hr'>";
    step_main_holder_html += "<img src='"+ currentStepData.main_image_path + "' id='program1-img'> </div>";
    step_main_holder_html += "<div id='program1-body' class='col-3'>";
    step_main_holder_html += "<p id='program1-header'>"+ currentStepData.title + "</p>";
    step_main_holder_html += "<hr id='program1-hr'>";
    step_main_holder_html += "<p id='program1-description'>"+ currentStepData.description +"</p> </div>";
    step_main_holder_html += "<div id='program1-body' class='col-3'>";
    step_main_holder_html += "<p id='program1-header'>Sensor</p>";
    step_main_holder_html += "<hr id='program1-hr'>";
    step_main_holder_html += "<img src='"+ currentStepData.sensor_system_image +"' id='program1-img'> </div>";
    step_main_holder_html += "</div> </div> </div>";


    document.getElementById("step-main-holder").innerHTML = step_main_holder_html;



    //activity and response
    var step_activity_holder_html = "<p id='program1-description'><b>Activity:</b><br>" + currentStepData.activity + "</p>";
    step_activity_holder_html += "<p id='program1-description'><b>Content response:</b><br>" + currentStepData.response + "</p>";


    document.getElementById("activity-response-holder").innerHTML = step_activity_holder_html;
    
    
    
    //theraputic values
    values_menu();
    
    
    
    
    
    // update the play stop button 
    if (ReadApplicationState(_program_id) == false){
        TogglePlayStopButton(true);
    } else {
        TogglePlayStopButton(false);
    }
}


function values_menu() {

    var theraputic_value_html = "<p id='program1-header'>Theraputic Values</p>       <hr id='program1-hr'>";


    if (currentStepData.values.physical_therapy != ""){
        theraputic_value_html += "<a href='javascript:values_physical();' id='program1-links'> <div id='program1-div-links'> <p id='program1-p-links'>Physical Therapy</p> </div> </a> ";
    }

    if (currentStepData.values.music_therapy != ""){
        theraputic_value_html += "<a href='javascript:values_musical();' id='program1-links'> <div id='program1-div-links'> <p id='program1-p-links'>Musical Therapy</p> </div> </a> ";
    }

    if (currentStepData.values.occupational_therapy != ""){
        theraputic_value_html += "<a href='javascript:values_occupational();' id='program1-links'> <div id='program1-div-links'> <p id='program1-p-links'>Occupationl Therapy</p> </div> </a> ";
    }

    if (currentStepData.values.speech_language_therapy != ""){
        theraputic_value_html += "<a href='javascript:values_speech();' id='program1-links'> <div id='program1-div-links'> <p id='program1-p-links'>Speech-Language Therapy</p> </div> </a> ";
    }



    document.getElementById("theraputic-values-content-holder").innerHTML = theraputic_value_html;


}

//called from html button
function values_physical(){
    var theraputic_value_html = "<p id='program1-header'>";
    theraputic_value_html += "<a href='javascript:values_menu();'><img src='topbar/topbar_back.png' style='height:15px' id='topbar-back' /></a>";
   theraputic_value_html += " Physical Therapy</p>       <hr id='program1-hr'>";
   theraputic_value_html += "<p id='program1-description'>"+ currentStepData.values.physical_therapy +"</p> </div>";

    document.getElementById("theraputic-values-content-holder").innerHTML = theraputic_value_html;
}

//called from html button
function values_musical(){

    var theraputic_value_html = "<p id='program1-header'>";
    theraputic_value_html += "<a href='javascript:values_menu();'><img src='topbar/topbar_back.png' style='height:15px' id='topbar-back' /></a>";
   theraputic_value_html += " Music Therapy</p>       <hr id='program1-hr'>";
   theraputic_value_html += "<p id='program1-description'>"+ currentStepData.values.music_therapy +"</p> </div>";

    document.getElementById("theraputic-values-content-holder").innerHTML = theraputic_value_html;

}

//called from html button
function values_occupational(){

     var theraputic_value_html = "<p id='program1-header'>";
    theraputic_value_html += "<a href='javascript:values_menu();'><img src='topbar/topbar_back.png' style='height:15px' id='topbar-back' /></a>";
   theraputic_value_html += " Occupational Therapy</p>       <hr id='program1-hr'>";
   theraputic_value_html += "<p id='program1-description'>"+ currentStepData.values.occupational_therapy +"</p> </div>";

    document.getElementById("theraputic-values-content-holder").innerHTML = theraputic_value_html;

}

//called from html button
function values_speech(){

     var theraputic_value_html = "<p id='program1-header'>";
    theraputic_value_html += "<a href='javascript:values_menu();'><img src='topbar/topbar_back.png' style='height:15px' id='topbar-back' /></a>";
   theraputic_value_html += " Speech-Language Therapy</p>       <hr id='program1-hr'>";
   theraputic_value_html += "<p id='program1-description'>"+ currentStepData.values.speech_language_therapy +"</p> </div>";


    document.getElementById("theraputic-values-content-holder").innerHTML = theraputic_value_html;

}




//called from html button
function steps_previous() {
    if (_step_index > 0){
        _step_index = _step_index - 1;

        //call same page with the URL ";
        var _url= "program.html?id=" + _program_id + "&step=" + _step_index;
        window.open(_url, '_self');

    }
}

//called from html button
function steps_next() {
    if (currentProgramData.length > _step_index + 1){
        _step_index = _step_index + 1;

        //call same page with the URL ";
        var _url= "program.html?id=" + _program_id + "&step=" + _step_index;
        window.open(_url, '_self');
    }
}


//called from the html button
function activate_program(){
    //console.log("activate_program" );
    
    //replace button to stop
    TogglePlayStopButton(false);
    
    //call server function here with program id and step id
     $.get("/therapy/activate?therapyId=" + currentStepData.id, function (data,status) {
        if (status !== "success") {
          console.log("Error while starting therapy." + currentStepData.id + " status:" + status);
        } else {
          currentProgramData = data;
        }
     });
    
    //make sure all pages remember the app is playing  
    SaveApplicationState(_program_id, true);
    
}

//called from the html button
function deactivate_program(){
//console.log("deactivate_program" );
    
    //replace button to play
    TogglePlayStopButton(true);
    
    //call server function here
    $.get("/therapy/deactivate?therapyId=" + currentStepData.id, function (data,status) {
        if (status !== "success") {
          console.log("Error while stopping therapy." +  currentStepData.id + " status:" + status);
        } else {
          currentProgramData = data;
        }
    });

    //make sure all pages remember the app is playing  
    SaveApplicationState(_program_id, false);
}

var GetSpeicificStep = function(program_id, step_index) {

  const serverRespone = {};

  $.get("/therapy?programId=" + program_id, function (data,status) {
    if (status !== "success") {
      console.log("Error while updating patients data from server. status:" + status);
    } else {
      currentProgramData = data;



      formatHtmlFromTherapy(currentProgramData);
    }
  });

    //console.log("data: "+program_id + " "+ step_index);

     var _program =
        [
            {
                 "title": "program title 1"
                 , "description" : "program description program description program description"
                 , "main_image_path": "http://placehold.it/200x200"
                , "sensor_system_image": "http://placehold.it/200x200"
                , "activity" : "activity activity activity activity activity activity "
                 , "response" : "response response response response response response "
                 , "values" : {
                     "physical_therapy" : "some text here"
                     , "occupational_therapy" : ""
                     , "speech_language_therapy" : "some text here"
                     , "music_therapy" : ""
                 }
                 , "activate_link" : "c://path_to_file.lnk"
                 , "id": 1
            } 
        ];
            
    //       , {
    //             "title": "program title 2"
    //             , "description" : "program description program description program description"
    //             , "main_image_path": "http://placehold.it/200x200"
    //             , "sensor_system_image": "http://placehold.it/200x200"
    //             , "activity" : "activity activity activity activity activity activity "
    //             , "response" : "response response response response response response "
    //             , "values" : {
    //                 "physical_therapy" : "some text here"
    //                 , "occupational_therapy" : ""
    //                 , "speech_language_therapy" : "some text here"
    //                 , "music_therapy" : ""
    //             }
    //             , "activate_link" : "c://path_to_file.lnk"
    //             , "id": 1
    //        }
    //        ,
    //        {
    //             "title": "program title 3"
    //             , "description" : "program description program description program description"
    //             , "main_image_path": "http://placehold.it/200x200"
    //             , "sensor_system_image": "http://placehold.it/200x200"
    //             , "activity" : "activity activity activity activity activity activity "
    //             , "response" : "response response response response response response "
    //             , "values" : {
    //                 "physical_therapy" : "some text here"
    //                 , "occupational_therapy" : ""
    //                 , "speech_language_therapy" : "some text here"
    //                 , "music_therapy" : ""
    //             }
    //             , "activate_link" : "c://path_to_file.lnk"
    //             , "id": 1
    //        }
    //
    //     ];


};






//start up the page build
GetSpeicificStep(_program_id, _step_index);


