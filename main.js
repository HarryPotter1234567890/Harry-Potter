song100 = "";
song200 = "";

importantHoldStatus1 = "";
importantHoldStatus2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

function preload(){
song100 = loadSound("music.mp3");
song200 = loadSound("music2.mp3");
}

function play(){
song100.play();
song100.setVolume(1);
song100.speed(1);
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Pose Net is not working, we will make pose net 2.");

}

function gotPoses(results){
 if(results.length > 0){
console.log(results);

scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;

leftWristX = results[0].pose.leftWrist.x;
rightWristX = results[0].pose.rightWrist.x;
leftWristY = results[0].pose.leftWrist.y;
rightWristY = results[0].pose.rightWrist.y;




 }
}
function draw(){
    image(video, 0, 0, 500, 500);
    importantHoldStatus1 = song100.isPlaying();
    importantHoldStatus2 = song200.isPlaying();

    if(scoreLeftWrist > 0.2){
        fill("teal");
        circle(leftWristY, rightWristY, 35);
        song100.stop();
if(importantHoldStatus2 == false){
song200.play();
document.getElementById("Harry").innerHTML = "Song Name: Peter Pan";
}
        }
        if(scoreRightWrist > 0.2){
            fill("teal");
            circle(leftWristY, rightWristY, 35);
            song200.stop();
    if(importantHoldStatus1 == false){
    song100.play();
    document.getElementById("Harry").innerHTML = "Song Name: Harry Potter";
    }
            }
}

