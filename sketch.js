var PLAY = 1;
var END = 0;


var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;
var restart,gameOver;
var gameState = PLAY;

function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  sharkimg = loadImage("shark.png");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png")
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(310,320,100,100);
  water.addImage("water",waterbg);
  water.velocityX = -4;
 
  //creating ship
 ship =createSprite(300,300,100,100);
 ship.addImage("shipimg",shipimg);
 ship.scale= 0.5;

 //creating  group
  helicopterGroup = new Group();
  bombGroup =  new Group();
  sharkGroup = new Group();
  
  gameOver=createSprite(width/2,height/2,10,10);
  gameOver.addImage("gameOver",gameOverimg);
  
  restart=createSprite(width/2,height/1.6,10,10)
  restart.addImage("restart",restartimg)
  restart.scale=0.1;

}

function draw() {
  background(skybg);
  drawSprites();
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
   score = score + Math.round(frameCount/300);
  if(keyDown("right_arrow")){
  ship.x = ship.x+5;
  }
  if(keyDown("left_arrow")){
  ship.x = ship.x-5;
  }
    
    //Call user defined function
    spawnHelicopter();
    spawnBomb();
    spawnShark();
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    
    gameOver.visible =true;
    restart.visible= true;
   //water velocity becomes zero
    water.velocityX=0;
   //destroy Helicopter group
    helicopterGroup.destroyEach();
   //destroy bomb group
    bombGroup.destroyEach();
    sharkGroup.destroyEach();
    ship.destroy();
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
      
}
function reset()
  {
    gameState = PLAY;
    gameOver.visible =false;
    restart.visible =false;
    helicopterGroup.destroyEach();
    bombGroup.destroyEach();
    sharkGroup.destroyEach();
    score=0;
  }


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
    helicopter.lifetime=200;
  }
}

function spawnBomb(){
if(frameCount%200==0){
  bomb = createSprite(Math.round(random(50, width-50),40, 10, 10))
  bomb.addImage(bombimg);
  bomb.setVelocity(0,5);
  bomb.scale=0.2;
  bombGroup.add(bomb);
  bomb.lifetime=200;
  }
 
}


function spawnShark(){
  if(frameCount%400==0){
  shark = createSprite(800,400,10,10)
  shark.addImage(sharkimg);
  shark.setVelocity(-2,0)
  shark.scale = 0.2;
  sharkGroup.add(shark);
  shark.lifetime=800;
  }
}



