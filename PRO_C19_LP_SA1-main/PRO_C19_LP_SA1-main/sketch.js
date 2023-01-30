var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(700,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
  
  ghost=createSprite(700,300,3,3)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
  
}

function draw() {
  background(200);
  spawnDoors()
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x= ghost.x-3
    }
    if(keyDown("right_arrow")){
      ghost.x= ghost.x+3
    }
    if(keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY=ghost.velocityY+0.8
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
    }
    drawSprites()
}

function spawnDoors(){
  if(frameCount%200==0){
  var door=createSprite(500,100)
  door.addImage(doorImg)
  door.velocityY=1
  door.x=Math.round(random(500,900))
  doorsGroup.add(door)

  var climber=createSprite(500,170)
  climber.addImage(climberImg)
  climber.velocityY=1
  climber.x=door.x
  climbersGroup.add(climber)

  var invisibleBlock=createSprite(500,170)
  invisibleBlock.width=climber.width
  invisibleBlock.height=2
  invisibleBlock.velocityY=1
  invisibleBlock.x=door.x
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock.debug=true
  ghost.depth=door.depth+1


  }

}0