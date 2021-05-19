var sky,skyImg;
var bird,birdFlying,birdsGroup,birdCollidedimg,birdCollided;
var airplane,airplaneImg;
var invisBlock;
var edges
var gameover, gameoverImg

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload() {
  skyImg=loadImage("Sky.PNG");
  birdFlying=loadAnimation("Bird1.png","Bird2.png","Bird3.png");
  birdCollidedimg=loadAnimation("Bird2.png");
  airplaneImg=loadImage("plane.PNG");
  gameoverImg=loadImage("gameover.PNG");
}


function setup() {
  createCanvas(900,500);
  edges=createEdgeSprites();
  sky=createSprite(400, 200, 50, 50);
  sky.addImage(skyImg);
  sky.scale=3;

  airplane=createSprite(200,200,10,10);
  airplane.addImage(airplaneImg);
  airplane.scale=0.5;
  airplane.mirrorX(airplane.mirrorX()*-1);
  airplane.debug=true;
  airplane.setCollider("rectangle",0,0,airplane.width,airplane.height-150);

  invisBlock=createSprite(200,300,200,10);
  invisBlock.lifetime=150;
  invisBlock.visible=false;

  gameover=createSprite(400,200,50,50);
  gameover.addImage(gameoverImg);
  gameover.scale=0.8;
  

  birdCollided=createSprite(1000,100)
  birdCollided.addAnimation("collided",birdCollidedimg);
  birdCollided.mirrorX(birdCollided.mirrorX()*-1);
  birdCollided.visible=false;

  birdsGroup=new Group();
}

function draw() {
  background(0);
  if(gameState===PLAY){
    sky.velocityX=-1
    gameover.visible=false;
    if(sky.x<300){
      sky.x=400
    }
    
    if(keyDown("space")){
     airplane.velocityY=-3;
    }
    airplane.velocityY=airplane.velocityY+0.5;
    airplane.collide(invisBlock);
    airplane.bounceOff(edges[2]);
    spawnBirds();
    if(airplane.isTouching(birdsGroup)||airplane.y>500){
      gameState=END;
    }
  }

  if(gameState===END){
    gameover.visible=true;
    sky.velocityX=0;
    birdsGroup.setVelocityXEach(0);
    birdsGroup.setLifetimeEach(-1);
    airplane.velocityY=0;
    console.log(birdsGroup.length);
    for (var i = 0; i <= birdsGroup.length; i++)
    {
      if(airplane.isTouching(birdsGroup.get(i))){
          console.log("collided")
          birdCollided.x = birdsGroup.get(i).x
          birdCollided.y = birdsGroup.get(i).y
          birdsGroup.get(i).destroy();
      }
    }
    birdCollided.visible=true;
  }
  
  drawSprites();
}

function spawnBirds(){
  if(frameCount%300===0){
    bird=createSprite(1000,random(10,480))
    bird.addAnimation("flying",birdFlying);
    bird.velocityX=-3;
    bird.mirrorX(bird.mirrorX()*-1);
    bird.scale=0.5
    bird.lifetime=320;
    birdsGroup.add(bird);
  }
}
