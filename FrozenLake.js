var you;
function preload(){
    you = loadImage('https://i.imgur.com/jmZiMbR.png');
}

function setup() {
    createCanvas(400,500);
}


function draw() {
    ScenarioDrawing();
    image(you,122,172, 36, 36);
}


function ScenarioDrawing(){
    background(230);
    textAlign(CENTER);
    fill(181,231,255);
    textFont('FrostBite');
    textSize(30);
    strokeWeight(2);
    stroke(10,176,255);
    text("Frozen Lake", 200, 60);

    
    
    strokeWeight(1);
    var el_x = 200;
    var el_y = 250;
    var el_size = 200;
    ellipse(el_x, el_y, el_size, 300);
    noStroke();
    strokeWeight(1);
    stroke(255);
    fill(197,227,249);
    rect(120,170, 160, 160);

    noFill();
    var v1 = 0;
    var v2 = 0;
    for(var i = 0; i < 4; i ++){
        for(var j = 0; j < 4; j ++){
            rect(120 + v1, 170 + v2, 40, 40);
            v1 += 40;
        }
        v2 += 40;
        v1 = 0;
    }

    	
    //start
    fill(255);
    textSize(24);
    text("S", 140, 200);

    //hole 1
    fill(181,231,255);
    ellipse(180, 230, 30, 30);

    //hole 2
    fill(181,231,255);
    ellipse(260, 230, 30, 30);
    
    //hole 3
    fill(181,231,255);
    ellipse(260, 270, 30, 30);

    //hole 4
    fill(181,231,255);
    ellipse(140, 310, 30, 30);

    //frisbee
    stroke(10,105,52);
    fill(58,135,92);
    ellipse(260, 310, 22, 10);
    noStroke();
    fill(97,159,124);
    ellipse(260, 309, 12, 4);

}