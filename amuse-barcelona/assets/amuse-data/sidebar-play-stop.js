var play_button_html = "<a href='javascript:activate_program();' id='sidebar-link'>    <div id='sidebar-stop-div'>            <img src='Desi/assets/play_program.png' id='sidebar-play-img' />            </div>  </a>";

var stop_button_html ="<a href='javascript:deactivate_program();' id='sidebar-link'>    <div id='sidebar-stop-div'>    <img src='Desi/assets/stop_program.png' id='sidebar-stop-img' />   </div>    </a>";



var TogglePlayStopButton = function (shouldBePlay){
    //console.log("shouldBePlay "+shouldBePlay);
    if (shouldBePlay == true){
        document.getElementById("play-stop-button").innerHTML = play_button_html;
    } else {
        document.getElementById("play-stop-button").innerHTML = stop_button_html;
    }
}