var cstfl = "";
var utfup = "";

var song_final = "";

var leftWristX = 0;
var rightWristX = 0;

var leftWristY = 0;
var rightWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;

function preload() {
  cstfl = loadSound("CAN'T STOP THE FEELING! - Justin Timberlake (Lyrics).mp3");

  utfup = loadSound(
    "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars.mp3"
  );
}

function setup() {
  canvas = createCanvas(400, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video, function () {
    console.log("Model loaded.");
  });
  posenet.on("pose", function (results) {
    if (results.length > 0) {
      console.log(results);

      scoreLeftWrist = results[0].pose.keypoints[9].score;
      scoreRightWrist = results[0].pose.keypoints[10].score;
      console.log(
        "Score left wrist: " +
          scoreLeftWrist +
          "\nand right wrist: " +
          scoreRightWrist
      );

      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("Left wrist x: " + leftWristX + "\nand y: " + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("Right wrist x: " + rightWristX + "\nand y: " + rightWristY);
    }
  });
}

function draw() {
  image(video, 0, 0, 400, 300);
  if (scoreLeftWrist > 0.2) {
    circle(leftWristX - 10, leftWristY - 10, 20);

    document.getElementById("result").innerHTML =
      "Song name is 'Can't stop the feeling!' ";
    song_final = cstfl;
    play();
  }
  if (scoreRightWrist > 0.2) {
    circle(rightWristX - 10, rightWristY - 10, 20);

    document.getElementById("result").innerHTML =
      "Song name is 'Up town funk you up' ";
    song_final = utfup;
    play();
  }
}

function play() {
  song_final.stop();
  song_final.play();
}

function stop() {
  song_final.stop();
}
