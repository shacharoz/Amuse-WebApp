var ApplicationsStateManager = {};

SaveObjectToStorage( ApplicationsStateManager, "applicationStateManager" );


var SaveApplicationState = function (app_id, _state){
    //console.log("state of " + app_id + " " + _state);
    
    ApplicationsStateManager[app_id.toString()] = _state;
    
    SaveObjectToStorage( ApplicationsStateManager, "applicationStateManager" );
}


var ReadApplicationState = function (app_id){
    
    //console.log("state of "+ ApplicationsStateManager[_app_id.toString()] );
    
    ReadObjectFromStorage("applicationStateManager");
    return ApplicationsStateManager[app_id.toString()];
}