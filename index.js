let userSeq = [];
let gameSeq = [];

let started = false;
let level = 0;
let Score = 0;

let highScore = document.querySelector(".highestScore");
highScore.innerHTML = `Highest Scroe : ${Score}`;

let btns = ["red", "blue", "yellow", "purple"];

let h2 = document.querySelector("h2");

let red = document.querySelector(".red");

document.addEventListener("click", function(){
    if(started == false){
        started = true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function() {
        btn.classList.remove("gameFlash");
    }, 140)
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 140)
}

function levelUp(){
    level++;
    h2.innerText = `Level ${level}`;
    userSeq = [];


    let rndIdx = Math.floor(Math.random() * 4);
    let rndColor = btns[rndIdx];
    let rndBtn = document.querySelector(`.${rndColor}`);
    gameSeq.push(rndColor)
    gameFlash(rndBtn);
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000)
        }
    }
    else{
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 100);
        h2.innerHTML = `Game over! Your Score wa <b>${level}<b> <br> Press any key to restart`;
        if(level > Score){
            Score = level;
            highScore.innerHTML = `Highest Score : ${Score}`
        }
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function reset(){
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
}