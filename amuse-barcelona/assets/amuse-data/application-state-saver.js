var ApplicationsStateManager = {};



var SaveApplicationState = function (app_id, _state){
    //console.log("state of " + app_id + " " + _state);
    
    
    /*
    var currentState = localStorage['applicationsStateManager'];
    if (currentState == undefined){
        localStorage['applicationsStateManager'] = {};
        currentState = localStorage['applicationsStateManager'];
    }
    
    */
    ApplicationsStateManager[app_id.toString()] = _state;
    
    
}


var ReadApplicationState = function (app_id){
    
    return ApplicationsStateManager[app_id.toString()];

    //console.log("state of "+ ApplicationsStateManager[_app_id.toString()] );

    
    var result = localStorage['applicationsStateManager'];
    
    if (result != undefined){
                
        return result[app_id];
    }
    
}