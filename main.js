function preload(){}
function speak(data){window.speechSynthesis.speak(new SpeechSynthesisUtterance(data))}
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("MobileNet", modelLoaded);
    //speak("Use fullscreen for best results")
    //window.alert("Use fullscreen for best results \n(F11 on Windows)");
}

function draw(){
    image(video, 0, 0, 400, 400);
    classifier.classify(video, getResults);
}

function modelLoaded(){
    console.log("Model is Loaded!");
    console.warn("Model is Loaded!!");
    console.error("Model is Loaded!!!");
}

var presults = "";

function getResults(error, results){
    if(error){
        console.warn(error + "!!!!");
        console.error(error + "!!!!!!!!");
    } else {
        result = results[0].label;
        confidence = ((results[0].confidence)*100).toFixed(2) + "%"
        if((presults != result) && (results[0].confidence > 0.5)){
            console.log(results);
            presults = result;
            speak("I think that is " + result + ".");
            document.getElementById("acctext").innerText = confidence;
            document.getElementById("objtext").innerText = result;
        }
    }
}