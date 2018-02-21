var obj = JSON.parse('{    "title": "therapy title"        ,"description": "therapy description therapy description therapy description therapy description therapy description"       ,"time": "1 Hour"       ,"main_image_path": "https://unsplash.it/700/400?image=610"       ,"activity": "0"      ,"response": "0"      ,"sensor_image_path": "https://unsplash.it/700/400?image=610"             }');



var GetAllPatientsData = function() {

    return [

        {
            "fullname": "roni benizri",
            "image_path": "http://www.images.com/roni.jpg",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
        }
        ,
        {
            "fullname": "roni benizri",
            "image_path": "http://www.images.com/roni.jpg",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
        }
        , 
        {
            "fullname": "roni benizri",
            "image_path": "http://www.images.com/roni.jpg",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
        }
        ,
        {
            "fullname": "roni benizri",
            "image_path": "http://www.images.com/roni.jpg",
            "gender": "male",
            "age": "34",
            "address" : "sdfsdfsd",
            "country": "england",
            "history": "a long text of history",
            "progress": {
                // a lot of data about previous programs and accomplishments
            }
        }
    ];
};



var GenerateItems_Patients = function() {

    var _patients = GetAllPatientsData();

    $("#resultHtmlText").html("will be replaced with something");

    var allItemsInHtml = "";

    //add pre html code to prepare the slider header
    allItemsInHtml += "<ul class='media-list'> ";


    //generate items
    var currentItemHtmlTemplate = "";

    for (var i = 0; i < _patients.length; i++) {
        var currentItemData = _patients[i];

        if (TemplateType == "ImagePullLeft") {
            //template for image based item 
            currentItemHtmlTemplate = "<li class='media'> ";
            currentItemHtmlTemplate += "<a class='pull-left' href='" + currentItemData.fullname + "' target='_blank'> ";
            currentItemHtmlTemplate += "<img class='media-object' src='" + currentItemData.image_path + "'></a> ";
            currentItemHtmlTemplate += "<div class='media-body'> ";
            currentItemHtmlTemplate += "<h4 class='media-heading'><a class='pull-left' href='" + currentItemData.link + "' target='_blank'>" + currentItemData.title + "</a></h4> ";
           
            currentItemHtmlTemplate += "</div></li>";
        }

        allItemsInHtml += currentItemHtmlTemplate;
    }

    //close entire ul
    allItemsInHtml += "</ul>";

    //write html to gui
    return allItemsInHtml;
};




var resultHtml = GenerateItems_Patients();

//obj.title + " , "+ obj.description + " , "+ obj.time; 

document.getElementById("demo").innerHTML = resultHtml;