// Variables
let fillbar =document.querySelector(".fill");
let audios = ["Audio_one.mp3", "Audio_two.mp3","Audio_three.mp3"];
let covers = ["cover1.jpg", "cover2.jpg", "cover3.jpg"];
let currentTime = document.querySelector(".time");


    // Create an object of audio

let audio = new Audio();
let currentSong =0;

// Whenever the window load, song should play automaticly

window.onload = playSong();

// let's play the song by this function whenever window load 

function playSong(){
    audio.src = audios[currentSong];
    audio.play();
}
function togglePlayPause(){
    if(audio.paused){
        audio.play();
        let playBtn = document.querySelector(".play-pause");
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    }else{
        audio.pause();
        let playBtn = document.querySelector(".play-pause");
        playBtn.innerHTML = '<i class="fa fa-play"></i>';
    }
}
// Nows let's make dynamic the fillbar with an event

audio.addEventListener("timeupdate", function(){
    let position = audio.currentTime / audio.duration;
    fillbar.style.width = position * 100 + "%";
// Let's work on the duration
    convertTime(Math.round(audio.currentTime));

//  Let's work on the play next song when current song complete

if(audio.ended){
    nextAudio();
}

});

function convertTime(seconds){
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;
// Let's fix the songle digit
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;

// Fix the total time
totalTime(Math.round(audio.duration));
}
function totalTime(seconds){
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;
// Let's fix the songle digit
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    currentTime.textContent += " & " + min + ":" + sec;
}

// Now let's work on next and prev buttons

function nextAudio(){
    currentSong++;
    if(currentSong > 2){
        currentSong = 0;
    }
    playSong();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";
// Just one line jquery for changing the covers
    $(".img img").attr("src",covers[currentSong]);
}

function prevAudio(){
    currentSong++;
    if(currentSong < 0){
        currentSong = 2;
    }
    playSong();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";
// Just one line jquery for changing the covers
    $(".img img").attr("src",covers[currentSong]);
}

//  let's work on the volume up, down and mute

function decreaseVolume(){
    audio.volume -= 0.25;
}
function increaseVolume(){
    audio.volume += 0.25;
}
// fix the speaker muted button

let volumeUp = document.querySelector(".volume-up");
volumeUp.addEventListener("click", function(){
    if (audio.volume === 1){
        audio.volume = 0;
        document.querySelector(".volume-up i").className = "fa fa-volume-mute";
    }else {
        audio.volume = 1;
        document.querySelector(".volume-up i").className = "fa fa-volume-up";
    }
})