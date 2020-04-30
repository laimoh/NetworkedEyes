let socket;
let data;

let video,img;

let posenet;
let pose;
let eyeR, eyeL;

function gotPoses(poses) { // parameter  (in this case array name) is poses
    // console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        // if poses array shows changes then go to poses first object which is pose and store it in variable 'pose'
    }
}

function modelLoaded() {
    console.log('poseNet Ready');
}

function setup() {
    createCanvas(400, 400);
    // background(0);
    socket = io.connect('http://localhost:4000');
    socket.on('eye', newEye);

    video = createCapture(VIDEO);
    // video.size(windowWidth, windowHeight);
    video.hide();
   
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses); // (Set up a pose event) when the model detects a pose -> a callback function when the evnt occours
}

function newEye(data) {
    push()

        translate(data.x, data.y);
        beginShape();
        vertex(-80,0);
        bezierVertex(-30,-50,30,-50,80,0);
        bezierVertex(30,50,-30,50,-80,0)
        endShape();
        pop();

        fill(30,100,50);
        ellipse(data.x, data.y, 30);
}

function draw() {
    // image(video,windowWidth,windowHeight);
    // image(video,0,0)

    if (pose) {
        eyeR = createVector(pose.rightEye.x,pose.rightEye.y);
        eyeL = createVector(pose.leftEye.x,pose.leftEye.y);

        push()
        translate(eyeR.x, eyeR.y);
        beginShape();
        vertex(-80,0);
        bezierVertex(-30,-50,30,-50,80,0);
        bezierVertex(30,50,-30,50,-80,0)
        endShape();
        pop();

        fill(255,50);
        ellipse(eyeR.x, eyeR.y, 30);

        push()
        translate(eyeL.x, eyeL.y);
        beginShape();
        vertex(-80,0);
        bezierVertex(-30,-50,30,-50,80,0);
        bezierVertex(30,50,-30,50,-80,0)
        endShape();
        pop();

        fill(255,50);
        ellipse(eyeL.x, eyeL.y, 30);

       console.log("sending: " + eyeL.x + "," + eyeL.y);

       data = {
           x: eyeL.x,
           y: eyeL.y
       }

       socket.emit('eye', data);

    }
    
}



