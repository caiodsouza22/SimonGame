let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

let started = false;


$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);


    playSound(userChosenColor);
    animatePress("#" + userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
   
    
});


function checkAnswer(currentLevel){
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function(){
             nextSequence();
         }, 1000);
     }

 } else {
     playSound("wrong")
     $("#level-title").text("Game Over, Press Any Key to Restart");

     setTimeout(function () {
         $("body").removeClass("game-over");
     }, 200);

     startOver();
 }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);


  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
 playSound(randomChosenColour);

}

function animatePress(currentColour) {
$(currentColour).addClass("pressed");

setTimeout(function(){
    $(currentColour).removeClass("pressed");

},50);

}
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}




