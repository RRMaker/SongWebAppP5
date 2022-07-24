jingle1 = "";
jingle2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1Status = "";
song2Status = "";
function preload(){
    jingle1 = loadSound("LostBoy.mp3");
    jingle2 = loadSound("HarryPotter.mp3");

}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("Model is ready");
}
function gotPoses(results){
     if (results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score = " + scoreLeftWrist);
        console.log("Right Wrist Score = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X = " + leftWristX + " ,Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + " ,Right Wrist Y = " + rightWristY);
     }
}
function draw(){
    image(video, 0, 0, 600, 500);
    song1Status = jingle1.isPlaying();
    song2Status = jingle2.isPlaying();
    if(scoreLeftWrist > 0.2){
        fill("#fc0703");
        stroke("#fc0703");
        circle(leftWristX, leftWristY, 20);
        jingle2.stop();
        if(song1Status == false){
            jingle1.play();
            document.getElementById("song_name").innerHTML = "Lost Boy from Peter Pan";
        }
    }
    if(scoreRightWrist > 0.2){
        fill("#fc0703");
        stroke("#fc0703");
        circle(rightWristX, rightWristY, 20);
        jingle1.stop();
        if(song1Status == false){
            jingle2.play();
            document.getElementById("song_name").innerHTML = "Hedwigs Theme from Harry Potter";
        }
    }
}