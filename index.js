var counterSelect = document.getElementById("countId"),
takecoffee = document.getElementById("playpause"),
reset = document.getElementById("reset");

var counterValue = counterSelect.value * 3600,
coffee = false;
renderTime(counterValue);


function renderTime(seconds) {
    document.getElementById("time_left").innerHTML = secondsToTime(seconds);
}

function secondsToTime(seconds){
    var hours = Math.floor(seconds/ 3600);
    seconds -= hours * 3600;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    if (hours < 1){
        return leadingZero(minutes) + ':' + leadingZero(seconds);
    }
    else{
        return hours + ':' + leadingZero(minutes) + ':' + leadingZero(seconds);
    }
}


function leadingZero(Time){
    return (Time < 10) ? "0" + Time : + Time;
}

function countDownFrom(seconds) {
    var audio = new Audio('https://onlineclock.net/sounds/?sound=Nuclear-Warning');
    if (coffee){
        if(seconds > 0){
            setTimeout(function(){
                counterValue = countDownFrom(seconds = seconds - 1)
                renderTime(seconds);
            },1000);
        }
        else{
            audio.play();
            coffee = false;
            seconds = 0;
        }
    }
    return seconds;
}

takecoffee.onclick = function(){
    if (!coffee) {
        coffee = true;
        countDownFrom(counterValue);
        playpause.innerHTML = "Take a new Coffee";
    }
    else{
        playpause.innerHTML = "Take Coffee";
        coffee = false;

    }
};

reset.onclick = function () {
    playing = false;
    renderTime(selectedCounterValue());
    counterValue = selectedCounterValue();
    playpause.innerHTML = "Take Coffee";
  };

counterSelect.onchange = function(e){
    renderTime((counterValue=selectedCounterValue()));
};

function selectedCounterValue(){
    return counterSelect.value * 3600;
}
