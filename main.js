img= ""
status=""
objects=[]
function preload(){
    img= loadImage("dog_cat.jpg")
}

function setup(){
    canvas= createCanvas(640,420);
    canvas.center();
    object_detector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML= "Status:Detecting objects"
}

function modelLoaded(){
    console.log("Model loaded")
    status= true;
    object_detector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}

function draw(){
    image(img,0,0,640,420)
    /*
    fill('#e6000f');
    text("Dog",100,70);
    noFill();
    stroke('#e6000f');
    rect(30,55,560,355);

    fill('#e6000f');
    text("Cat", 340,100);
    noFill();
    stroke('#e6000f');
    rect(290,70,280,325);
    */
   if (status!=""){
       for (i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML= "Status: Objects Detected";
           fill('#d90000');
           percent= floor(objects[i].confidence*100)
           text(objects[i].label+" "+percent+"%", objects[i].x+10, objects[i].y+20);
           noFill()
           stroke('d90000')
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
           
   }
}