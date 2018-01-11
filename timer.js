window.onload = function() {
    //var startButtonDiv = document.getElementById("startButtonDiv");
    //var splitButton = document.getElementById("splitButton");
    //startButton.onclick = handleStartButtonClick;
    //splitButton.onclick = handleSplitButtonClick;
    addStartButton();
}

var startTime;

function addStartButton() {
    //alert('test');
    var controlButtons = document.getElementById("col1");
    
    var button = document.createElement("input");
    button.type = "button";
    button.id = "startButton";
    button.value = "start";
    button.className = "btn btn-lg btn-primary btn-block";
    controlButtons.appendChild(button);
    var startButton = document.getElementById("startButton");
    startButton.onclick = handleStartButtonClick;
    $("#startButton").focus();
}

function addSplitButton() {
    var controlButtons = document.getElementById("col2");
    var button = document.createElement("input");
    button.type = "button";
    button.id = "splitButton";
    button.value = "split";
    button.className = "btn btn-lg btn-primary btn-block";
    controlButtons.appendChild(button);
    $("#splitButton").click(handleSplitButtonClick);
}

function sendEmail(){
    var sendTo = "merkt.david@gmail.com";
    var subject = "Results";
    var splitList = document.getElementById("playTime").outerHTML;
    alert("test" + splitList);
    var request = new XMLHttpRequest();
    var href = "mailto:" + sendTo + "?subject=" + subject + "&body=" + splitList;
    alert(href + "");
    request.open("SEND", href);
}

function handleStartButtonClick() {
    startTime = new Date();
    var startTimeDiv = document.getElementById("startTimeDiv");
    startTimeDiv.innerHTML = prependZero(startTime.getHours()) + ":" + prependZero(startTime.getMinutes()) + ":" + prependZero(startTime.getSeconds()) + "." + time(startTime.getMilliseconds()).slice(-3);
    document.getElementById("startButton").disabled = true;
    if (!document.getElementById("splitButton"))
        addSplitButton();
    setInterval(getClockTime, 170);
    $("#splitButton").focus();
}

function handleSplitButtonClick() {
    var splitTime = new Date();
    var clickTime = time(splitTime - startTime);
    
    $("#splitTimeDiv").html(clickTime);
    
    var currentSplit = document.createElement("li");
    currentSplit.innerHTML = clickTime;
    currentSplit.className = "splitTime list-group-item";
    $("#playTime").prepend(currentSplit);
    $("#splitButton").focus();
}

function time(date) {
//     secs = time /     1000
//     mins = time /    60000
//    hours = time /  3600000
//     days = time / 86400000
    var dateTime = "";
    dateTime += Math.floor(date / 3600000) + ":";  //hours
    date = date % 3600000;
    dateTime += prependZero(Math.floor(date / 60000)) + ":";  //minutes
    date = date % 60000;
    dateTime += prependZero(Math.floor(date / 1000)) + ".";  //seconds//milliseconds
    date = date % 1000;

    //upon research - 'switch' statement is more performant than 'if' statement
    switch ((date + "").length) {
        default:
            dateTime += date;
            break;
        case 2:
            dateTime += "0" + date;
            break;
        case 1:
            dateTime += "00" + date;
            break;
    }
    
    return dateTime;
}

function getClockTime_original() {
    var currentTime = new Date();
    currentTime -= startTime;
    //return time(currentTime);
    
    var currentClockTime = "";
    currentClockTime += Math.floor(currentTime / 3600000) + ":";
    currentTime %= 3600000;
    currentClockTime += prependZero(Math.floor(currentTime / 60000)) + ":";
    currentTime %= 60000;
    //currentClockTime += (prependZero(currentTime / 1000));//.slice(0, 4);
    currentClockTime += prependZero(Math.floor(currentTime / 1000)) + ".";
    currentTime %= 1000;
    currentClockTime += Math.floor(currentTime / 100);
    
    //var currentClockTime = (time(currentTime)).slice(0, 4);
    
    var clockTimeDiv = document.getElementById("clockTimeDiv");
    clockTimeDiv.innerHTML = currentClockTime;
}

function getClockTime() {
    var currentTime = new Date() - startTime;
    
    var currentClockTime = time(currentTime).slice(0, -2);

    $("#clockTimeDiv").html(currentClockTime + "&nbsp&nbsp");
}

function prependZero(number) {
    if (number < 10)
        return "0" + number;
    else
        return number;
}
