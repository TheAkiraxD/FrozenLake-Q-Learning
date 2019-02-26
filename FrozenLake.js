var you;
const all_rewards = [-1,-1,-1,-1,-1,-10,-1,-10,-1,-10,-1,-10,-10,-1,-1,1000];
const end = [5, 7, 11, 12, 15];
var current_episode = 0;
var state;
var action;
var you_x;
var you_y; 
var you_x_plus;
var you_y_plus; 
const you_size = 36;
var steps;
var done = true;
var wins = 0;
var loss = 0;


// Parameters
var episodes = 10000;
var steps_per_episode = 100;
var learning_rate = 0.1;
var discount_rate = 0.99;
var exploration_rate = 1;
var max_exploration_rate = 1;
var min_exploration_rate = 0.01;
var exploration_decay_rate = 0.001;

// Q Learning stuff
var Actions = 4;
var States = 16;
var QTable = [];

function preload(){
    you = loadImage('https://i.imgur.com/jmZiMbR.png');
}

function setup() {
    createCanvas(400,500);
    frameRate(30);

    for(var i = 0; i < States; i++){
        QTable[i] = [];
        for(var j = 0; j < Actions; j++){
            QTable[i][j] = 0;
        }
    }

    console.table(QTable);
}

function draw() {
    ScenarioDrawing();
    if(current_episode <= episodes){

        if(done){
            new_game();
        }

        image(you,you_x + you_x_plus,you_y + you_y_plus, you_size, you_size);
        debugger;
        if(steps < steps_per_episode){
            steps += 1;
            var exploration_rate_threshold = random();
            if(exploration_rate_threshold > exploration_rate){
                //Choose one action based in the Q-Table
                action = max_value_position(state);
            }else{
                //Choose one action randomly
                action = randomize_possible_action(state);
            }

            var new_state = next_state(state,action);

            var A = (1 - learning_rate);
            var B = QTable[state][action];
            var C = all_rewards[new_state]
            var D = max_reward(new_state);

            QTable[state][action] = (A * B) + learning_rate * (C + discount_rate * D);

            state = new_state;
            done = end_game(state);
            current_episode += 1;
            
        }else{
            done = true;
        }

    }else{
        noLoop();
    }
}

function new_game(){
    you_x = 122;
    you_y = 172;
    you_x_plus = 0;
    you_y_plus = 0;
    
    action = 0;
    state = 0;
    steps = 0;
    done = false;

    //Exploration rate decay
    exploration_rate = min_exploration_rate + (max_exploration_rate - min_exploration_rate) * Math.exp(-exploration_decay_rate * current_episode);
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


    textAlign(LEFT);
    fill(50,255,50);
    textFont('Arial');
    textSize(16);
    noStroke();
    text("Wins: " + wins, 4, 470);

    fill(255,50,50);
    text("Loss: " + loss, 4, 490);

}

function max_value_position(current_state){
    var not_allowed = [];
    var div = Math.trunc((current_state + 1) / 4);
    var mod = (current_state + 1) % 4;

    if(mod == 0){
        div -= 1;
    }
    var res;
    switch(div){
        case 0:
            not_allowed.push(0);
            break;
        case 3:
            not_allowed.push(2);
            break;
    }

    switch(mod){
        case 0:
            not_allowed.push(1);
            break;
        case 1:
            not_allowed.push(3);
            break;
    }

    var position = Math.floor(random(Actions));
    while(not_allowed.includes(position)){
        position = Math.floor(random(Actions));
    }


    for(var i = 0; i < Actions; i++){
        if(!not_allowed.includes(i) && QTable[current_state][i] > QTable[current_state][position]){
            position = i;
        }
    }


    return position;
}

function max_value_number(current_state){
    var position = 0;
    var max_value = QTable[current_state][position];

    for(var i = 0; i < Actions; i++){
        if(QTable[current_state][i] > QTable[current_state][position]){
            max_value = QTable[current_state][i];
        }
    }

    return max_value;
}

function randomize_possible_action(current_state){
    var not_allowed = [];

    var mod = (current_state + 1) % 4;
    // 1 = 1st col
    // 2 = 2nd col
    // 3 = 3rd col
    // 0 = 4th col

    var div = Math.trunc((current_state + 1) / 4);
    // 0 = 1st row
    // 1 = 2nd row
    // 2 = 3rd row
    // 3 = 4th row

    if(mod == 0){
        div -= 1;
    }


    var res;

    switch(div){
        case 0:
            not_allowed.push(0);
            break;
        case 3:
            not_allowed.push(2);
            break;
    }

    switch(mod){
        case 0:
            not_allowed.push(1);
            break;
        case 1:
            not_allowed.push(3);
            break;
    }

    if(not_allowed.length != 0){
        while(true){
            var allowed = true;
            res = Math.floor(random(4));
            for(var i = 0; i < not_allowed.length; i++){
                if(res == not_allowed[i]){
                    allowed = false;
                }
            }
            if(allowed){
                break;
            }
        }
    }else{
        res = Math.floor(random(4));
    }

    return res;

}

function next_state(current_state, current_action){
    var new_state;
    switch(current_action){
        case 0:     // ↑ //
            new_state = current_state - 4;
            you_y_plus += (-40);
            break;
        case 1:     // → //
            new_state = current_state + 1;
            you_x_plus += 40;
            break;
        case 2:     // ↓ //
            new_state = current_state + 4;
            you_y_plus += 40;
            break;  
        case 3:     // ← //
            new_state = current_state - 1;
            you_x_plus += (-40);
            break;
    }
    return new_state;
}

function end_game(new_state){
    if(end.includes(new_state)){
        if(new_state == 15){
            wins+=1;
        }else{
            loss+=1;
        }
        return true;
    }else{
        return false;
    }
}

function max_reward(current_state){
    var not_allowed = [];

    var mod = (current_state + 1) % 4;
    var div = Math.trunc((current_state + 1) / 4);
    if(mod == 0){
        div -= 1;
    }

    switch(div){
        case 0:
            not_allowed.push(0);
            break;
        case 3:
            not_allowed.push(2);
            break;
    }

    switch(mod){
        case 0:
            not_allowed.push(1);
            break;
        case 1:
            not_allowed.push(3);
            break;
    }


    var res = QTable[current_state][0];
    for(var i = 0; i < 4; i++){
        if(!not_allowed.includes(i)){
            if(QTable[current_state][i] > res){
                res = QTable[current_state][i];
            }
        }
    }

    return res;
}