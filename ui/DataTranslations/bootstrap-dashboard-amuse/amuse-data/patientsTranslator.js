var obj = JSON.parse('{    "title": "therapy title"        ,"description": "therapy description therapy description therapy description therapy description therapy description"       ,"time": "1 Hour"       ,"main_image_path": "https://unsplash.it/700/400?image=610"       ,"activity": "0"      ,"response": "0"      ,"sensor_image_path": "https://unsplash.it/700/400?image=610"             }');



var GetAllPatientsData = function() {

    return [

        {
            "fullname": "roni benizr",
            "image_path": "http://placehold.it/100x100",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
            , "link": ""             
        }
        ,
        {
            "fullname": "zvia elgali",
            "image_path": "http://placehold.it/100x100",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
             , "link": ""             
       }
        , 
        {
            "fullname": "roni benizri",
            "image_path": "http://placehold.it/100x100",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
             , "link": ""             
       }
        ,
        {
            "fullname": "roni benizri",
            "image_path": "http://placehold.it/100x100",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
              , "link": ""             
      }
    ];
};



var GenerateItems_Patients = function() {

    var _patients = GetAllPatientsData();

    //$("#resultHtmlText").html("will be replaced with something");

    var allItemsInHtml = "<div class='row'>";

   

    //generate items
    var currentItemHtmlTemplate = "";
            
    
    for (var i = 0; i < _patients.length; i++) {
        var currentItemData = _patients[i];

        //template for image based item 
        
        currentItemHtmlTemplate = "<div class='col-4'>";
        currentItemHtmlTemplate += "<a class='list-group-item list-group-item-action' href='programs.html'>";
        currentItemHtmlTemplate += "<div class='media'> ";
        currentItemHtmlTemplate += "<img class='d-flex mr-3 rounded-circle' src=" + currentItemData.image_path +" alt=''>";
        currentItemHtmlTemplate += "<div class='media-body'>";
        currentItemHtmlTemplate += "<strong>" + currentItemData.fullname + "</strong>";
        currentItemHtmlTemplate += "</div></div></a></div>";
        
        allItemsInHtml += currentItemHtmlTemplate;
    }


    //close the row
     allItemsInHtml += "</div>";
    
    
    //write html to gui
    return allItemsInHtml;
};




var resultHtml = GenerateItems_Patients();


document.getElementById("paients_data_holder").innerHTML = resultHtml;