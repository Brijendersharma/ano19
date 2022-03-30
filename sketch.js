var naruto_running,naruto,naruto_jump;
var bgImg;
var bg;
var m1,m2,m3,m4;
var monsters;

const PLAY=1;
const END=0;

var gameStat=PLAY;

var score=0

var gameOver;




function preload(){
    naruto_running=loadAnimation("images/p1.png","images/p2.png","images/p3.png","images/p4.png");
    bgImg=loadImage("images/17876.jpg");
   naruto_jump=loadAnimation("images/p3.png");
   m1=loadImage("images/i1.png");
   m2=loadImage("images/i2.png");
   m3=loadImage("images/i3.png");
   m4=loadImage("images/i4.png");
   gameOverImg = loadImage("images/gameOver.png");

}

function setup() {
    createCanvas(windowWidth,windowHeight);
    bg=createSprite(width/2,0,width,height);
    bg.addImage("ground",bgImg);
    bg.scale=0.63
   // bg.x=bg.width/2
    bg.velocityX=-6
    naruto=createSprite(190,height-200,50,50)
    naruto.scale=0.5
    naruto.addAnimation("running",naruto_running);
    naruto.addAnimation("stop",naruto_jump);
    naruto.debug=false;
    naruto.setCollider("rectangle",0,0,naruto.width,naruto.height);
    invisibleGround = createSprite(190,height-50,400,10);

  invisibleGround.visible = false;

  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);

  monsters=new Group();

}

function draw() {
 background(0);


 if (gameStat===PLAY){

  score = score + Math.round(getFrameRate()/60);
  
gameOver.visible=false;

  if (bg.x < 0){
    bg.x=width/2
  }

  if(keyDown("space") && naruto.collide(invisibleGround)) {
    
    naruto.velocityY = -20;
   // naruto.changeAnimation("jump");
  }
  else{
     //  naruto_running.frameDelay=20
     // naruto.changeAnimation("running");
  }
  naruto.velocityY = naruto.velocityY + 0.6 ;

  createMonster();

  if (naruto.isTouching(monsters)){
    gameStat=END;
  }
}
else if (gameStat===END){

  bg.velocityX=0;
  naruto.changeAnimation("stop");
  naruto.velocityY=0;
  monsters.setVelocityXEach(0);

  monsters.setLifetimeEach(-1);

  gameOver.visible=true;
}


 

  

  naruto.collide(invisibleGround);
 // naruto.changeAnimation("running");
 
 


  
 drawSprites();
 text("score:"+score,width/2,100)
 
}
function createMonster(){
  if (frameCount % 200 === 0){
    var monster=createSprite(width,height-100,50,50)
    var num=Math.round(random(1,4));
    if(num === 1){
      monster.addImage(m1)
    }
    else if (num===2){
      monster.addImage(m2)
    }
    else if (num===3){
      monster.addImage(m3)
    }
    else if (num===4){
      monster.addImage(m4)
    }
    monster.debug=false; 
    monster.velocityX=-8
    monster.scale=0.5

    monster.lifeTime=width/4+10;
    monsters.add(monster);
  }
}