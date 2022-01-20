
status1="";
objects=[];


function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status1 !=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length;i++){
            document.getElementById("Status").innerHTML="status: object detected";
            fill("white");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("white");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(object_name==objects[i].label){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("ThingsDetected").innerHTML=object_name+" found";
            }
            else{
                document.getElementById("ThingsDetected").innerHTML=object_name+" notfound";
            }
        }
    }

}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("Status").innerHTML="Status: Detecting objects";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log(modelLoaded);
    status1=true;
    
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}