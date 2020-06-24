document.addEventListener("DOMContentLoaded", function(){

    let videoplayer = document.querySelector(".video-container");
    let el_video = videoplayer.querySelector("video");
    let el_playPauseBtn = videoplayer.querySelector(".video-control-play-pause");
    let el_startTime = videoplayer.querySelector(".startTime");
    let el_endTime = videoplayer.querySelector(".endTime");
    let el_videoSeekBar = videoplayer.querySelector(".video-seekbar");
    let el_progress = el_videoSeekBar.querySelector(".progress");
    let el_volumeToggle = videoplayer.querySelector(".video-control-mute");
    //let el_volumeSeekBar = videoplayer.querySelector(".volume-seek");
    let el_volumeProgressBar = videoplayer.querySelector(".video-volume-slider");

    let totalDurationInSeconds = 0;
    let currentTimeInSeconds = 0;
    let currentDuration = 0;
    let totalDuration = null;
    let seekPercentage = 0;
    let volumeValue = 1;
    let volumePercentage = 100;

    // --------------- update functions

    const updateStartTime = () => {
        el_startTime.innerHTML = currentDuration.hours + ':' + 
        currentDuration.minutes + ':' + 
        currentDuration.seconds;
    };

    const updateProgressBar = () => {
        el_progress.style.width = getPercentage(
            currentTimeInSeconds,
            totalDurationInSeconds
        ) + '%';
    };

    // ----------------  events

    // volume
    el_volumeProgressBar.addEventListener("input", () => {
        el_video.volume = (el_volumeProgressBar.value / 100);
    });

    // load video times
    el_video.onloadeddata = () => {
        totalDurationInSeconds = el_video.duration; 
        totalDuration = calculateDuration(totalDurationInSeconds);
        el_endTime.innerHTML = totalDuration.hours + ':' + totalDuration.minutes + ':' + totalDuration.seconds;
    };

    // update time gone on progress and numbers
    el_video.addEventListener("timeupdate", () => {
        currentTimeInSeconds = el_video.currentTime;
        currentDuration = calculateDuration(currentTimeInSeconds);
        updateStartTime();
        updateProgressBar();
    });

    // scrubber
    el_videoSeekBar.addEventListener("click", (event) => {
        var barWidth = el_videoSeekBar.offsetWidth;
        var playerOffeset = videoplayer.offsetLeft;
        var clickPosition = event.clientX - playerOffeset;
        var scrubberPositionPercentage = clickPosition / barWidth * 100;

        // update the progress bar and update the time text
        currentTimeInSeconds = Math.floor(totalDurationInSeconds * scrubberPositionPercentage);
        currentDuration = calculateDuration(currentTimeInSeconds);
        updateStartTime();
        updateProgressBar();

        // move the video content Time
        el_video.currentTime = currentTimeInSeconds;
    })


    // play-pause
    el_playPauseBtn.addEventListener("click", () => {
        if(el_playPauseBtn.classList.contains("play")) {
            el_video.play();
            el_playPauseBtn.classList.remove("play");
            el_playPauseBtn.classList.add("pause");
        } else {
            el_video.pause();
            el_playPauseBtn.classList.remove("pause");
            el_playPauseBtn.classList.add("play");
        }
    });

    // volume on/off
    el_volumeToggle.addEventListener("click", () => {
        if(el_volumeToggle.classList.contains("unmuted")) {
            el_video.muted = true;
            el_volumeToggle.classList.remove("unmuted");
            el_volumeToggle.classList.add("muted");
        } else {
            el_video.muted = false;
            el_volumeToggle.classList.remove("muted");
            el_volumeToggle.classList.add("unmuted");
        }
    });

});

// ----------- helper functions 

const getPercentage = (currentTime, totalTime) => {
        let = calcPercentage = (currentTime / totalTime) * 100;
        return parseFloat(calcPercentage.toString());
}
    
const calculateDuration = (duration) => {
        let seconds = parseInt(duration % 60);
        let minutes = parseInt((duration % 3600) / 60);
        let hours = parseInt(duration / 3600);
        return {
            hours:prefixZero(hours),
            minutes:prefixZero(minutes.toFixed()),
            seconds:prefixZero(seconds.toFixed())
        }
} 

const prefixZero = (number) => {
        if( number > -10 && number < 10){
            return '0' + number;
        } else return number;
}


