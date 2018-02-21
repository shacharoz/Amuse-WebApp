var obj = JSON.parse('{    "title": "therapy title"        ,"description": "therapy description therapy description therapy description therapy description therapy description"       ,"time": "1 Hour"       ,"main_image_path": "https://unsplash.it/700/400?image=610"       ,"activity": "0"      ,"response": "0"      ,"sensor_image_path": "https://unsplash.it/700/400?image=610"             }');




function GeneratePortfolioItems(_items) 
    {
     $("#resultHtmlText").html("will be replaced with something");
            
        var allItemsInHtml="";
        
        //add pre html code to prepare the slider header
        allItemsInHtml += "<ul class='media-list'> ";
        
        
        //generate items
        var currentItemHtmlTemplate="";
        
        for (var i=0; i< _items.length; i++) 
        {
            var currentItemData = _items[i];
           
            if (TemplateType == "ImagePullLeft") 
            {
                //template for image based item 
                currentItemHtmlTemplate="<li class='media'> ";
                currentItemHtmlTemplate += "<a class='pull-left' href='"+currentItemData.link+"' target='_blank'> ";
                currentItemHtmlTemplate += "<img class='media-object' src='"+currentItemData.image+"'></a> ";
                currentItemHtmlTemplate += "<div class='media-body'> ";
                currentItemHtmlTemplate += "<h4 class='media-heading'><a class='pull-left' href='"+currentItemData.link+"' target='_blank'>"+currentItemData.title+ "</a></h4> ";
                currentItemHtmlTemplate += currentItemData.description+"<br>";
                
                for (var i=0; i< currentItemData.extraLinks.length; i++) 
                {
                    var ExtraLink= currentItemData.extraLinks[i];
                    currentItemHtmlTemplate += "[<a href='"+ExtraLink.link+"' target='_blank'>"+ExtraLink.description+"</a>] ";
                }
                
                currentItemHtmlTemplate += "</div></li>";
            }
            
            allItemsInHtml += currentItemHtmlTemplate;
        }
    
        //close entire ul
         allItemsInHtml += "</ul>";
        
        //write html to gui
        $("#resultHtmlText").html(allItemsInHtml);
    }
    






var resultHtml = "";

//obj.title + " , "+ obj.description + " , "+ obj.time; 

document.getElementById("demo").innerHTML = resultHtml;



