Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img src='"+data_uri+"' id='capturedImage'>";
    });
}
console.log("ml5version=",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LwH4Z237P/model.json",model_loaded);
function model_loaded() {
    console.log("model has loaded");
}
function check() {
    img=document.getElementById("capturedImage");
    classifier.classify(img,gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result-object-name").innerHTML=results[0].label;
        document.getElementById("accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
}
