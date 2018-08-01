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
    
    
    var _patients = [
            { 
                "fullname": "Courtney Murray"
                , "image_path" : "images/app/patients/40.jpg"
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
                "fullname": "Nathan Turner"
                , "image_path" : "images/app/patients/57.jpg"
                , "gender" : "male"
                , "age" : "34"
                , "address" : "..."
                , "country" : "england"
                , "history" : "a long text of history"
                , "progress" : {
                
                }   
            } ,
        {
                "fullname": "Emma Campbell"
                , "image_path" : "images/app/patients/30.jpg"
                , "gender" : "male"
                , "age" : "34"
                , "address" : "..."
                , "country" : "england"
                , "history" : "a long text of history"
                , "progress" : {
                
                }   
            } ,
        {
                "fullname": "Benjamin Hall"
                , "image_path" : "images/app/patients/9.jpg"
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
                "fullname": "Natalie Hunter"
                , "image_path" : "images/app/patients/29.jpg"
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
                "fullname": "Jake Hopkins"
                , "image_path" : "images/app/patients/14.jpg"
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
                "fullname": "Marie Rogers"
                , "image_path" : "images/app/patients/46.jpg"
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
                "fullname": "Elijah Howard"
                , "image_path" : "images/app/patients/18.jpg"
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
                "fullname": "Ashley Parker"
                , "image_path" : "images/app/patients/83.jpg"
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
                "fullname": "Maria Baker"
                , "image_path" : "images/app/patients/89.jpg"
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
                "fullname": "Joseph Carter"
                , "image_path" : "images/app/patients/64.jpg"
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
        
    
    var serverRespone = {};

    $.get("/patient", function (data,status) {
        if (status !== "success") {
            console.log("Error while updating patients data from server. status:" + status);
        } else {
            _patients = data;

        }
    }).fail(function() {
        
     console.log("Error while getting patients data from server.");

    }); 
    
    formatHtmlFromPatientList(_patients);

};


GetAllPatientsData();


