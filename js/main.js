
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var myTimer = false;


function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "f9C1C21MNiM",
        playerVars: {
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}


const myplay = document.getElementById("myplay");
const mypause = document.getElementById("mypause");
const slo = document.getElementById("slo");
const normal = document.getElementById("normal");
const fast = document.getElementById("fast");
const skip = document.getElementById("skip");
const newVid = document.getElementById("new");


myplay.addEventListener("click", (e) => {
    player.playVideo();
});

mypause.addEventListener("click", (e) => {
    player.pauseVideo();
});

slo.addEventListener("click", (e) => {
    player.setPlaybackRate(0.25);
});

normal.addEventListener("click", (e) => {
    player.setPlaybackRate(1);
});

fast.addEventListener("click", (e) => {
    player.setPlaybackRate(2);
});

skip.addEventListener("click", (e) => {
    player.seekTo(30, true);
    player.playVideo();
});

newVid.addEventListener("click", (e) => {
    player.loadVideoById({
        videoId: "ULQhvIGG27Q",
        startSeconds: 40,
        endSeconds: 120,
    });
});


function onPlayerReady(event) {
    console.log("playerReady");
}

function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            console.log("starting timer");
            myTimer = setInterval(getTime, 1000, event);
            break;
        case !YT.PlayerState.PLAYING:
            if (!myTimer) {
                console.log("no timer");
            }
            break;
        default:
            clearInterval(myTimer);
            console.log("stopping timer");
    }
}


function getTime(event) {
    let vidInfo = event.target.getVideoData();
    time = Math.floor(event.target.getCurrentTime());

    if (vidInfo.video_id == "f9C1C21MNiM") {
        manageCues(time);
    } else {
        console.log("cue NOT managed");
    }
}


function manageCues(time) {
    console.log(time);

    switch (time) {
        case 3:
            doStuff();
            break;
        case 10:
            doMoreStuff();
            break;
        case 21:
            changeLayout();
            showInfo();
            player.pauseVideo();
            setTimeout("player.playVideo();", 10000);
            break;
        case 27:
            player.loadVideoById({
                videoId: "ULQhvIGG27Q",
                startSeconds: 40,
                endSeconds: 120,
            });
            clearInterval(myTimer);
            unDoStuff();
    }
}


function doStuff() {
    console.log("doStuff");
    document.body.style.backgroundColor = "#fefae0";
}

function doMoreStuff() {
    document.body.style.backgroundColor = "#283618";
    console.log("moreStuffDone");
}

function changeLayout() {
    let iframe = player.getIframe();
    iframe.classList.add("layout2");
    player.getIframe().style.border = "20px solid #283618";
    console.log("layout changed");
}

function showInfo() {
    const info = document.getElementById("info");
    const iframe = document.createElement("IFRAME");
    iframe.classList.add("myframe");
    iframe.src =
        "https://www.montalvospirits.com/how-long-should-you-let-steaks-warm-up-before-cooking/";
    info.appendChild(iframe);
}


function unDoStuff() {
    document.body.style.backgroundColor = "white";


    const infoFrame = document.querySelector(".myframe");
    infoFrame.src = "";

    document.querySelector("#info").innerHTML = "";

    let iframe = player.getIframe();
    iframe.classList.remove("layout2");
    player.getIframe().style.border = "none";
    console.log("UNDONE!!!!!!!");
}

function stopVideo() {
    console.log("video stopped");
    player.stopVideo();
}