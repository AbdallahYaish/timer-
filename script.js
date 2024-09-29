$(document).ready(function () {
    let startTime, updatedTime, difference, tInterval;
    let running = false;

    function updateDisplay() {
        let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((difference / (1000 * 60)) % 60);
        let seconds = Math.floor((difference / 1000) % 60);
        let milliseconds = Math.floor((difference % 1000) / 10);

       
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        $("#display").text(`${hours}:${minutes}:${seconds}:${milliseconds}`);
    }

    $("#start").click(function () {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            tInterval = setInterval(function () {
                updatedTime = new Date().getTime();
                difference = updatedTime - startTime;
                updateDisplay();
            }, 10); 
            running = true;
        }
    });

    $("#stop").click(function () {
        if (running) {
            clearInterval(tInterval);
            running = false;
        }
    });

    $("#reset").click(function () {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        $("#display").text("00:00:00:00");
    });
});
