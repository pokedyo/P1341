
img = "";
person = [];
stts = "";

function preload(){
  img = loadImage('alarm_alarm_alarm.mp3');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  personDetector = ml5.personDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  stts = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  person = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(stts != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        personDetector.detect(video, gotResult);
        for (i = 0; i < person.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "Baby Detected";
 
          fill(r,g,b);
          percent = floor(person[i].confidence * 100);
          text(person[i].label + " " + percent + "%", person[i].x + 15, person[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(person[i].x, person[i].y, person[i].width, person[i].height);
        }

        }else 
        {document.getElementById("number_of_objects").innerHTML = "Baby Not Detected";
        play('alarm_alarm_alarm.mp3')
      }
}
