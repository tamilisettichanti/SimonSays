let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let highScore=0;
let finalScore=0;
let h2 = document.querySelector("h2");
let p=document.querySelector("p");
let colors = ["red", "yellow", "green", "purple"];
document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});
function levelUp() {
  userSeq=[];
  level++;
  h2.innerText = `Level : ${level}`;
  let randIdx = Math.floor(Math.random() * colors.length);
  let randColor = colors[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);

}
function gameFlash(btn){
  btn.classList.add("btnflash");
  setTimeout(() => {
    btn.classList.remove("btnflash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);

}
function checkAns(idx) {
  if(userSeq[idx]===gameSeq[idx]){
    if(userSeq.length===gameSeq.length){
      setTimeout(levelUp,500);
    }
  }
  else{
    finalScore=level-1;
    h2.innerHTML=`Game over! Your Score was <b>${finalScore}</b><br> Press Any key to start`;
    if(highScore<finalScore){
      highScore=finalScore;
    }
    p.innerText=`High Score:${highScore}`;
    
    reset();
    gameOverPress();
  }
}
function gameOverPress(){
  let body=document.querySelector("body");
  body.classList.add("gameover");
  setTimeout(()=>{
    body.classList.remove("gameover");
  },100);
}
function reset(){
  started=false;
  userSeq=[];
  gameSeq=[];
  level=0;
}
function btnPress() {
  if (!started) return;
  let btn = this;
  let btnColor = btn.getAttribute("id");
  userFlash(btn);
  userSeq.push(btnColor);
  console.log(userSeq);
  checkAns(userSeq.length-1)
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}