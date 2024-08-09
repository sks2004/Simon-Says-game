let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level=0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".start-btn");

startBtn.addEventListener("click",startGame);

function startGame(){
    if(started==false){
        startBtn.classList.add("rmvBtn");
        started=true;  
        levelUp();
    }
}

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },200);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rdm = Math.floor(Math.random() * 3);
    let rdmcolor = btns[rdm];
    let rdmbtn = document.querySelector(`.${rdmcolor}`);

    gameSeq.push(rdmcolor);
    
    gameFlash(rdmbtn);
}

function checkAns(idx){

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,700);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        startBtn.classList.remove("rmvBtn");
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}