/**This command initializes the JS from app.js when the window ist loaded.*/
window.addEventListener("load", myFunction);

/**This function initializes the Buttons (play, duration, restart, mute) and adds Eventhandler to them. */
function myFunction(){

    var playButtons = document.getElementsByClassName("playPause");
    var durButtons = document.getElementsByClassName("videoDur");
    var restartButtons = document.getElementsByClassName("restart");
    var muteButtons = document.getElementsByClassName("mute");
    var videos = document.getElementsByClassName("video");

    for(var i = 0; i < playButtons.length; i++){
        (function(index){
            playButtons[index].addEventListener("click", function(){videoHandler(playButtons, index)});
            durButtons[index].addEventListener("click", function(){videoHandler(durButtons, index)});
            restartButtons[index].addEventListener("click", function(){videoHandler(restartButtons, index)});
            muteButtons[index].addEventListener("click", function(){videoHandler(muteButtons, index)});
            videos[index].addEventListener("ended", function(){playButtons[index].innerHTML = ">"});
        })(i);
    }
}

/**This function handles the Button Events of the play/pause, duration, restart and mute Buttons
 *
 * @param buttons   -   list of buttontypes
 * @param index     -   which button is pressed
 */
function videoHandler(buttons, index){
    var button = buttons[index];
    var parent = button.parentElement;
    var video = parent.getElementsByClassName("video")[0];
    var output = parent.getElementsByClassName("outputVideo")[0];

    switch(button.className){
        case "playPause":
            if(video.paused){
                video.play();
                button.textContent = "||";
            }else{
                video.pause();
                button.textContent = ">";
            }
            break;

        case "videoDur":
            if(video.duration == 1){
                output.innerHTML = "Das Video ist 1 Sekunde lang.";
            }else{
                output.innerHTML = "Das Video ist " + video.duration + " Sekunden lang.";
            }
            break;
        case "restart":
            video.currentTime = 0;
            break;

        case "mute":
            if(video.muted){
                video.muted = false;
                button.innerHTML = "Mute";
            }else{
                video.muted = true;
                button.innerHTML = "Unmute";
            }
            break;

        default:
            console.log("Unknown Button Type");
            break;
    }
}
