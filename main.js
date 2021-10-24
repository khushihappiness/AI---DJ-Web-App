function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet model is loaded');
}


song="";
leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload()
{
    song=loadSound("music.mp3")
}

function draw()
{
    image(video, 0, 0, 600, 500);
    if(scoreLeftWrist > 0.2)
    {

    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY, 20);

    inNumberleftWristY= Number(leftWristY)//used to convert string into number
    removeDecimals= floor(inNumberleftWristY);//this function is used to remove the decimals
    volume= removeDecimals/500;
    document.getElementById("volume").innerHTML="volume" + volume;
    song.setVolume(volume);
}

if(scoreRightWrist > 0.2)
 {

fill('#FF0000');
stroke("#FF0000");
circle(rightWristX, rightWristY, 20);

if(rightWristY > 0 && rightWristY <= 100)
     {
document.getElementById("speed").innerHTML="Speed is = " + speed;
song.rate(0.5);
     }
     else if(rightWristY > 100 && rightWristY <= 200)
     {
document.getElementById("speed").innerHTML="Speed is = " + speed;
song.rate(1); 
     }
     else if(rightWristY > 200 && rightWristY <= 300)
     {
document.getElementById("speed").innerHTML="Speed is = " + speed;
song.rate(1.5);   
     }
     else if(rightWristY > 300 && rightWristY <= 400)
     {
document.getElementById("speed").innerHTML="Speed is = " + speed;
song.rate(2); 
     }
     else if(rightWristY > 400 && rightWristY <= 500)
     {
document.getElementById("speed").innerHTML="Speed is = " + speed;
song.rate(2.5); 
     }

    }


}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);//predefined function to control the speed, within the range: 1 to 2.5
}

function stop()
{
    song.stop();
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;

        console.log("Score is = " + scoreLeftWrist);
        console.log("Score is = " + scoreRightWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + leftWristX + "Left wrist Y = " + leftWristY)

        righttWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + rightWristX + "Right wrist Y = " + rightWristY)
    }
}